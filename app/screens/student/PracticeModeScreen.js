import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
// COMPONENTS
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import AEDWaveform from '../../components/AEDWaveform';
import AEDControls from '../../components/AEDControls';
import aedStyle from '../../styles/aedBoxStyle';
import useAED from '../../hooks/useAED';
// IMPORTS
import { Picker } from '@react-native-picker/picker';
import {
  ArrowLeft,
  ArrowRight,
  X,
  Square,
  Pause,
  Timer,
} from 'lucide-react-native';

const PracticeModeScreen = ({ goHomeStudent }) => {
  const [rhythm, setRhythm] = useState('Sinus');
  const [localStepIndex, setLocalStepIndex] = useState(0);

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
    stopAED,
    pauseAED,
    resumeAED,
    shockAED,
    changeRhythm,
    timer, // <-- added timer
  } = useAED();

  const handlePowerPress = () => {
    if (!started) {
      startAED(rhythm);
      setLocalStepIndex(0);
    } else {
      stopAED();
      setLocalStepIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <View style={{ marginTop: 12 }}>
        <Header />
      </View>

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

        {/* PICKER */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.pickerTitle}>Patient Rhythm:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rhythm}
              onValueChange={val => {
                setRhythm(val);
                changeRhythm(val);
                setLocalStepIndex(0);
              }}
              style={{ height: 55, color: !started ? 'gray' : '#000' }}
              enabled={started}
            >
              <Picker.Item label="Sinus" value="Sinus" />
              <Picker.Item label="V-Fib" value="VFib" />
              <Picker.Item label="V-Tach" value="VTach" />
              <Picker.Item label="Asystole" value="Asystole" />
            </Picker>
          </View>
        </View>

        {/* AED */}
        <View style={styles.contentCenter}>
          <View style={aedStyle.aedBox}>
            <AEDWaveform
              started={started}
              paused={paused}
              currentRhythm={currentRhythm}
              waveform={waveform}
              strokeColors={strokeColors}
              steps={steps}
              stepIndex={localStepIndex}
              expectedAction={expectedAction}
            />
            <AEDControls
              started={started}
              onShockPress={shockAED}
              onPowerPress={handlePowerPress}
            />
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.wrapperButton}>
          <TouchableOpacity style={styles.controlBtn}>
            <View style={styles.iconBox}>
              <Pause color="white" size={16} />
            </View>
            <Text
              style={styles.controlText}
              onPress={() => (paused ? resumeAED() : pauseAED())}
            >
              Pause
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, { flex: 1 }]}
            onPress={stopAED}
          >
            <View style={styles.iconBox}>
              <Square color="white" size={16} />
            </View>
            <Text style={styles.controlText}>Stop</Text>
          </TouchableOpacity>
        </View>

        {/* Back / Next */}
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setLocalStepIndex(prev => Math.max(prev - 1, 0))}
          >
            <View style={styles.iconBox}>
              <ArrowLeft color="white" size={16} />
            </View>
            <Text style={styles.controlText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, { flex: 1 }]}
            onPress={() => setLocalStepIndex(prev => prev + 1)}
          >
            <View style={styles.iconBox}>
              <ArrowRight color="white" size={16} />
            </View>
            <Text style={styles.controlText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Close */}
        <View style={{ marginTop: 6, flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => {
              if (goHomeStudent) goHomeStudent();
            }}
          >
            <View style={styles.iconBox}>
              <X color="white" size={16} />
            </View>
            <Text style={styles.controlText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PracticeModeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: Colors.background,
    position: 'relative',
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
  contentCenter: {
    marginTop: 16,
    alignItems: 'center',
  },
  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  wrapperButton: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  iconBox: {
    backgroundColor: '#333',
    padding: 6,
    borderRadius: 6,
  },
});
