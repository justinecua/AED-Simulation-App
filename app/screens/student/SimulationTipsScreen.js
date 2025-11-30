import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import {
  Info,
  Hand,
  ArrowRightLeft,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from 'lucide-react-native';

import Header from '../../components/Header';
import style from '../../styles/InstructorTestScenarioStyle';
import styles from '../../styles/StudentSimulationTipsStyle';
import style2 from '../../styles/StudentAutoModeStyle';
import Colors from '../../constants/colors';
import aedStyle from '../../styles/aedBoxStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AEDWaveformAutoMode from '../../components/AEDWaveformAutoMode';
import AEDControls from '../../components/AEDControls';

const RHYTHMS = [
  {
    label: 'VFib',
    full: 'Ventricular Fibrillation',
    desc: 'Chaotic electrical activity. No pulse. Shockable rhythm.',
  },
  {
    label: 'VTach',
    full: 'Ventricular Tachycardia',
    desc: 'Fast, wide heartbeat. Usually pulseless. Shockable rhythm.',
  },
  {
    label: 'Asystole',
    full: 'Asystole (Flatline)',
    desc: 'No electrical activity. Not shockable.',
  },
  {
    label: 'Sinus',
    full: 'Normal Sinus Rhythm',
    desc: 'Normal organized electrical activity with pulse.',
  },
];

const TUTORIAL_STEPS = [
  {
    label: 'Turn on AED',
    target: 'power',
    tip: 'Turn on the AED to start the process.',
  },
  {
    label: 'Remove clothing',
    target: 'remove',
    tip: 'Expose the chest so pads can stick firmly.',
  },
  {
    label: 'Open pad package',
    target: 'open',
    tip: 'Open the pad package completely.',
  },

  {
    label: 'Analyzing rhythm…',
    target: null,
    tip: 'The AED checks the heart rhythm.',
  },

  {
    label: 'Shock if advised',
    target: 'shock',
    tip: 'Press the shock button when the AED instructs.',
  },
];

const getStepLabel = (label, tutorial) => {
  if (label === 'Power' && tutorial.label === 'Turn on AED') {
    return 'AED Off';
  }
  return label;
};

const AED_STEP_LABELS = [
  'Power',
  'Pad Placement',
  'Analyze Rhythm',
  'Shock / No Shock',
];

const arrowStyle = {
  power: { position: 'absolute', bottom: 50, left: 15 },
  remove: { position: 'absolute', top: -125, right: 30 },
  open: { position: 'absolute', top: -125, right: 25 },
  pads: { position: 'absolute', top: 140, right: 60 },
  analyze: { position: 'absolute', top: 110, left: '50%', marginLeft: -20 },
  shock: { position: 'absolute', bottom: 50, right: 15 },
};

const getArrowIcon = target => {
  switch (target) {
    case 'remove':
    case 'open':
      return <ArrowRight size={50} strokeWidth={2.5} color="#97cf8a" />;

    default:
      return <ArrowDown size={50} strokeWidth={2.5} color="#97cf8a" />;
  }
};

const aedStepActions = {
  Power: ['power'],
  'Pad Placement': ['remove', 'open', 'attach'],
  'Analyze Rhythm': ['analyze'],
  'Shock / No Shock': ['shock'],
  CPR: ['cpr', 'push', 'resume', 'stop'],
};

const isActiveAEDStep = (label, tutorial) => {
  const action = tutorial.target?.toLowerCase();
  const text = tutorial.label?.toLowerCase();

  switch (label) {
    case 'Power':
      return action === 'power';
    case 'Pad Placement':
      return ['remove', 'open', 'attach'].includes(action);
    case 'Analyze Rhythm':
      return action === 'analyze' || text?.includes('analyzing');

    case 'Shock / No Shock':
      return (
        action === 'shock' ||
        text?.includes('shock advised') ||
        text?.includes('no shock advised')
      );
    default:
      return false;
  }
};

const SimulationTipsScreen = ({ goHomeStudent }) => {
  const [activeTab, setActiveTab] = useState('AED Steps');
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [hiddenTimer, setHiddenTimer] = useState(0);

  const tutorial = TUTORIAL_STEPS[tutorialIndex];
  const sessionStartRef = useRef(new Date().toISOString());

  const saveSimulationTipsSession = async () => {
    try {
      const endTime = new Date().toISOString();

      const newSession = {
        type: 'Simulation Tips',
        startTime: sessionStartRef.current,
        endTime,
        totalTime: hiddenTimer,
        step: tutorial.label,
        tutorialIndex,
      };

      const existing = await AsyncStorage.getItem('aed_sessions_student');
      let sessions = existing ? JSON.parse(existing) : [];

      sessions.unshift(newSession);

      await AsyncStorage.setItem(
        'aed_sessions_student',
        JSON.stringify(sessions),
      );
      console.log('Simulation Tips saved');
    } catch (e) {
      console.log('Error saving session', e);
    }
  };

  const nextStep = () =>
    tutorialIndex < TUTORIAL_STEPS.length - 1 &&
    setTutorialIndex(tutorialIndex + 1);

  const prevStep = () =>
    tutorialIndex > 0 && setTutorialIndex(tutorialIndex - 1);

  const restartSteps = () => setTutorialIndex(0);
  // 🔹 Auto-run hidden timer
  useEffect(() => {
    const interval = setInterval(() => {
      setHiddenTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header
        goBack={async () => {
          await saveSimulationTipsSession();
          goHomeStudent();
        }}
        role="student"
      />

      <View style={styles.main}>
        {/* TITLE */}
        <View style={style2.studentWrapper}>
          <View style={style2.studentSubWrapper}>
            <TouchableOpacity style={style.contentText}>
              <Text>Simulation Tips</Text>
            </TouchableOpacity>
          </View>

          {/* BUTTONS RIGHT */}
          <View style={style2.studentSubWrapper}>
            <TouchableOpacity
              style={[
                style2.handButton,
                tutorial.target !== 'remove' && { opacity: 0.3 },
              ]}
              disabled={true}
            >
              <Hand color={Colors.text} size={22} />
            </TouchableOpacity>

            {tutorial.target === 'open' && (
              <TouchableOpacity
                style={[style2.padPackageButton]}
                disabled={true}
              >
                <ArrowRightLeft color="#fff" size={22} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* TIP BUBBLE */}
        {activeTab === 'AED Steps' && (
          <View style={styles.tipContainer}>
            <View style={styles.tip}>
              <View style={styles.tipArrow} />
              <Text style={styles.tipText}>{tutorial.tip}</Text>
            </View>
            <Info color={Colors.text} size={22} />
          </View>
        )}

        {/* AED DISPLAY */}
        <View style={styles.centerContent}>
          {activeTab === 'Pad Placement' ? (
            <Image
              source={require('../../assets/images/pad_placement2.png')}
              style={styles.bodyImage}
            />
          ) : (
            <View style={aedStyle.aedBox}>
              <AEDWaveformAutoMode
                started={false}
                currentRhythm={'Sinus'}
                waveform={[]}
                strokeColors={{}}
                steps={[]}
                stepIndex={0}
                expectedAction=""
                displayText=""
              />

              <AEDControls
                started={true}
                disabledPower={true}
                onPowerPress={() => {}}
                onShockPress={() => {}}
                flashing={false}
              />

              {activeTab === 'AED Steps' && tutorial.target && (
                <View style={arrowStyle[tutorial.target]}>
                  {getArrowIcon(tutorial.target)}
                </View>
              )}
            </View>
          )}
        </View>

        {/* NAV BUTTONS */}
        {activeTab === 'AED Steps' && (
          <View style={customStyles.navButtons}>
            <TouchableOpacity
              style={[
                customStyles.navBtn,
                tutorialIndex === 0 && customStyles.navBtnDisabled,
              ]}
              onPress={prevStep}
              disabled={tutorialIndex === 0}
            >
              <ArrowLeft size={18} color="#555E69" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                customStyles.navBtn,
                tutorialIndex === TUTORIAL_STEPS.length - 1 &&
                  customStyles.navBtnDisabled,
              ]}
              onPress={nextStep}
              disabled={tutorialIndex === TUTORIAL_STEPS.length - 1}
            >
              <ArrowRight size={18} color="#555E69" />
            </TouchableOpacity>

            <TouchableOpacity
              style={customStyles.navBtn}
              onPress={restartSteps}
            >
              <RotateCcw size={18} color="#555E69" />
            </TouchableOpacity>
          </View>
        )}

        {/* TAB MENU */}
        <View style={styles.menuContainer}>
          {['AED Steps', 'Rhythms', 'Pad Placement'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.option, activeTab === tab && styles.active]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.optionText,
                  activeTab === tab && styles.activeText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB CONTENT */}
        <View style={styles.choicesContainer}>
          {/* AED STEPS */}
          {activeTab === 'AED Steps' && (
            <View>
              {AED_STEP_LABELS.map((label, index) => {
                const active = isActiveAEDStep(label, tutorial);

                return (
                  <View
                    key={label}
                    style={[styles.stepGroup, active && styles.activeStep]}
                  >
                    <View style={[styles.step, active && styles.currentStep]}>
                      <Text
                        style={[styles.stepText, active && styles.currentStep]}
                      >
                        {index + 1}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.stepText,
                        active && styles.currentLabelText,
                      ]}
                    >
                      {getStepLabel(label, tutorial)}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* RHYTHMS */}
          {activeTab === 'Rhythms' && (
            <View>
              {RHYTHMS.map(rhythm => (
                <View key={rhythm.label} style={customStyles.rhythmCard}>
                  <View style={customStyles.rhythmHeaderRow}>
                    <Text style={customStyles.rhythmLabel}>{rhythm.label}</Text>
                    <Text style={customStyles.rhythmFull}>{rhythm.full}</Text>
                  </View>

                  <Text style={customStyles.rhythmDesc}>{rhythm.desc}</Text>
                </View>
              ))}
            </View>
          )}

          {/* PAD PLACEMENT */}
          {activeTab === 'Pad Placement' && (
            <View style={customStyles.padCard}>
              <View style={customStyles.padTextBox}>
                <Text style={customStyles.padTitle}>Pad Placement Guide</Text>
                <Text style={customStyles.padDescription}>
                  Place one pad on the upper right chest just below the
                  collarbone. Position the second pad on the left side below the
                  armpit. Ensure both pads make firm contact with the skin.
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SimulationTipsScreen;

const customStyles = {
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  navBtnDisabled: {
    backgroundColor: '#dddddd',
    opacity: 0.5,
  },

  rhythmCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },

  rhythmHeaderRow: {
    flexDirection: 'column',
  },

  rhythmLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.button,
    marginBottom: 2,
  },

  rhythmFull: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#4b5563',
  },

  rhythmDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
    lineHeight: 18,
  },
  padCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    alignItems: 'center',
  },

  padImage: {
    width: '90%',
    height: 220,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  padTextBox: {
    width: '100%',
    paddingHorizontal: 6,
  },

  padTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.button,
    marginBottom: 6,
  },

  padDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
    textAlign: 'justify',
  },
};
