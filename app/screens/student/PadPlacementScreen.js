import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Info, Timer } from 'lucide-react-native';

import { useAEDContext } from '../../context/AEDContext';
import Colors from '../../constants/colors';
import style from '../../styles/InstructorTestScenarioStyle';
import styles from '../../styles/PadPlacementStyle';
import style2 from '../../styles/StudentAutoModeStyle';

import { targets, padSizes } from '../../components/PadPlacement/padConfig';

import Header from '../../components/Header';
import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';

import Wire from '../../components/PadPlacement/wire';
import DraggablePad from '../../components/PadPlacement/draggablePad';
import { useWindowDimensions } from 'react-native';

const SNAP_RATIO = 0.06;

const PadPlacementScreen = ({ goStudentAutoMode }) => {
  const {
    started,
    paused,
    steps,
    stepIndex,
    expectedAction,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    timer,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    handleAction,
  } = useAEDContext();
  const { height: screenHeight } = useWindowDimensions();

  const BODY_MAX_HEIGHT = Math.min(screenHeight * 0.55, 620);
  const attachHandledRef = useRef(false);
  const [imageLayout, setImageLayout] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  /* -------------------------
     Helpers (ONE coordinate system)
  -------------------------- */

  const getTargetPx = label => {
    if (!imageLayout) return { x: 0, y: 0 };
    return {
      x: targets[label].xPct * imageLayout.width,
      y: targets[label].yPct * imageLayout.height,
    };
  };

  const getPadSizePx = label => {
    if (!imageLayout) return { w: 0, h: 0 };

    const w = padSizes[label].wPct * imageLayout.width;
    const h = padSizes[label].hPct * imageLayout.height;

    return {
      w: Math.max(w, 44), // Apple HIG minimum
      h: Math.max(h, 44),
    };
  };

  const getPadCenter = label => {
    if (!imageLayout) return { x: 0, y: 0 };
    const { w, h } = getPadSizePx(label);
    const { x, y } = positions[label];
    return { x: x + w / 2, y: y + h / 2 };
  };

  /* -------------------------
     Drag logic (FIXED SNAP)
  -------------------------- */

  const handleMove = (x, y, label) => {
    if (!imageLayout) return;

    setPositions(p => ({ ...p, [label]: { x, y } }));

    const { w, h } = getPadSizePx(label);
    const { x: tx, y: ty } = getTargetPx(label);

    const padCenter = { x: x + w / 2, y: y + h / 2 };
    const targetCenter = { x: tx + w / 2, y: ty + h / 2 };

    const distance = Math.hypot(
      padCenter.x - targetCenter.x,
      padCenter.y - targetCenter.y,
    );

    const snapRadius = imageLayout.width * SNAP_RATIO;

    setPlacedPads(prev => ({
      ...prev,
      [label]: distance < snapRadius,
    }));
  };

  const handleRelease = (x, y, label) => {
    if (!imageLayout) return;

    const { w, h } = getPadSizePx(label);
    const { x: tx, y: ty } = getTargetPx(label);

    const padCenter = { x: x + w / 2, y: y + h / 2 };
    const targetCenter = { x: tx + w / 2, y: ty + h / 2 };

    const distance = Math.hypot(
      padCenter.x - targetCenter.x,
      padCenter.y - targetCenter.y,
    );

    const snapRadius = imageLayout.width * SNAP_RATIO;

    setPlacedPads(prev => ({
      ...prev,
      [label]: distance < snapRadius,
    }));

    setPositions(p => ({ ...p, [label]: { x, y } }));
  };

  /* -------------------------
     Step completion
  -------------------------- */

  useEffect(() => {
    if (steps[stepIndex]?.action !== 'attach') {
      attachHandledRef.current = false;
      return;
    }

    const allPlaced = Object.values(placedPads).every(Boolean);

    if (allPlaced && !attachHandledRef.current) {
      attachHandledRef.current = true;
      handleAction('attach');
    }

    if (!allPlaced) attachHandledRef.current = false;
  }, [placedPads, stepIndex, steps, handleAction]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={!isDragging}
      >
        <Header goBack={goStudentAutoMode} role="student" />

        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text>Auto Mode</Text>
              </TouchableOpacity>
            </View>

            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <Text
                  style={{
                    marginLeft: 2,
                    color: '#ed1313',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </Text>
              </View>
              <TouchableOpacity style={style2.wifiButton}>
                <Info color={Colors.text} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Pad placement */}
          <View style={styles.placementContainer}>
            <View style={styles.bodyStage}>
              <View
                style={[styles.bodyContainer, { maxHeight: BODY_MAX_HEIGHT }]}
              >
                <Image
                  source={require('../../assets/images/padplacementModel.png')}
                  style={styles.bodyImage}
                  onLayout={e => setImageLayout(e.nativeEvent.layout)}
                />

                {/* WIRES */}
                {imageLayout && (
                  <>
                    <Wire from={{ x: 20, y: 40 }} to={getPadCenter('Pad 1')} />
                    <Wire from={{ x: 20, y: 40 }} to={getPadCenter('Pad 2')} />
                  </>
                )}

                {/* TARGET GUIDES */}
                {imageLayout &&
                  Object.keys(targets).map(label => {
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

                {/* DRAGGABLE PADS */}
                {imageLayout &&
                  Object.keys(targets).map(label => {
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
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
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
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {started && steps.length > 0 && (
        <View style={{ alignItems: 'center' }}>
          <ToneDisplay text={steps[stepIndex]?.text} />
        </View>
      )}

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <ModeControls
          started={started}
          paused={paused}
          onPowerPress={() => {
            if (!started) startAED();
            else if (paused) resumeAED();
            else if (expectedAction === 'power') nextStep();
          }}
          onPausePress={pauseAED}
          onStopPress={() => {
            stopAED();
            setIsSwitchOpen(false);
            setPositions({
              'Pad 1': { x: 15, y: 10 },
              'Pad 2': { x: 10, y: 75 },
            });
            setPlacedPads({ 'Pad 1': false, 'Pad 2': false });
          }}
        />
      </View>
    </View>
  );
};

export default PadPlacementScreen;
