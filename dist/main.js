/**
 * For testing you can use ../node_modules/three/
 *
 * For Deployment use CDN from skypack.dev
 *
 */

import * as THREE from "https://cdn.skypack.dev/three@0.135.0";
import { PointerLockControls } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/PointerLockControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js";

/**
 * App State
 */
const PLAY = 0,
  PAUSE = 1,
  OVER = 2;
var state = PLAY;

/**
 * Canvas and Scene
 *
 */

// canvas
const canvas = document.getElementById("c");

// scene and fog
const scene = new THREE.Scene();
scene.background = new THREE.Color("grey");

/**
 * Maps Representation w/o Objects
 *
 * xn = Col 5 + 3*n
 * zn = Line 31 + n
 */
const maps = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

/**
 * Sphere for Panorama View
 */
var panoramaSphere;

/**
 * Preload Textures
 */

// Museum Texture
const loader_texture = new THREE.TextureLoader();
const texture_wall0 = loader_texture.load("texture/wall0.jpg");
const texture_roof0 = loader_texture.load("texture/wall0.jpg");
const texture_floor0 = loader_texture.load("texture/floor0.jpg");
texture_floor0.wrapT = THREE.RepeatWrapping;
texture_floor0.wrapS = THREE.RepeatWrapping;
texture_floor0.repeat.set(100, 100);

// Panorama Texture
const pan_monas = loader_texture.load("panorama/monas.png");
const pan_pisa = loader_texture.load("panorama/pisa.png");
const pan_eiffel = loader_texture.load("panorama/Eiffel Panoramic.jpg");
const pan_coles = loader_texture.load('panorama/ColesseumPanoramic.jpg');
const pan_taj = loader_texture.load('panorama/PanoramicTajMahal.jpg');

/**
 *
 * All the functions and utils for the app
 *
 */

// Hakyal
const player = {
  positionX: 15,
  positionY: 3,
  positionZ: 4,
};

// Museum
const MAP_WIDTH = 50;
const MAP_LENGTH = 50;
const WALL_WIDTH_DEPTH = 2;
const WALL_HEIGHT = 60;
const ROOF_WIDTH = 100;
const ROOF_HEIGHT = 100;

// Make PlaneGeometry
function makeFloor(texture) {
  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.color = new THREE.Color(0xffffff);
  material.side = THREE.DoubleSide;
  const floor = new THREE.Mesh(geometry, material);
  floor.position.set(50, 0, 50);
  floor.rotation.x = Math.PI * -0.5;
  return floor;
}

// Make Roof
function makeRoof(texture) {
  const geometry = new THREE.BoxGeometry(ROOF_WIDTH, ROOF_HEIGHT, 2);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.side = THREE.DoubleSide;
  const roof = new THREE.Mesh(geometry, material);
  roof.rotation.x = Math.PI / 2;
  roof.position.set(50, 40, 50);
  return roof;
}

// Make wall
function makeWall(texture) {
  const geometry = new THREE.BoxGeometry(WALL_WIDTH_DEPTH, WALL_HEIGHT, WALL_WIDTH_DEPTH);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.side = THREE.DoubleSide;
  const wall = new THREE.Mesh(geometry, material);
  return wall;
}

// Sphere for Panorama
function makePanoramaSphere() {
  const geometry = new THREE.SphereGeometry(500, 100, 80);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: pan_monas,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, -1000, 0);
  return sphere;
}

// Make Map
function makeMap() {
  for (let z = 0; z < MAP_WIDTH; z++) {
    for (let x = 0; x < MAP_LENGTH; x++) {
      if (maps[z][x] == 1) {
        const wall = makeWall(texture_wall0);
        wall.position.set(x * WALL_WIDTH_DEPTH, 6, z * WALL_WIDTH_DEPTH);
        scene.add(wall);
      }
    }
  }

  const roof = makeRoof(texture_roof0);
  const floor = makeFloor(texture_floor0);
  panoramaSphere = makePanoramaSphere();

  scene.add(roof, floor, panoramaSphere);
}

// Set Panorama Image
function setPanoramaImage(panorama) {
  panoramaSphere.material.map = image;
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
 * Objects GLTF
 *
 */

// Class Object GLTF
class gltf_object {
  constructor(name, objPath, panorama) {
    this.Name = name;
    this.ObjectPath = objPath;
    this.Panorama = panorama;
  }
  setPos(x, z) {
    this.pos = {
      x: x,
      y: 0,
      z: z,
    };
  }
  setObj(obj) {
    this.Object = obj;
  }
  setMesh(mesh) {
    this.mesh = mesh;
  }
  getPos() {
    return this.pos;
  }
  getObj() {
    return this.Object;
  }
  getMesh() {
    return this.mesh;
  }
  getObjPath() {
    return this.ObjectPath;
  }
  getPanorama() {
    return this.Panorama;
  }
}

var objects = [];
const gltf_loader = new GLTFLoader();
function onload(gltf, Object, x, z, scalar, rotationY) {
  // Add Object
  Object.setPos(x, z);
  Object.setObj(gltf.scene);
  const obj = Object.getObj();
  obj.scale.multiplyScalar(scalar); // adjust scalar factor to match your scene scale
  obj.position.x = Object.pos.x * WALL_WIDTH_DEPTH; // once rescaled, position the model where needed
  obj.position.z = Object.pos.z * WALL_WIDTH_DEPTH;
  if (rotationY) {
    obj.rotation.y = rotationY;
  }

  const mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 }));
  mesh.position.x = obj.position.x;
  mesh.position.y = 5;
  mesh.position.z = obj.position.z;
  Object.setMesh(mesh);
  scene.add(mesh);
  scene.add(obj);

  const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 }));
  mesh1.position.x = obj.position.x;
  mesh1.position.y = 5;
  mesh1.position.z = obj.position.z;
  Object.setMesh(mesh1);
  scene.add(mesh1);
  scene.add(obj);

  // Add First (Top) Light
  const light1 = new THREE.SpotLight(0xffffff, 0.5);
  light1.position.set(obj.position.x, 60, obj.position.z);
  light1.target.position.set(obj.position.x, 0, obj.position.z);
  scene.add(light1);
  scene.add(light1.target);
  // Add Second (Front/Back) Light
  const light2 = new THREE.DirectionalLight(0xffffff, 0.25);
  light2.position.set(obj.position.x + 6, 0, obj.position.z);
  light2.target.position.set(obj.position.x, 40, obj.position.z);
  scene.add(light2);
  scene.add(light2.target);
  // Add Third (Front/Back) Light
  const light3 = new THREE.DirectionalLight(0xffffff, 0.25);
  light3.position.set(obj.position.x - 6, 0, obj.position.z);
  light3.target.position.set(obj.position.x, 40, obj.position.z);
  scene.add(light3);
  scene.add(light3.target);
}

/**
 * Object Monas
 */
const monas_pos = {
  x: 3,
  z: 15,
  y: 0,
};
var monas = new gltf_object("Monas", "obj/monas/scene.gltf", pan_monas);
gltf_loader.load(monas.getObjPath(), function (gltf) {
  onload(gltf, monas, monas_pos.x, monas_pos.z, 1 / 2);
});

/**
 * Object Colesseum
 */
const coles_pos ={
  x: 3,
  z : 25,
  y : -2,
};
var coles = new gltf_object("Colesseum", 'obj/colesseum/scene.gltf', pan_coles);
gltf_loader.load(coles.getObjPath(), function(gltf){
  onload(gltf, coles, coles_pos.x, coles_pos.z, 1);
});

/**
 * Object Pisa
 */
const pisa_pos = {
  x: 30,  
  z: 15,
};
var pisa = new gltf_object("Pisa Tower", "obj/pisa/scene.gltf", pan_pisa);
gltf_loader.load(pisa.getObjPath(), function (gltf) {
  onload(gltf, pisa, pisa_pos.x, pisa_pos.z, 1 / 4, Math.PI / 2);
});

/**
 * Object Eiffel Tower
 */
const eiffel_pos = {
  x: 20,
  z: 15,
};
var eiffel = new gltf_object("Eiffel", "obj/eiffel/scene.gltf", pan_eiffel);
gltf_loader.load(eiffel.getObjPath(), function (gltf) {
  onload(gltf, eiffel, eiffel_pos.x, eiffel_pos.z, 1.5, Math.PI / 2);
});

/**
 * Object Taj Mahal
 */
const tajmahal_pos = {
  x: 45,
  z: 15,
}
var tajmahal = new gltf_object('Taj Mahal', 'obj/tajmahal/scene.gltf', pan_taj);
gltf_loader.load(tajmahal.getObjPath(), function (gltf) {
    onload(gltf, tajmahal, tajmahal_pos.x, tajmahal_pos.z, 1/15);
});

objects.push(monas);
objects.push(pisa);
objects.push(eiffel);

/**
 * Camera, Renderer, Controls, and Raycaster
 *
 */
// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(player.positionX, player.positionY, player.positionZ);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Raycaster
const raycast = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Controls
const controls = new PointerLockControls(camera, renderer.domElement);

const onMouseClick = function (e) {
  if (controls.isLocked == false) {
    controls.lock();
  } else {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycast.setFromCamera(mouse, camera);
    const intersects = raycast.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      var showPanorama = false;
      var object;
      for (var i = 0; i < objects.length; i++) {
        const obj = objects[i].getMesh();
        if (intersects[0].object == obj) {
          showPanorama = true;
          object = objects[i];
          break;
        }
      }
      if (showPanorama) {
        document.getElementById("mouse").innerHTML = "Nice";
        player.positionX = camera.position.x;
        player.positionY = camera.position.y;
        player.positionZ = camera.position.z;
        // setPanoramaImage(object.getPanorama());
        camera.position.set(0, -1000, 0);
      } else {
        document.getElementById("mouse").innerHTML = "Not Nice";
      }
    }
  }
};

document.addEventListener("click", onMouseClick, false);

// Movements
let speed = 1 / 2;

const onKeyDown = function (e) {
  switch (e.code) {
    case "KeyW":
      controls.moveForward(speed);
      break;
    case "KeyA":
      controls.moveRight(-speed);
      break;
    case "KeyD":
      controls.moveRight(speed);
      break;
    case "KeyS":
      controls.moveForward(-speed);
      break;
    default:
      break;
  }
};
document.addEventListener("keydown", onKeyDown, false);

/**
 * Main app
 *
 */

makeMap();

const mainloop = function () {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};
mainloop();
