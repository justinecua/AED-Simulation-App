import React, { createContext, useContext, useState } from 'react';
import useAED from '../hooks/useAED';

// Created this so that timer and all the values inside AED wont restart when the user switch pages.
// In short, context provides a global state
const AEDContext = createContext(null);

export const AEDProvider = ({ children }) => {
  const aed = useAED();
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
    <AEDContext.Provider
      value={{
        ...aed,
        isSwitchOpen,
        setIsSwitchOpen,
        positions,
        setPositions,
        placedPads,
        setPlacedPads,
      }}
    >
      {children}
    </AEDContext.Provider>
  );
};

export const useAEDContext = () => useContext(AEDContext);
