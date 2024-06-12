import { useState } from 'react';
import { createContext } from 'react';

export const MyEventsContext = createContext();

export const MyEventsProvider = ({ children }) => {
  const [myEvents, setMyEvents] = useState([]);
  const [myEventsLoading, setMyEventsLoading] = useState(false);
  const [myEventsError, setMyEventsError] = useState(false);

  return (
    <MyEventsContext.Provider value={{ myEvents, setMyEvents, setMyEventsLoading, myEventsLoading, setMyEventsError, myEventsError }}>
      {children}
    </MyEventsContext.Provider>
  );
};