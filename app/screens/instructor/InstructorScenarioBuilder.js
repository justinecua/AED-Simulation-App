import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import Header from '../../components/Header';
import styles from '../../styles/InstructorScenarioBuilderStyle';
import aedSequences from '../../data/aedSequences';
import { useScenarioContext } from '../../context/ScenarioContext';

const DEFAULT_RHYTHM = 'VFib';
const ACTIONS = ['power', 'auto', 'remove', 'open', 'attach', 'analyze', 'shock', 'show'];

export default function InstructorScenarioBuilder({ goBack, goScenarios, editScenario }) {
  const { addScenario, updateScenario } = useScenarioContext();

  // If editing an existing scenario, use its data, otherwise use defaults
  const isEditing = !!editScenario;

  const defaultItems = useMemo(
    () => aedSequences[DEFAULT_RHYTHM].map((s, idx) => ({ key: String(idx), ...s })),
    []
  );

  const [name, setName] = useState(editScenario?.name || '');
  const [description, setDescription] = useState(editScenario?.description || '');
  const [rhythm, setRhythm] = useState(editScenario?.rhythm || DEFAULT_RHYTHM);
  const [steps, setSteps] = useState(() => {
    if (editScenario?.steps) {
      return editScenario.steps.map((step, idx) => ({
        key: String(Date.now() + idx),
        ...step
      }));
    }
    return defaultItems;
  });

  // Use a ref to track the latest steps
  const stepsRef = useRef(steps);
  
  // Keep the ref updated
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  // editor state
  const [isStepEditing, setIsStepEditing] = useState(false);
  const [editingStepKey, setEditingStepKey] = useState(null);
  const [editText, setEditText] = useState('');
  const [editAction, setEditAction] = useState('auto');
  const [editFlashing, setEditFlashing] = useState(false);
  const [editAudio, setEditAudio] = useState('');

  // Reset form when editScenario prop changes
  useEffect(() => {
    if (editScenario) {
      setName(editScenario.name || '');
      setDescription(editScenario.description || '');
      setRhythm(editScenario.rhythm || DEFAULT_RHYTHM);
      setSteps(editScenario.steps?.map((step, idx) => ({
        key: String(Date.now() + idx),
        ...step
      })) || defaultItems);
    } else {
      setName('');
      setDescription('');
      setRhythm(DEFAULT_RHYTHM);
      setSteps(defaultItems);
    }
  }, [editScenario]);

  // ADD THE MISSING FUNCTIONS:
  const onDragEnd = ({ data }) => setSteps(data);

  const addNewStep = () => {
    const n = steps.length;
    const newStepKey = String(Date.now());
    const newStep = { 
      key: newStepKey, 
      text: `New step ${n + 1}`, 
      action: 'auto', 
      audio: '' 
    };
    
    setSteps(prev => {
      const updatedSteps = [...prev, newStep];
      const newStepFromUpdated = updatedSteps.find(s => s.key === newStepKey);
      if (newStepFromUpdated) {
        setEditingStepKey(newStepKey);
        setEditText(newStepFromUpdated.text || '');
        setEditAction(newStepFromUpdated.action || 'auto');
        setEditFlashing(!!newStepFromUpdated.flashing);
        setEditAudio(newStepFromUpdated.audio || '');
        setIsStepEditing(true);
      }
      return updatedSteps;
    });
  };

  const openEditor = (index, item) => {
    const step = item || steps[index];
    if (!step) {
      console.error('No step found at index:', index);
      return;
    }
    openEditorByKey(step.key);
  };

  const openEditorByKey = (stepKey) => {
    const step = stepsRef.current.find(s => s.key === stepKey);
    if (!step) {
      console.error('No step found with key:', stepKey);
      return;
    }
    
    setEditingStepKey(stepKey);
    setEditText(step.text || '');
    setEditAction(step.action || 'auto');
    setEditFlashing(!!step.flashing);
    setEditAudio(step.audio || '');
    setIsStepEditing(true);
  };

  const saveEdit = () => {
    if (!editingStepKey) return;
    
    setSteps(prev => {
      return prev.map(step => {
        if (step.key === editingStepKey) {
          return {
            ...step,
            text: editText.trim() || step.text,
            action: editAction,
            flashing: editFlashing || undefined,
            audio: editAudio.trim(),
          };
        }
        return step;
      });
    });
    
    setIsStepEditing(false);
    setEditingStepKey(null);
  };

  const deleteStep = () => {
    if (!editingStepKey) return;
    
    setSteps(prev => prev.filter(step => step.key !== editingStepKey));
    setIsStepEditing(false);
    setEditingStepKey(null);
  };

  const saveScenario = () => {
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

  const renderItem = ({ item, drag, isActive, index }) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        onPress={() => openEditor(index, item)}
        disabled={isActive}
        activeOpacity={0.85}
        style={[styles.stepItem, { opacity: isActive ? 0.9 : 1 }]}
      >
        <Text style={styles.stepText}>{item.text}</Text>
        <Text style={styles.stepAction}>
          action: {item.action}{item.flashing ? ' • flashing' : ''}
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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scenarioBuilder}>
          <Text style={styles.sectionTitle}>
            {isEditing ? 'Edit Scenario' : 'Scenario Builder'}
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>Scenario Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Input Scenario Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>Scenario Description</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Input Scenario Description"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.timelineContainer}>
            <Text style={styles.label}>Timeline of Steps</Text>

            <View style={styles.timelineScroll}>
              <DraggableFlatList
                data={steps}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                onDragEnd={onDragEnd}
                contentContainerStyle={styles.draggableListContent}
                style={styles.draggableList}
                nestedScrollEnabled
                scrollEnabled
                activationDelay={120}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={addNewStep}>
              <Text style={styles.addButtonText}>Add New Step</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={saveScenario}>
              <Text style={styles.saveButtonText}>
                {isEditing ? 'Update Scenario' : 'Save Scenario'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Step Modal */}
      <Modal
        visible={isStepEditing}
        animationType="slide"
        transparent
        onRequestClose={() => setIsStepEditing(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Step</Text>

            <Text style={styles.label}>Text</Text>
            <TextInput
              style={[styles.input, { marginBottom: 12 }]}
              value={editText}
              onChangeText={setEditText}
              placeholder="Step text"
            />

            <Text style={styles.label}>Action</Text>
            <View style={styles.actionButtonsContainer}>
              {ACTIONS.map((a) => (
                <TouchableOpacity
                  key={a}
                  onPress={() => setEditAction(a)}
                  style={[
                    styles.actionButton,
                    editAction === a && styles.actionButtonSelected
                  ]}
                >
                  <Text style={[
                    styles.actionButtonText,
                    editAction === a && styles.actionButtonTextSelected
                  ]}>
                    {a}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <TouchableOpacity
                onPress={() => setEditFlashing(!editFlashing)}
                style={[
                  styles.checkbox,
                  editFlashing && styles.checkboxSelected
                ]}
              >
                {editFlashing && <Text style={styles.checkboxText}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.label}>Flashing</Text>
            </View>

            <Text style={styles.label}>Audio (optional)</Text>
            <TextInput
              style={[styles.input, { marginBottom: 16 }]}
              value={editAudio}
              onChangeText={setEditAudio}
              placeholder="e.g., shock_advised.mp3"
              autoCapitalize="none"
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={[styles.deleteButton]} onPress={deleteStep}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>

              <View style={styles.modalActionButtons}>
                <TouchableOpacity style={[styles.cancelButton]} onPress={() => setIsStepEditing(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveModalButton]} onPress={saveEdit}>
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