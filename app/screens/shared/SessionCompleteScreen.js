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
import Colors from '../constants/colors';
import { Bold, CheckCircle } from 'lucide-react-native';
import { Play, BluetoothSearching, Hand, BadgeInfo } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UserRound } from 'lucide-react-native';

const SessionCompleteScreen = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View style={styles.ucDetails}>
          <Image
            source={require('../assets/images/check.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />

          <View style={styles.textGroup}>
            <Text style={styles.textBlue}>SESSION COMPLETE</Text>
            <Text style={styles.roleDescription}>
              Great work! You may remove the pads
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>RETURN HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontWeight: 'semibold',
    flexWrap: 'wrap',
    color: Colors.heartRateBackground,
  },
  roleTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 3,
  },

  ucDetails: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  userCard: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 15,
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,

    // Shadow for iOS
    shadowColor: Colors.subText,
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
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

  button: {
    backgroundColor: Colors.rhythmBackground,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'none',
  },

  textBlue: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    color: '#0071EE',
    fontSize: 16,
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

  textGroup: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SessionCompleteScreen;
