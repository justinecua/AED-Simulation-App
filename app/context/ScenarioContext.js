import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScenarioContext = createContext();

export const ScenarioProvider = ({ children }) => {
  const [scenarios, setScenarios] = useState([]);

  // Load scenarios from storage on app start
  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const storedScenarios = await AsyncStorage.getItem('savedScenarios');
      if (storedScenarios) {
        setScenarios(JSON.parse(storedScenarios));
      }
    } catch (error) {
      console.error('Failed to load scenarios:', error);
    }
  };

  const saveScenariosToStorage = async (newScenarios) => {
    try {
      await AsyncStorage.setItem('savedScenarios', JSON.stringify(newScenarios));
    } catch (error) {
      console.error('Failed to save scenarios:', error);
    }
  };

  const addScenario = async (scenario) => {
    const newScenario = {
      ...scenario,
      id: String(Date.now()), // Add unique ID
    };
    const newScenarios = [...scenarios, newScenario];
    setScenarios(newScenarios);
    await saveScenariosToStorage(newScenarios);
  };

  const updateScenario = async (id, updatedScenario) => {
    const newScenarios = scenarios.map(s => 
      s.id === id ? { ...updatedScenario, id } : s
    );
    setScenarios(newScenarios);
    await saveScenariosToStorage(newScenarios);
  };

  const deleteScenario = async (id) => {
    const newScenarios = scenarios.filter(s => s.id !== id);
    setScenarios(newScenarios);
    await saveScenariosToStorage(newScenarios);
  };

  return (
    <ScenarioContext.Provider value={{
      scenarios,
      addScenario,
      updateScenario,
      deleteScenario,
    }}>
      {children}
    </ScenarioContext.Provider>
  );
};

export const useScenarioContext = () => {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error('useScenarioContext must be used within a ScenarioProvider');
  }
  return context;
};