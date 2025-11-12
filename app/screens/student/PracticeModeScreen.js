import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import useAED from '../../hooks/useAED';
import {
  ArrowLeft,
  ArrowRight,
  X,
  Square,
  Pause,
  Timer,
} from 'lucide-react-native';

const PracticeModeScreen = ({ goHomeStudent, goBack }) => {
  const [rhythm, setRhythm] = useState('Sinus');
  const [showRhythmPopup, setShowRhythmPopup] = useState(false);

  const {
    started,
    paused,
    currentRhythm,
    waveform,
    strokeColors,
    steps,
    stepIndex,
    setStepIndex,
    expectedAction,
    startAED,
    stopAED,
    pauseAED,
    resumeAED,
    shockAED,
    changeRhythm,
    timer,
  } = useAED();

  const handlePowerPress = () => {
    if (!started) {
      startAED(rhythm, true);
    } else {
      stopAED();
    }
  };

  const rhythms = ['Sinus', 'VFib', 'VTach', 'Asystole'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <View style={{ marginTop: 12 }}>
        <Header goHomeStudent={goHomeStudent} goBack={goBack} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.subContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Practice Mode</Text>

            {/* TIMER */}
            <View style={styles.timerIcon}>
              <Timer color={Colors.text} size={20} />
              <Text style={styles.timerText}>
                {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          </View>

          {/* RHYTHM PICKER */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.pickerTitle}>Patient Rhythm:</Text>
            <TouchableOpacity
              style={[styles.pickerContainer, { opacity: !started ? 0.5 : 1 }]}
              disabled={!started}
              onPress={() => setShowRhythmPopup(true)}
            >
              <Text style={{ padding: 15, fontSize: 15 }}>{rhythm}</Text>
            </TouchableOpacity>
          </View>

          {/* RHYTHM MODAL */}
          <Modal transparent visible={showRhythmPopup} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                {rhythms.map(r => (
                  <TouchableOpacity
                    key={r}
                    style={{ padding: 14 }}
                    onPress={() => {
                      setRhythm(r);
                      changeRhythm(r);
                      setShowRhythmPopup(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{r}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={() => setShowRhythmPopup(false)}>
                  <Text
                    style={{
                      padding: 14,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'red',
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* AED MAIN DISPLAY */}
          <View style={styles.contentCenter}>
            <View style={aedStyle.aedBox}>
              <AEDWaveform
                started={started}
                paused={paused}
                currentRhythm={currentRhythm}
                waveform={waveform}
                strokeColors={strokeColors}
                steps={steps}
                stepIndex={stepIndex}
                expectedAction={expectedAction}
              />
              <AEDControls
                started={started}
                onShockPress={shockAED}
                onPowerPress={handlePowerPress}
              />
            </View>
          </View>

          {/* SIMULATION CONTROL BUTTONS */}
          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={styles.controlCard}
              onPress={() => (paused ? resumeAED() : pauseAED())}
            >
              <View style={styles.iconCircle}>
                <Pause color="white" size={18} />
              </View>
              <Text style={styles.controlText}>Pause Simulation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlCard} onPress={stopAED}>
              <View style={styles.iconCircle}>
                <Square color="white" size={18} />
              </View>
              <Text style={styles.controlText}>Stop Simulation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlCard}
              onPress={() => setStepIndex(prev => Math.max(prev - 1, 0))}
            >
              <View style={styles.iconCircle}>
                <ArrowLeft color="white" size={18} />
              </View>
              <Text style={styles.controlText}>Back Simulation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlCard}
              onPress={() => setStepIndex(prev => prev + 1)}
            >
              <View style={styles.iconCircle}>
                <ArrowRight color="white" size={18} />
              </View>
              <Text style={styles.controlText}>Next Simulation</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.closeCardNew}
            onPress={() => {
              if (goHomeStudent) goHomeStudent();
            }}
          >
            <View style={styles.iconCircle}>
              <X color="white" size={20} />
            </View>
            <Text style={styles.closeText}>Close Simulation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PracticeModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.background,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerText: {
    color: Colors.rhythmBackground,
    backgroundColor: '#F4F6FA',
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },
  timerIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
    height: 40,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FA4C17',
    marginLeft: 5,
  },
  pickerTitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
  },
  contentCenter: {
    marginTop: 16,
    alignItems: 'center',
  },

  // --- Simulation Button Styles ---
  buttonGrid: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  closeCardNew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  closeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
    textAlign: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
