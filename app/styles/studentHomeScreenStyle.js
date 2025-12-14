import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/colors';
import { Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const createStyles = screenWidth => {
  const isTablet = screenWidth >= 768;
  const isLargeTablet = screenWidth >= 1024;
  const contentWidth = isLargeTablet ? 900 : isTablet ? 720 : '100%';
  const columns = isLargeTablet ? 3 : 2;

  const scale = width / 375;
  const vscale = height / 812;
  const normalize = size => Math.round(size * scale);
  const vnormalize = size => Math.round(size * vscale);
  const circleSize = isTablet ? 48 : width * 0.13;

  return StyleSheet.create({
    /* ---------- ROOT ---------- */
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 20,
      flexGrow: 1,
    },

    container: {
      width: contentWidth,
      alignSelf: 'center',
      padding: 10,
    },

    linearGradient: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },

    /* ---------- HEADER ---------- */
    header: {
      marginTop: 30,
      marginBottom: 20,
      width: '100%',
      padding: 10,
    },

    headerSubContainer: {
      flexDirection: 'row',
    },

    Welcome: {
      fontSize: isTablet ? 40 : 32,
      fontFamily: 'Poppins-Regular',
      includeFontPadding: false,
      lineHeight: isTablet ? 46 : 38,
    },

    Student: {
      marginLeft: 10,
      fontSize: isTablet ? 40 : 32,
      color: Colors.button,
      fontFamily: 'Poppins-SemiBold',
      includeFontPadding: false,
      lineHeight: isTablet ? 46 : 38,
    },

    hSubContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    hsubTitle: {
      fontSize: isTablet ? 28 : 24,
      fontFamily: 'Poppins-Regular',
      includeFontPadding: false,
      lineHeight: isTablet ? 34 : 30,
    },
    /* ---------- MODES GRID ---------- */
    modesContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 20,
      rowGap: 5,
      columnGap: 20,
    },
    mode: {
      width: isLargeTablet ? '42%' : '46%',
      marginBottom: 16,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: isTablet ? 24 : 20,
      marginLeft: 1,

      ...(Platform.OS === 'ios'
        ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
          }
        : {
            elevation: 3,
          }),
    },

    modeIcon: {
      width: isTablet ? 64 : 56,
      height: isTablet ? 64 : 56,
      borderRadius: isTablet ? 32 : 28,
      backgroundColor: Colors.button,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },

    modeTitle: {
      fontSize: isTablet ? 15 : 14,
      fontFamily: 'Poppins-SemiBold',
    },

    modeDescription: {
      fontSize: isTablet
        ? Platform.OS === 'ios'
          ? 14
          : 13
        : Platform.OS === 'ios'
        ? 11
        : 12,

      lineHeight: isTablet
        ? Platform.OS === 'ios'
          ? 20
          : 18
        : Platform.OS === 'ios'
        ? 15
        : 16,

      color: Colors.text,
    },

    button: {
      marginTop: 14,
      backgroundColor: Colors.button,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: 'center',
    },

    buttonText: {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'Poppins-SemiBold',
    },

    /* ---------- RECENT ---------- */
    recentSessionsContainer: {
      padding: normalize(16),
      borderRadius: normalize(10),
      marginTop: normalize(5),
      width: '95%',
      backgroundColor: '#ffffff',
      shadowColor: Colors.text,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    rsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 8,
      columnGap: 10,
    },

    rscHeader: {
      marginBottom: isTablet ? 12 : 16,
    },

    rscTitleText: {
      color: Colors.button,
      fontWeight: '700',
      fontSize: isTablet ? 18 : normalize(15),
    },
    rsDetailsTitle: {
      color: '#4b4b4bff',
      fontWeight: '600',
      fontSize: isTablet ? 14 : normalize(13),
    },

    rsDetailsDate: {
      fontSize: isTablet ? 12 : normalize(10),
      color: '#505050ff',
    },
    rsDetails: {
      marginLeft: normalize(10),
    },
    rsCardSub: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rsCard: {
      width: isTablet ? '48%' : '100%',
      borderRadius: 12,
      backgroundColor: Colors.recentSessionCard,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isTablet ? 12 : normalize(10),
    },
    rscIcon: {
      width: isTablet ? circleSize * 0.8 : circleSize,
      height: isTablet ? circleSize * 0.8 : circleSize,
      borderRadius: circleSize,
      backgroundColor: Colors.button,
      alignItems: 'center',
      justifyContent: 'center',
    },

    emptySession: {
      marginTop: 16,
      padding: 32,
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: '#f8f9fa',
    },

    emptyIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#eee',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },

    emptyTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#666',
      marginBottom: 8,
    },

    emptySubtitle: {
      fontSize: 13,
      color: '#999',
      textAlign: 'center',
    },
    emptySession: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      marginHorizontal: 1,
      marginTop: 10,
    },
    emptyIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#666',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 13,
      color: '#999',
      textAlign: 'center',
      lineHeight: 20,
    },
  });
};

export default createStyles;
