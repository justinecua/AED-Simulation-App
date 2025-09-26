import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    gap: 20,
    flex: '1',
    height: '100%',
    backgroundColor: Colors.background,
  },

  scenarioBuilder: {
    width: '100%',
  },

  sectionTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.rhythmBackground,
  },

  inputContainer: {
    flexDirection: 'column',
    gap: 15,
    padding: 10,
  },

  inputBox: {
    flexDirection: 'column',
    gap: 10,
  },

  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.rhythmBackground,
  },

  input: {
    borderWidth: 0,
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#fff',

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 8,
  },

  timelineContainer: {
    gap: 15,
    padding: 10,
  },

  timelineScroll: {
    maxHeight: 400, // or any fixed height you prefer
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  timelineCard: {
    borderWidth: 0,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 15,

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  timelineBox: {
    borderWidth: 0,
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#fff',
    gap: 20,

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 5,
  },

  timelineText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.rhythmBackground,
  },

  buttonContainer: {
    flexDirection: 'column',
    gap: 15,
    padding: 10,
  },

  addButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.button,
    borderRadius: 10,
  },

  addButtonText: {
    color: Colors.button,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },

  saveButton: {
    backgroundColor: Colors.button,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.button,
    borderRadius: 10,
  },

  saveButtonText: {
    color: Colors.background,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default styles;
