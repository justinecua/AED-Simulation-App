import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const style2 = StyleSheet.create({
  studentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  studentWrapper2: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
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
});

export default style2;
