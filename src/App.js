import React, { useEffect } from 'react';
import { DashboardContext } from "./context/Context";

// Containers
import Dashboard from './containers/Dashboard';


function App() {
  const [pulledData, setPulledData] = React.useState({});

  const callAPI = () => {
    fetch("http://localhost:4000/results")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setPulledData(response);
      });
  };

  useEffect(() => {
    callAPI()
  }, []);

  if (pulledData !== {}) {
    return (
      <DashboardContext.Provider value={pulledData}>
        <Dashboard />
      </DashboardContext.Provider>
    );
  }
}

export default App;
