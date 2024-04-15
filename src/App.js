import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PeriodicTable from './components/PeriodicTable'; 
import ElementDetail from './components/ElementDetail'; 
import ElectronEnergyCalculator from './components/ElectronEnergyCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<PeriodicTable />} />
            <Route path="/element/:atomicNumber" element={<ElementDetail />} />
            <Route path="/electron-energy-calculator" element={<ElectronEnergyCalculator />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
