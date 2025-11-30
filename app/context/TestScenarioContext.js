import React, { createContext, useContext, useState } from 'react';
import useAEDTestScenario from '../hooks/useAEDTestScenario';

const TestScenarioContext = createContext(null);

export const TestScenarioProvider = ({ children }) => {
  const test = useAEDTestScenario();

  // NEW: currently selected scenario
  const [currentScenario, setCurrentScenario] = useState(null);

  // Extra UI states same as AEDProvider
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const [placedPads, setPlacedPads] = useState({
    'Pad 1': false,
    'Pad 2': false,
  });
  const [positions, setPositions] = useState({
    'Pad 1': { x: 15, y: 10 },
    'Pad 2': { x: 10, y: 75 },
  });

  return (
    <TestScenarioContext.Provider
      value={{
        currentScenario,
        setCurrentScenario,
        isSwitchOpen,
        setIsSwitchOpen,
        placedPads,
        setPlacedPads,
        positions,
        setPositions,
        ...test, // MUST BE LAST — NEVER FIRST
      }}
    >
      {children}
    </TestScenarioContext.Provider>
  );
};

export const useTestScenario = () => useContext(TestScenarioContext);
