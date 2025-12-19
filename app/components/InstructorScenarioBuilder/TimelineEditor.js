import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import styles from '../../styles/InstructorScenarioBuilderStyle';

export default function TimelineEditor({ steps, setSteps, onEdit }) {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.label2}>Timeline of Steps</Text>

      <View
        style={{
          height: 260,
          borderWidth: 1,
          borderColor: '#E2E8F0',
          borderRadius: 14,
          padding: 6,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <DraggableFlatList
          data={steps}
          keyExtractor={item => item.key}
          activationDelay={120}
          nestedScrollEnabled
          onDragEnd={({ data }) => setSteps(data)}
          renderItem={({ item, drag, isActive }) => (
            <ScaleDecorator>
              <TouchableOpacity
                onLongPress={drag}
                onPress={() => onEdit(item.key)}
                disabled={isActive}
                style={[styles.stepItem, { opacity: isActive ? 0.7 : 1 }]}
              >
                <Text style={styles.stepText}>{item.text}</Text>
                <Text style={styles.stepAction}>
                  action: {item.action}
                  {item.flashing ? ' • flashing' : ''}
                </Text>
              </TouchableOpacity>
            </ScaleDecorator>
          )}
        />
      </View>
    </View>
  );
}
