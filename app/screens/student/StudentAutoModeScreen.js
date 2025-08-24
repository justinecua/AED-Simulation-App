import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import useAED from '../../hooks/useAED';
import { Timer, Wifi, Info, Hand, Star, Wind } from 'lucide-react-native';
import ShockDisplay from '../../components/ShockDisplay';
import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';

const StudentAutoModeScreen = ({ goHomeStudent }) => {
  const {
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    expectedAction,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    timer,
    handleAction,
  } = useAED();

  return (
    <View style={style.container}>
      <Header goBack={goHomeStudent} role="student" />

      <View style={style.subContainer}>
        <View style={style.content}>
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text>Auto Mode</Text>
              </TouchableOpacity>
            </View>
            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
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
              </View>

              <TouchableOpacity style={style2.wifiButton}>
                <Wifi color={Colors.text} size={22} />
              </TouchableOpacity>
              <TouchableOpacity style={style2.wifiButton}>
                <Info color={Colors.text} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={style2.studentWrapper2}>
            <TouchableOpacity style={style.contentText}>
              <Text>
                Status: {started ? (paused ? 'Paused' : 'ON') : 'OFF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style2.wifiButton}
              onPress={() => handleAction('remove')}
            >
              <Hand color={Colors.text} size={22} />
            </TouchableOpacity>
          </View>

          <View style={style.contentCenter}>
            <View style={aedStyle.aedBox}>
              <AEDWaveform
                started={started}
                currentRhythm={currentRhythm}
                waveform={waveform}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                expectedAction={expectedAction}
              />
              <AEDControls
                started={started}
                onPowerPress={() => handleAction('power')}
                onShockPress={() => handleAction('shock')}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ModeControls
            started={started}
            paused={paused}
            onPowerPress={() => {
              if (!started) {
                startAED();
              } else if (paused) {
                resumeAED();
              } else if (expectedAction === 'power') {
                nextStep();
              }
            }}
            onPausePress={pauseAED}
            onStopPress={stopAED}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {started && steps.length > 0 && (
          <ToneDisplay text={steps[stepIndex]?.text} />
        )}
      </View>
      {/* <ShockDisplay /> */}
    </View>
  );
};

export default StudentAutoModeScreen;
