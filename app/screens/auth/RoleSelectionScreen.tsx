import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Colors from '../../constants/colors';
import { Bold } from 'lucide-react-native';
import { UserRound } from 'lucide-react-native';

const RoleSelectionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{width: 170, height: 60, marginBottom: -10}} source={require('../../assets/images/simcritLogo1.png')} />
        <Text style={styles.fontSubtitle}>Simulation for Critical Care</Text>
      </View>

      <View style={styles.userCard}>
        <View style={styles.ucIcons}>
          <UserRound color="white" size={35} />
        </View>
        <View style={styles.ucDetails}>
          <Text style={styles.roleTitle}>STUDENT</Text>
          <Text style={styles.roleDescription}>
            Join an AED simulation and follow prompts during the session
          </Text>
        </View>
      </View>

      <View style={styles.userCard}>
        <View style={styles.ucIcons2}>
          <UserRound color="white" size={35} />
        </View>
        <View style={styles.ucDetails}>
          <Text style={styles.roleTitle}>INSTRUCTOR</Text>
          <Text style={styles.roleDescription}>
            Control and monitor a simulation, guide the student, and manage
            session flow
          </Text>
        </View>
      </View>

      <View style={styles.additionalText}>
        <Text style={styles.atInfo}>
          Please choose how you will use the app today. If you’re participating
          in a simulation, select Student. If you are managing the simulation,
          choose Instructor.
        </Text>
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
    flexWrap: 'wrap',
    color: Colors.text,
  },
  roleTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 3,
  },

  ucDetails: {
    maxWidth: '100%',
    flex: 1,
    marginLeft: 14,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    width: '90%',
    height: 95,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,

    // Shadow for iOS
    shadowColor: Colors.subText,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
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
});

export default RoleSelectionScreen;
