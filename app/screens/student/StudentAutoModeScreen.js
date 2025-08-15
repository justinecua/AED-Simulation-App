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
import { Timer, Wifi, Info, Hand } from 'lucide-react-native';
import ShockDisplay from '../../components/ShockDisplay';

const StudentAutoModeScreen = ({ goHomeStudent }) => {
  const {
    started,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    startAED,
    stopAED,
    nextStep,
  } = useAED();

  return (
    <View style={style.container}>
      <Header goBack={goHomeStudent} role="student" />
      {/* AED Instructions */}
      {started && steps.length > 0 && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text
            style={{
              color: Colors.text,
              fontSize: 18,
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            {steps[stepIndex]}
          </Text>
          {stepIndex < steps.length - 1 && (
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: Colors.primary,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
              onPress={nextStep}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={style.subContainer}>
        <View style={style.content}>
          <View style={style2.studentWrapper}>
            <TouchableOpacity style={style.contentText}>
              <Text>Auto Mode</Text>
            </TouchableOpacity>

            <View style={style2.studentSubWrapper}>
              <View style={style.timerIcon}>
                <Timer color={Colors.text} size={25} />
                <Text style={style.timerText}>1:58</Text>
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
            <TouchableOpacity style={style2.wifiButton}>
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
              />

              <AEDControls
                started={started}
                onPowerPress={() => (started ? stopAED() : startAED())}
              />
            </View>
          </View>
        </View>
      </View>

      {/* <ShockDisplay /> */}
    </View>
  );
};

export default StudentAutoModeScreen;
