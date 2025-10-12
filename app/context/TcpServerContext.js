import React, { createContext, useContext } from 'react';
import useTcpServer from '../hooks/useTcpServer';

const TcpServerContext = createContext(null);

export const TcpServerProvider = ({ children }) => {
  const server = useTcpServer();
  return (
    <TcpServerContext.Provider value={server}>
      {children}
    </TcpServerContext.Provider>
  );
};

export const useTcpServerContext = () => useContext(TcpServerContext);
