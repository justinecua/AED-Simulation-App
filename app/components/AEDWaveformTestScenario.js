import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import aedStyle from '../styles/aedBoxStyle';

const HEIGHT = 150;

const AEDWaveformTestScenario = ({
  stepIndex = 0,
  started,
  poweredOn,
  paused,
  currentRhythm,
  waveform,
  strokeColors,
  expectedAction,
  steps = [],
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
          {/* --- AED OFF (initial) --- */}
          {!poweredOn && !started && (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#d3d6f1', fontSize: 13 }}>AED OFF</Text>
            </View>
          )}

          {/* --- Instructor started, but AED still OFF --- */}
          {!poweredOn && started && (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 13 }}>Turn on AED</Text>
            </View>
          )}

          {/* --- AED ON, show step text until waveform displays --- */}
          {poweredOn && started && !isShowingWaveform && displayText && (
            <Text style={{ color: '#fff', fontSize: 13 }}>{displayText}</Text>
          )}

          {/* --- Waveform --- */}
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
        </View>
      </View>
    </View>
  );
};

export default AEDWaveformTestScenario;
