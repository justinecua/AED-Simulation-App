import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import { ChevronLeft, User } from 'lucide-react-native';

const ScenarioBuilder = () => {
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
      <View style={styles.scenarioBuilder}>
        <Text style={styles.sectionTitle}>Scenario Builder</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Scenario Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Input Scenario Name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Scenario Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Input Scenario Description"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={styles.timelineContainer}>
          <Text style={styles.label}>Timeline of Steps</Text>
          <ScrollView
            style={styles.timelineScroll}
            contentContainerStyle={styles.timelineCard}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Set rhythm to VFib</Text>
            </View>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Prompt: Apply Pads</Text>
            </View>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Wait for Event</Text>
            </View>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Prompt: Shock Advised</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Step</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Scenario</Text>
          </TouchableOpacity>
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

  scenarioBuilder: {
    width: '100%',
  },

  sectionTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.rhythmBackground,
  },

  inputContainer: {
    flexDirection: 'column',
    gap: 15,
    padding: 10,
  },

  inputBox: {
    flexDirection: 'column',
    gap: 10,
  },

  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.rhythmBackground,
  },

  input: {
    borderWidth: 0,
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#fff',

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 8,
  },

  timelineContainer: {
    gap: 15,
    padding: 10,
  },

  timelineScroll: {
    maxHeight: 400, // or any fixed height you prefer
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  timelineCard: {
    borderWidth: 0,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 15,

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  timelineBox: {
    borderWidth: 0,
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#fff',
    gap: 20,

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 5,
  },

  timelineText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.rhythmBackground,
  },

  buttonContainer: {
    flexDirection: 'column',
    gap: 15,
    padding: 10,
  },

  addButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.button,
    borderRadius: 10,
  },

  addButtonText: {
    color: Colors.button,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },

  saveButton: {
    backgroundColor: Colors.button,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.button,
    borderRadius: 10,
  },

  saveButtonText: {
    color: Colors.background,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default ScenarioBuilder;
