import React from 'react';
import { View, Text } from 'react-native';

import style from '../../styles/InstructorTestScenarioStyle';
import aedStyle from '../../styles/aedBoxStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import PlayButton from '../../components/PlayButton';
import StopButton from '../../components/StopButton';
import useAED from '../../hooks/useAED';
import ToneDisplay from '../../components/ToneDisplay';
import ShockDisplay from '../../components/ShockDisplay';

import { Timer } from 'lucide-react-native';

const InstructorTestScenarioScreen = ({ goHomeInsctructor, goHome }) => {
  const { started, currentRhythm, waveform, strokeColors, startAED, stopAED } =
    useAED();

  return (
    <View style={style.container}>
      <Header goBack={goHomeInsctructor} role="instructor" />

      <View style={style.subContainer}>
        <View style={style.content}>
          <View style={style.contentWrapper}>
            <Text style={style.contentText}>Test Scenario Mode</Text>
            <Text style={style.contentText}>Change Scenario</Text>
          </View>

          <View style={style.wrapperButton}>
            <View style={style.timerIcon}>
              <Timer color={Colors.text} size={25} />
              <Text style={style.timerText}>1:58</Text>
            </View>
            <View style={style.button}>
              <PlayButton onPress={startAED} />
              <StopButton onPress={stopAED} />
            </View>
          </View>

          {/* <ToneDisplay /> */}

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
          {/* 
          <ShockDisplay /> */}
        </View>
      </View>
    </View>
  );
};

export default InstructorTestScenarioScreen;
