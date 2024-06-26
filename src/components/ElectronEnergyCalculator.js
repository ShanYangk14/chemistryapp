import React, { useState, useEffect } from 'react';
import { calculateEnergy } from './ElectronEnergy.js';
import './ElectronEnergyCalculator.css';
import { Link } from 'react-router-dom';

function ElectronEnergyCalculator() {
  const [selectedElectronConfiguration, setSelectedElectronConfiguration] = useState('');
  const [z, setZ] = useState('');
  const [n, setN] = useState('');
  const [l, setL] = useState('');
  const [energy, setEnergy] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
        const defaultElement = jsonData.elements[0];
        setSelectedElectronConfiguration(defaultElement.electron_configuration);
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateAndSetEnergy = async () => {
      try {
        if (selectedElectronConfiguration && z !== '' && n !== '' && l !== '') {
          const newEnergy = await calculateEnergy(selectedElectronConfiguration, z, n, l);
          setEnergy(newEnergy);
        }
      } catch (error) {
        console.error('Error calculating energy:', error);
      }
    };

    calculateAndSetEnergy();
  }, [selectedElectronConfiguration, z, n, l]);

  const handleElectronConfigurationChange = (e) => {
    const selectedConfig = e.target.value;
    const atomicNumber = CalculateZ(selectedConfig); 
    setZ(atomicNumber);
    setSelectedElectronConfiguration(selectedConfig);
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

  function CalculateZ(a) {
    const energy = a.split(' ').filter(e => e !== '');
    const zNum = energy.reduce((sum, e) => sum + parseInt(e.slice(2, e.length)), 0);
    return zNum;
  }
  
  function SortConfig(a) {
    const energy = a.split(' ').filter(e => e !== '');
    const energySort = energy.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    return energySort.join(' ');
  }

  return (
    <div className="electron-energy-calculator">
      <h2>Electron Energy calculator</h2>
      <div className="input-group">
        <label>
          Electron Configuration (E):
          <select className="dosomething" value={selectedElectronConfiguration} onChange={handleElectronConfigurationChange}>
            {data && data.elements.map((element) => (
              <option key={element.electron_configuration} value={element.electron_configuration}>
                {SortConfig(element.electron_configuration)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="input-group">
        <label>
          Atomic Number (Z):
          <input type="number" value={z} onChange={handleZChange} className="dosomething" readOnly id="ZNum"/>
        </label>
      </div>
      <div className="input-group">
        <label>
          Principal Quantum Number (n):
          <input type="number" value={n} onChange={handleNChange} className="dosomething" />
        </label>
      </div>
      <div className="input-group">
        <label>
          Angular Momentum Quantum Number (l):
          <input type="number" value={l} onChange={handleLChange} className="doshit" />
        </label>
      </div>
      <div className="output-group">
        <p>Energy: {energy !== null ? energy : '---'}</p>
      </div>
      <div className="button-container">
        <Link to="/" className="fancy-link">
          Return to Periodic Table
        </Link>
      </div>
    </div>
  );
}

export default ElectronEnergyCalculator;
