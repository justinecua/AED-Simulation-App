import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  // HEADER
  topDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  boxIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.color2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
  },
  bluetoothContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  firstLayer: {
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#EAF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondLayer: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#CDE7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  thirdLayer: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#A3D4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fourthLayer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#7ABEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },

  bluetoothText: {
    marginTop: 25,
  },
  Text: {
    color: Colors.text,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  // STUDENTS
  studentContainer: {
    marginTop: 30,
    width: '100%',
  },
  studentCount: {
    color: Colors.text,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  studentCarousel: {
    width: '100%',
  },
  studentDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingRight: 15,
  },
  studentBox: {
    backgroundColor: 'white',
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userBox: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentName: {
    marginTop: 14,
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
  },
  studentId: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
  },
  connectButton: {
    marginTop: 6,
    backgroundColor: Colors.rhythmBackground,
    paddingHorizontal: 30,
    paddingVertical: 7,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },

  noResultContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
  },
  noResultIcon: {
    padding: 20,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  noResultTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#64748B',
    marginBottom: 1,
    textAlign: 'center',
  },
  noResultText: {
    fontSize: 13,
    color: '#94A3B8',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;
