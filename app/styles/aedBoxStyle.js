import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const aedStyle = StyleSheet.create({
  aedBox: {
    gap: 10,
    backgroundColor: '#fff',
    padding: 21,
    borderRadius: 15,
    width: wp('80%'),
    height: hp('35%'),
    maxHeight: 260,
    minHeight: 260,
    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  aedScreen: {
    width: '100%',
    height: '90%',
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
  },
  aedScreenDetails: {
    position: 'absolute',
    right: 5,
    top: 8,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hrBox: {
    backgroundColor: Colors.subText,
    borderRadius: 9,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  hrLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  hrValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  aedControls: {
    marginTop:
      -20 /* Optional lol, Idk why its position is exceeding from the black screen*/,
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
    fontSize: 26,
    letterSpacing: 2,
    color: '#1B2A37',
    fontFamily: 'RussoOne-Regular',
  },
  shockButton: {
    width: 35,
    height: 35,
    backgroundColor: Colors.heartRateBackground,
    //    backgroundColor: '#FFA500',
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default aedStyle;
