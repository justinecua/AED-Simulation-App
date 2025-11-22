import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

export default function FinishDialog({ visible, onRetry, onHome }) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 260,
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Simulation Complete
          </Text>

          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            You've completed all the steps.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#007bff',
              width: '100%',
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
            onPress={onRetry}
          >
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
              Try Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#aaa',
              width: '100%',
              padding: 10,
              borderRadius: 8,
            }}
            onPress={onHome}
          >
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
