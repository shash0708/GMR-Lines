// LogsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../config';

const LogsContext = createContext();

export const LogsProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${URL}/getlogs/entries`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });

        setLogs(response.data);
        setFilteredLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = logs.filter((log) => {
        const logId = String(log.Toa);
        return logId.toLowerCase().includes(lowerCaseSearchTerm);
      });
      setFilteredLogs(filtered);
    };

    handleSearch();
  }, [searchTerm, logs]);

  const handleSelect = (log) => {
    setSelectedLogs((prev) => {
      const isSelected = prev.includes(log);
      if (isSelected) {
        return prev.filter((selectedLog) => selectedLog !== log);
      }

      if (prev.length >= 7) {
        return prev;
      }

      return [...prev, log];
    });
  };

  return (
    <LogsContext.Provider
      value={{
        logs,
        filteredLogs,
        searchTerm,
        setSearchTerm,
        selectedLogs,
        handleSelect,
        setFilteredLogs,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export default LogsContext;
