import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = size => Math.round(size * scale);

const circleSize = normalize(50);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: normalize(20),
  },
  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(16),
  },
  header: {
    marginTop: normalize(30),
    marginBottom: normalize(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerSubContainer: {
    flexDirection: 'row',
  },
  Welcome: {
    fontSize: normalize(36),
    fontFamily: 'Poppins-Regular',
  },
  Student: {
    marginLeft: normalize(10),
    fontWeight: 'bold',
    color: Colors.rhythmBackground,
    fontSize: normalize(36),
    fontFamily: 'Poppins-Regular',
  },
  hSubContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  hsubTitle: {
    marginBottom: normalize(-6),
    marginTop: normalize(-3),
    fontSize: normalize(27),
    fontFamily: 'Poppins-Regular',
  },
  hsubTitleMid: {
    marginTop: normalize(-3),
    marginLeft: normalize(9),
    marginRight: normalize(4),
    fontSize: normalize(27),
    fontFamily: 'Poppins-SemiBold',
  },
  hsubTitle2: {
    marginRight: normalize(15),
    marginBottom: normalize(-6),
    marginTop: normalize(-3),
    fontSize: normalize(27),
    fontFamily: 'Poppins-Regular',
  },
  modesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: normalize(12),
  },
  mode: {
    padding: normalize(20),
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: normalize(15),
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  modeIcon: {
    width: circleSize,
    height: circleSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: circleSize / 2,
    backgroundColor: Colors.rhythmBackground,
    marginBottom: normalize(12),
  },
  modeTitle: {
    fontSize: normalize(13),
    color: Colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  modeDescription: {
    fontFamily: 'Poppins',
    fontSize: normalize(13),
    marginBottom: normalize(5),
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.rhythmBackground,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(20),
    marginTop: normalize(10),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(11),
    fontFamily: 'Poppins-SemiBold',
  },
  recentSessionsContainer: {
    padding: normalize(16),
    borderRadius: normalize(10),
    marginTop: normalize(15),
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  rscTitleText: {
    color: Colors.rhythmBackground,
    fontWeight: '700',
    fontSize: normalize(15),
  },
  rsCard: {
    borderRadius: normalize(10),
    padding: normalize(10),
    marginTop: normalize(10),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.recentSessionCard,
  },
  rsCardSub: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rscIcon: {
    width: circleSize,
    height: circleSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: circleSize / 2,
    backgroundColor: Colors.rhythmBackground,
  },
  rsDetails: {
    marginLeft: normalize(10),
  },
  rsDetailsTitle: {
    fontWeight: '700',
    fontSize: normalize(15),
  },
  rsDetailsDate: {
    fontSize: normalize(12.5),
  },
});

export default styles;
