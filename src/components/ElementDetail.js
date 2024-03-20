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
        console.log('Fetched data:', data); // Log fetched data here
        const selectedElement = data.find(el => el.atomicNumber === parseInt(atomicNumber));
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
    <p>Atomic Number: {element.atomicNumber}</p>
    <p>Atomic Mass: {element.atomicMass}</p>
    <p>Electronic Configuration: {element.electronicConfiguration}</p>
    <p>Electronegativity: {element.electronegativity}</p>
    <p>Atomic Radius: {element.atomicRadius}</p>
    <p>Ion Radius: {element.ionRadius}</p>
    <p>Van der Waals Radius: {element.vanDerWaalsRadius}</p>
    <p>Ionization Energy: {element.ionizationEnergy}</p>
    <p>Electron Affinity: {element.electronAffinity}</p>
    <p>Oxidation States: {element.oxidationStates}</p>
    <p>Standard State: {element.standardState}</p>
    <p>Bonding Type: {element.bondingType}</p>
    <p>Melting Point: {element.meltingPoint}</p>
    <p>Boiling Point: {element.boilingPoint}</p>
    <p>Density: {element.density}</p>
    <p>Group Block: {element.groupBlock}</p>
    <p>Year Discovered: {element.yearDiscovered}</p>
  </div>
  );
};

export default ElementDetail;
