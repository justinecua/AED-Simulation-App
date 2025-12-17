import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const createStyles = screenWidth => {
  const isTablet = screenWidth >= 768;

  return StyleSheet.create({
    /* ---------- TEXT ---------- */
    atInfo: {
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
      color: Colors.text,
      fontSize: 13,
    },

    roleDescription: {
      fontFamily: 'Roboto-Regular',
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

    fontSubtitle: {
      color: Colors.text,
      fontSize: 14,
      marginTop: 2,
      fontFamily: 'Poppins-Regular',
    },

    /* ---------- LAYOUT ---------- */
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainerTop: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    logo2: {
      width: 70,
      height: 60,
      marginBottom: -30,
      resizeMode: 'contain',
    },

    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 40,
    },

    logo: {
      width: 150,
      height: 75,
      marginBottom: -25,
      resizeMode: 'contain',
    },

    RoleContentContainer: {
      width: isTablet ? 540 : '90%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    additionalText: {
      marginTop: 40,
      width: isTablet ? 540 : '90%',
      alignItems: 'center',
    },

    /* ---------- CARD ---------- */
    userCard: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      padding: 15,
      width: '100%',
      height: 95,
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 10,

      shadowColor: '#828795ff',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 5,
    },

    ucDetails: {
      flex: 1,
      marginLeft: 14,
    },

    ucIcons: {
      width: 60,
      flexShrink: 0,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.button,
      borderRadius: 7,
    },

    ucIcons2: {
      width: 60,
      flexShrink: 0,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.rhythmBackground,
      borderRadius: 7,
    },
    versionContainer: {
      position: 'absolute',
      bottom: 20,
      alignItems: 'center',
      width: '100%',
    },

    versionText: {
      fontSize: 11,
      color: '#9aa0a6',
      fontFamily: 'Roboto-Regular',
    },
  });
};

export default createStyles;
