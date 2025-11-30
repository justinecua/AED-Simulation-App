import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const style = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  subContainer: {
    flex: 1,
    padding: 2,
    borderRadius: 15,
    backgroundColor: Colors.background,
    position: 'relative',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  boxIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ECF4ED',
  },
  boxUser: {
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.rhythmBackground,
  },
  wrapper: {
    flexDirection: 'row',
  },

  timerBox: {
    flexDirection: 'row',      // ✅ make them inline
    alignItems: 'center',      // ✅ vertically centered
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',   // optional styling
    alignSelf: 'flex-start',
    gap: 4,                    // if RN ≥ 0.71, else remove
  },
  timerText: {
    color: '#ed1313',
    fontSize: 16,
    fontWeight: 'bold',
  },

  wrapper2Sub: {
    alignSelf: 'flex-start',
  },

  headerText: {
    color: Colors.rhythmBackground,
    backgroundColor: '#F4F6FA',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },

  content: {
    padding: 15,
    width: '100%',
    height: '70%',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  contentCenter: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },

  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentText: {
    fontSize: 13,
    backgroundColor: '#fff',
    color: Colors.text,
    fontWeight: '600',
    padding: 12,
    borderRadius: 7,
  },
  wrapperButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FA4C17',
  },
  button: {
    gap: 6,
  },
  boxPlay: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#09E979',
  },
  boxStop: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FF0000',
  },
});

export default style;
