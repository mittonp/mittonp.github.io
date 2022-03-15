import * as THREE from 'three';

import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { DRACOLoader } from 'https://threejs.org/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

let theModel, camera, scene, renderer;

// Initial materials
const FRAME_MTL = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, side: THREE.DoubleSide });
const BLACK_MTL = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
const ORANGE_MTL = new THREE.MeshPhongMaterial({ color: 0xf00f0f, });
const YELLOW_MTL = new THREE.MeshPhongMaterial({ color: 0xffff00, });
const TRANSPARENT_MTL = new THREE.MeshPhongMaterial({ color: 0xffff00, transparent: true });
const GOLD_MTL = new THREE.MeshStandardMaterial({ color: 0xff7700, roughness: 0, metalness: 1 });
const SILVER_MTL = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0, metalness: 1 });
const WHITE_MTL = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const BACKGROUND_COLOR = 0xf1f1f1;


const INITIAL_MAP = [
  { childID: "", mtl: BLACK_MTL },
  { childID: "frame", mtl: FRAME_MTL },
  { childID: "logosurface", mtl: FRAME_MTL },
  { childID: "M4", mtl: BLACK_MTL },
  { childID: "M6", mtl: BLACK_MTL },
  { childID: "brake", mtl: GOLD_MTL },
  { childID: "brakerotor", mtl: SILVER_MTL },
  { childID: "shocks", mtl: SILVER_MTL },
  { childID: "racklightstrip", mtl: ORANGE_MTL },
  { childID: "spring", mtl: GOLD_MTL },
  { childID: "pedalcap", mtl: YELLOW_MTL },
  { childID: "notframe", mtl: FRAME_MTL },
  { childID: "frontwheelquickreleasecap", mtl: YELLOW_MTL },
];

init();
render();

function init() {
  const container = document.createElement('div');
  container.id="c";
  document.getElementsByClassName("model")[0].appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
  camera.position.set(- 1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  new RGBELoader()
    .setPath('')
    .load('park_parking_1k.hdr', function (texture) {

      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = new THREE.Color(BACKGROUND_COLOR );
      scene.environment = texture;

      render();

      // model

      const loader = new GLTFLoader().setPath('');

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://threejs.org/examples/js/libs/draco/');
      dracoLoader.setDecoderConfig({ type: 'js' });

      loader.setDRACOLoader(dracoLoader);

      loader.load('zoomo1.glb', function (gltf) {

        theModel = gltf.scene;
        theModel.position.y = -1;
        for (let object of INITIAL_MAP) {
          initColor(theModel, object.childID, object.mtl);
        }

        scene.add(gltf.scene);

        // Floor
        var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        var floorMaterial = new THREE.MeshPhongMaterial({
          color: BACKGROUND_COLOR,
          shininess: 0
        });

        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI;
        floor.receiveShadow = true;
        floor.position.y = -1;
        scene.add(floor);

        // Add lights
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene   
        scene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // Add directional Light to scene    
        scene.add(dirLight);

        render();

      });

    });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(1000, 500);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // Add controls
var controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30
}


function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.width / canvas.height;
    //camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
}

animate();

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


function selectSwatch(color) {
     let new_mtl;

      new_mtl = new THREE.MeshPhongMaterial({
          color: parseInt('0x' + color.substring(1)),
          shininess: 10,
          side: THREE.DoubleSide,
          castShadow:true
        });
    
    setMaterial(theModel, 'frame', new_mtl);
    setMaterial(theModel, 'notframe', new_mtl);
}


function setMaterial(parent, type, mtl) {
  parent.traverse((o) => {
   if (o.isMesh && o.nameID != null) {
     if (o.nameID == type) {
          o.material = mtl;
       }
   }
 });
}

var picker = new jscolor("#color-picker",
  {
    format:'hex',
    onChange:function(s){
      selectSwatch($("#color-picker").val());
    }
  });

  document.getElementById("color-picker").jscolor.show();

  // Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    
    renderer.setSize(canvas.width, canvas.height, false);
  }
  return needResize;
}

const status = document.getElementById('status');
        const output = document.getElementById('output');
        if (window.FileList && window.File && window.FileReader) {
          document.getElementById('file-selector').addEventListener('change', event => {
            output.src = '';
            status.textContent = '';
            const file = event.target.files[0];
            if (!file.type) {
              status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
              return;
            }
            if (!file.type.match('image.*')) {
              status.textContent = 'Error: The selected file does not appear to be an image.'
              return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', event => {
              var image = new Image();
              image.src= event.target.result;
              image.onload = function() {
                let imgRatio = image.naturalWidth/image.naturalHeight;
                let planeRatio = 91/13;


                console.log(image.naturalWidth, image.naturalHeight);
                var imgTexture = new THREE.TextureLoader().load(event.target.result);
                imgTexture.repeat.x = planeRatio / imgRatio;
                imgTexture.offset.x = -0.5 * ((planeRatio/imgRatio) -1);
                let new_mtl;
  
                new_mtl =  new THREE.MeshPhongMaterial({
                    side: THREE.DoubleSide,
                    map: imgTexture,
                    transparent: true
                    //shininess: 10
                  
                  });
  
                setMaterial(theModel, 'logosurface', new_mtl);
            }
             
            });
            reader.readAsDataURL(file);
          }); 
        }