import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useScenarioContext } from '../../context/ScenarioContext';
import Header from '../../components/Header';

export default function ScenariosScreen({ goBack, goNewScenario, goEditScenario }) {
  const { scenarios } = useScenarioContext();

  const handleEditScenario = (scenario) => {
    goEditScenario(scenario); // This will pass the scenario data to handleNavigation
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16, backgroundColor: '#f5f7fb', flexGrow: 1 }}>
      <Header role="instructor" goBack={goBack} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#2b2f3a' }}>Saved Scenarios</Text>
        <TouchableOpacity onPress={goNewScenario} style={{ backgroundColor: '#1976D2', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>New</Text>
        </TouchableOpacity>
      </View>

      {scenarios.length === 0 ? (
        <Text style={{ color: '#6b7280' }}>No scenarios yet. Tap "New".</Text>
      ) : (
        scenarios.map((s) => (
          <TouchableOpacity
            key={s.id}
            onPress={() => handleEditScenario(s)}
            style={{ backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 4 }}>{s.name || '(Untitled Scenario)'}</Text>
            <Text style={{ color: '#6b7280', marginBottom: 6 }}>{s.description || '—'}</Text>
            <Text style={{ color: '#374151' }}>Rhythm: <Text style={{ fontWeight: '600' }}>{s.rhythm}</Text></Text>
            <Text style={{ color: '#374151' }}>Steps: {s.steps.length}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}