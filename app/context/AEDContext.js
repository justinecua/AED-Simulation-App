import React, { createContext, useContext, useState } from 'react';
import useAED from '../hooks/useAED';

// Created this so that timer and all the values inside AED wont restart when the user switch pages.
// In short, context provides a global state
const AEDContext = createContext(null);

export const AEDProvider = ({ children }) => {
  const aed = useAED();
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);

  return (
    <AEDContext.Provider
      value={{
        ...aed, // all values from useAED()
        isSwitchOpen,
        setIsSwitchOpen,
      }}
    >
      {children}
    </AEDContext.Provider>
  );
};

export const useAEDContext = () => useContext(AEDContext);
