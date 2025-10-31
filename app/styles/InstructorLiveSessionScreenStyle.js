import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');
const scale = size => Math.round((size * width) / 375);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    gap: 20,
    paddingBottom: 80,
    backgroundColor: '#ffffff',
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
    fontSize: scale(16),
    color: Colors.text,
  },

  student: {
    fontFamily: 'Poppins-Regular',
    fontSize: scale(12),
    color: Colors.text,
  },

  responseBox: {
    padding: scale(16),
    backgroundColor: Colors.subText,
    borderRadius: 10,
  },

  response: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: Colors.text,
    fontSize: scale(12),
  },

  sessionFlowControls: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  controlBox: {
    width: '48%',
    marginVertical: 6,
    marginHorizontal: '1%',
    padding: scale(12),
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',

    // Shadows
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  controlIcon: {
    padding: 9,
    backgroundColor: Colors.button,
    borderRadius: 50,
  },

  controlLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: scale(13),
    flexShrink: 1,
    marginTop: 3,
    flexWrap: 'wrap',
    color: Colors.text,
  },

  rhythmContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },

  rhythmBox: {
    padding: scale(12),
    borderRadius: 10,
    flexBasis: width < 500 ? '45%' : '30%', // ✅ adaptive for tablets
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff',

    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
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
    flexBasis: width < 500 ? '45%' : '30%',
    marginVertical: 5,
  },

  dropdown: {
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
    paddingHorizontal: 10,

    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },

  dropdownMenu: {
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
  },

  dropdownText: {
    color: Colors.subText,
    fontFamily: 'Poppins-Regular',
    fontSize: scale(10),
    textAlign: 'center',
  },
});

export default styles;
