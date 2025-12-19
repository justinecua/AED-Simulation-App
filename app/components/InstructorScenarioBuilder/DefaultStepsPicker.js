import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import aedSequences from '../../data/aedSequences';
import styles from '../../styles/InstructorScenarioBuilderStyle';

export default function DefaultStepsPicker({
  show,
  toggle,
  rhythm,
  setRhythm,
  onAddStep,
}) {
  if (!show) {
    return (
      <TouchableOpacity onPress={toggle} style={styles.toggleButton}>
        <Text style={styles.toggleText}>Show Default Steps</Text>
      </TouchableOpacity>
    );
  }

  const steps = aedSequences[rhythm] || [];

  return (
    <View>
      <TouchableOpacity onPress={toggle} style={styles.toggleButton}>
        <Text style={styles.toggleText}>Hide Default Steps</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(aedSequences).map(r => (
          <TouchableOpacity
            key={r}
            onPress={() => setRhythm(r)}
            style={[styles.rhythmTab, rhythm === r && styles.rhythmTabActive]}
          >
            <Text>{r}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView nestedScrollEnabled style={styles.defaultStepsBox}>
        {steps.map((step, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => onAddStep(step)}
            style={styles.defaultStepItem}
          >
            <Text>{step.text}</Text>
            <Text style={styles.stepMeta}>action: {step.action}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
