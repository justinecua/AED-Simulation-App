import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useScenarioContext } from '../../context/ScenarioContext';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScenariosScreen({
  goBack,
  goNewScenario,
  goEditScenario,
}) {
  const { scenarios, deleteScenario } = useScenarioContext();

  // Log scenario delete into instructor sessions
  const saveInstructorScenarioDelete = async scenario => {
    try {
      const newSession = {
        type: 'Scenario Deleted',
        scenarioName: scenario?.name || '(Untitled Scenario)',
        startTime: new Date().toISOString(),
        totalTime: 0,
      };

      const data = await AsyncStorage.getItem('aed_sessions_instructor');
      const sessions = data ? JSON.parse(data) : [];

      sessions.unshift(newSession);

      await AsyncStorage.setItem(
        'aed_sessions_instructor',
        JSON.stringify(sessions),
      );

      console.log('Instructor scenario delete saved!');
    } catch (e) {
      console.log('Error saving scenario delete session:', e);
    }
  };

  const handleEditScenario = scenario => {
    goEditScenario(scenario);
  };

  const handleDeleteScenario = async scenario => {
    await saveInstructorScenarioDelete(scenario);
    deleteScenario(scenario.id);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: '#F8FAFC',
        flexGrow: 1,
      }}
    >
      <Header role="instructor" goBack={goBack} />

      {/* TOP BAR */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0F172A' }}>
          Saved Scenarios
        </Text>

        <TouchableOpacity
          onPress={goNewScenario}
          style={{
            backgroundColor: '#2563EB',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            New
          </Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY STATE */}
      {scenarios.length === 0 ? (
        <Text
          style={{
            color: '#64748B',
            fontSize: 14,
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          No scenarios yet. Tap “New” to get started.
        </Text>
      ) : (
        scenarios.map(s => (
          <TouchableOpacity
            key={s.id}
            onPress={() => handleEditScenario(s)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: '#E2E8F0',
              marginBottom: 14,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              {/* LEFT DETAILS */}
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#0F172A',
                    marginBottom: 4,
                    maxWidth: 280,
                  }}
                >
                  {s.name || '(Untitled Scenario)'}
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: '#64748B',
                    marginBottom: 8,
                    fontSize: 13,
                    lineHeight: 18,
                    maxWidth: 280,
                  }}
                >
                  {s.description || '—'}
                </Text>

                <Text style={{ color: '#475569', fontSize: 13 }}>
                  Rhythm: <Text style={{ fontWeight: '600' }}>{s.rhythm}</Text>
                </Text>

                <Text style={{ color: '#475569', fontSize: 13 }}>
                  Steps:{' '}
                  <Text style={{ fontWeight: '600' }}>{s.steps.length}</Text>
                </Text>
              </View>

              {/* DELETE BUTTON */}
              <TouchableOpacity
                onPress={() => handleDeleteScenario(s)}
                style={{
                  backgroundColor: '#FEE2E2',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{
                    color: '#B91C1C',
                    fontWeight: '700',
                    fontSize: 12,
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
