import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    gap: 20,
    backgroundColor: '#fff',
    flex: 1,
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
    flex: 1,
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
    marginTop: -15,
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

  aedPad: {
    width: 60,
    height: 65,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  padUpperRight: {
    width: 50,
    height: 60,
    backgroundColor: '#fff',
    borderColor: Colors.primary,
  },

  padLowerLeft: {
    width: 65,
    height: 45,
    backgroundColor: '#fff',
    borderColor: Colors.primary,
  },

  padCorrect: {
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },

  padInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  padLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },

  padConnector: {
    width: 15,
    height: 3,
    backgroundColor: '#666',
    borderRadius: 2,
  },

  padGuide: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default styles;
