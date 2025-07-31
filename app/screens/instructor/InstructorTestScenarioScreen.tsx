import React from 'react';
import Colors from '../../constants/colors';
import { StyleSheet, View, Text, Image } from 'react-native';
import {
  ArrowLeft,
  User,
  Timer,
  Play,
  Square,
  Power,
  Volume2,
  ChevronUp,
  ChevronDown,
  Zap,
  AlertTriangle,
} from 'lucide-react-native';

const InstructorTestScenarioScreen = () => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.boxIcon}>
          <ArrowLeft color={Colors.button} size={25} />
        </View>
        <View style={style.wrapper}>
          <View style={style.boxUser}>
            <User color="white" size={25} />
          </View>
          <Text style={style.headerText}>Instructor</Text>
        </View>
      </View>

      <View style={style.content}>
        <View style={style.contentButton}>
          <Text style={style.contentText}>Test Scenario Mode</Text>
          <Text style={style.contentText}>Change Scenario</Text>
        </View>
        <View style={style.wrapperButton}>
          <View>
            <View style={style.timerIcon}>
              <Timer color={Colors.text} size={25} />
              <Text style={style.timerText}>1:58</Text>
            </View>
          </View>
          <View style={style.button}>
            <View style={style.boxPlay}>
              <Play color="white" size={25} />
            </View>
            <View style={style.boxStop}>
              <Square color="white" size={25} />
            </View>
          </View>
        </View>

        <View style={style.tone}>
          <View style={style.toneIcon}>
            <View style={style.boxTone}>
              <Volume2 color="white" size={16} />
            </View>
            <Text style={style.toneText}>Push to match the tone</Text>
          </View>
        </View>

        <View style={style.aedBox}>
          <View style={style.aedScreen}>
            <Image
              source={require('../../assets/images/waveform.png')}
              style={style.waveformImage}
              resizeMode="contain"
            />
            <View style={style.hrBox}>
              <Text style={style.hrLabel}>HR</Text>
              <Text style={style.hrValue}>N/A</Text>
            </View>
          </View>

          <View style={style.aedControls}>
            <View style={style.controlBox}>
              <View style={style.powerBtn}>
                <Power color="#fff" size={17} />
              </View>
              <View style={style.joulesBox}>
                <View style={style.joulesArrow}>
                  <ChevronUp color="black" size={13} />
                  <ChevronDown color="black" size={13} />
                </View>
                <Text style={style.jouleText}>150 J</Text>
              </View>
            </View>
            <View style={style.aedTextBox}>
              <Text style={style.aedText}>AED</Text>
              <View style={style.shockButton}>
                <Zap color="#fff" size={17} />
              </View>
            </View>
          </View>
        </View>

        <View style={style.alert}>
          <View style={style.alertIcon}>
            <View style={style.boxAlert}>
              <AlertTriangle color="white" size={16} />
            </View>
            <Text style={style.alertText}>Shocked Advised</Text>
          </View>
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 130,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.rhythmBackground,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  headerText: {
    color: Colors.rhythmBackground,
    backgroundColor: '#F4F6FA',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },

  content: {
    padding: 15,
    marginTop: 15,
    width: '86%',
    height: '80%',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  contentButton: {
    flexDirection: 'row',
    gap: 60,
    marginTop: 5,
  },
  contentText: {
    fontSize: 11,
    backgroundColor: '#fff',
    color: Colors.text,
    fontWeight: '600',
    padding: 8,
    borderRadius: 7,
  },
  wrapperButton: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 155,
  },
  timerIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    gap: 2,
  },
  timerText: {
    marginTop: 2,
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

  tone: {
    marginTop: 50,
    alignItems: 'center',
  },
  boxTone: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.button,
  },
  toneIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    gap: 7,
  },
  toneText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },

  aedBox: {
    marginTop: 25,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
  },
  aedScreen: {
    width: '100%',
    height: 130,
    backgroundColor: Colors.rhythmBackground,
    borderRadius: 10,
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  waveformImage: {
    width: 383,
    height: 400,
    marginTop: 60,
    right: 59,
  },
  hrBox: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hrLabel: {
    fontSize: 8,
    color: '#888',
    fontWeight: 'bold',
  },
  hrValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.rhythmBackground,
  },

  aedControls: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 45,
    alignItems: 'center',
  },
  controlBox: {
    flexDirection: 'row',
    gap: 5,
  },
  powerBtn: {
    width: 35,
    height: 35,
    backgroundColor: '#2F3E46',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerText: {
    color: '#fff',
    fontSize: 20,
  },
  joulesBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 7,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  joulesArrow: {
    gap: -10,
  },
  jouleText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 2,
    backgroundColor: Colors.rhythmBackground,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#fff',
  },
  aedTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B2A37',
  },
  shockButton: {
    width: 25,
    height: 25,
    backgroundColor: '#FFA500',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alert: {
    marginTop: 70,
    alignItems: 'center',
  },
  boxAlert: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFA310',
  },
  alertIcon: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    gap: 7,
  },
  alertText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});

export default InstructorTestScenarioScreen;
