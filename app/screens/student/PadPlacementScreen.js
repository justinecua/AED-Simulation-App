import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Info, Timer, Wifi } from 'lucide-react-native';
import { useAEDContext } from '../../context/AEDContext';
import Colors from '../../constants/colors';

import style from '../../styles/InstructorTestScenarioStyle';
import styles from '../../styles/PadPlacementStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Header from '../../components/Header';
import ModeControls from '../../components/ModeControl';

const PadPlacementScreen = ({ goStudentAutoMode }) => {
  const {
    timer,
    steps,
    stepIndex,
    started,
    paused,
    expectedAction,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    setIsSwitchOpen,
  } = useAEDContext();

  return (
    <View style={{ flex: 1 }}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Header goBack={goStudentAutoMode} role="student" />

        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
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
                  <Info color={Colors.text} size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Pad placement section */}
          <View style={styles.placementContainer}>
            <View style={styles.instructionBox}>
              <Text style={styles.instruction}>
                DRAG THE PADS ON THE CORRECT POSITION
              </Text>
            </View>
            <View style={styles.bodyContainer}>
              <Image
                source={require('../../assets/images/padplacementModel.png')}
                style={styles.bodyImage}
              />
            </View>
            <View style={styles.padsContainer}>
              <View style={styles.verticalPad}>
                <Text style={styles.pad}>Pad 1</Text>
              </View>
              <View style={styles.horizontalPad}>
                <Text style={styles.pad}>Pad 2</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating ModeControls */}
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
            if (!started) {
              startAED();
            } else if (paused) {
              resumeAED();
            } else if (expectedAction === 'power') {
              nextStep();
            }
          }}
          onPausePress={pauseAED}
          onStopPress={() => {
            stopAED();
            setIsSwitchOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default PadPlacementScreen;
