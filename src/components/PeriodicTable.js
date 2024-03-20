import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PeriodicTable.css';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setElements(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);  

  const handleClick = (atomicNumber) => {
    console.log('Atomic number clicked:', atomicNumber);
    navigate(`/element/${atomicNumber}`);
  };

  return (
    <div>
      <fieldset className="element-legend">
        <legend>Colors for different element groups</legend>
        <div className="element-color alkali-metal">Alkali Metal</div>
        <div className="element-color alkaline-earth-metal">Alkaline Earth Metal</div>
        <div className="element-color transition-metal">Transition Metal</div>
        <div className="element-color lanthanoid">Lanthanoid</div>
        <div className="element-color actinoid">Actinoid</div>
        <div className="element-color nonmetal">Nonmetal</div>
        <div className="element-color metalloid">Metalloid</div>
        <div className="element-color post-transition-metal">Post-Transition Metal</div>
        <div className="element-color halogen">Halogen</div>
        <div className="element-color noble-gas">Noble Gas</div>
        <div className="element-color metal">Metal</div>
      </fieldset>

      <div className="periodic-table">
        {elements.map(element => (
          <div
            className={`element ${element.groupBlock.toLowerCase().replace(/\s+/g, '-')}`}
            key={element.atomicNumber}
            style={{ gridRow: element.period, gridColumn: element.group }}
            onClick={() => handleClick(element.atomicNumber)}
          >
            <span className="symbol">{element.symbol}</span>
            <span className="name">{element.name}</span>
            <span className="period">{element.period}</span>
            <span className="group">{element.group}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
