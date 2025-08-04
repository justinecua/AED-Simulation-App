import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  ChevronLeft,
  BadgeInfo,
  BluetoothSearching,
  UserPen,
} from 'lucide-react-native';
import Colors from '../../constants/colors';

const ConnectToStudentScreen = () => {
  return (
    <View style={style.container}>
      {/* TOP DISPLAY */}
      <View style={style.topDisplay}>
        <View style={style.boxIcon}>
          <ChevronLeft color={Colors.button} size={22} />
        </View>
        <Text style={style.topText}>Nearby Devices</Text>
        <View style={style.boxIcon}>
          <BadgeInfo color={Colors.button} size={22} />
        </View>
      </View>
      {/* BLUETOOTH */}
      <View style={style.bluetoothContainer}>
        <View style={style.firstLayer}>
          <View style={style.secondLayer}>
            <View style={style.thirdLayer}>
              <View style={style.fourthLayer}>
                <View style={style.iconCircle}>
                  <BluetoothSearching color="white" size={30} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={style.bluetoothText}>
        <Text style={style.Text}>Looking for students...</Text>
      </View>
      {/* STUDENT LIST */}
      <View style={style.studentContainer}>
        <Text style={style.studentCount}>3 Students Found</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style.studentCarousel}
        contentContainerStyle={style.studentDisplay}
      >
        {/* STUDENT 1 */}
        <View style={style.studentBox}>
          <View style={style.userBox}>
            <UserPen color="#fff" size={28} />
          </View>
          <View style={style.textBox}>
            <Text style={style.studentName}>Student 1</Text>
            <Text style={style.studentId}>ID#000001</Text>
          </View>
          <TouchableOpacity
            style={style.connectButton}
            onPress={() => console.log('Button Pressed')}
          >
            <Text style={style.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
        {/* STUDENT 2 */}
        <View style={style.studentBox}>
          <View style={style.userBox}>
            <UserPen color="#fff" size={28} />
          </View>
          <View style={style.textBox}>
            <Text style={style.studentName}>Student 2</Text>
            <Text style={style.studentId}>ID#000002</Text>
          </View>
          <TouchableOpacity
            style={style.connectButton}
            onPress={() => console.log('Button Pressed')}
          >
            <Text style={style.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
        {/* STUDENT 3 */}
        <View style={style.studentBox}>
          <View style={style.userBox}>
            <UserPen color="#fff" size={28} />
          </View>
          <View style={style.textBox}>
            <Text style={style.studentName}>Student 3</Text>
            <Text style={style.studentId}>ID#000003</Text>
          </View>
          <TouchableOpacity
            style={style.connectButton}
            onPress={() => console.log('Button Pressed')}
          >
            <Text style={style.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
  },
  // HEADER STYLE
  topDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    paddingHorizontal: 5,
    marginTop: 25,
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
  // BLUETOOTH STYLE
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
  studentContainer: {
    marginTop: 30,
    width: '80%',
    height: 'auto',
  },
  studentCount: {
    color: Colors.text,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  // STUDENT CAROUSEL
  studentCarousel: {
    width: '90%',
    paddingLeft: 10,
    marginBottom: 60,
  },
  studentDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingRight: 15,
  },
  studentBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    width: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 15,
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default ConnectToStudentScreen;
