import React, { createContext, useContext, useState, useEffect } from 'react';

const LogContext = createContext();

export const useLogs = () => {
  return useContext(LogContext);
};

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${URL}/getlogs/entries`, {
          method: 'GET',
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });

        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <LogContext.Provider value={{ logs, selectedLogs, setSelectedLogs }}>
      {children}
    </LogContext.Provider>
  );
};
