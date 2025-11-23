import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import aedSequences from '../../data/aedSequences';
import Header from '../../components/Header';

export default function DefaultRhythmStepsScreen({ goBack }) {
  const [rhythm, setRhythm] = useState('VFib');

  const steps = aedSequences[rhythm] || [];

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f7fb' }}>
      <Header role="instructor" goBack={goBack} />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 10 }}>
          AED Default Rhythms
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(aedSequences).map(r => (
            <TouchableOpacity
              key={r}
              onPress={() => setRhythm(r)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 18,
                backgroundColor: rhythm === r ? '#4A90E2' : '#ddd',
                borderRadius: 10,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  color: rhythm === r ? '#fff' : '#333',
                }}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={{ marginTop: 20, fontSize: 16, fontWeight: '600' }}>
          Default Steps for {rhythm}
        </Text>

        <ScrollView style={{ marginTop: 10 }}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#fff',
                padding: 14,
                marginBottom: 10,
                borderRadius: 8,
                elevation: 2,
              }}
            >
              <Text style={{ fontWeight: '600' }}>{step.text}</Text>
              <Text style={{ fontSize: 12, marginTop: 2, opacity: 0.7 }}>
                action: {step.action}
                {step.flashing ? ' • flashing' : ''}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
