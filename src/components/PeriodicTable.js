import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './PeriodicTable.css';

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setElements(data.elements))
      .catch(error => console.error('Error fetching data:', error));
  }, []);  

  const handleClick = (number) => {
    console.log('Atomic number clicked:', number);
    navigate(`/element/${number}`);
    const hovered = elements.find(element => element.number === number);
    setHoveredElement(hovered);
  };


  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'alkali metal':
        return 'category-alkali-metal';
      case 'alkaline earth metal':
        return 'category-alkaline-earth-metal';
      case 'transition metal':
        return 'category-transition-metal';
      case 'lanthanide':
        return 'category-lanthanide';
      case 'actinide':
        return 'category-actinide';
      case 'diatomic nonmetal':
        return 'category-diatomic-nonmetal';
      case 'metalloid':
        return 'category-metalloid';
      case 'post-transition metal':
        return 'category-post-transition-metal';
      case 'noble gas':
        return 'category-noble-gas';
      case 'polyatomic nonmetal':
        return 'category-polyatomic-nonmetal';
      default:
        return 'category-unknown';
    }
  };

  return (
    <div>
       <fieldset className="element-legend">
         <legend>Category</legend>
         <div className="element-color category-alkali-metal">Alkali Metal</div>
         <div className="element-color category-alkaline-earth-metal">Alkaline Earth Metal</div>
         <div className="element-color category-transition-metal">Transition Metal</div>
         <div className="element-color category-lanthanide">Lanthanide</div>
         <div className="element-color category-actinide">Actinide</div>
         <div className="element-color category-diatomic-nonmetal">Diatomic Nonmetal</div>
         <div className="element-color category-metalloid">Metalloid</div>
         <div className="element-color category-post-transition-metal">Post-Transition Metal</div>
         <div className="element-color category-noble-gas">Noble Gas</div>
         <div className="element-color category-polyatomic-nonmetal">Polyatomic Nonmetal</div>
         <div className="element-color category-unknown">Unknown</div>
       </fieldset>
       <div className="electron-energy-link">
        <Link to="/electron-energy-calculator" className="fancy-link">Go to Electron Energy Calculator</Link>
      </div>
       <div className="periodic-table">
        {Array.isArray(elements) && elements.map(element => (
          <div
            className={`element ${getCategoryColor(element.category)}`}
            key={element.number}
            style={{ gridArea: `${element.ypos} / ${element.xpos}` }}
            onClick={() => handleClick(element.number)} 
           
          >
            <span className="number">{element.number}</span>
            <span className="symbol">{element.symbol}</span>
            <span className="name">{element.name}</span>
          </div>
        ))}
      </div>
      <div className="element-info-panel">
        {hoveredElement && (
          <div>
            <h2>{hoveredElement.name}</h2>
            <p>Symbol: {hoveredElement.symbol}</p>
            <p>Atomic Number: {hoveredElement.number}</p>
            <p>Atomic Mass: {hoveredElement.atomic_mass}</p>
            <p>Category: {hoveredElement.category}</p>
            <p>Density: {hoveredElement.density}</p>
            <p>Discovered By: {hoveredElement.discovered_by}</p>
            <p>Phase: {hoveredElement.phase}</p>
            <p>Summary: {hoveredElement.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodicTable;
