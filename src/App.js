import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PeriodicTable from './components/PeriodicTable'; 
import ElementDetail from './components/ElementDetail'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<PeriodicTable />} />
            <Route path="/element/:atomicNumber" element={<ElementDetail />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
