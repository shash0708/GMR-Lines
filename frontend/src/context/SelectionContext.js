import React, { createContext, useState, useContext } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedEntries, setSelectedEntries] = useState([]);

  const handleSelect = (entry) => {
    setSelectedEntries(prev => {
      if (prev.includes(entry)) {
        return prev.filter(e => e !== entry);
      }
      if (prev.length >= 7) {
        return prev;
      }
      return [...prev, entry];
    });
  };

  return (
    <SelectionContext.Provider value={{ selectedEntries, setSelectedEntries,handleSelect }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);

export default SelectionContext;