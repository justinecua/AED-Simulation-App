import React, { createContext, useContext } from 'react';
import useAEDSimulation from '../hooks/useAEDSimulation';

const SimulationAEDContext = createContext();

export const SimulationAEDProvider = ({ children }) => {
  const simAED = useAEDSimulation();
  return (
    <SimulationAEDContext.Provider value={simAED}>
      {children}
    </SimulationAEDContext.Provider>
  );
};

export const useSimulationAED = () => useContext(SimulationAEDContext);
