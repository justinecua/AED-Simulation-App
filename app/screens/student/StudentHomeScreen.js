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
import { Bold } from 'lucide-react-native';
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

const StudentHomeScreen = ({ goHome, goStudentAutoMode }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <LinearGradient
            colors={['#FFFFFF', '#EEF4FF']}
            locations={[0, 0.5]}
            start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
            end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
            style={styles.linearGradient}
          >
            <View style={styles.header}>
              <View style={styles.headerSubContainer}>
                <Text style={styles.Welcome}>Welcome,</Text>
                <Text style={styles.Student}>Student!</Text>
              </View>

              <View style={styles.hSubContainer}>
                <Text style={styles.hsubTitle}>Ready to</Text>
                <Text style={styles.hsubTitleMid}>begin</Text>
                <Text style={styles.hsubTitle2}>your</Text>
                <Text style={styles.hsubTitle}>training?</Text>
              </View>
            </View>

            <View style={styles.modesContainer}>
              <View style={styles.mode}>
                <View style={styles.modeIcon}>
                  <Play color="white" size={23} />
                </View>

                <Text style={styles.modeTitle}>Start AED Auto Mode</Text>
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
                  <BluetoothSearching color="white" size={23} />
                </View>

                <Text style={styles.modeTitle}>Connect to Instructor</Text>
                <Text style={styles.modeDescription}>
                  Join your instructor's session via Bluetooth
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Connect</Text>
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
          </LinearGradient>
        </View>
      </ScrollView>

      <FloatingHome onPress={goHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: Colors.button,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 100,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  rscTitleText: {
    color: Colors.button,
    fontWeight: 700,
    fontSize: 15,
  },
  rsDetailsDate: {
    fontSize: 12.5,
  },
  rsDetailsTitle: {
    fontWeight: 700,
    fontSize: 15,
  },
  rsDetails: {
    marginLeft: 10,
  },
  rsCardSub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rsCard: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.recentSessionCard,
  },
  rscIcon: {
    width: 50,
    padding: 13,
    borderRadius: '50%',
    backgroundColor: Colors.button,
  },
  recentSessionsContainer: {
    padding: 16,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    backgroundColor: '#ffffff',
    // Shadow for iOS
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  modeDescription: {
    fontFamily: 'Poppins',
    fontSize: 13,
    marginBottom: 5,
    color: Colors.text,
  },
  modeTitle: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'none',
  },

  modeIcon: {
    width: '36%',
    padding: 15,
    borderRadius: '50%',
    backgroundColor: Colors.button,
    marginBottom: 12,
  },
  mode: {
    padding: 20,
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,

    // Shadow for iOS
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  modesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  hsubTitleMid: {
    marginTop: -3,
    marginLeft: 9,
    marginRight: 4,
    fontSize: 27,
    fontFamily: 'Poppins-SemiBold',
  },
  hsubTitle2: {
    marginRight: 15,
    marginBottom: -6,
    marginTop: -3,
    fontSize: 27,
    fontFamily: 'Poppins-Regular',
  },
  hSubContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  hsubTitle: {
    marginBottom: -6,
    marginTop: -3,
    fontSize: 27,
    fontFamily: 'Poppins-Regular',
  },
  Student: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.button,
    fontSize: 36,
    fontFamily: 'Poppins-Regular',
  },
  Welcome: {
    fontSize: 36,
    fontFamily: 'Poppins-Regular',
  },
  headerSubContainer: {
    flexDirection: 'row',
  },
  header: {
    marginTop: 30,
    marginBottom: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudentHomeScreen;
