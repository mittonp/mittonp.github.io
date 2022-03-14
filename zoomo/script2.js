import * as THREE from 'three';

import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'https://threejs.org/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;

// Initial materials
const FRAME_MTL = new THREE.MeshStandardMaterial( { color: 0xc0c0c0, side: THREE.DoubleSide } );
const BLACK_MTL = new THREE.MeshStandardMaterial( { color: 0x202020, side: THREE.DoubleSide } );
const ORANGE_MTL = new THREE.MeshStandardMaterial( { color: 0xf00f0f, metalness:1 } );
const GOLD_MTL = new THREE.MeshStandardMaterial( { color: 0xffff00, roughness: 0, metalness: 1 } );
const SILVER_MTL = new THREE.MeshStandardMaterial( { color: 0xf0f0f0, roughness: 0, metalness:1 } );

const INITIAL_MAP = [
  {childID:"", mtl:BLACK_MTL},
  {childID: "frame", mtl: FRAME_MTL},
  {childID: "M4", mtl: BLACK_MTL},
  {childID: "M6", mtl: BLACK_MTL},
  {childID: "brake", mtl: GOLD_MTL},
  {childID: "brakerotor", mtl: SILVER_MTL},
  {childID: "racklightstrip", mtl: ORANGE_MTL},
  {childID: "spring", mtl: SILVER_MTL},
];

init();
render();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
  camera.position.set(- 1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  new RGBELoader()
    .setPath('')
    .load('park_parking_1k.hdr', function (texture) {

      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.environment = texture;

      render();

      // model

      const loader = new GLTFLoader().setPath('');

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath( 'https://threejs.org/examples/js/libs/draco/' );
		  dracoLoader.setDecoderConfig( { type: 'js' } );
      
      loader.setDRACOLoader(dracoLoader);

      loader.load('zoomo1.glb', function (gltf) {
        
        var theModel = gltf.scene;
        theModel.position.y = -1;
        for (let object of INITIAL_MAP) {
          initColor(theModel, object.childID, object.mtl);
        }

        scene.add(gltf.scene);

        render();

      });

    });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, - 0.2);
  controls.update();
}

function render() {

  renderer.render(scene, camera);

}

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
  parent.traverse((o) => {
   if (o.isMesh) {
     if (o.name.includes(type)) {
          o.material = mtl;
          o.nameID = type; // Set a new property to identify this object
       }
   }
 });
}