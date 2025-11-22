import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/colors';
import { Bold, LucideWifi } from 'lucide-react-native';
import FloatingHome from '../../components/FloatingHome';
import {
  Play,
  BluetoothSearching,
  Hand,
  BadgeInfo,
  History,
  Home,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/studentHomeScreenStyle';
import { getOrCreateStudentId } from '../../data/roleIds';
import { useEffect } from 'react';

const StudentHomeScreen = ({
  goHome,
  goStudentAutoMode,
  goConnectToInstructor,
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
            <View style={styles.header}>
              <View style={styles.headerSubContainer}>
                <Text style={styles.Welcome}>Welcome,</Text>
                <Text style={styles.Student}>Student!</Text>
              </View>

              <View style={styles.hSubContainer}>
                <Text style={styles.hsubTitle}>Ready to</Text>
                <Text style={styles.hsubTitleMid}>begin</Text>
                <Text style={styles.hsubTitle2}>your training?</Text>
                {/* <Text style={styles.hsubTitle}>training?</Text> */}
              </View>
            </View>

            <View style={styles.modesContainer}>
              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <Play color="white" size={23} />
                </View>

                <Text style={styles.modeTitle}>Auto Mode</Text>
                <Text style={styles.modeDescription}>
                  Begin simulation without instructor supervision
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={goStudentAutoMode}
                >
                  <Text style={styles.buttonText}>Start Simulation</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <LucideWifi color="white" size={23} />
                </View>

                <Text style={styles.modeTitle}>Connect Device</Text>
                <Text style={styles.modeDescription}>
                  Join your instructor's session via Wifi
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={styles.buttonText}
                    onPress={goConnectToInstructor}
                  >
                    Connect via Wifi
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <Hand color="white" size={23} />
                </View>

                <Text style={styles.modeTitle}>Practice Mode</Text>
                <Text style={styles.modeDescription}>
                  Try AED simulation in free play mode
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Try Practice</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <BadgeInfo color="white" size={23} />
                </View>

                <Text style={styles.modeTitle}>Simulation Tips</Text>
                <Text style={styles.modeDescription}>
                  Learn how to apply pads and recognize rhythms
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>View Tips</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.recentSessionsContainer}>
              <View style={styles.rscTitle}>
                <Text style={styles.rscTitleText}>Recent Sessions</Text>
              </View>
              <View style={styles.rsCard}>
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

              <View style={styles.rsCard}>
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
              <View style={styles.rsCard}>
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

              <View style={styles.rsCard}>
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
            </View>
          </View>
        </ScrollView>

        <FloatingHome onPress={goHome} />
      </LinearGradient>
    </View>
  );
};

export default StudentHomeScreen;
