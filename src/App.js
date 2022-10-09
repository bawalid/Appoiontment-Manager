import { useState } from 'react';
import AppointmentManager from './AppointmentManager';
import { DataContext } from './DataContext';

function App() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('appointments')) || []);
  
  return (
    <DataContext.Provider value={{data, setData}}>
      <AppointmentManager />
    </DataContext.Provider>
  );
}

export default App;
