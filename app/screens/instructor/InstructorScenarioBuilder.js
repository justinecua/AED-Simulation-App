import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from '../../styles/InstructorScenarioBuilderStyle';
import Header from '../../components/Header';

const ScenarioBuilder = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header role="instructor" />

      <View style={styles.scenarioBuilder}>
        <Text style={styles.sectionTitle}>Scenario Builder</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Scenario Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Input Scenario Name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Scenario Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Input Scenario Description"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={styles.timelineContainer}>
          <Text style={styles.label}>Timeline of Steps</Text>
          <ScrollView
            style={styles.timelineScroll}
            contentContainerStyle={styles.timelineCard}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Set rhythm to VFib</Text>
            </View>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Prompt: Apply Pads</Text>
            </View>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Wait for Event</Text>
            </View>
            <View style={styles.timelineBox}>
              <Text style={styles.timelineText}>Prompt: Shock Advised</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Step</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Scenario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ScenarioBuilder;
