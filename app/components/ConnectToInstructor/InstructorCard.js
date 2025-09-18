import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserRoundPen } from 'lucide-react-native';
import styles from '../../styles/connectToInstructorStyles';

const InstructorCard = ({ name, id, onConnect }) => {
  return (
    <View style={styles.studentBox}>
      <View style={styles.userBox}>
        <UserRoundPen color="#fff" size={24} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentId}>{id}</Text>
      </View>
      {onConnect && (
        <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InstructorCard;
