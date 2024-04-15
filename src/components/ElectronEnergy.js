import React, { useState, useEffect } from 'react';

function N_s(n) {
  switch (n) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 3.7;
    case 5:
      return 4;
    case 6:
      return 4.2;
    default:
      return 0;
  }
}

export function calculateEnergy(a, z, n, l) {
  const energy = a.split(" ").filter(e => e !== "");

  const max_n = Math.max(...energy.map(e => parseInt(e[0])));

  const energy_level = new Array(max_n + 1).fill(0);
  for (const e of energy) {
    const nn = parseInt(e[0]);
    const mm = parseInt(e.substring(2));
    energy_level[nn] += mm;
  }

  const sumenegy = new Array(max_n + 1).fill(0);
  for (let i = 1; i <= max_n; i++) {
    sumenegy[i] = sumenegy[i - 1] + energy_level[i];
  }

  if (n === 1 && l === 0) {
    let n_l = energy
    .filter(e => e[0] === n.toString()[0] && (e[1] === 's'))
    .map(e => parseInt(e.substring(2)))
    .reduce((sum, val) => sum + val, 0);
  n_l = (n_l - 1) * 0.3;
  const z_s = z - n_l;
  const n_s = N_s(n);
  return -13.6 * z_s * z_s / (n_s * n_s);
  } else {
    if (l === 0 || l === 1) {
      let n_l = energy
        .filter(e => e[0] === n.toString()[0] && (e[1] === 's' || e[1] === 'p'))
        .map(e => parseInt(e.substring(2)))
        .reduce((sum, val) => sum + val, 0);
      n_l = (n_l - 1) * 0.35;
      n_l += (n - 1) >= 1 ? 0.85 * energy_level[n - 1] : 0;
      n_l += (n - 2) >= 1 ? sumenegy[n - 2] : 0;
      const z_s = z - n_l;
      const n_s = N_s(n);
      return -13.6 * z_s * z_s / (n_s * n_s);
    } else if (l === 2) {
      let n_l = energy
        .filter(e => e[0] === n.toString()[0] && e[1] === 'd')
        .map(e => parseInt(e.substring(2)))
        .reduce((sum, val) => sum + val, 0);
      const n_l_1 = energy
        .filter(e => e[0] === n.toString()[0] && (e[1] === 's' || e[1] === 'p'))
        .map(e => parseInt(e.substring(2)))
        .reduce((sum, val) => sum + val, 0);
      n_l = (n_l - 1) * 0.35;
      n_l += n_l_1;
      n_l += (n - 1) >= 1 ? energy_level[n - 1] : 0;
      n_l += (n - 2) >= 1 ? sumenegy[n - 2] : 0;
      const z_s = z - n_l;
      const n_s = N_s(n);
      return -13.6 * z_s * z_s / (n_s * n_s);
    } else if (l === 3) {
      let n_l = energy
        .filter(e => e[0] === n.toString()[0] && e[1] === 'f')
        .map(e => parseInt(e.substring(2)))
        .reduce((sum, val) => sum + val, 0);
      const n_l_1 = energy
        .filter(e => e[0] === n.toString()[0] && (e[1] === 's' || e[1] === 'p' || e[1] === 'd'))
        .map(e => parseInt(e.substring(2)))
        .reduce((sum, val) => sum + val, 0);
      n_l = (n_l - 1) * 0.35;
      n_l += n_l_1;
      n_l += (n - 1) >= 1 ? energy_level[n - 1] : 0;
      n_l += (n - 2) >= 1 ? sumenegy[n - 2] : 0;
      const z_s = z - n_l;
      const n_s = N_s(n);
      return -13.6 * z_s * z_s / (n_s * n_s);
    }
  }
  return 0;
}

export function ElectronEnergyCalculator() {
  const [energy, setEnergy] = useState(null);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let elements = data.elements;
        const electronConfiguration = elements[25].electron_configuration;
        const z = 26;
        const n = 4;
        const l = 0;
        const t = 0;
        const energy = calculateEnergy(electronConfiguration, z, n, l, t);
        setEnergy(energy);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);
  
  return (
    <div>
      {energy !== null ? <p>Energy: {energy}</p> : <p>Loading...</p>}
    </div>
  );
}

export default ElectronEnergyCalculator;
