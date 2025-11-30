import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scenarioBuilder: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 20,
  },

  /* -------------------------
        INPUTS
  -------------------------- */
  inputContainer: {
    flexDirection: 'column',
    gap: 18,
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 10,
  },

  label2: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    marginBottom: 13,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',

    fontSize: 14,
    color: '#0F172A',
  },

  descriptionInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  /* -------------------------
       STEP ITEMS
  -------------------------- */
  stepItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },

  stepAction: {
    fontSize: 12,
    color: '#64748B',
  },

  /* -------------------------
       TIMELINE
  -------------------------- */
  timelineContainer: {
    marginBottom: 20,
  },

  /* -------------------------
       BUTTONS
  -------------------------- */
  buttonContainer: {
    marginTop: 25,
  },

  saveButton: {
    backgroundColor: Colors.button,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  /* -------------------------
       MODAL
  -------------------------- */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },

  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
  },

  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },

  actionButtonSelected: {
    backgroundColor: Colors.button,
    borderColor: Colors.button,
  },

  actionButtonText: {
    fontSize: 12,
    color: '#334155',
  },

  actionButtonTextSelected: {
    color: '#FFFFFF',
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  checkboxSelected: {
    backgroundColor: Colors.button,
    borderColor: Colors.button,
  },

  checkboxText: {
    color: '#fff',
    fontSize: 14,
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalActionButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
  },

  deleteButtonText: {
    color: '#B91C1C',
    fontWeight: '600',
  },

  cancelButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
  },

  cancelButtonText: {
    color: '#475569',
    fontWeight: '600',
  },

  saveModalButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: Colors.button,
    borderRadius: 10,
  },

  saveModalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default styles;
