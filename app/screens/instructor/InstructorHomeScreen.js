import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import FloatingHome from '../../components/FloatingHome';
import { Play, Wifi, Hand, History } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/instructorHomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrCreateInstructorId } from '../../data/roleIds';
import { useEffect } from 'react';

const InstructorHomeScreen = ({
  goHome,
  onSelectAutoMode,
  goConnectToStudent,
  goScenarioBuilder,
  goManageScenarios,
}) => {
  useEffect(() => {
    (async () => {
      try {
        const id = await getOrCreateInstructorId();
        console.log('Instructor ID:', id);
      } catch (e) {
        console.warn('Error loading Instructor ID:', e);
      }
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#deeaffff']}
            locations={[0, 0.3, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.linearGradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerSubContainer}>
                <Text style={styles.Welcome}>Welcome,</Text>
                <Text style={styles.Student}>Instructor!</Text>
              </View>

              <View style={styles.hSubContainer}>
                <Text style={styles.hsubTitle}>
                  Start a session and guide your student
                </Text>
                {/* <Text style={styles.hsubTitle}>student!</Text> */}
              </View>
            </View>

            {/* Modes */}
            <View style={styles.modesContainer}>
              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <Play color="white" size={23} />
                </View>
                <Text style={styles.modeTitle}>Test Scenario</Text>
                <Text style={styles.modeDescription}>
                  Run a scenario without connecting to a student
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onSelectAutoMode}
                >
                  <Text style={styles.buttonText}>Try Now</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <Wifi color="white" size={23} />
                </View>
                <Text style={styles.modeTitle}>Connect Device</Text>
                <Text style={styles.modeDescription}>
                  Scan and connect to a nearby student device
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={goConnectToStudent}
                >
                  <Text style={styles.buttonText}>Scan & Connect</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <Hand color="white" size={23} />
                </View>
                <Text style={styles.modeTitle}>Scenario Builder</Text>
                <Text style={styles.modeDescription}>
                  Create a simulation sequence for students to follow
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={goScenarioBuilder}
                >
                  <Text style={styles.buttonText}>Create Scenario</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <History color="white" size={23} />
                </View>
                <Text style={styles.modeTitle}>Manage Scenarios</Text>
                <Text style={styles.modeDescription}>
                  View, edit, or delete your saved scenarios
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => goManageScenarios()}
                >
                  <Text style={styles.buttonText}>Open</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recent Sessions */}
            <View style={styles.recentSessionsContainer}>
              <View style={styles.rscTitle}>
                <Text style={styles.rscTitleText}>Recent Sessions</Text>
              </View>

              {[1, 2, 3, 4].map((item, index) => (
                <View key={index} style={styles.rsCard}>
                  <View style={styles.rsCardSub}>
                    <View style={styles.rscIcon}>
                      <History color="white" size={23} />
                    </View>
                    <View style={styles.rsDetails}>
                      <Text style={styles.rsDetailsTitle}>Practice Mode</Text>
                      <Text style={styles.rsDetailsDate}>
                        July 10, 2025 - 2:15 PM
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>3 min 42 sec</Text>
                  </View>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      <FloatingHome onPress={goHome} />
    </View>
  );
};

export default InstructorHomeScreen;
