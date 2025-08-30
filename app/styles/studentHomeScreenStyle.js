import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: Colors.button,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 100,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  rscTitleText: {
    color: Colors.button,
    fontWeight: 700,
    fontSize: 15,
  },
  rsDetailsDate: {
    fontSize: 12.5,
  },
  rsDetailsTitle: {
    fontWeight: 700,
    fontSize: 15,
  },
  rsDetails: {
    marginLeft: 10,
  },
  rsCardSub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rsCard: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.recentSessionCard,
  },
  rscIcon: {
    width: 50,
    padding: 13,
    borderRadius: '50%',
    backgroundColor: Colors.button,
  },
  recentSessionsContainer: {
    padding: 16,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    backgroundColor: '#ffffff',
    // Shadow for iOS
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  modeDescription: {
    fontFamily: 'Poppins',
    fontSize: 13,
    marginBottom: 5,
    color: Colors.text,
  },
  modeTitle: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'none',
  },

  modeIcon: {
    width: '36%',
    padding: 15,
    borderRadius: '50%',
    backgroundColor: Colors.button,
    marginBottom: 12,
  },
  mode: {
    padding: 20,
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,

    // Shadow for iOS
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  modesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  hsubTitleMid: {
    marginTop: -3,
    marginLeft: 9,
    marginRight: 4,
    fontSize: 27,
    fontFamily: 'Poppins-SemiBold',
  },
  hsubTitle2: {
    marginRight: 15,
    marginBottom: -6,
    marginTop: -3,
    fontSize: 27,
    fontFamily: 'Poppins-Regular',
  },
  hSubContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  hsubTitle: {
    marginBottom: -6,
    marginTop: -3,
    fontSize: 27,
    fontFamily: 'Poppins-Regular',
  },
  Student: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.button,
    fontSize: 36,
    fontFamily: 'Poppins-Regular',
  },
  Welcome: {
    fontSize: 36,
    fontFamily: 'Poppins-Regular',
  },
  headerSubContainer: {
    flexDirection: 'row',
  },
  header: {
    marginTop: 30,
    marginBottom: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
