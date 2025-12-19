import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import styles from '../../styles/InstructorScenarioBuilderStyle';

export default function EditStepModal({
  visible,
  text,
  setText,
  action,
  setAction,
  flashing,
  setFlashing,
  audio,
  setAudio,
  actions,
  onDelete,
  onCancel,
  onSave,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Step</Text>

          {/* Text */}
          <Text style={styles.label}>Text</Text>
          <TextInput
            style={[styles.input, { marginBottom: 12 }]}
            value={text}
            onChangeText={setText}
          />

          {/* Action */}
          <Text style={styles.label}>Action</Text>
          <View style={styles.actionButtonsContainer}>
            {actions.map(a => (
              <TouchableOpacity
                key={a}
                onPress={() => setAction(a)}
                style={[
                  styles.actionButton,
                  action === a && styles.actionButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    action === a && styles.actionButtonTextSelected,
                  ]}
                >
                  {a}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Flashing */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => setFlashing(!flashing)}
              style={[styles.checkbox, flashing && styles.checkboxSelected]}
            >
              {flashing && <Text style={styles.checkboxText}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.label}>Flashing</Text>
          </View>

          {/* Audio */}
          <Text style={styles.label}>Audio</Text>
          <TextInput
            style={[styles.input, { marginBottom: 16 }]}
            value={audio}
            onChangeText={setAudio}
          />

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 12,
                backgroundColor: '#FEE2E2',
              }}
              onPress={onDelete}
            >
              <Text style={{ color: '#B91C1C', fontWeight: '700' }}>
                Delete
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  backgroundColor: '#F1F5F9',
                }}
                onPress={onCancel}
              >
                <Text style={{ color: '#475569', fontWeight: '600' }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  backgroundColor: '#2563EB',
                }}
                onPress={onSave}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
