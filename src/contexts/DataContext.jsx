import { createContext, useEffect, useState } from 'react';

const DataContext = createContext();

function DataProvider({ children }) {
  const [templates, setTemplates] = useState({});
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);
  const [variables, setVariables] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/db.json')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates || {});
        setOffers(data.offers || []);
        setUsers(data.users || []);
        setVariables(data.variables || {});
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        alert('Data load failed. Make sure JSON server is running.');
      });
  }, []);

  return (
    <DataContext.Provider value={{ templates, offers, users, variables }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataProvider };
