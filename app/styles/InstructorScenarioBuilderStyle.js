import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  scenarioBuilder: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },

  sectionTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.rhythmBackground,
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: 'column',
    gap: 18,
    marginBottom: 25,
  },

  inputBox: {
    flexDirection: 'column',
    gap: 8,
  },

  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.rhythmBackground,
    marginLeft: 4,
  },

  input: {
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Android Shadow
    elevation: 4,
  },

  descriptionInput: {
    minHeight: 80,
    paddingTop: 16,
  },

  timelineContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 20,
  },

  timelineScroll: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Android Shadow
    elevation: 4,
  },

  draggableList: {
    flex: 1,
  },

  draggableListContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  contentText: {
    fontSize: 13,
    backgroundColor: '#fff',
    color: Colors.text,
    fontWeight: '600',
    padding: 12,
    borderRadius: 7,
  },

  studentSubWrapper: {
    flexDirection: 'column',
  },

  stepItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,

    // Android Shadow
    elevation: 2,
  },

  stepText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },

  stepAction: {
    fontSize: 12,
    color: '#6b7280',
  },

  buttonContainer: {
    flexDirection: 'column',
    gap: 15,
    marginTop: 'auto',
    paddingTop: 20,
  },

  addButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.button,
    borderRadius: 12,
  },

  addButtonText: {
    color: Colors.button,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },

  saveButton: {
    backgroundColor: Colors.button,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.button,
    borderRadius: 12,
  },

  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.rhythmBackground,
    marginBottom: 20,
    textAlign: 'center',
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 12,
    gap: 8,
  },

  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },

  actionButtonSelected: {
    backgroundColor: Colors.button,
    borderColor: Colors.button,
  },

  actionButtonText: {
    fontSize: 12,
    color: '#111',
    fontWeight: '500',
  },

  actionButtonTextSelected: {
    color: '#fff',
  },

  checkbox: {
    marginRight: 10,
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  checkboxSelected: {
    backgroundColor: Colors.button,
    borderColor: Colors.button,
  },

  checkboxText: {
    color: '#fff',
    fontSize: 12,
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  modalActionButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  deleteButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },

  deleteButtonText: {
    color: '#dc2626',
    fontWeight: '600',
  },

  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },

  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },

  saveModalButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.button,
    borderWidth: 1,
    borderColor: Colors.button,
  },

  saveModalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;