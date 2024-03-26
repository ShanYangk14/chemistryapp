import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import './App.css';
import PeriodicTable from './components/PeriodicTable'; 
import ElementDetail from './components/ElementDetail'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" exact element={<PeriodicTable />} />
            <Route path="/elements/:atomicNumber" element={<ElementDetail />} />

          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
