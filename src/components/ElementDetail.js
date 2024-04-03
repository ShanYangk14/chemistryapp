import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from 'react-three-fiber'; 
import AtomModel from './AtomModel';
import './ElementDetail.css';

const ElementDetail = () => {
  const [element, setElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { atomicNumber } = useParams();
  const ElementGroup  = ["IA", "IIA", "IIIB", "IVB", "VB", "VIB", "VIIB", "VIIIB", "VIIIB", "VIIIB", "IB", "IIB", "IIIA", "IVA", "VA", "VIA", "VIIA", "VIIIA"]  

  useEffect(() => {
    if (!atomicNumber) {
      setIsLoading(false);
      return;
    }
  
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch element details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        const selectedElement = data.elements.find(el => el.number === parseInt(atomicNumber));
        if (!selectedElement) {
          console.error('Element not found for atomic number:', atomicNumber);
          setIsLoading(false);
          setError('Element not found');
          return;
        }
        setElement(selectedElement);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching element details:', error);
        setIsLoading(false);
        setError('Failed to fetch element details');
      });
  }, [atomicNumber]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!element) {
    return <div>No data available for atomic number {atomicNumber}</div>;
  }

  return (
    <div className="element-detail">
      <div className="info">
        <h2>{element.name}</h2>
        <p><strong>Atomic Number:</strong> {element.number}</p>
        <p><strong>Symbol:</strong> {element.symbol}</p>
        <p><strong>Electron Config Semantic:</strong> {element.electron_configuration_semantic}</p>
        <p><strong>Period:</strong> {element.period}</p>
        <p><strong>Group:</strong> {ElementGroup[(element.group % 18) + Math.floor(element.group / 18) - 1]}</p>
        <p><strong>Atomic Mass:</strong> {element.atomic_mass}</p>
        <p><strong>Category:</strong> {element.category}</p>
        <p><strong>Phase:</strong> {element.phase}</p>
        <p><strong>Density:</strong> {element.density}</p>
        <p><strong>Boil:</strong> {element.boil}</p>
        <p><strong>Melt:</strong> {element.melt}</p>
        <p><strong>Discovered By:</strong> {element.discovered_by}</p>
        <p><strong>Summary:</strong> {element.summary}</p>
        <p><strong>More Info:</strong> <a href={element.source} target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
      </div>
      <div className="canvas-container">
        <Canvas>
          <AtomModel atomicNumber={atomicNumber} /> 
        </Canvas>
      </div>
    </div>
  );
};

export default ElementDetail;
