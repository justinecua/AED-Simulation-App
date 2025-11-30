import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  atInfo: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: Colors.text,
    fontSize: 13,
  },
  additionalText: {
    marginTop: 40,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleDescription: {
    fontFamily: 'Roboto-Regular',
    flexWrap: 'wrap',
    color: Colors.text,
    fontSize: 12,
  },
  roleTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.text,
    marginBottom: 2,
  },
  ucDetails: {
    maxWidth: '100%',
    flex: 1,
    marginLeft: 14,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    width: '90%',
    height: 95,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,

    // Shadow for iOS
    shadowColor: '#828795ff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
  },
  ucIcons: {
    width: '19%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.button,
    borderRadius: 7,
  },
  ucIcons2: {
    width: '19%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 7,
  },
  fontSubtitle: {
    color: Colors.text,
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
