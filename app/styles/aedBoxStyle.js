import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const aedStyle = StyleSheet.create({
  aedBox: {
    marginTop: '-45%',
    gap: 10,
    backgroundColor: '#fff',
    padding: 21,
    borderRadius: 15,
    width: '90%',
    height: '60%',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android shadow
    elevation: 5,
  },
  aedScreen: {
    width: '100%',
    height: '80%',
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
  },
  aedScreenDetails: {
    marginTop: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
  hrBox: {
    backgroundColor: '#fff',
    borderRadius: 9,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hrLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  hrValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.rhythmBackground,
  },

  aedControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  powerBtn: {
    width: 35,
    height: 35,
    marginRight: 10,
    backgroundColor: '#2F3E46',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerText: {
    color: '#fff',
    fontSize: 20,
  },
  joulesBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },

  jouleText: {
    fontSize: 13,
    marginVertical: 2,
    backgroundColor: Colors.rhythmBackground,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#fff',
  },
  aedTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B2A37',
  },
  shockButton: {
    width: 35,
    height: 35,
    backgroundColor: '#FFA500',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default aedStyle;
