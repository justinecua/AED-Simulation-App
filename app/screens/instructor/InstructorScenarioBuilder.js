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

  const [rhythmPreview, setRhythmPreview] = useState('VFib');
  const defaultPreviewSteps = aedSequences[rhythmPreview] || [];
  const [showDefaultSteps, setShowDefaultSteps] = useState(false);

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
    return []; // EMPTY timeline
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

  const openEditor = (index, item) => openEditorByKey(item.key);

  const onDragEnd = ({ data }) => setSteps(data);

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
    if (!name.trim()) {
      alert('Please enter a scenario name.');
      return;
    }

    if (!description.trim()) {
      alert('Please enter a scenario description.');
      return;
    }

    if (steps.length === 0) {
      alert('Please add at least one step to the timeline.');
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
    } else {
      addScenario(scenarioData);
    }

    goScenarios();
  };

  const renderStepItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => openEditor(null, item)}
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
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f5f7fb' }}
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
            {/* ===========================================================
    INSTRUCTIONS FOR INSTRUCTOR
============================================================ */}
            <View
              style={{
                backgroundColor: '#E8F1FF',
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#BFD6FF',
                marginBottom: 25,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: '700', color: '#2A5AA3' }}
              >
                How to Build Your Scenario
              </Text>

              <View style={{ marginTop: 8 }}>
                <Text
                  style={{ fontSize: 14, color: '#2A5AA3', marginBottom: 4 }}
                >
                  • Tap a default step to add it to the timeline.
                </Text>
                <Text
                  style={{ fontSize: 14, color: '#2A5AA3', marginBottom: 4 }}
                >
                  • Drag steps inside the Timeline to reorder them.
                </Text>
                <Text
                  style={{ fontSize: 14, color: '#2A5AA3', marginBottom: 4 }}
                >
                  • Tap a step in the Timeline to remove it.
                </Text>
                <Text style={{ fontSize: 14, color: '#2A5AA3' }}>
                  • Edit steps by tapping them while building your scenario.
                </Text>
              </View>
            </View>

            {/* ===========================================================
                SCENARIO INPUTS
            ============================================================ */}
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
            {/* ===========================================================
                DEFAULT STEPS (PRESS TO ADD)
            ============================================================ */}
            <View style={{ marginBottom: 30 }}>
              <TouchableOpacity
                onPress={() => setShowDefaultSteps(prev => !prev)}
                style={{
                  alignSelf: 'flex-start',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: '#4A90E2',
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>
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
                    style={{ marginVertical: 12 }}
                    nestedScrollEnabled
                  >
                    {Object.keys(aedSequences).map(r => (
                      <TouchableOpacity
                        key={r}
                        onPress={() => setRhythmPreview(r)}
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          backgroundColor:
                            rhythmPreview === r ? '#4A90E2' : '#ddd',
                          borderRadius: 10,
                          marginRight: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: rhythmPreview === r ? '#fff' : '#333',
                            fontWeight: '600',
                          }}
                        >
                          {r}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Default steps with scroll + max height */}
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 12,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#e0e0e0',
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
                              paddingVertical: 10,
                              paddingHorizontal: 12,
                              borderRadius: 8,
                              borderWidth: 1,
                              borderColor: '#ddd',
                              marginBottom: 8,
                              backgroundColor: '#fafafa',
                            }}
                          >
                            <Text style={{ fontWeight: '600', fontSize: 14 }}>
                              {idx + 1}. {step.text}
                            </Text>
                            <Text style={{ color: '#666', marginTop: 2 }}>
                              action: {step.action}
                              {step.flashing ? ' • flashing' : ''}
                            </Text>
                            <Text
                              style={{
                                color: '#999',
                                fontSize: 12,
                                marginTop: 4,
                              }}
                            >
                              Tap to add → Timeline
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </>
              )}
            </View>
            {/* ===========================================================
    TIMELINE (DRAGGABLE + REMOVABLE + SCROLLABLE)
============================================================ */}
            <View style={styles.timelineContainer}>
              <Text style={styles.label}>Timeline of Steps</Text>

              <View
                style={{
                  height: 250, // FIXED HEIGHT → scrolls properly
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 10,
                  padding: 5,
                  backgroundColor: '#fff',
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
                        onPress={() => {
                          // REMOVE ON TAP
                          setSteps(prev =>
                            prev.filter(s => s.key !== item.key),
                          );
                        }}
                        disabled={isActive}
                        style={[
                          styles.stepItem,
                          { opacity: isActive ? 0.7 : 1 },
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

            {/* Save Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveScenario}
              >
                <Text style={styles.saveButtonText}>
                  {isEditing ? 'Update Scenario' : 'Save Scenario'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* ===========================================================
          EDIT STEP MODAL
      ============================================================ */}
      <Modal visible={isStepEditing} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Step</Text>

            <Text style={styles.label}>Text</Text>
            <TextInput
              style={[styles.input, { marginBottom: 12 }]}
              value={editText}
              onChangeText={setEditText}
            />

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

            <Text style={styles.label}>Audio</Text>
            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              value={editAudio}
              onChangeText={setEditAudio}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteStep}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>

              <View style={styles.modalActionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsStepEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveModalButton}
                  onPress={saveEdit}
                >
                  <Text style={styles.saveModalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
