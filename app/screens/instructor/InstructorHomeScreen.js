import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import Colors from '../../constants/colors';
import FloatingHome from '../../components/FloatingHome';
import { Play, Wifi, Hand, History } from 'lucide-react-native';

import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/instructorHomeStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrCreateInstructorId } from '../../data/roleIds';

const InstructorHomeScreen = ({
  goHome,
  onSelectAutoMode,
  goConnectToStudent,
  goScenarioBuilder,
  goManageScenarios,
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const contentWidth = isTablet ? (width >= 1024 ? 900 : 720) : '100%';

  const [sessions, setSessions] = useState([]);

  /* ---------- INIT ---------- */
  useEffect(() => {
    (async () => {
      try {
        await getOrCreateInstructorId();
        const data = await AsyncStorage.getItem('aed_sessions_instructor');
        setSessions(data ? JSON.parse(data) : []);
      } catch (e) {
        console.warn('Instructor init error:', e);
      }
    })();
  }, []);

  /* ---------- HELPERS ---------- */
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
      <ScrollView>
        <View style={styles.container}>
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#deeaffff']}
            locations={[0, 0.3, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.linearGradient}
          >
            {/* CENTERED CONTENT (TABLET ONLY) */}
            <View style={{ width: contentWidth }}>
              {/* ================= HEADER ================= */}
              <View style={styles.header}>
                <View style={styles.headerSubContainer}>
                  <Text style={styles.Welcome}>Welcome,</Text>
                  <Text style={styles.Student}>Instructor!</Text>
                </View>

                <View style={styles.hSubContainer}>
                  <Text style={styles.hsubTitle}>
                    Start a session and guide your student
                  </Text>
                </View>
              </View>

              {/* ================= MODES ================= */}
              <View style={[styles.modesContainer]}>
                <ModeCard
                  icon={<Play color="white" size={23} />}
                  title="Test Scenario"
                  desc="Run a scenario without connecting to a student"
                  button="Try Now"
                  onPress={onSelectAutoMode}
                />

                <ModeCard
                  icon={<Wifi color="white" size={23} />}
                  title="Connect Device"
                  desc="Scan and connect to a nearby student device"
                  button="Scan & Connect"
                  onPress={goConnectToStudent}
                />

                <ModeCard
                  icon={<Hand color="white" size={23} />}
                  title="Scenario Builder"
                  desc="Create a simulation sequence for students"
                  button="Create Scenario"
                  onPress={goScenarioBuilder}
                />

                <ModeCard
                  icon={<History color="white" size={23} />}
                  title="Manage Scenarios"
                  desc="View, edit, or delete your saved scenarios"
                  button="Open"
                  onPress={goManageScenarios}
                />
              </View>

              {/* ================= RECENT SESSIONS ================= */}
              <View style={styles.recentSessionsContainer}>
                <Text style={styles.rscTitleText}>Recent Sessions</Text>

                {sessions.length === 0 ? (
                  <View style={styles.emptySession}>
                    <View style={styles.emptyIconContainer}>
                      <History color="#999" size={32} />
                    </View>
                    <Text style={styles.emptyTitle}>No sessions yet</Text>
                    <Text style={styles.emptySubtitle}>
                      Start a session to see history here
                    </Text>
                  </View>
                ) : (
                  <View style={styles.rsGrid}>
                    {sessions
                      .slice(0, isTablet ? 6 : 4)
                      .map((session, index) => (
                        <View
                          key={index}
                          style={[styles.rsCard, isTablet && { width: '48%' }]}
                        >
                          <View style={styles.rsCardSub}>
                            <View style={styles.rscIcon}>
                              <History color="white" size={23} />
                            </View>

                            <View style={styles.rsDetails}>
                              <Text style={styles.rsDetailsTitle}>
                                {session.type || 'Session'}
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
                      ))}
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>

      <FloatingHome onPress={goHome} />
    </View>
  );
};

/* ================= MODE CARD ================= */

const ModeCard = ({ icon, title, desc, button, onPress }) => (
  <View style={styles.mode}>
    <View style={styles.modeIcon}>{icon}</View>
    <Text style={styles.modeTitle}>{title}</Text>
    <Text style={styles.modeDescription}>{desc}</Text>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{button}</Text>
    </TouchableOpacity>
  </View>
);

export default InstructorHomeScreen;
