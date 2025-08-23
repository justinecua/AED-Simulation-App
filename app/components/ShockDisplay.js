import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/colors';
import { AlertTriangle, Info } from 'lucide-react-native';

const ShockDisplay = () => {
  return (
    <View style={style.alert}>
      <View style={style.alertIcon}>
        <View style={style.boxAlert}>
          <AlertTriangle color="white" size={16} />
        </View>
        <Text style={style.alertText}>Shocked Advised</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 10,
    height: '100%',
    flexDirection: 'row',
  },
});

export default ShockDisplay;
