import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Colors from '../../constants/colors';
import { ChevronLeft, User, Info, TriangleAlert } from 'lucide-react-native';

const PadPlacementScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.returnButton}>
          <ChevronLeft
            color={Colors.button}
            size={Dimensions.get('window').width * 0.065}
          />
        </View>
        <View style={styles.rightBox}>
          <View style={styles.userCircle}>
            <User color="#fff" size={Dimensions.get('window').width * 0.075} />
          </View>
          <View style={styles.userTypeBox}>
            <Text style={styles.userType}>Student</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.descriptionBox}>
            <Text style={styles.description}>AED Mode</Text>
          </View>
          <View style={styles.infoIcon}>
            <Info color="grey" size={Dimensions.get('window').width * 0.05} />
          </View>
        </View>
        <View style={styles.placementContainer}>
          <View style={styles.instructionBox}>
            <Text style={styles.instruction}>
              DRAG THE PADS ON THE CORRECT POSITION
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <Image
              source={require('../../assets/images/padplacementModel.png')}
              style={styles.bodyImage}
            />
          </View>
          <View style={styles.padsContainer}>
            <View style={styles.verticalPad}>
              <Text style={styles.pad}>Pad #</Text>
            </View>
            <View style={styles.horizontalPad}>
              <Text style={styles.pad}>Pad #</Text>
            </View>
          </View>
        </View>
        <View style={styles.alertBox}>
          <View style={styles.alertIcon}>
            <TriangleAlert
              color="#fff"
              size={Dimensions.get('window').width * 0.038}
            />
          </View>
          <Text style={styles.alert}>Oops, Wrong Placement</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  returnButton: {
    backgroundColor: Colors.color2,
    padding: 10,
    borderRadius: 50,
  },

  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  userCircle: {
    backgroundColor: Colors.button,
    padding: 10,
    borderRadius: 50,
  },

  userTypeBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: Colors.subText,
  },

  userType: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: Colors.button,
  },

  contentContainer: {
    backgroundColor: Colors.background,
    width: '100%',
    padding: 15,
    flexDirection: 'column',
    borderRadius: 10,
    gap: 35,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },

  descriptionBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 10,
  },

  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.text,
  },

  infoIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },

  placementContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },

  instructionBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },

  instruction: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.text,
  },

  bodyContainer: {
    width: '100%',
    alignItems: 'center',
  },

  bodyImage: {
    width: 430,
    height: 470,
    resizeMode: 'contain',
  },

  padsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  verticalPad: {
    backgroundColor: Colors.heartRateBackground,
    paddingVertical: 23,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  horizontalPad: {
    backgroundColor: Colors.heartRateBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  pad: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 8,
  },

  alertBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },

  alertIcon: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 50,
  },

  alert: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text,
  },
});

export default PadPlacementScreen;
