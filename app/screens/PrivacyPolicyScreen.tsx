import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF', '#ECF4ED']}
        locations={[0, 0.5]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}>
        <View style={styles.logoContainer}>
          <Image style={{width: 170, height: 60, marginBottom: -10}} source={require('../assets/images/simcritLogo1.png')} />
          <Text style={styles.fontSubtitle}>Simulation for Critical Care</Text>
        </View>

        <View style={{ width: '90%', alignItems: 'flex-start', marginBottom: 20, marginLeft: 10 }}>
          <Text style={styles.roleTitle}>Privacy Policy</Text>
        </View>

        <View style={styles.userCard}>
          <ScrollView contentContainerStyle={styles.cardContent}>
            <Text style={styles.policyText}>
              By using this app, you agree to our Privacy Policy and Terms of Use. We collect limited data such as session activity, device connection status (via Bluetooth or Wi-Fi), and optional names or IDs, solely to enable and improve the AED training experience.

              {"\n\n"}
              No personal or sensitive data is sold or shared with third parties. The app is for educational and simulation purposes only and should not be used in real medical emergencies.

              {"\n\n"}
              Instructors may review session logs during or after training. All session data is stored locally unless exported by the instructor.

              {"\n\n"}
              You may clear your history or uninstall the app at any time. Continued use means you accept these terms.

              {"\n\n"}
              For questions, contact us at [your@email.com].
            </Text>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  atInfo: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: Colors.text,
  },
  additionalText: {
    marginTop: 40,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleDescription: {
    fontFamily: 'Roboto-Regular',
    flexWrap: 'wrap',
    color: Colors.text,
  },
  roleTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 3,
  },

  ucDetails: {
    maxWidth: '100%',
    flex: 1,
    marginLeft: 14,
  },
  userCard: {
    backgroundColor: '#ffffff',
    width: '90%',
    height: 500, // fixed height to match Figma proportion
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.subText,
    borderWidth: 1,
  
    // Shadow for iOS
    shadowColor: Colors.subText,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  
  cardContent: {
    padding: 16, // space inside card
  },
  
  policyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16.5,
    color: Colors.text,
    lineHeight: 20,
  },

  ucIcons: {
    width: '19%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 7,
  },

  ucIcons2: {
    width: '19%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 7,
  },
  fontSubtitle: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },

  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivacyPolicyScreen