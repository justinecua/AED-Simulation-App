import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#ffffff',
  },

  main: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.background,
    position: 'relative',
    rowGap: 22,
    alignItems: 'center',
    marginBottom: '10%',
  },

  mainHead: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
  },

  screenTitle: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 7,
    alignItems: 'center',
    fontSize: 13,
  },

  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text,
  },

  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },

  tip: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '100%',
    position: 'relative',
  },

  tipArrow: {
    position: 'absolute',
    right: -6,
    top: '75%',
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
    transform: [{ translateY: -6 }],
  },

  tipText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
    fontSize: 12,
  },

  info: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    fontSize: 13,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  bottomContent: {
    alignItems: 'center',
    rowGap: 12,
    width: '100%',
  },

  menuContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 1,
    width: '100%',
  },

  option: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  optionText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
    fontSize: 12,
  },

  active: {
    backgroundColor: Colors.background,
  },

  activeText: {
    color: Colors.button,
  },

  choicesContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  stepGroup: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    gap: 10,
    borderRadius: 5,
  },

  step: {
    padding: 5,
    borderRadius: 100,
    borderColor: Colors.button,
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
    fontSize: 12,
  },

  currentStep: {
    backgroundColor: Colors.button,
    color: '#fff',
  },

  placementText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify',
  },

  bodyImage: {
    marginTop: '3%',
    height: 350,
  },
});

export default styles;
