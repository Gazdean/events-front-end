import { useState } from 'react';
import { createContext } from 'react';

export const MyEventsContext = createContext();

export const MyEventsProvider = ({ children }) => {
  const [myEvents, setMyEvents] = useState([]);

  return (
    <MyEventsContext.Provider value={{ myEvents, setMyEvents }}>
      {children}
    </MyEventsContext.Provider>
  );
};