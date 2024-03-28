import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

const AtomModel = ({ atomicNumber }) => {
  const { camera, gl, scene } = useThree();
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/3Dmodels/element_001_hydrogen.glb',
      (gltf) => {
        const object = gltf.scene;

        object.traverse((child) => {
          if (child.isMesh) {
           
            if (child.name.includes('element_001_hydrogen_nucleus.001')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
            } else if (child.name.includes('hydrogen_orbital_1.001')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color
            }
          }
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(10, 10, 10);
        scene.add(ambientLight, directionalLight);

        object.position.set(0, 1, 0);
        object.scale.set(10, 10, 10);
        scene.add(object);

        setModelLoaded(true);
        console.log('Loaded GLTF model:', gltf);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );
  }, [atomicNumber, camera, gl, scene]);

  useEffect(() => {
    if (!gl) return;
    const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  return (
    modelLoaded && <primitive object={scene} />
  );
};

export default AtomModel;
