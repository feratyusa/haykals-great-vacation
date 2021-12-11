/**
 * For testing you can use ../node_modules/three/
 * 
 * For Deployment use CDN from skypack.dev
 * 
 */

import * as THREE from "https://cdn.skypack.dev/three@0.135.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js";

/**
 * 
 * All the functions and utils for the app
 * 
 */

// Make PlaneGeometry
function makePlane() {
  const geometry = new THREE.PlaneGeometry(200, 200);
  const material = new THREE.MeshBasicMaterial();
  material.color = new THREE.Color(0xffffff);
  material.side = THREE.DoubleSide;
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, -1, 0);
  plane.rotation.x = Math.PI * -0.5;
  return plane;
}

// Make BoxGeometry
function makeBox() {
  const geometry = new THREE.BoxGeometry(2, 15, 2);
  const material = new THREE.MeshBasicMaterial();
  material.color = new THREE.Color(0xadd8e6);
  material.side = THREE.DoubleSide;
  const box = new THREE.Mesh(geometry, material);
  return box;
}

// Map
function makeMap() {
  let z = 0;
  const maps = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
    1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  for (let i = 0; i < 300; i++) {
    if (i > 0 && i % 15 == 0) z++;
    if (maps[i] == 1) {
      const wall = makeBox();
      wall.position.set((i % 15) * 2, -1, z * 2);
      scene.add(wall);
    }
  }
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


/**
 * The builder and main function of the app
 * 
 */

// canvas
const canvas = document.getElementById("c");

// scene and fog
const scene = new THREE.Scene();
scene.background = new THREE.Color("grey");

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 20);

// Light
const lightB = new THREE.DirectionalLight(0xffffff, 1);
lightB.position.set(0, 0, 40);
scene.add(lightB);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDampling = true;
controls.damplingFactor = 0.5;
controls.enableZoom = false;
controls.update();

// Objects
const plane = makePlane();
scene.add(plane);
makeMap();

const mainloop = function () {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(mainloop);
};
mainloop();
