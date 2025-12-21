import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Info, Timer } from 'lucide-react-native';
import { useWindowDimensions } from 'react-native';

import Colors from '../../constants/colors';
import style from '../../styles/InstructorTestScenarioStyle';
import styles from '../../styles/PadPlacementStyle';
import style2 from '../../styles/StudentAutoModeStyle';

import Header from '../../components/Header';
import ModeControls from '../../components/ModeControl';
import ToneDisplayPractice from '../../components/ToneDisplayPractice';

import Wire from '../../components/PadPlacement/wire';
import DraggablePad from '../../components/PadPlacement/draggablePad';

import { targets, padSizes } from '../../components/PadPlacement/padConfig';
import { AEDPracticeContext } from '../../context/AEDPracticeContext';

const SNAP_RATIO = 0.06;

const PracticePadPlacementScreen = ({
  goPracticeMode,
  goPracticeApplyPads,
}) => {
  const aed = useContext(AEDPracticeContext);
  const {
    started,
    paused,
    steps,
    stepIndex,
    expectedAction,
    timer,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
    handleAction,
  } = aed;

  const { height: screenHeight } = useWindowDimensions();
  const BODY_MAX_HEIGHT = Math.min(screenHeight * 0.55, 620);

  const attachHandledRef = useRef(false);
  const [imageLayout, setImageLayout] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  /* -------------------------
     Helpers (single coord system)
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
  }, [placedPads, stepIndex]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={!isDragging}
      >
        <Header goBack={goPracticeMode} role="student" />

        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text>Practice Mode</Text>
              </TouchableOpacity>
            </View>

            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <Text
                  style={{
                    marginLeft: 4,
                    color: '#ed1313',
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
            {started && steps.length > 0 && (
              <View style={{ alignItems: 'center' }}>
                <ToneDisplayPractice text={steps[stepIndex]?.text} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PracticePadPlacementScreen;
