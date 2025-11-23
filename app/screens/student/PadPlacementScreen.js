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

const PadPlacementScreen = ({ goStudentAutoMode }) => {
  const {
    started,
    paused,
    steps,
    stepIndex,
    setStepIndex,
    expectedAction,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    prevStep,
    timer,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    handleAction,
  } = useAEDContext();
  const attachHandledRef = useRef(false);
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

    setPlacedPads(prev => ({ ...prev, [label]: distance < 40 }));
  };

  const handleRelease = (x, y, label, snapped) => {
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

    setPlacedPads(prev => ({ ...prev, [label]: distance < 40 }));
    setPositions(p => ({ ...p, [label]: { x, y } }));
  };

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
    if (!allPlaced) {
      attachHandledRef.current = false;
    }
  }, [placedPads, stepIndex, steps, handleAction]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header goBack={goStudentAutoMode} role="student" />

        {/* Info Header */}
        <View style={styles.contentContainer}>
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
                    color: '#ed1313ff',
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
            <View style={styles.bodyContainer}>
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
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'rgba(244, 67, 54, 0.1)',
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
        </View>
      </ScrollView>

      {/* Tone Display */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {started && steps.length > 0 && (
          <ToneDisplay text={steps[stepIndex]?.text} />
        )}
      </View>

      {/* Floating controls */}
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
            setPlacedPads({
              'Pad 1': false,
              'Pad 2': false,
            });
          }}
        />
      </View>
    </View>
  );
};

export default PadPlacementScreen;
