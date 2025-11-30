import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

// Responsive helpers
const scale = width / 375; // base iPhone X width
const vscale = height / 812; // base iPhone X height
const normalize = size => Math.round(size * scale);
const vnormalize = size => Math.round(size * vscale);

// Circle size
const circleSize = width * 0.13;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: vnormalize(20),
  },
  homeButton: {
    position: 'absolute',
    top: vnormalize(40),
    right: normalize(20),
    backgroundColor: Colors.button,
    paddingVertical: vnormalize(6),
    paddingHorizontal: normalize(14),
    borderRadius: 20,
    zIndex: 100,
  },
  homeButtonText: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: 'bold',
  },

  rscTitleText: {
    color: Colors.button,
    fontWeight: '700',
    fontSize: normalize(15),
  },
  rsDetailsDate: {
    fontSize: normalize(11),
  },
  rsDetailsTitle: {
    fontWeight: '600',
    fontSize: normalize(14),
  },
  rsDetails: {
    marginLeft: normalize(10),
  },
  rsCardSub: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  rsCard: {
    borderRadius: 10,
    padding: normalize(10),
    marginTop: normalize(10),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.recentSessionCard,
  },
  rscIcon: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.button,
  },

  recentSessionsContainer: {
    padding: normalize(16),
    borderRadius: 10,
    marginTop: normalize(15),
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },

  modeDescription: {
    fontFamily: 'Poppins',
    fontSize: normalize(11),
    marginBottom: vnormalize(5),
    color: Colors.text,
  },
  modeTitle: {
    fontSize: normalize(13),
    color: Colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: vnormalize(8),
    paddingHorizontal: normalize(20),
    borderRadius: 20,
    marginTop: vnormalize(10),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(10),
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'none',
  },

  modeIcon: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.button,
    marginBottom: vnormalize(12),
  },
  mode: {
    padding: normalize(20),
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  modesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: normalize(12),
  },

  hsubTitleMid: {
    marginTop: vnormalize(-3),
    marginLeft: normalize(9),
    marginRight: normalize(4),
    fontSize: normalize(27),
    fontFamily: 'Poppins-SemiBold',
  },
  hsubTitle2: {
    marginRight: normalize(15),
    marginBottom: vnormalize(-6),
    marginTop: vnormalize(-3),
    fontSize: normalize(27),
    fontFamily: 'Poppins-Regular',
  },
  hSubContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  hsubTitle: {
    marginBottom: vnormalize(-6),
    marginTop: vnormalize(-3),
    fontSize: normalize(27),
    fontFamily: 'Poppins-Regular',
  },
  Student: {
    marginLeft: normalize(10),
    fontWeight: 'bold',
    color: Colors.button,
    fontSize: normalize(36),
    fontFamily: 'Poppins-Regular',
  },
  Welcome: {
    fontSize: normalize(36),
    fontFamily: 'Poppins-Regular',
  },

  headerSubContainer: {
    flexDirection: 'row',
  },
  header: {
    marginTop: vnormalize(30),
    marginBottom: vnormalize(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(16),
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default styles;
