import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import FloatingHome from '../../components/FloatingHome';
import { Play, Wifi, Hand, BadgeInfo, History } from 'lucide-react-native';

import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/studentHomeScreenStyle';

import { getOrCreateStudentId } from '../../data/roleIds';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentHomeScreen = ({
  goHome,
  goStudentAutoMode,
  goConnectToInstructor,
  goSimulationTips,
  goPracticeMode,
}) => {
  useEffect(() => {
    (async () => {
      try {
        const id = await getOrCreateStudentId();
        console.log('Student ID:', id);
      } catch (e) {
        console.warn('Error loading Student ID:', e);
      }
    })();
  }, []);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const data = await AsyncStorage.getItem('aed_sessions_student');
      if (data) setSessions(JSON.parse(data));
    };
    fetchSessions();
  }, []);

  const formatDate = iso => {
    if (!iso) return '';
    const date = new Date(iso);

    return date
      .toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .replace(', ', ' - ');
  };

  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return minutes === 0
      ? `${seconds} sec`
      : `${minutes} min ${seconds.toString().padStart(2, '0')} sec`;
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#deeaffff']}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerSubContainer}>
                <Text style={styles.Welcome}>Welcome,</Text>
                <Text style={styles.Student}>Student!</Text>
              </View>

              <View style={styles.hSubContainer}>
                <Text style={styles.hsubTitle}>Ready to</Text>
                <Text style={styles.hsubTitleMid}>begin</Text>
                <Text style={styles.hsubTitle2}>your training?</Text>
              </View>
            </View>

            {/* ================== MODES ================== */}
            <View style={styles.modesContainer}>
              {/* Auto Mode */}
              <View style={styles.mode}>
                <View style={{ flex: 1 }}>
                  <View style={styles.modeIcon}>
                    <Play color="white" size={23} />
                  </View>

                  <Text style={styles.modeTitle}>Auto Mode</Text>
                  <Text style={styles.modeDescription}>
                    Begin simulation without instructor supervision
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={goStudentAutoMode}
                >
                  <Text style={styles.buttonText}>Start Simulation</Text>
                </TouchableOpacity>
              </View>

              {/* Connect Device */}
              <View style={styles.mode}>
                <View style={{ flex: 1 }}>
                  <View style={styles.modeIcon}>
                    <Wifi color="white" size={23} />
                  </View>

                  <Text style={styles.modeTitle}>Connect Device</Text>
                  <Text style={styles.modeDescription}>
                    Join your instructor's session via Wifi
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={goConnectToInstructor}
                >
                  <Text style={styles.buttonText}>Connect via Wifi</Text>
                </TouchableOpacity>
              </View>

              {/* Practice Mode */}
              <View style={styles.mode}>
                <View style={{ flex: 1 }}>
                  <View style={styles.modeIcon}>
                    <Hand color="white" size={23} />
                  </View>

                  <Text style={styles.modeTitle}>Practice Mode</Text>
                  <Text style={styles.modeDescription}>
                    Try AED simulation in free play mode
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={goPracticeMode}
                >
                  <Text style={styles.buttonText}>Try Practice</Text>
                </TouchableOpacity>
              </View>

              {/* Simulation Tips */}
              <View style={styles.mode}>
                <View style={{ flex: 1 }}>
                  <View style={styles.modeIcon}>
                    <BadgeInfo color="white" size={23} />
                  </View>

                  <Text style={styles.modeTitle}>Simulation Tips</Text>
                  <Text style={styles.modeDescription}>
                    Learn how to apply pads and recognize rhythms
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={goSimulationTips}
                >
                  <Text style={styles.buttonText}>View Tips</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ================== RECENT SESSIONS ================== */}
            <View style={styles.recentSessionsContainer}>
              <View style={styles.rscTitle}>
                <Text style={styles.rscTitleText}>Recent Sessions</Text>
              </View>

              <View>
                {sessions.length === 0 ? (
                  <View style={styles.emptySession}>
                    <View style={styles.emptyIconContainer}>
                      <History color="#999" size={32} />
                    </View>
                    <Text style={styles.emptyTitle}>No sessions yet</Text>
                    <Text style={styles.emptySubtitle}>
                      Complete your first simulation to see history here
                    </Text>
                  </View>
                ) : (
                  sessions.slice(0, 4).map((session, index) => (
                    <View style={styles.rsCard} key={index}>
                      <View style={styles.rsCardSub}>
                        <View style={styles.rscIcon}>
                          <History color="white" size={23} />
                        </View>

                        <View style={styles.rsDetails}>
                          <Text style={styles.rsDetailsTitle}>
                            {session.type}
                          </Text>
                          <Text style={styles.rsDetailsDate}>
                            {formatDate(session.startTime)}
                          </Text>
                        </View>
                      </View>
                      <Text>
                        {typeof session.totalTime === 'number'
                          ? formatTime(session.totalTime)
                          : '0 sec'}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <FloatingHome onPress={goHome} />
      </LinearGradient>
    </View>
  );
};

export default StudentHomeScreen;
