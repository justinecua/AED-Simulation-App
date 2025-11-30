import React, { createContext } from 'react';
import useAEDPractice from '../hooks/useAEDpractice';

export const AEDPracticeContext = createContext();

export const AEDPracticeProvider = ({ children }) => {
  const aed = useAEDPractice();
  return (
    <AEDPracticeContext.Provider value={aed}>
      {children}
    </AEDPracticeContext.Provider>
  );
};
