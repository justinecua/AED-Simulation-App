import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import FloatingHome from '../../components/FloatingHome';
import { Play, Wifi, Hand, BadgeInfo, History } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import createStyles from '../../styles/studentHomeScreenStyle';
import { getOrCreateStudentId } from '../../data/roleIds';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentHomeScreen = ({
  goHome,
  goStudentAutoMode,
  goConnectToInstructor,
  goSimulationTips,
  goPracticeMode,
}) => {
  const { width } = useWindowDimensions();
  const styles = createStyles(width);
  const isTablet = width >= 768;

  const [sessions, setSessions] = useState([]);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);

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

  /* ---------- INIT ---------- */
  useEffect(() => {
    getOrCreateStudentId().catch(e =>
      console.warn('Error loading Student ID:', e),
    );
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await AsyncStorage.getItem('aed_sessions_student');
        const parsed = data ? JSON.parse(data) : [];
        setSessions(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.warn('Failed to load sessions', e);
        setSessions([]);
      } finally {
        setSessionsLoaded(true);
      }
    };

    fetchSessions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#deeaffff']}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.linearGradient}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.container}>
            {/* ================= HEADER ================= */}
            <View style={styles.header}>
              <View style={styles.headerSubContainer}>
                <Text style={styles.Welcome}>Welcome,</Text>
                <Text style={styles.Student}>Student!</Text>
              </View>

              <View style={styles.hSubContainer}>
                <Text style={styles.hsubTitle}>
                  Ready to begin your training?
                </Text>
              </View>
            </View>

            {/* ================= MODES ================= */}
            <View style={styles.modesContainer}>
              <ModeCard
                icon={<Play color="white" size={22} />}
                title="Auto Mode"
                desc="Begin simulation without instructor supervision"
                button="Start Simulation"
                onPress={goStudentAutoMode}
                styles={styles}
              />

              <ModeCard
                icon={<Wifi color="white" size={22} />}
                title="Connect Device"
                desc="Join your instructor's session via Wifi"
                button="Connect via Wifi"
                onPress={goConnectToInstructor}
                styles={styles}
              />

              <ModeCard
                icon={<Hand color="white" size={22} />}
                title="Practice Mode"
                desc="Try AED simulation in free play mode"
                button="Try Practice"
                onPress={goPracticeMode}
                styles={styles}
              />

              <ModeCard
                icon={<BadgeInfo color="white" size={22} />}
                title="Simulation Tips"
                desc="Learn how to apply pads and recognize rhythms"
                button="View Tips"
                onPress={goSimulationTips}
                styles={styles}
              />
            </View>

            {/* ================= RECENT SESSIONS ================= */}
            <View style={styles.recentSessionsContainer}>
              <View style={styles.rscHeader}>
                <Text style={styles.rscTitleText}>Recent Sessions</Text>
              </View>

              {!sessionsLoaded || sessions.length === 0 ? (
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
                <View style={styles.rsGrid}>
                  {sessions.slice(0, isTablet ? 6 : 4).map((session, index) => (
                    <View
                      key={index}
                      style={[styles.rsCard, isTablet && styles.rsCardTablet]}
                    >
                      <View style={styles.rsCardSub}>
                        <View style={styles.rscIcon}>
                          <History color="white" size={22} />
                        </View>

                        <View style={styles.rsDetails}>
                          <Text style={styles.rsDetailsTitle}>
                            {session.type || 'Simulation'}
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
        </ScrollView>

        <FloatingHome onPress={goHome} />
      </LinearGradient>
    </View>
  );
};

/* ================= MODE CARD ================= */

const ModeCard = ({ icon, title, desc, button, onPress, styles }) => (
  <View style={styles.mode}>
    <View style={styles.modeIcon}>{icon}</View>
    <Text style={styles.modeTitle}>{title}</Text>
    <Text style={styles.modeDescription}>{desc}</Text>

    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{button}</Text>
    </TouchableOpacity>
  </View>
);

export default StudentHomeScreen;
