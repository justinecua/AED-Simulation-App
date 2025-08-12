import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import { Play, Bluetooth, Pencil, Clock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import FloatingHome from '../../components/FloatingHome';

const InstructorHomeScreen = ({ goHome, onSelectAutoMode }) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#E0E0E0']} style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.Title}>
          Welcome, <Text style={styles.Bold}>Instructor</Text>
        </Text>
        <Text style={styles.Subtitle}>
          Start a session and <Text style={styles.Bold}>guide</Text>
          {'\n'}your student!
        </Text>

        <View style={styles.cardRow}>
          <View style={styles.Box}>
            <View style={styles.boxIcons}>
              <Play color="white" size={23} />
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.BoxTitle}>Test Scenario</Text>
              <Text style={styles.BoxDescription}>
                Run a scenario without{'\n'}connecting to a student
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={onSelectAutoMode}
              >
                <Text style={styles.customButtonText}>Try Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Box}>
            <View style={styles.boxIcons}>
              <Bluetooth color="white" size={23} />
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.BoxTitle}>Connect to Student</Text>
              <Text style={styles.BoxDescription}>
                Scan and connect to a{'\n'}nearby student device
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => console.log('Button pressed')}
              >
                <Text style={styles.customButtonText}>Scan & Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.Box, { marginTop: 8 }]}>
          <View style={styles.boxIcons}>
            <Pencil color="white" size={23} />
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={styles.BoxTitle}>Scenario Builder</Text>
            <Text style={styles.BoxDescription}>
              Create a simulation sequence{'\n'}for students to follow
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => console.log('Button pressed')}
            >
              <Text style={styles.customButtonText}>Create Scenario</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.Session, { marginTop: 5 }]}>
          <Text style={styles.sessionHeader}>Recent Session</Text>

          <ScrollView
            style={{ maxHeight: 200 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sessionRow}>
              <View style={styles.sessionIcons}>
                <Clock color="white" size={20} />
              </View>

              <View style={styles.sessionContent}>
                <View>
                  <Text style={styles.sessionTitle}>Connect to Student</Text>
                  <Text style={styles.sessionTime}>July 10 2025 - 2:15 PM</Text>
                </View>
                <Text style={[styles.sessionDuration, { marginRight: 5 }]}>
                  3 min 42 sec
                </Text>
              </View>
            </View>
            <View style={styles.sessionRow}>
              <View style={styles.sessionIcons}>
                <Clock color="white" size={20} />
              </View>

              <View style={styles.sessionContent}>
                <View>
                  <Text style={styles.sessionTitle}>Test Scenario</Text>
                  <Text style={styles.sessionTime}>July 10 2025 - 2:15 PM</Text>
                </View>
                <Text style={[styles.sessionDuration, { marginRight: 5 }]}>
                  3 min 42 sec
                </Text>
              </View>
            </View>
            <View style={styles.sessionRow}>
              <View style={styles.sessionIcons}>
                <Clock color="white" size={20} />
              </View>

              <View style={styles.sessionContent}>
                <View>
                  <Text style={styles.sessionTitle}>Scenario Builder</Text>
                  <Text style={styles.sessionTime}>July 10 2025 - 2:15 PM</Text>
                </View>
                <Text style={[styles.sessionDuration, { marginRight: 5 }]}>
                  3 min 42 sec
                </Text>
              </View>
            </View>
            <View style={styles.sessionRow}>
              <View style={styles.sessionIcons}>
                <Clock color="white" size={20} />
              </View>

              <View style={styles.sessionContent}>
                <View>
                  <Text style={styles.sessionTitle}>Scenario Builder</Text>
                  <Text style={styles.sessionTime}>July 10 2025 - 2:15 PM</Text>
                </View>
                <Text style={[styles.sessionDuration, { marginRight: 5 }]}>
                  3 min 42 sec
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <FloatingHome />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 40,
  },
  Title: {
    color: Colors.text,
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  Subtitle: {
    color: Colors.text,
    fontSize: 19,
    marginBottom: 3,
    fontFamily: 'Poppins-Regular',
  },
  Bold: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: Colors.text,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 13,
  },
  Box: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
    width: '49%',
    height: 175,
    borderRadius: 15,
    marginBottom: 6,

    // Enhanced shadow
    shadowColor: Colors.subText,
    shadowOffset: {
      width: 0,
      height: 8, // more height = deeper shadow
    },
    shadowOpacity: 0.9, // stronger shadow
    shadowRadius: 10, // more blur
    elevation: 10, // for Android
  },
  boxIcons: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 25,
    marginBottom: 7,
  },
  BoxTitle: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  BoxDescription: {
    color: Colors.text,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 5,
    alignItems: 'center',
  },

  customButton: {
    backgroundColor: Colors.rhythmBackground, // or any color
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },

  customButtonText: {
    color: 'white',
    fontSize: 11, // smaller font
    fontWeight: 'bold',
  },
  Session: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
    width: '90%',
    height: 215,
    borderRadius: 15,
    marginBottom: 25,

    shadowColor: Colors.subText,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  sessionHeader: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 15,
    backgroundColor: '#FFFBFB',
  },
  sessionIcons: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 25,
    marginBottom: 7,
  },
  sessionTitle: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 7,
  },
  sessionTime: {
    color: Colors.text,
    fontSize: 9,
    fontFamily: 'Poppins-Regular',
    marginTop: 3,
    marginLeft: 7,
  },
  sessionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  sessionDuration: {
    fontSize: 10,
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
  },
});

export default InstructorHomeScreen;
