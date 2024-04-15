import React, { useState, useEffect } from 'react';
import { calculateEnergy } from './ElectronEnergy.js';
import './ElectronEnergyCalculator.css';
import { Link } from 'react-router-dom';

function ElectronEnergyCalculator()  {
  const [e, setE] = useState('');
  const [z, setZ] = useState('');
  const [n, setN] = useState('');
  const [l, setL] = useState('');
  const [energy, setEnergy] = useState(null);
  const [/*defaultE*/, setDefaultE] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data.json');
        const data = await response.json();
        const elements = data.elements;

        const selectedE = e || elements[0].electron_configuration;

        setE(selectedE); 
        setDefaultE(selectedE); 

        const defaultEnergy = calculateEnergy(selectedE, z, n, l);
        setEnergy(defaultEnergy);
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };

    fetchData(); 
  }, [z, n, l, e]); 

  const handleEChange = (e) => {
    setE(e.target.value);
  };

  const handleZChange = (e) => {
    setZ(parseInt(e.target.value));
  };

  const handleNChange = (e) => {
    setN(parseInt(e.target.value));
  };

  const handleLChange = (e) => {
    setL(parseInt(e.target.value));
  };

  return (
      
        <div className="electron-energy-calculator">
      <h2>Electron Energy calculator</h2>
      <div className="input-group">
      <label className='doshit'>
          Electron Configuration (E):
          <input className ="dosomething"type="text" value={e} onChange={handleEChange} maxLength="100" />
        </label>
      </div>
      <div className="input-group">
        <label>
          Atomic Number (Z):
          <input type="number" value={z} onChange={handleZChange} />
        </label>
      </div>
      <div className="input-group">
        <label>
          Principal Quantum Number (n):
          <input type="number" value={n} onChange={handleNChange} />
        </label>
      </div>
      <div className="input-group">
        <label>
          Angular Momentum Quantum Number (l):
          <input type="number" value={l} onChange={handleLChange} />
        </label>
      </div>
      {energy !== null && (
        <div className="output-group">
          <p>Energy: {energy}</p>
        </div>
      )}
      <div className="button-container">
        <Link to="/" className="fancy-link">Return to Periodic Table</Link>
      </div>
    </div>
  );
}

export default ElectronEnergyCalculator;
