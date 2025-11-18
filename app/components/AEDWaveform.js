import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import aedStyle from '../styles/aedBoxStyle';

const HEIGHT = 150;

const AEDWaveform = ({
  stepIndex,
  started,
  paused,
  currentRhythm,
  waveform,
  strokeColors,
  expectedAction,
  steps,
  displayText,
}) => {
  function getSmoothPath(points) {
    if (points.length < 2) return '';

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const xc = (current.x + next.x) / 2;
      const yc = (current.y + next.y) / 2;
      d += ` Q ${current.x} ${current.y}, ${xc} ${yc}`;
    }
    return d;
  }

  const currentStep = steps[stepIndex];
  const isShowingWaveform =
    started &&
    currentRhythm &&
    (currentStep?.action === 'show' ||
      steps[stepIndex - 1]?.action === 'analyze' ||
      (stepIndex > 0 &&
        steps.some((s, i) => i < stepIndex && s.action === 'analyze')));
  const shouldShowText = !isShowingWaveform;

  return (
    <View style={aedStyle.aedScreenContainer}>
      <View style={aedStyle.aedScreenDetails}>
        <View style={aedStyle.hrBox}>
          <Text style={aedStyle.hrLabel}>HR </Text>
          <Text style={aedStyle.hrValue}>
            {started && currentRhythm ? currentRhythm.bpm : 'N/A'}
          </Text>
        </View>
      </View>

      <View style={aedStyle.aedScreen}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {/* AED OFF */}
          {!started && (
            <Text
              style={{
                color: 'rgba(211, 214, 241, 1)',
                fontSize: 13,
              }}
            >
              AED OFF
            </Text>
          )}

          {/* {started && steps[stepIndex]?.action === 'power' && (
            <Text style={{ color: 'rgba(211, 214, 241, 1)', fontSize: 13 }}>
    
            </Text>
          )} */}

          {/* Analyzing phase */}
          {/* {started && steps[stepIndex]?.action === 'analyze' && (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Analyzing rhythm...
              </Text>
              <Text style={{ color: '#0f0', fontSize: 20 }}>•••</Text>
            </View>
          )} */}

          {/* Waveform only AFTER analysis */}

          {isShowingWaveform && (
            <Svg height={HEIGHT} width="100%">
              <Path
                d={getSmoothPath(
                  waveform.map((point, i) => ({
                    x: i * (point.spacing || 3),
                    y: HEIGHT / 2 - point.value * 50,
                  })),
                )}
                fill="none"
                stroke={strokeColors[currentRhythm?.name]}
                strokeWidth="3"
              />
            </Svg>
          )}

          {shouldShowText && displayText && (
            <Text style={{ color: '#fff', fontSize: 13, fontWeight: '400' }}>
              {displayText}
            </Text>
          )}
          {/* Debug: Show current action */}
          {/* {__DEV__ && started && (
            <Text style={{ color: '#f4f9f4ff', fontSize: 12 }}>
              Action: {currentStep?.action}
            </Text>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default AEDWaveform;
