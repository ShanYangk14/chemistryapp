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
    <div>
      <div className="canvas-container">
        <Canvas>
          <AtomModel atomicNumber={atomicNumber} /> 
        </Canvas>
      </div>
      <h2>{element.name}</h2>
      <p>Atomic Number: {element.number}</p>
      <p>Symbol: {element.symbol}</p>
      <p>Electron Config Semantic: {element.electron_configuration_semantic}</p>
      <p>Period: {element.period}</p>
      <p>Group: {ElementGroup[(element.group % 18) + Math.floor(element.group / 18 ) - 1]}</p>
      <p>Atomic Mass: {element.atomic_mass}</p>
      <p>Category: {element.category}</p>
      <p>Phase: {element.phase}</p>
      <p>Density: {element.density}</p>
      <p>Boil: {element.boil}</p>
      <p>Melt: {element.melt}</p>
      <p>Discovered By: {element.discovered_by}</p>
      <p>Summary: {element.summary}</p>
      <p>More Info: <a href={element.source} target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
    </div>
  );
};

export default ElementDetail;
