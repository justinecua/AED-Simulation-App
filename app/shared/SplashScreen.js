import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import Colors from '../constants/colors';

export default function SplashScreen({ onFinish }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.95)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslate = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    // Logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // SimCrit
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 500,
      delay: 350,
      useNativeDriver: true,
    }).start();

    // Subtitle
    Animated.parallel([
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 500,
        delay: 850,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleTranslate, {
        toValue: 0,
        duration: 500,
        delay: 850,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        <Image
          style={styles.logo}
          source={require('../assets/images/FinalLogo1.png')}
        />
      </Animated.View>

      {/* TITLE */}
      <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
        <Text style={styles.sim}>Sim</Text>
        <Text style={styles.crit}>Crit</Text>
      </Animated.Text>

      {/* SUBTITLE */}
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: subtitleOpacity,
            transform: [{ translateY: subtitleTranslate }],
          },
        ]}
      >
        Simulation for Critical Care
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E3A8A',
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    letterSpacing: 0.6,
  },
  sim: {
    color: Colors.text,
  },

  crit: {
    color: Colors.button,
  },
});
