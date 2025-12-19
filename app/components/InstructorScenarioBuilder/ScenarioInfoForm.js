import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/InstructorScenarioBuilderStyle';

export default function ScenarioInfoForm({
  name,
  setName,
  description,
  setDescription,
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Scenario Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Input Scenario Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Scenario Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Input Scenario Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
    </View>
  );
}
