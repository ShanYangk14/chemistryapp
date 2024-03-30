import { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

const AtomModel = ({ atomicNumber }) => {
  const { scene, camera, gl } = useThree(); // Destructure camera and gl
  const [/*modelLoaded*/, setModelLoaded] = useState(false);

  useEffect(() => {
    if (!atomicNumber) return;

    const loader = new GLTFLoader();
    const modelPath = `/3Dmodels/element_${String(atomicNumber).padStart(3, '0')}_${getElementName(atomicNumber)}.glb`; // Dynamically construct the model path
    let object = null;

    loader.load(
      modelPath,
      (gltf) => {
        object = gltf.scene;

        object.traverse((child) => {
          if (child.isMesh) {
            if (child.name.includes('element_001_hydrogen_nucleus.001')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            } else if (child.name.includes('hydrogen_orbital_1.001')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
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

        // Start automatic rotation
        const rotationSpeed = 0.01;
        const animate = () => {
          object.rotation.y += rotationSpeed;
          requestAnimationFrame(animate);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );

    // Create OrbitControls
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true; // Optional: Enables smooth camera movement
    controls.dampingFactor = 0.25; // Optional: Adjusts the damping factor

    // Clean up function
    return () => {
      // Remove the model from the scene
      if (object) {
        scene.remove(object);
      }

      // Dispose OrbitControls
      controls.dispose();
    };
  }, [atomicNumber, camera, gl.domElement, scene]);

  const getElementName = (atomicNumber) => {
    const elementNames = {
      1:'hydrogen',
      2:'helium',
      3:'lithium',
      4:'beryllium',
      5:'boron',
      6:'carbon',
      7:'nitrogen',
      8:'oxygen',
      9:'fluorine',
      10:'neon',
      11:'sodium',
      12:'magnesium',
      13:'aluminum',
      14:'silicon',
      15:'phosphorus',
      16:'sulfur',
      17:'chlorine',
      18:'argon',
      19:'potassium',
      20:'calcium',
      21:'scandium',
      22:'titanium',
      23:'vanadium',
      24:'chromium',
      25:'manganese',
      26:'iron',
      27:'cobalt',
      28:'nickel',
      29:'copper',
      30:'zinc',
      31:'gallium',
      32:'germanium',
      33:'arsenic',
      34:'selenium',
      35:'bromine',
      36:'krypton',
      37:'rubidium',
      38:'strontium',
      39:'yttrium',
      40:'zirconium',
      41:'niobium',
      42:'molybdenum',
      43:'technetium',
      44:'ruthenium',
      45:'rhodium',
      46:'palladium',
      47:'silver',
      48:'cadmium',
      49:'indium',
      50:'tin',
      51:'antimony',
      52:'tellurium',
      53:'iodine',
      54:'xenon',
      55:'cesium',
      56:'barium',
      57:'lanthanum',
      58:'cerium',
      59:'praseodymium',
      60:'neodymium',
      61:'promethium',
      62:'samarium',
      63:'europium',
      64:'gadolinium',
      65:'terbium',
      66:'dysprosium',
      67:'holmium',
      68:'erbium',
      69:'thulium',
      70:'ytterbium',
      71:'lutetium',
      72:'hafnium',
      73:'tantalum',
      74:'tungsten',
      75:'rhenium',
      76:'osmium',
      77:'iridium',
      78:'platinum',
      79:'gold',
      80:'mercury',
      81:'thallium',
      82:'lead',
      83:'bismuth',
      84:'polonium',
      85:'astatine',
      86:'radon',
      87:'francium',
      88:'radium',
      89:'actinium',
      90:'thorium',
      91:'protactinium',
      92:'uranium',
      93:'neptunium',
      94:'plutonium',
      95:'americium',
      96:'curium',
      97:'berkelium',
      98:'californium',
      99:'einsteinium',
      100:'fermium',
      101:'mendelevium',
      102:'nobelium',
      103:'lawrencium',
      104:'rutherfordium',
      105:'dubnium',
      106:'seaborgium',
      107:'bohrium',
      108:'hassium',
      109:'meitnerium',
      110:'darmstadtium',
      111:'roentgenium',
      112:'copernicium',
      113:'nihonium',
      114:'flerovium',
      115:'moscovium',
      116:'livermorium',
      117:'tennessine',
      118:'oganesson'
    };
    return elementNames[atomicNumber] || ''; 
  };

  return null; // We don't render anything directly, as the model is added to the scene directly
};

export default AtomModel;
