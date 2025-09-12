import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Users, RotateCcw } from 'lucide-react-native';
import styles from '../../styles/connectToInstructorStyles';
import HeaderBar from '../../components/ConnectToInstructor/HeaderBar';
import BluetoothRadar from '../../components/ConnectToInstructor/BluetoothRadar';
import InstructorCard from '../../components/ConnectToInstructor/InstructorCard';

const ConnectToInstructorScreen = ({ goBack }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [instructors, setInstructors] = useState([]);

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const pulseStyle = {
    opacity: pulseAnim,
    transform: [
      {
        scale: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5],
        }),
      },
    ],
  };

  const handleConnect = ins => {
    console.log(`${ins.name} Connected`);
    setIsSearching(false);
  };

  const handleToggleSearch = () => {
    setIsSearching(prev => {
      const next = !prev;

      if (next) {
        setInstructors([]);
        setTimeout(() => {
          const found = [
            { name: 'Instructor 1', id: 'ID#000001' },
            { name: 'Instructor 2', id: 'ID#000002' },
            { name: 'Instructor 3', id: 'ID#000003' },
          ];
          setInstructors(found);
          setIsSearching(false);
        }, 10000);
      } else {
        setInstructors([]);
      }

      return next;
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar goBack={goBack} />

      <BluetoothRadar
        isSearching={isSearching}
        onToggleSearch={handleToggleSearch}
      />

      <View style={styles.bluetoothText}>
        <Text style={styles.Text}>
          {isSearching
            ? 'Looking for Instructors...'
            : 'Tap Bluetooth to Start Searching'}
        </Text>
      </View>

      {instructors.length > 0 ? (
        <>
          <View style={styles.studentContainer}>
            <Text style={styles.studentCount}>
              {instructors.length} Instructor{instructors.length > 1 ? 's' : ''}{' '}
              Found
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.studentCarousel}
            contentContainerStyle={styles.studentDisplay}
          >
            {instructors.map((ins, i) => (
              <InstructorCard
                key={i}
                name={ins.name}
                id={ins.id}
                onConnect={() => handleConnect(ins)}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.noResultContainer}>
          <View style={styles.noResultIcon}>
            <Users color="#94A3B8" size={25} />
          </View>

          <Text style={styles.noResultTitle}>No Instructors Found</Text>
          <Text style={styles.noResultText}>
            We couldn't find any instructors nearby. Make sure Bluetooth is
            enabled and try again.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ConnectToInstructorScreen;
