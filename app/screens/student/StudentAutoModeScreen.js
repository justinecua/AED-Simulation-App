import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import { useAEDContext } from '../../context/AEDContext';
import ShockDisplay from '../../components/ShockDisplay';
import ModeControls from '../../components/ModeControl';
import ToneDisplay from '../../components/ToneDisplay';
import { Timer, Wifi, Info, Hand, ArrowRightLeft } from 'lucide-react-native';

const StudentAutoModeScreen = ({
  goHomeStudent,
  goApplyPads,
  sessionType = 'Auto Mode',
}) => {
  const {
    poweredOn,
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    expectedAction,
    powerOnAED,
    powerOffAED,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    timer,
    handleAction,
    isSwitchOpen,
    setIsSwitchOpen,
    positions,
    setPositions,
    placedPads,
    setPlacedPads,
  } = useAEDContext();

  return (
    <View style={style.container}>
      <Header goBack={goHomeStudent} role="student" />

      <View style={style.subContainer}>
        <View style={style.content}>
          <View style={style2.studentWrapper}>
            <View style={style2.studentSubWrapper}>
              <TouchableOpacity style={style.contentText}>
                <Text>{sessionType}</Text>
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
            <View style={style2.studentWrapper2Sub}>
              <TouchableOpacity style={style.contentText}>
                <Text>
                  Status: {!poweredOn ? 'OFF' : paused ? 'PAUSED' : 'ON'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={style2.studentWrapper2SubRight}>
              {/* Hand only shows if package is NOT open */}
              {/* {steps[stepIndex]?.text !== 'Open pad package' &&
                !isSwitchOpen && (
                  <TouchableOpacity
                    style={style2.handButton}
                    onPress={() => {
                      handleAction('remove');
                      setIsSwitchOpen(true);
                    }}
                  >
                    <Hand color={Colors.text} size={22} />
                  </TouchableOpacity>
                )} */}

              <TouchableOpacity
                style={[
                  style2.handButton,
                  steps[stepIndex]?.action !== 'remove' && { opacity: 0.5 },
                ]}
                disabled={steps[stepIndex]?.action !== 'remove'}
                onPress={() => {
                  handleAction('remove');
                  setIsSwitchOpen(true);
                }}
              >
                <Hand color={Colors.text} size={22} />
              </TouchableOpacity>

              {/* Pad package button shows if step says open OR already open */}
              {steps[stepIndex]?.text === 'Open pad package' && (
                <TouchableOpacity
                  style={[style2.padPackageButton]}
                  onPress={() => {
                    handleAction('open');
                    if (expectedAction === 'open') {
                      setIsSwitchOpen(true);
                      goApplyPads();
                    }
                  }}
                >
                  <ArrowRightLeft color="#fff" size={22} />
                </TouchableOpacity>
              )}
            </View>
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
                displayText={
                  steps.some((s, i) => i <= stepIndex && s.action === 'analyze')
                    ? ''
                    : steps[stepIndex]?.text ?? ''
                }
              />
              <AEDControls
                started={poweredOn}
                onPowerPress={() => {
                  if (!poweredOn) {
                    powerOnAED();
                    if (expectedAction === 'power') nextStep();
                  } else {
                    powerOffAED();
                    setIsSwitchOpen(false);
                    setPositions({
                      'Pad 1': { x: 15, y: 10 },
                      'Pad 2': { x: 10, y: 75 },
                    });
                    setPlacedPads({ 'Pad 1': false, 'Pad 2': false });
                  }
                }}
                onShockPress={() => handleAction('shock')}
                flashing={
                  steps[stepIndex]?.text === 'Press flashing shock button'
                }
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
              startAED();
            }}
            onPausePress={pauseAED}
            onStopPress={() => {
              powerOffAED();
              stopAED(sessionType);
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
