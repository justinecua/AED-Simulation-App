import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { UserRound } from 'lucide-react-native';
import styles from '../../styles/RoleSelectionStyles';
import { makeReadableId } from '../../shared/id';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoleSelectionScreen = ({ onSelectStudent, onSelectInstructor }) => {
  const handleRoleSelect = async role => {
    try {
      const id = makeReadableId(role === 'student' ? 'STU' : 'INS');
      await AsyncStorage.setItem('userId', id);
      await AsyncStorage.setItem('role', role);
      if (role === 'student') {
        onSelectStudent?.();
      } else {
        onSelectInstructor?.();
      }
    } catch (err) {
      console.log('Error saving ID:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 170, height: 60, marginBottom: -10 }}
          source={require('../../assets/images/simcritLogo1.png')}
        />
        <Text style={styles.fontSubtitle}>Simulation for Critical Care</Text>
      </View>

      <TouchableOpacity
        style={styles.userCard}
        onPress={() => handleRoleSelect('student')}
      >
        <View style={styles.ucIcons}>
          <UserRound color="white" size={35} />
        </View>
        <View style={styles.ucDetails}>
          <Text style={styles.roleTitle}>STUDENT</Text>
          <Text style={styles.roleDescription}>
            Join an AED simulation and follow prompts during the session
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.userCard}
        onPress={() => handleRoleSelect('instructor')}
      >
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
      </TouchableOpacity>

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

export default RoleSelectionScreen;
