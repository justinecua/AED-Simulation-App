import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../constants/colors';
import {
  ChevronLeft,
  User,
  Play,
  Square,
  Pause,
  Hand,
  Zap,
  Activity,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

const InstructorLiveSessionScreen = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [values, setValues] = useState({});

  const prompts = [
    'Initial Response',
    'Pad Application',
    'Analysis',
    'Shock Delivery',
    'CPR Guidance',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.returnButton}>
          <ChevronLeft
            color={Colors.button}
            size={Dimensions.get('window').width * 0.065}
          />
        </View>
        <View style={styles.rightBox}>
          <View style={styles.userCircle}>
            <User color="#fff" size={Dimensions.get('window').width * 0.075} />
          </View>
          <View style={styles.userTypeBox}>
            <Text style={styles.userType}>Instructor</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Student's Response</Text>
          <Text style={styles.student}>Connected to Student #</Text>
        </View>
        <View style={styles.responseBox}>
          <Text style={styles.response}>Student # Response</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Session Flow Controls:</Text>
        </View>
        <View style={styles.sessionFlowControls}>
          <View style={styles.controlRow}>
            <View style={styles.controlBox}>
              <View style={styles.controlIcon}>
                <Play
                  color={Colors.subText}
                  size={Dimensions.get('window').width * 0.05}
                />
              </View>
              <Text style={styles.controlLabel}>Start Simulation</Text>
            </View>

            <View style={styles.controlBox}>
              <View style={styles.controlIcon}>
                <Square
                  color={Colors.subText}
                  size={Dimensions.get('window').width * 0.05}
                />
              </View>
              <Text style={styles.controlLabel}>Stop Simulation</Text>
            </View>

            <View style={styles.controlBox}>
              <View style={styles.controlIcon}>
                <Pause
                  color={Colors.subText}
                  size={Dimensions.get('window').width * 0.05}
                />
              </View>
              <Text style={styles.controlLabel}>Pause Simulation</Text>
            </View>

            <View style={styles.controlBox}>
              <View style={styles.controlIcon}>
                <Hand
                  color={Colors.subText}
                  size={Dimensions.get('window').width * 0.05}
                />
              </View>
              <Text style={styles.controlLabel}>Pads Advised</Text>
            </View>

            <View style={styles.controlBox}>
              <View style={styles.controlIcon}>
                <Zap
                  color={Colors.subText}
                  size={Dimensions.get('window').width * 0.05}
                />
              </View>
              <Text style={styles.controlLabel}>Shock Advised</Text>
            </View>

            <View style={styles.controlBox}>
              <View style={styles.controlIcon}>
                <Zap
                  color={Colors.subText}
                  size={Dimensions.get('window').width * 0.05}
                />
              </View>
              <Text style={styles.controlLabel}>No Shock Advised</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Rhythms:</Text>
        </View>
        <View style={styles.rhythmContainer}>
          <View style={styles.rhythmBox}>
            <View style={styles.controlIcon}>
              <Activity
                color={Colors.subText}
                size={Dimensions.get('window').width * 0.05}
              />
            </View>
            <Text style={styles.controlLabel}>Normal Sinus</Text>
          </View>
          <View style={styles.rhythmBox}>
            <View style={styles.controlIcon}>
              <Activity
                color={Colors.subText}
                size={Dimensions.get('window').width * 0.05}
              />
            </View>
            <Text style={styles.controlLabel}>Ventricular Fibrillation</Text>
          </View>
          <View style={styles.rhythmBox}>
            <View style={styles.controlIcon}>
              <Activity
                color={Colors.subText}
                size={Dimensions.get('window').width * 0.05}
              />
            </View>
            <Text style={styles.controlLabel}>Rhythm 3</Text>
          </View>
          <View style={styles.rhythmBox}>
            <View style={styles.controlIcon}>
              <Activity
                color={Colors.subText}
                size={Dimensions.get('window').width * 0.05}
              />
            </View>
            <Text style={styles.controlLabel}>Rhythm 4</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.mainTitle}>Audio Prompts:</Text>
        </View>
        <View style={styles.promptContainer}>
          {prompts.map((label, index) => (
            <View key={label} style={styles.dropdownContainer}>
              <DropDownPicker
                open={openIndex === index}
                value={values[index]}
                items={[
                  { label: `${label} Prompt 1`, value: '1' },
                  { label: `${label} Prompt 2`, value: '2' },
                ]}
                setOpen={() => setOpenIndex(index === openIndex ? null : index)}
                setValue={val => setValues(prev => ({ ...prev, [index]: val }))}
                setItems={() => {}}
                placeholder={label}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownMenu}
                textStyle={styles.dropdownText}
                ArrowDownIconComponent={() => (
                  <ChevronDown size={20} color="#fff" />
                )}
                ArrowUpIconComponent={() => (
                  <ChevronUp size={20} color="#fff" />
                )}
                zIndex={5000 - index}
                zIndexInverse={1000 + index}
                dropDownDirection="BOTTOM"
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    gap: 20,
    paddingBottom: 80,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  returnButton: {
    backgroundColor: Colors.color2,
    padding: 10,
    borderRadius: 50,
  },

  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  userCircle: {
    backgroundColor: Colors.rhythmBackground,
    padding: 10,
    borderRadius: 50,
  },

  userTypeBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: Colors.subText,
  },

  userType: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.rhythmBackground,
  },

  section: {
    padding: 8,
    width: '100%',
    gap: 10,
  },

  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mainTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },

  student: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.text,
  },

  responseBox: {
    padding: 20,
    backgroundColor: Colors.subText,
    borderRadius: 10,
  },

  response: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: Colors.text,
    fontSize: 12,
  },

  sessionFlowControls: {
    width: '100%',
    paddingHorizontal: 10,
    flexWrap: 'wrap', // allow wrapping across rows
    flexDirection: 'row',
    justifyContent: 'center',
  },

  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  controlBox: {
    padding: 10,
    borderRadius: 10,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#fff', // Required for shadow to be visible

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  controlIcon: {
    padding: 6,
    backgroundColor: Colors.button,
    borderRadius: 50,
  },

  controlLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    flexShrink: 1,
    flexWrap: 'wrap',
    color: Colors.text,
  },

  rhythmContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },

  rhythmBox: {
    padding: 12,
    borderRadius: 10,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff', // Required for shadow to be visible

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  promptContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  dropdownContainer: {
    width: '45%',
  },

  dropdown: {
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 10,
  },

  dropdownMenu: {
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
  },

  dropdownText: {
    color: Colors.subText,
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    textAlign: 'center',
  },
});

export default InstructorLiveSessionScreen;
