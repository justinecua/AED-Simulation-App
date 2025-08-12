import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    gap: 20,
    paddingBottom: 80,
  },

  section: {
    padding: 8,
    width: '100%',
    gap: 10,
  },

  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mainTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text,
  },

  student: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.text,
  },

  responseBox: {
    padding: 20,
    backgroundColor: Colors.subText,
    borderRadius: 10,
  },

  response: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: Colors.text,
    fontSize: 12,
  },

  sessionFlowControls: {
    width: '100%',
    paddingHorizontal: 10,
    flexWrap: 'wrap', // allow wrapping across rows
    flexDirection: 'row',
    justifyContent: 'center',
  },

  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  controlBox: {
    padding: 10,
    borderRadius: 10,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#fff', // Required for shadow to be visible

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  controlIcon: {
    padding: 6,
    backgroundColor: Colors.button,
    borderRadius: 50,
  },

  controlLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    flexShrink: 1,
    flexWrap: 'wrap',
    color: Colors.text,
  },

  rhythmContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },

  rhythmBox: {
    padding: 12,
    borderRadius: 10,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff', // Required for shadow to be visible

    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,
  },

  promptContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  dropdownContainer: {
    width: '45%',
  },

  dropdown: {
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
    // iOS Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 10,
  },

  dropdownMenu: {
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
  },

  dropdownText: {
    color: Colors.subText,
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    textAlign: 'center',
  },
});

export default styles;
