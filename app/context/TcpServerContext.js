import React, { createContext, useContext } from 'react';
import useTcpServerEmu from '../hooks/useTcpServerEmu';

const TcpServerContext = createContext(null);

export const TcpServerProvider = ({ children }) => {
  const tcp = useTcpServerEmu();
  return (
    <TcpServerContext.Provider value={tcp}>
      {children}
    </TcpServerContext.Provider>
  );
};

export const useTcpServerContext = () => useContext(TcpServerContext);
