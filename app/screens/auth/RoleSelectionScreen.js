import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { UserRound } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import createStyles from '../../styles/RoleSelectionStyles';
import { makeReadableId } from '../../shared/id';

const RoleSelectionScreen = ({ onSelectStudent, onSelectInstructor }) => {
  const { width } = useWindowDimensions();
  const styles = createStyles(width);

  const [isSwitching, setIsSwitching] = useState(false);

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
      {/* TOP LOGO */}
      <View style={styles.logoContainerTop}>
        <Image
          style={styles.logo2}
          source={require('../../assets/images/FinalLogo1.png')}
        />
      </View>

      {/* MAIN LOGO */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/simcritLogo11.png')}
        />
        <Text style={styles.fontSubtitle}>Simulation for Critical Care</Text>
      </View>

      {/* ROLE CARDS */}
      <View style={styles.RoleContentContainer}>
        <TouchableOpacity
          style={styles.userCard}
          onPress={() => handleRoleSelect('student')}
          activeOpacity={0.85}
          disabled={isSwitching}
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
          activeOpacity={0.85}
          disabled={isSwitching}
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
      </View>

      {/* INFO */}
      <View style={styles.additionalText}>
        <Text style={styles.atInfo}>
          Please choose how you will use the app today. If you’re participating
          in a simulation, select Student. If you are managing the simulation,
          choose Instructor.
        </Text>
      </View>

      {/* VERSION */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default RoleSelectionScreen;
