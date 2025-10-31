import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

import Header from '../../components/Header';
import styles from '../../styles/StudentSimulationTipsStyle';
import Colors from '../../constants/colors';

import AEDWaveform from '../../components/AEDWaveform';
import aedStyle from '../../styles/aedBoxStyle';
import AEDControls from '../../components/AEDControls';
import useAED from '../../hooks/useAED';
import ShockDisplay from '../../components/ShockDisplay';
import RhythmButton from '../../components/RhythmButton';
import ToneDisplay from '../../components/ToneDisplay';

import { Activity, Info } from 'lucide-react-native';

const SimulationTipsScreen = ({ goHomeStudent }) => {
  const {
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    expectedAction,
    changeRhythm,
    startAED,
    pauseAED,
    resumeAED,
    stopAED,
    nextStep,
    timer,
    handleAction,
  } = useAED();

  const displayTop = true;
  const [activeTab, setActiveTab] = useState('Rhythms');

  const currentSequenceStep = steps[stepIndex];
  const isShockStep =
    currentSequenceStep?.text.startsWith('Shock advised') ||
    currentSequenceStep?.text.startsWith('No shock advised');

  const [currentStep, setCurrentStep] = useState(1);
  const stepInterval = 5000;

  const options = ['Rhythms', 'AED Steps', 'Pad Placement'];
  const rhythmChoices = ['VFib', 'VTach', 'Asystole', 'Sinus'];
  const aedSteps = ['Power', 'Pads', 'Analyze', 'Shock / No Shock'];
  const stepTips = [
    'Turn on the AED to start',
    "Expose the patient's chest & attach pads",
    'Stand clear, AED will analyze',
    'Shock if advised, follow prompts',
  ];

  useEffect(() => {
    let timeoutId;
    let intervalId;

    if (activeTab === 'AED Steps') {
      // Force reset: stop then restart AED fresh
      stopAED();

      timeoutId = setTimeout(() => {
        startAED(); // start fresh
        setCurrentStep(1);

        intervalId = setInterval(() => {
          setCurrentStep(prev =>
            prev < aedSteps.length ? prev + 1 : aedSteps.length,
          );
        }, stepInterval);
      }, 300); // small delay so stopAED finishes first
    } else {
      // Cleanup when leaving tab
      setCurrentStep(0);
      stopAED();
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [activeTab]);

  return (
    <ScrollView style={styles.container}>
      <Header goBack={goHomeStudent} role="student" />

      <View style={styles.main}>
        <View style={styles.mainHead}>
          <View style={{ minWidth: 1 }}>
            {!started && activeTab !== 'AED Steps' && (
              <TouchableOpacity style={styles.screenTitle}>
                <Text style={styles.titleText}>Simulation Tips</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.tipContainer}>
            {activeTab === 'AED Steps' && (
              <View style={styles.tip}>
                <View style={styles.tipArrow} />
                <Text style={styles.tipText}>
                  {' '}
                  {stepTips[currentStep - 1] || 'Follow AED prompts'}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.info}>
              <Info color={Colors.text} size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {activeTab !== 'Pad Placement' &&
          (isShockStep ? (
            <ShockDisplay
              displayTop={displayTop}
              shockText={currentSequenceStep.text.replace(/\s*\(.*?\)\s*/g, '')} // removes parentheses
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
              />
              <AEDControls
                started={started}
                onPowerPress={() => handleAction('power')}
                onShockPress={() => handleAction('remove')}
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
                  fontSize={10}
                  onPress={() => changeRhythm(opt)}
                />
              ))}

            {activeTab === 'AED Steps' &&
              aedSteps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                return (
                  <View
                    key={label}
                    style={[styles.stepGroup, isActive && styles.activeStep]}
                  >
                    <View style={[styles.step, isActive && styles.currentStep]}>
                      <Text
                        style={[
                          styles.stepText,
                          isActive && styles.currentStep,
                        ]}
                      >
                        {stepNumber}
                      </Text>
                    </View>
                    <Text style={styles.stepText}>{label}</Text>
                  </View>
                );
              })}

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
