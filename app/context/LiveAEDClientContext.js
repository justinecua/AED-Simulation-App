import React, { createContext, useContext } from 'react';
import useLiveAEDClient from '../hooks/useLiveAEDClient';

const LiveAEDClientContext = createContext(null);

export const LiveAEDClientProvider = ({ children }) => {
  const value = useLiveAEDClient();
  return (
    <LiveAEDClientContext.Provider value={value}>
      {children}
    </LiveAEDClientContext.Provider>
  );
};

export const useLiveAEDClientContext = () => useContext(LiveAEDClientContext);
