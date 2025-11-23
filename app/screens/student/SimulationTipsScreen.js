import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import Header from '../../components/Header';
import styles from '../../styles/StudentSimulationTipsStyle';
import style from '../../styles/InstructorTestScenarioStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';

import AEDWaveform from '../../components/AEDWaveform';
import aedStyle from '../../styles/aedBoxStyle';
import AEDControls from '../../components/AEDControls';
import { useAEDContext } from '../../context/AEDContext';
import ShockDisplay from '../../components/ShockDisplay';
import RhythmButton from '../../components/RhythmButton';
import ToneDisplay from '../../components/ToneDisplay';

import {
  Activity,
  Info,
  Timer,
  Wifi,
  Hand,
  ArrowRightLeft,
} from 'lucide-react-native';

const SimulationTipsScreen = ({
  goHomeStudent,
  goApplyPads,
  sessionType = 'Simulation',
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
    changeRhythm,
  } = useAEDContext();

  const displayTop = true;
  const [activeTab, setActiveTab] = useState('Rhythms');

  const currentSequenceStep = steps[stepIndex];
  const isShockStep =
    currentSequenceStep?.text.startsWith('Shock advised') ||
    currentSequenceStep?.text.startsWith('No shock advised');

  const options = ['Rhythms', 'AED Steps', 'Pad Placement'];
  const rhythmChoices = ['VFib', 'VTach', 'Asystole', 'Sinus'];

  const aedSteps = ['Power', 'Pads', 'Analyze', 'Shock / No Shock'];
  const aedStepActions = {
    Power: ['power'],
    Pads: ['remove', 'open', 'attach'],
    Analyze: ['analyze'],
  };

  const stepTipsMap = {
    power: 'Turn on the AED to start',
    remove: "Expose the patient's chest & attach pads",
    open: "Expose the patient's chest & attach pads",
    attach: "Expose the patient's chest & attach pads",
    analyze: 'Stand clear, AED will analyze',
    shock: 'Shock if advised, follow prompts',
    auto: 'Follow AED prompts',
  };

  const [activeTip, setActiveTip] = useState('Turn on the AED to start');

  useEffect(() => {
    let timeoutId;

    if (activeTab === 'AED Steps') {
      // Stop before starting fresh (only when switching to AED Steps tab)
      stopAED();

      timeoutId = setTimeout(() => {
        startAED(); // Start fresh once
      }, 300);
    } else {
      // When leaving AED Steps tab
      setActiveTip('');
      stopAED();
    }

    return () => clearTimeout(timeoutId);
  }, [activeTab]);

  useEffect(() => {
    if (
      activeTab === 'AED Steps' &&
      steps.length > 0 &&
      stepIndex < steps.length
    ) {
      const currentAction = steps[stepIndex]?.action;
      const newTip = stepTipsMap[currentAction] || 'Follow AED prompts';
      setActiveTip(newTip);
    }
  }, [stepIndex, activeTab, steps]);

  return (
    <ScrollView style={styles.container}>
      <Header goBack={goHomeStudent} role="student" />

      <View style={styles.main}>
        <View style={styles.mainHead}>
          <View>
            {activeTab !== 'AED Steps' && (
              <TouchableOpacity style={styles.screenTitle}>
                <Text style={styles.titleText}>{sessionType} Tips</Text>
              </TouchableOpacity>
            )}
          </View>
          {activeTab === 'AED Steps' && <View style={{ flex: 1 }} />}
          <View style={{ flexShrink: 1 }}>
            <View style={styles.tipContainer}>
              {activeTab === 'AED Steps' && (
                <>
                  <View style={styles.tip}>
                    <View style={styles.tipArrow} />
                    {!steps || steps.length === 0 || !steps[stepIndex] ? (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 5,
                        }}
                      >
                        <ActivityIndicator size="small" color={Colors.button} />
                      </View>
                    ) : (
                      <Text style={styles.tipText}>{activeTip}</Text>
                    )}
                  </View>
                  <TouchableOpacity style={styles.info}>
                    <Info color={Colors.text} size={22} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View>
              <View
                style={[
                  style2.studentSubWrapper,
                  {
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  },
                ]}
              >
                {activeTab === 'Rhythms' && (
                  <>
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
                  </>
                )}
              </View>
              <View
                style={[style2.studentWrapper2, { justifyContent: 'flex-end' }]}
              >
                {activeTab !== 'Pad Placement' && (
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
                        steps[stepIndex]?.action !== 'remove' && {
                          opacity: 0.5,
                        },
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
                )}
              </View>
            </View>
          </View>
        </View>

        {activeTab !== 'Pad Placement' &&
          (isShockStep ? (
            <ShockDisplay
              displayTop={displayTop}
              shockText={currentSequenceStep?.text.replace(
                /\s*\(.*?\)\s*/g,
                '',
              )} // removes parentheses
            />
          ) : (
            started &&
            steps.length > 0 && (
              <ToneDisplay
                displayTop={displayTop}
                text={steps[stepIndex]?.text}
              />
            )
          ))}

        <View style={styles.centerContent}>
          {activeTab === 'Pad Placement' ? (
            <Image
              source={require('../../assets/images/pad_placement.png')}
              style={styles.bodyImage}
            />
          ) : (
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
          )}
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.menuContainer}>
            {options.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.option, activeTab === opt && styles.active]}
                onPress={() => setActiveTab(opt)}
              >
                <Text
                  style={[
                    styles.optionText,
                    activeTab === opt && styles.activeText,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.choicesContainer}>
            {activeTab === 'Rhythms' &&
              rhythmChoices.map(opt => (
                <RhythmButton
                  key={opt}
                  label={opt}
                  Icon={Activity}
                  fontSize={9}
                  onPress={() => changeRhythm(opt)}
                />
              ))}

            {activeTab === 'AED Steps' && (
              <>
                {!steps || steps.length === 0 || !steps[stepIndex] ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 5,
                    }}
                  >
                    <ActivityIndicator size="large" color={Colors.button} />
                  </View>
                ) : (
                  aedSteps.map((label, index) => {
                    const stepNumber = index + 1;
                    const currentStepObj = steps[stepIndex];
                    const { action, text } = currentStepObj;

                    let isActive = false;
                    switch (label) {
                      case 'Pads':
                        isActive = ['remove', 'open', 'attach'].includes(
                          action?.toLowerCase(),
                        );
                        break;
                      case 'Shock / No Shock':
                        isActive =
                          action === 'shock' ||
                          text?.toLowerCase().includes('shock advised') ||
                          text?.toLowerCase().includes('no shock advised');
                        break;
                      default:
                        isActive =
                          action &&
                          aedStepActions[label]?.includes(action.toLowerCase());
                    }

                    return (
                      <View
                        key={label}
                        style={[
                          styles.stepGroup,
                          isActive && styles.activeStep,
                        ]}
                      >
                        <View
                          style={[styles.step, isActive && styles.currentStep]}
                        >
                          <Text
                            style={[
                              styles.stepText,
                              isActive && styles.currentStep,
                            ]}
                          >
                            {stepNumber}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.stepText,
                            isActive && styles.currentLabelText,
                          ]}
                        >
                          {label}
                        </Text>
                      </View>
                    );
                  })
                )}
              </>
            )}

            {activeTab === 'Pad Placement' && (
              <Text style={styles.placementText}>
                Place one pad on the upper right chest below the collarbone, and
                the other on the lower left chest below the armpit. Ensure firm
                skin contact without overlap.
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SimulationTipsScreen;
