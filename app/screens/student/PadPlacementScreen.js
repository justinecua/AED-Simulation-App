import React from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import { Info, TriangleAlert } from 'lucide-react-native';

import styles from '../../styles/PadPlacementStyle';
import Header from '../../components/Header';

const PadPlacementScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header role="student" />

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

export default PadPlacementScreen;
