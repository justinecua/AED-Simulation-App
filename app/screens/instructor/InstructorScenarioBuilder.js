import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import Header from '../../components/Header';
import styles from '../../styles/InstructorScenarioBuilderStyle';
import aedSequences from '../../data/aedSequences';
import { useScenarioContext } from '../../context/ScenarioContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIONS = [
  'power',
  'auto',
  'remove',
  'open',
  'attach',
  'analyze',
  'shock',
  'show',
];

export default function InstructorScenarioBuilder({
  goBack,
  goScenarios,
  editScenario,
}) {
  const { addScenario, updateScenario } = useScenarioContext();
  const [builderTimer, setBuilderTimer] = useState(0);

  const [rhythmPreview, setRhythmPreview] = useState('VFib');
  const defaultPreviewSteps = aedSequences[rhythmPreview] || [];
  const [showDefaultSteps, setShowDefaultSteps] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isEditing = !!editScenario;

  // Scenario details
  const [name, setName] = useState(editScenario?.name || '');
  const [description, setDescription] = useState(
    editScenario?.description || '',
  );
  const [rhythm, setRhythm] = useState(editScenario?.rhythm || 'VFib');

  // Timeline steps STARTS BLANK unless editing
  const [steps, setSteps] = useState(() => {
    if (editScenario?.steps) {
      return editScenario.steps.map((step, idx) => ({
        key: String(Date.now() + idx),
        ...step,
      }));
    }
    return [];
  });

  const stepsRef = useRef(steps);
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  // ====== Editing Modal ======
  const [isStepEditing, setIsStepEditing] = useState(false);
  const [editingStepKey, setEditingStepKey] = useState(null);
  const [editText, setEditText] = useState('');
  const [editAction, setEditAction] = useState('auto');
  const [editFlashing, setEditFlashing] = useState(false);
  const [editAudio, setEditAudio] = useState('');

  const openEditorByKey = key => {
    const step = stepsRef.current.find(s => s.key === key);
    if (!step) return;

    setEditingStepKey(key);
    setEditText(step.text || '');
    setEditAction(step.action || 'auto');
    setEditFlashing(!!step.flashing);
    setEditAudio(step.audio || '');
    setIsStepEditing(true);
  };

  const saveEdit = () => {
    if (!editingStepKey) return;

    setSteps(prev =>
      prev.map(step =>
        step.key === editingStepKey
          ? {
              ...step,
              text: editText.trim(),
              action: editAction,
              flashing: editFlashing || undefined,
              audio: editAudio.trim(),
            }
          : step,
      ),
    );

    setIsStepEditing(false);
    setEditingStepKey(null);
  };

  const deleteStep = () => {
    if (!editingStepKey) return;

    setSteps(prev => prev.filter(s => s.key !== editingStepKey));
    setIsStepEditing(false);
    setEditingStepKey(null);
  };

  const saveScenario = () => {
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter a scenario name.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Please enter a scenario description.');
      return;
    }

    if (steps.length === 0) {
      setErrorMessage('Please add at least one step to the timeline.');
      return;
    }

    const scenarioData = {
      name,
      description,
      rhythm,
      steps: steps.map(({ key, ...rest }) => rest),
    };

    if (isEditing && editScenario?.id) {
      updateScenario(editScenario.id, scenarioData);

      saveInstructorScenarioSession(true);
    } else {
      addScenario(scenarioData);

      saveInstructorScenarioSession(false);
    }

    goScenarios();
  };

  const saveInstructorScenarioSession = async isUpdate => {
    try {
      const newSession = {
        type: isUpdate ? 'Scenario Updated' : 'Scenario Created',
        scenarioName: name,
        startTime: new Date().toISOString(),
        totalTime: builderTimer,
      };

      const data = await AsyncStorage.getItem('aed_sessions_instructor');
      const sessions = data ? JSON.parse(data) : [];

      sessions.unshift(newSession);

      await AsyncStorage.setItem(
        'aed_sessions_instructor',
        JSON.stringify(sessions),
      );

      console.log('Instructor scenario session saved!');
    } catch (e) {
      console.log('Error saving scenario session:', e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBuilderTimer(t => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header role="instructor" goBack={goBack} />

      <FlatList
        data={[{}]}
        keyExtractor={() => 'builder'}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={() => (
          <View style={styles.scenarioBuilder}>
            {/* Title */}
            <Text style={styles.sectionTitle}>
              {isEditing ? 'Edit Scenario' : 'Scenario Builder'}
            </Text>

            {/* INSTRUCTIONS CARD */}
            <View
              style={{
                backgroundColor: '#EFF6FF',
                padding: 16,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: '#DBEAFE',
                marginBottom: 28,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#1E3A8A',
                  marginBottom: 8,
                }}
              >
                How to Build Your Scenario
              </Text>

              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, color: '#1E3A8A' }}>
                  • Tap a default step to add it to the timeline.
                </Text>

                <Text style={{ fontSize: 14, color: '#1E3A8A' }}>
                  • Tap a step in the Timeline to remove it.
                </Text>

                <Text style={{ fontSize: 14, color: '#1E3A8A' }}>
                  • Edit steps by tapping them in the Timeline.
                </Text>
              </View>
            </View>

            {/* INPUTS */}
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

            {/* DEFAULT STEPS */}
            <View style={{ marginBottom: 30 }}>
              <TouchableOpacity
                onPress={() => setShowDefaultSteps(prev => !prev)}
                style={{
                  alignSelf: 'flex-start',
                  paddingVertical: 17,
                  paddingHorizontal: 16,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginBottom: 14,
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: '#000000ff',
                    fontSize: 13,
                    textAlign: 'center',
                  }}
                >
                  {showDefaultSteps
                    ? 'Hide Default Steps'
                    : 'Show Default Steps'}
                </Text>
              </TouchableOpacity>

              {showDefaultSteps && (
                <>
                  <Text style={styles.label}>Default AED Rhythm Steps</Text>

                  {/* Rhythm Tabs */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 14 }}
                  >
                    {Object.keys(aedSequences).map(r => (
                      <TouchableOpacity
                        key={r}
                        onPress={() => setRhythmPreview(r)}
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          backgroundColor:
                            rhythmPreview === r ? '#2563EB' : '#E2E8F0',
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: rhythmPreview === r ? '#fff' : '#1E293B',
                            fontWeight: '600',
                            fontSize: 13,
                          }}
                        >
                          {r}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Default step list */}
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: 14,
                      borderRadius: 14,
                      borderWidth: 1,
                      borderColor: '#E2E8F0',
                      maxHeight: 250,
                      overflow: 'hidden',
                    }}
                  >
                    <ScrollView nestedScrollEnabled>
                      {defaultPreviewSteps.map((step, idx) => {
                        const clone = {
                          key: String(Date.now() + idx),
                          text: step.text,
                          action: step.action,
                          flashing: step.flashing,
                          audio: step.audio || '',
                        };

                        return (
                          <TouchableOpacity
                            key={idx}
                            onPress={() => setSteps(prev => [...prev, clone])}
                            style={{
                              paddingVertical: 12,
                              paddingHorizontal: 14,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#E2E8F0',
                              marginBottom: 10,
                              backgroundColor: '#F8FAFC',
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: 14,
                                color: '#0F172A',
                              }}
                            >
                              {idx + 1}. {step.text}
                            </Text>

                            <Text
                              style={{
                                color: '#64748B',
                                marginTop: 2,
                                fontSize: 12,
                              }}
                            >
                              action: {step.action}
                              {step.flashing ? ' • flashing' : ''}
                            </Text>

                            <Text
                              style={{
                                color: '#94A3B8',
                                fontSize: 12,
                                marginTop: 4,
                              }}
                            >
                              Tap to add
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </>
              )}
            </View>

            {/* TIMELINE */}
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
                  renderItem={({ item, drag, isActive }) => (
                    <ScaleDecorator>
                      <TouchableOpacity
                        onLongPress={drag}
                        onPress={() =>
                          setSteps(prev => prev.filter(s => s.key !== item.key))
                        }
                        disabled={isActive}
                        style={[
                          styles.stepItem,
                          {
                            opacity: isActive ? 0.7 : 1,
                          },
                        ]}
                      >
                        <Text style={styles.stepText}>{item.text}</Text>
                        <Text style={styles.stepAction}>
                          action: {item.action}
                          {item.flashing ? ' • flashing' : ''}
                        </Text>
                      </TouchableOpacity>
                    </ScaleDecorator>
                  )}
                  onDragEnd={({ data }) => setSteps(data)}
                  activationDelay={120}
                  nestedScrollEnabled
                />
              </View>
            </View>

            {/* ERROR MESSAGE */}
            {errorMessage !== '' && (
              <View
                style={{
                  backgroundColor: '#FEE2E2',
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 16,
                  borderLeftWidth: 4,
                  borderLeftColor: '#DC2626',
                }}
              >
                <Text
                  style={{
                    color: '#991B1B',
                    fontWeight: '600',
                  }}
                >
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* SAVE BUTTON */}
            <TouchableOpacity
              style={{
                backgroundColor: '#2563EB',
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={saveScenario}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: 15,
                }}
              >
                {isEditing ? 'Update Scenario' : 'Save Scenario'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* EDIT STEP MODAL */}
      <Modal visible={isStepEditing} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Step</Text>

            {/* Text */}
            <Text style={styles.label}>Text</Text>
            <TextInput
              style={[styles.input, { marginBottom: 12 }]}
              value={editText}
              onChangeText={setEditText}
            />

            {/* Action */}
            <Text style={styles.label}>Action</Text>
            <View style={styles.actionButtonsContainer}>
              {ACTIONS.map(a => (
                <TouchableOpacity
                  key={a}
                  onPress={() => setEditAction(a)}
                  style={[
                    styles.actionButton,
                    editAction === a && styles.actionButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      editAction === a && styles.actionButtonTextSelected,
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
                onPress={() => setEditFlashing(!editFlashing)}
                style={[
                  styles.checkbox,
                  editFlashing && styles.checkboxSelected,
                ]}
              >
                {editFlashing && <Text style={styles.checkboxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.label}>Flashing</Text>
            </View>

            {/* Audio */}
            <Text style={styles.label}>Audio</Text>
            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              value={editAudio}
              onChangeText={setEditAudio}
            />

            {/* Modal Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              {/* DELETE */}
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 12,
                  backgroundColor: '#FEE2E2',
                }}
                onPress={deleteStep}
              >
                <Text
                  style={{
                    color: '#B91C1C',
                    fontWeight: '700',
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>

              {/* RIGHT BUTTONS */}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 12,
                    backgroundColor: '#F1F5F9',
                  }}
                  onPress={() => setIsStepEditing(false)}
                >
                  <Text
                    style={{
                      color: '#475569',
                      fontWeight: '600',
                    }}
                  >
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
                  onPress={saveEdit}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                    }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
