// LogsContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import URL from '../components/config';
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
            'auth-token': localStorage.getItem('auth-token'),
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
      const searchTermLower = searchTerm.toLowerCase().trim();
      
      if (!searchTermLower) {
        setFilteredLogs(logs);
        return;
      }

      const filtered = logs.filter(log => {
        // Search in all fields
        return Object.entries(log).some(([key, value]) => {
          // Skip non-searchable fields
          if (key === '_id' || key === '__v' || key === 'user') return false;
          
          // Handle null/undefined values
          if (value === null || value === undefined) return false;
          
          // Handle objects (like ATC)
          if (typeof value === 'object') {
            return Object.values(value).some(v => 
              String(v).toLowerCase().includes(searchTermLower)
            );
          }
          
          // Handle dates
          if (key === 'dateTime') {
            const date = new Date(value);
            const formattedDate = date.toLocaleDateString();
            return formattedDate.toLowerCase().includes(searchTermLower);
          }
          
          // Handle all other fields
          return String(value).toLowerCase().includes(searchTermLower);
        });
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
        setSelectedLogs,
        handleSelect,
        setFilteredLogs,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export default LogsContext;
