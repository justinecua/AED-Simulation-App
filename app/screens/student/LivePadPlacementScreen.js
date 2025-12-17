import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Info, Timer } from 'lucide-react-native';

import Colors from '../../constants/colors';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import styles from '../../styles/PadPlacementStyle';

import Header from '../../components/Header';
import ToneDisplayLiveSession from '../../components/ToneDisplayLiveSession';
import Wire from '../../components/PadPlacement/wire';
import DraggablePad from '../../components/PadPlacement/draggablePad';

import { targets, padSizes } from '../../components/PadPlacement/padConfig';
import { useLiveAEDClientContext } from '../../context/LiveAEDClientContext';
import { useTcpServerContext } from '../../context/TcpServerContext';

const SNAP_RATIO = 0.06;

const LivePadPlacementScreen = ({ goLiveSession }) => {
  const {
    steps,
    stepIndex,
    poweredOn,
    started,
    timer,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    handleAction,
    pauseAED,
  } = useLiveAEDClientContext();

  const { sendMessage } = useTcpServerContext();
  const attachHandledRef = useRef(false);
  const [imageLayout, setImageLayout] = useState(null);

  /* ---------------- helpers ---------------- */

  const getTargetPx = label => {
    if (!imageLayout) return { x: 0, y: 0 };
    return {
      x: targets[label].xPct * imageLayout.width,
      y: targets[label].yPct * imageLayout.height,
    };
  };

  const getPadSizePx = label => {
    if (!imageLayout) return { w: 0, h: 0 };
    return {
      w: Math.max(padSizes[label].wPct * imageLayout.width, 44),
      h: Math.max(padSizes[label].hPct * imageLayout.height, 44),
    };
  };

  const getPadCenter = label => {
    if (!imageLayout) return { x: 0, y: 0 };
    const { w, h } = getPadSizePx(label);
    const { x, y } = positions[label];
    return { x: x + w / 2, y: y + h / 2 };
  };

  /* ---------------- drag logic ---------------- */

  const handleMove = (x, y, label) => {
    if (!imageLayout) return;

    setPositions(p => ({ ...p, [label]: { x, y } }));

    const { w, h } = getPadSizePx(label);
    const { x: tx, y: ty } = getTargetPx(label);

    const distance = Math.hypot(
      x + w / 2 - (tx + w / 2),
      y + h / 2 - (ty + h / 2),
    );

    const snapRadius = imageLayout.width * SNAP_RATIO;
    const placed = distance < snapRadius;

    setPlacedPads(p => ({ ...p, [label]: placed }));

    sendMessage(
      JSON.stringify({
        type: 'PAD_STATUS',
        data: { label, placed, x, y },
      }),
    );
  };

  const handleRelease = (x, y, label) => {
    handleMove(x, y, label);
  };

  /* ---------------- step completion ---------------- */

  useEffect(() => {
    if (steps[stepIndex]?.action !== 'attach') {
      attachHandledRef.current = false;
      return;
    }

    const allPlaced = Object.values(placedPads).every(Boolean);

    if (allPlaced && !attachHandledRef.current) {
      attachHandledRef.current = true;

      sendMessage(
        JSON.stringify({
          type: 'STUDENT_ACTION',
          data: 'PADS_CORRECTLY_PLACED',
        }),
      );

      handleAction('attach');
    }
  }, [placedPads, stepIndex, steps, handleAction]);

  useEffect(() => {
    if (steps[stepIndex]?.action === 'attach' && poweredOn && started) {
      pauseAED(false);
    }
  }, [stepIndex, steps]);

  /* ---------------- render ---------------- */

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header goBack={goLiveSession} role="student" />

        <View style={styles.contentContainer}>
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <Text>Live Mode</Text>
            </View>
            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <Text style={{ color: '#ed1313', fontWeight: 'bold' }}>
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </Text>
              </View>
              <TouchableOpacity style={style2.wifiButton}>
                <Info color={Colors.text} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.placementContainer}>
            <View style={styles.bodyContainer}>
              <Image
                source={require('../../assets/images/padplacementModel.png')}
                style={styles.bodyImage}
                onLayout={e => setImageLayout(e.nativeEvent.layout)}
              />

              {imageLayout && (
                <>
                  <Wire from={{ x: 20, y: 40 }} to={getPadCenter('Pad 1')} />
                  <Wire from={{ x: 20, y: 40 }} to={getPadCenter('Pad 2')} />

                  {Object.keys(targets).map(label => {
                    const { x, y } = getTargetPx(label);
                    const { w, h } = getPadSizePx(label);

                    return (
                      <View
                        key={label}
                        style={[
                          styles.padGuide,
                          {
                            left: x,
                            top: y,
                            width: w,
                            height: h,
                            borderColor: placedPads[label]
                              ? '#4CAF50'
                              : '#F44336',
                            backgroundColor: placedPads[label]
                              ? 'rgba(76,175,80,0.1)'
                              : 'rgba(244,67,54,0.1)',
                          },
                        ]}
                      />
                    );
                  })}

                  {Object.keys(targets).map(label => {
                    const { x, y } = getTargetPx(label);
                    const { w, h } = getPadSizePx(label);

                    return (
                      <DraggablePad
                        key={label}
                        label={label}
                        initialX={positions[label].x}
                        initialY={positions[label].y}
                        targetX={x}
                        targetY={y}
                        onMove={handleMove}
                        onRelease={handleRelease}
                        padSize={{ w, h }}
                        padStyle={[
                          styles.aedPad,
                          label === 'Pad 1'
                            ? styles.padUpperRight
                            : styles.padLowerLeft,
                          placedPads[label] && styles.padCorrect,
                        ]}
                      />
                    );
                  })}
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {started && steps.length > 0 && (
        <View style={{ alignItems: 'center' }}>
          <ToneDisplayLiveSession text={steps[stepIndex]?.text} />
        </View>
      )}
    </View>
  );
};

export default LivePadPlacementScreen;
