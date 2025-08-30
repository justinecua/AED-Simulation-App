import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    gap: 20,
    backgroundColor: '#fff',
  },

  contentContainer: {
    backgroundColor: Colors.background,
    width: '100%',
    padding: 15,
    flexDirection: 'column',
    borderRadius: 10,
    gap: 35,
    marginTop: -20,
    position: 'relative',
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  descriptionBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 10,
  },

  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.text,
  },

  infoIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },

  placementContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
    marginTop: -5,
  },

  instructionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },

  instruction: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: Colors.text,
  },

  bodyContainer: {
    width: '100%',
    alignItems: 'center',
  },

  bodyImage: {
    width: 430,
    height: 400,
    resizeMode: 'contain',
  },

  padsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  verticalPad: {
    backgroundColor: Colors.heartRateBackground,
    paddingVertical: 23,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  horizontalPad: {
    backgroundColor: Colors.heartRateBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  pad: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 8,
  },

  alertBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },

  alertIcon: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 50,
  },

  alert: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text,
  },
});

export default styles;
