import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ElementDetail.css';

const ElementDetail = () => {
  const [element, setElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { atomicNumber } = useParams();

  console.log('Atomic number received:', atomicNumber);

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
          return;
        }
        setElement(selectedElement);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching element details:', error);
        setIsLoading(false);
      });
  }, [atomicNumber]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!element) {
    return <div>No data available for atomic number {atomicNumber}</div>;
  }

  return (
    <div>
      <h2>{element.name}</h2>
      <p>Symbol: {element.symbol}</p>
      <p>Atomic Number: {element.number}</p>
      <p>Atomic Mass: {element.atomic_mass}</p>
      <p>Category: {element.category}</p>
      <p>Density: {element.density}</p>
      <p>Discovered By: {element.discovered_by}</p>
      <p>Phase: {element.phase}</p>
      <p>Summary: {element.summary}</p>
      {/* Add other properties you want to display */}
    </div>
  );
};

export default ElementDetail;
