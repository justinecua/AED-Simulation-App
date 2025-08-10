// app/screens/instructor/InstructorTestScenarioScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import PlayButton from '../../components/PlayButton';
import StopButton from '../../components/StopButton';
import useAED from '../../hooks/useAED';
import { Timer, Wifi, Info, Hand } from 'lucide-react-native';

const StudentAutoModeScreen = ({ goHomeStudent }) => {
  const { started, currentRhythm, waveform, strokeColors, startAED, stopAED } =
    useAED();

  return (
    <View style={style.container}>
      <Header goBack={goHomeStudent} role="student" />

      <View style={style.subContainer}>
        <View style={style.content}>
          <View style={style2.studentWrapper}>
            <View style={style.contentButton}>
              <Text style={style.contentText}>Auto Mode</Text>
            </View>

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

          <TouchableOpacity style={style2.wifiButton}>
            <Hand color={Colors.text} size={22} />
          </TouchableOpacity>
          <View style={style.contentCenter}>
            <View style={style.aedBox}>
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
    </View>
  );
};

export default StudentAutoModeScreen;
