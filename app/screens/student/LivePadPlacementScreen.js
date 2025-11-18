import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Info, Timer } from 'lucide-react-native';
import Colors from '../../constants/colors';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import styles from '../../styles/PadPlacementStyle';

import Header from '../../components/Header';
import ToneDisplay from '../../components/ToneDisplay';
import Wire from '../../components/PadPlacement/wire';
import DraggablePad from '../../components/PadPlacement/draggablePad';
import { targets, padSizes } from '../../components/PadPlacement/padConfig';
import { useLiveAEDClientContext } from '../../context/LiveAEDClientContext';
import { useTcpServerContext } from '../../context/TcpServerContext';

const LivePadPlacementScreen = ({ goLiveSession }) => {
  const {
    steps,
    stepIndex,
    expectedAction,
    poweredOn,
    started,
    paused,
    timer,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    handleAction,
    setIsSwitchOpen,
    pauseAED,
  } = useLiveAEDClientContext();

  const attachHandledRef = useRef(false);
  const { sendMessage } = useTcpServerContext();

  const handleMove = (x, y, label) => {
    setPositions(p => ({ ...p, [label]: { x, y } }));

    const { w, h } = padSizes[label];
    const padCenter = { x: x + w / 2, y: y + h / 2 };
    const targetCenter = {
      x: targets[label].x + w / 2,
      y: targets[label].y + h / 2,
    };

    const distance = Math.hypot(
      padCenter.x - targetCenter.x,
      padCenter.y - targetCenter.y,
    );

    const isPlaced = distance < 40;

    // Update local UI
    setPlacedPads(prev => ({ ...prev, [label]: isPlaced }));

    // 🔥 SEND UPDATE TO INSTRUCTOR IN REAL TIME
    sendMessage(
      JSON.stringify({
        type: 'PAD_STATUS',
        data: {
          label,
          placed: isPlaced,
          x,
          y,
        },
      }),
    );
  };

  const handleRelease = (x, y, label) => {
    const { w, h } = padSizes[label];
    const padCenter = { x: x + w / 2, y: y + h / 2 };
    const targetCenter = {
      x: targets[label].x + w / 2,
      y: targets[label].y + h / 2,
    };

    const distance = Math.hypot(
      padCenter.x - targetCenter.x,
      padCenter.y - targetCenter.y,
    );

    const isPlaced = distance < 40;

    setPlacedPads(prev => ({ ...prev, [label]: isPlaced }));
    setPositions(p => ({ ...p, [label]: { x, y } }));

    // 🔥 SEND FINAL POSITION UPDATE
    sendMessage(
      JSON.stringify({
        type: 'PAD_STATUS',
        data: {
          label,
          placed: isPlaced,
          x,
          y,
        },
      }),
    );
  };

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

    if (!allPlaced) {
      attachHandledRef.current = false;
    }
  }, [placedPads, stepIndex, steps, handleAction]);

  useEffect(() => {
    if (steps[stepIndex]?.action === 'attach') {
      if (poweredOn && started) {
        pauseAED(false);
      }
    }
  }, [stepIndex, steps]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header goBack={goLiveSession} role="student" />

        {/* Info Header */}
        <View style={styles.contentContainer}>
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <Text>Live Mode</Text>
            </View>
            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <Text style={{ color: '#ed1313ff', fontWeight: 'bold' }}>
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </Text>
              </View>
              <TouchableOpacity style={style2.wifiButton}>
                <Info color={Colors.text} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Pad placement area */}
          <View style={styles.placementContainer}>
            <Image
              source={require('../../assets/images/padplacementModel.png')}
              style={styles.bodyImage}
            />

            {/* Wires */}
            <Wire
              from={{ x: 0, y: 50 }}
              to={{
                x: positions['Pad 1'].x + padSizes['Pad 1'].w / 2,
                y: positions['Pad 1'].y + padSizes['Pad 1'].h / 2,
              }}
            />
            <Wire
              from={{ x: 0, y: 50 }}
              to={{
                x: positions['Pad 2'].x + padSizes['Pad 2'].w / 2,
                y: positions['Pad 2'].y + padSizes['Pad 2'].h / 2,
              }}
            />

            {/* Guides */}
            {Object.keys(targets).map(label => (
              <View
                key={label}
                style={[
                  styles.padGuide,
                  {
                    left: targets[label].x,
                    top: targets[label].y,
                    width: padSizes[label].w,
                    height: padSizes[label].h,
                    borderColor: placedPads[label] ? '#4CAF50' : '#F44336',
                    backgroundColor: placedPads[label]
                      ? 'rgba(76,175,80,0.1)'
                      : 'rgba(244,67,54,0.1)',
                  },
                ]}
              />
            ))}

            {/* Draggable pads */}
            {Object.keys(targets).map(label => (
              <DraggablePad
                key={label}
                label={label}
                initialX={positions[label].x}
                initialY={positions[label].y}
                targetX={targets[label].x}
                targetY={targets[label].y}
                onMove={handleMove}
                onRelease={handleRelease}
                padStyle={[
                  styles.aedPad,
                  label === 'Pad 1'
                    ? styles.padUpperRight
                    : styles.padLowerLeft,
                  placedPads[label] && styles.padCorrect,
                ]}
                padSize={padSizes[label]}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Tone */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {started && steps.length > 0 && (
          <ToneDisplay text={steps[stepIndex]?.text} />
        )}
      </View>
    </View>
  );
};

export default LivePadPlacementScreen;
