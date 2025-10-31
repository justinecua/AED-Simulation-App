import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const style2 = StyleSheet.create({
  studentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  studentSubWrapper: {
    flexDirection: 'column',
  },

  studentWrapper2: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  studentWrapper2Sub: {
    height: '100%',
  },
  studentWrapper2SubRight: {
    flexDirection: 'row',
  },
  studentSubWrapper: {
    flexDirection: 'row',
    gap: 12,
  },

  wifiButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ffff',
  },

  handButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ffff',
  },

  padPackageButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.button,
    marginLeft: 10,
  },
});

export default style2;
