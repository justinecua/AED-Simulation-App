import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import style from '../styles/InstructorTestScenarioStyle';

const HEIGHT = 150;

const AEDWaveform = ({ started, currentRhythm, waveform, strokeColors }) => {
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

  return (
    <View style={style.aedScreen}>
      <View style={style.aedScreenDetails}>
        <View style={style.hrBox}>
          <Text style={style.hrLabel}>HR / </Text>
          <Text style={style.hrValue}>
            {started && currentRhythm ? currentRhythm.bpm : 'N/A'}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '70%',
        }}
      >
        {started && currentRhythm ? (
          <Svg height={HEIGHT} width="100%">
            <Path
              d={getSmoothPath(
                waveform.map((point, i) => ({
                  x: i * (point.spacing || 3),
                  y: HEIGHT / 2 - point.value * 50,
                })),
              )}
              fill="none"
              stroke={strokeColors[currentRhythm.name]}
              strokeWidth="3"
            />
          </Svg>
        ) : (
          <Text style={{ color: '#fff' }}>Click Power Button to Turn On</Text>
        )}
      </View>
    </View>
  );
};

export default AEDWaveform;
