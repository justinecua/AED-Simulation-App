import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Info, Timer } from 'lucide-react-native';
import { useWindowDimensions } from 'react-native';
import { useTestScenario } from '../../context/TestScenarioContext';
import Colors from '../../constants/colors';
import style from '../../styles/InstructorTestScenarioStyle';
import styles from '../../styles/PadPlacementStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import { useCallback } from 'react';

import { targets, padSizes } from '../../components/PadPlacement/padConfig';

import Header from '../../components/Header';
import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';

import Wire from '../../components/PadPlacement/wire';
import DraggablePad from '../../components/PadPlacement/draggablePad';
import Sound from 'react-native-sound';
Sound.setCategory?.('Playback');

const SNAP_RATIO = 0.06;
const InstructorTestScenarioPadPlacementScreen = ({ goBack }) => {
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
  } = useTestScenario();
  const { height: screenHeight } = useWindowDimensions();
  const BODY_MAX_HEIGHT = Math.min(screenHeight * 0.55, 620);

  const attachHandledRef = useRef(false);
  const [imageLayout, setImageLayout] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    const { w, h } = getPadSizePx(label);
    const { x, y } = positions[label];
    return { x: x + w / 2, y: y + h / 2 };
  };

  /* -------------------------
       Drag logic
    -------------------------- */

  const handleMove = (x, y, label) => {
    setPositions(p => ({ ...p, [label]: { x, y } }));

    const { w, h } = getPadSizePx(label);
    const { x: tx, y: ty } = getTargetPx(label);

    const distance = Math.hypot(
      x + w / 2 - (tx + w / 2),
      y + h / 2 - (ty + h / 2),
    );

    setPlacedPads(p => ({
      ...p,
      [label]: distance < imageLayout.width * SNAP_RATIO,
    }));
  };

  const handleRelease = (x, y, label) => {
    handleMove(x, y, label);
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
  }, [placedPads, stepIndex]);

  const playedStepKeyRef = useRef(null);
  const soundRef = useRef(null);
  const genRef = useRef(0);

  const stopAndReleaseSound = useCallback(() => {
    if (soundRef.current) {
      try {
        soundRef.current.stop(() => {
          soundRef.current?.release?.();
          soundRef.current = null;
        });
      } catch (e) {
        try {
          soundRef.current?.release?.();
        } catch {}
        soundRef.current = null;
      }
    }
  }, []);

  const playAudio = useCallback(
    (file, onFinish) => {
      stopAndReleaseSound();

      if (!file) {
        onFinish?.();
        return;
      }

      const myGen = ++genRef.current;

      const sound = new Sound(file, Sound.MAIN_BUNDLE, error => {
        if (myGen !== genRef.current) return;

        if (error) {
          console.log('Sound load error:', error);
          onFinish?.();
          return;
        }

        soundRef.current = sound;

        sound.play(() => {
          if (myGen !== genRef.current) return;
          sound.release();
          if (soundRef.current === sound) soundRef.current = null;
          onFinish?.();
        });
      });
    },
    [stopAndReleaseSound],
  );

  useEffect(() => {
    if (!started) {
      playedStepKeyRef.current = null;
      genRef.current++;
      stopAndReleaseSound();
    }
  }, [started, stopAndReleaseSound]);

  useEffect(() => {
    if (!started) return;

    const step = steps?.[stepIndex];
    if (!step) return;

    const stepKey =
      step.id ??
      step.key ??
      `${stepIndex}:${step.action ?? ''}:${step.text ?? ''}`;

    if (playedStepKeyRef.current === stepKey) return;
    playedStepKeyRef.current = stepKey;

    playAudio(step.audio, () => {
      if (step.action === 'auto') nextStep();
    });
  }, [stepIndex, started, steps, playAudio, nextStep]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={!isDragging}
        bounces={false}
      >
        <Header goBack={goBack} role="instructor" />

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
            <View style={styles.bodyStage}>
              <View
                style={[styles.bodyContainer, { maxHeight: BODY_MAX_HEIGHT }]}
              >
                <Image
                  source={require('../../assets/images/padplacementModel.png')}
                  style={styles.bodyImage}
                  onLayout={e => setImageLayout(e.nativeEvent.layout)}
                />

                {imageLayout && (
                  <>
                    <Wire from={{ x: 20, y: 40 }} to={getPadCenter('Pad 1')} />
                    <Wire from={{ x: 20, y: 40 }} to={getPadCenter('Pad 2')} />
                  </>
                )}

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
            {started && steps.length > 0 && (
              <View style={{ alignItems: 'center' }}>
                <ToneDisplay text={steps[stepIndex]?.text} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

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

export default InstructorTestScenarioPadPlacementScreen;
