import { useState } from 'react';
import { createContext } from 'react';

export const IsStaffContext = createContext();

export const IsStaffProvider = ({ children }) => {
  const [isStaff, setIsStaff] = useState([]);
  const [isStaffLoading, setIsStaffLoading] = useState(false);
  const [isStaffError, setIsStaffError] = useState(false);

  return (
    <IsStaffContext.Provider value={{ isStaff, setIsStaff, setIsStaffLoading, isStaffLoading, setIsStaffError, isStaffError }}>
      {children}
    </IsStaffContext.Provider>
  );
};