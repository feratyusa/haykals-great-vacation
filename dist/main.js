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
const MAINMENU = 0,
  PLAY = 1,
  PANORAMA = 2,
  PAUSE = 3;
var state = MAINMENU;

/**
 * HTML Elements
 */
const main_menu = document.getElementById("menu")
const playButton = document.getElementById("play");
const keterangan = document.getElementById("keterangan")
const ket_title = document.getElementById("title")
const ket_deskripsi = document.getElementById("deskripsi")
const ket_awal = document.getElementById("ket-awal")
const ket_panorama = document.getElementById("ket-panorama")
const okButton = document.getElementById("ok")

const __title = "Welcome to THE MUSEUM"
const __deskripsi = "Hari ini adalah hari libur. Haykal sedang berkujung ke sebuah museum. Akan tetapi, 'museum' ini berbeda dengan museum yang lainnya. Ikutilah perjalanan Haykal mengunjungi MUSEUM!"


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
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
const texture_wall1 = loader_texture.load("texture/wall1.jpg");
const texture_roof0 = loader_texture.load("texture/wall0.jpg");
const texture_floor0 = loader_texture.load("texture/floor1.jpg");
texture_floor0.wrapT = THREE.RepeatWrapping;
texture_floor0.wrapS = THREE.RepeatWrapping;
texture_floor0.repeat.set(100, 100);

// Panorama Texture
const pan_monas = loader_texture.load("panorama/monas.png");
const pan_pisa = loader_texture.load("panorama/pisa.png");
const pan_eiffel = loader_texture.load("panorama/Eiffel Panoramic.jpg");
const pan_coles = loader_texture.load("panorama/ColesseumPanoramic.jpg");
const pan_taj = loader_texture.load("panorama/PanoramicTajMahal.jpg");

//Lukisan
const lukisan1 = new THREE.TextureLoader().load("lukisan/Lee-Man-Fong-Bali-Life.jpg");
const lukisan2 = new THREE.TextureLoader().load("lukisan/Hendra-Gunawan-ALI-SADIKIN-PADA-MASA-PERANG-KEMERDEKAAN.jpg");
const lukisan3 = new THREE.TextureLoader().load("lukisan/Hendra-Gunawan-Pandawa-Dadu-1973.jpg");
const lukisan4 = new THREE.TextureLoader().load("lukisan/Rudolf-Bonnet-Market-Scene-1948.jpg");
const lukisan5 = new THREE.TextureLoader().load("lukisan/lukisan5.jpg");
const lukisan6 = new THREE.TextureLoader().load("lukisan/world-map.jpg");

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
const WALL_HEIGHT1 = 15;
const WALL_WIDTH_DEPTH1 = 1;
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
  const material = new THREE.MeshPhongMaterial({ map: texture });
  material.side = THREE.DoubleSide;
  const wall = new THREE.Mesh(geometry, material);
  return wall;
}

function makeWall1(texture) {
  const geometry1 = new THREE.BoxGeometry(WALL_WIDTH_DEPTH, WALL_HEIGHT1, WALL_WIDTH_DEPTH);
  const material1 = new THREE.MeshPhongMaterial({ map: texture });
  material1.side = THREE.DoubleSide;
  const wall1 = new THREE.Mesh(geometry1, material1);
  return wall1;
}

// Make SpotLight
function makeSpotLight(){
  const light = new THREE.SpotLight(0xffffff, 1);
  return light
}

// Make PointLight
function makePointLight(){
  const light = new THREE.PointLight(0xffffff, 1, 100, 2);
  return light
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
      else if (maps[z][x] == 2) {
        const wall1 = makeWall(texture_wall1);
        wall1.position.set(x * WALL_WIDTH_DEPTH, 6, z * WALL_WIDTH_DEPTH);
        scene.add(wall1);
      }
      else if (maps[z][x] == 3) {
        const wall2 = makeWall1(texture_wall1);
        wall2.position.set(x * WALL_WIDTH_DEPTH, 6, z * WALL_WIDTH_DEPTH);
        scene.add(wall2);
      }
      else if(maps[z][x] == 5){
        const light = makePointLight()
        light.position.set(x * WALL_WIDTH_DEPTH, 30, z * WALL_WIDTH_DEPTH);
        scene.add(light)
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
  panoramaSphere.material.map = panorama;
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
  constructor(name, deskripsi, objPath, panorama) {
    this.Name = name;
    this.Deskripsi = deskripsi;
    this.ObjectPath = objPath;
    this.Panorama = panorama;
  }
  setPos(x, y, z) {
    this.pos = {
      x: x,
      y: y,
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
function onload(gltf, Object, x, y, z, scalar, rotationY) {
  // Add Object
  Object.setPos(x,y,z);
  Object.setObj(gltf.scene);
  const obj = Object.getObj();
  obj.scale.multiplyScalar(scalar); // adjust scalar factor to match your scene scale
  obj.position.x = Object.pos.x * WALL_WIDTH_DEPTH; // once rescaled, position the model where needed
  obj.position.y = Object.pos.y;
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
}

/**
 * Lukisan
 */

const pic1 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan1, side: THREE.DoubleSide }));
scene.add(pic1);
pic1.translateX(5.5).translateY(6).translateZ(82);
pic1.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

const pic2 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan2, side: THREE.DoubleSide }));
scene.add(pic2);
pic2.translateX(34).translateY(6).translateZ(92.5);
pic2.rotation.y = Math.PI / -2;
pic2.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

const pic3 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan3, side: THREE.DoubleSide }));
scene.add(pic3);
pic3.translateX(54).translateY(6).translateZ(92.5);
pic3.rotation.y = Math.PI / -2;
pic3.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

const pic4 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan4, side: THREE.DoubleSide }));
scene.add(pic4);
pic4.translateX(14).translateY(6).translateZ(92.5);
pic4.rotation.y = Math.PI / -2;
pic4.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

const pic5 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan5, side: THREE.DoubleSide }));
scene.add(pic5);
pic5.translateX(74).translateY(6).translateZ(92.5);
pic5.rotation.y = Math.PI / -2;
pic5.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

const pic6 = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshPhongMaterial({ map: lukisan6, side: THREE.DoubleSide }));
scene.add(pic6);
pic6.translateX(92).translateY(7).translateZ(81);
// pic6.rotation.y = Math.PI / -2;
pic6.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

/**
 * Object Monas
 */
const monas_pos = {
  x: 3,
  z: 15,
  y: 0,
};
const desk_monas =
  "Monumen Nasional atau yang populer disingkat dengan Monas atau Tugu Monas adalah monumen peringatan setinggi 132 meter (433 kaki) yang didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia untuk merebut kemerdekaan dari pemerintahan kolonial Hindia Belanda. Pembangunan monumen ini dimulai pada tanggal 17 Agustus 1961 di bawah perintah presiden Soekarno dan dibuka untuk umum pada tanggal 12 Juli 1975. Tugu ini dimahkotai lidah api yang dilapisi lembaran emas yang melambangkan semangat perjuangan yang menyala-nyala dari rakyat Indonesia. Monumen Nasional terletak tepat di tengah Lapangan Medan Merdeka, Jakarta Pusat.";
var monas = new gltf_object("Monas", desk_monas, "obj/monas/scene.gltf", pan_monas);
gltf_loader.load(monas.getObjPath(), function (gltf) {
  onload(gltf, monas, monas_pos.x, monas_pos.y, monas_pos.z, 1 / 2);
});

/**
 * Object Colesseum
 */
const coles_pos = {
  x: 45,
  y: -2,
  z: 15
};
const desk_coles = "Koloseum (bahasa Latin: Colosseum atau Colisseum; bahasa Italia: Colosseo) adalah sebuah peninggalan bersejarah berupa arena gladiator, dibangun oleh Vespasian. Tempat pertunjukan yang besar berbentuk elips yang disebut amfiteater atau dengan nama aslinya Amphitheatrum Flavium, yang termasuk salah satu dari Enam Puluh Sembilan Keajaiban Dunia Pertengahan. Situs ini terletak di kota kecil di Italia, Roma, yang didirikan oleh Wali kota Vespasianus pada masa Domitianus dan diselesaikan oleh anaknya Titus, dan menjadi salah satu karya terbesar dari arsitektur Kekaisaran Romawi yang pernah dibangun. Koloseum dirancang untuk menampung 50.000 orang penonton."
var coles = new gltf_object("Colesseum", desk_coles, "obj/colesseum/scene.gltf", pan_coles);
gltf_loader.load(coles.getObjPath(), function (gltf) {
  onload(gltf, coles, coles_pos.x, coles_pos.y, coles_pos.z, 1);
});

/**
 * Object Pisa
 */
const pisa_pos = {
  x: 30,
  z: 15,
  y: 0,
};
const desk_pisa = "Menara Miring Pisa (Bahasa Italia: Torre pendente di Pisa atau disingkat Torre di Pisa), atau lebih dikenal dengan Menara Pisa, adalah sebuah campanile atau menara lonceng katedral di kota Pisa, Italia. Menara Pisa sebenarnya dibuat agar berdiri secara vertikal seperti menara lonceng pada umumnya, tetapi mulai miring tak lama setelah pembangunannya dimulai pada Agustus 1173. Ia terletak di belakang katedral dan merupakan bangunan ketiga Campo dei Miracoli (lapangan pelangi) kota Pisa. Ketinggian menara ini adalah 55,86 m dari permukaan tanah terendah dan 56,70 m dari permukaan tanah tertinggi. Kelebaran dinding di bawahnya mencapai 4,09 m dan di puncak 2,48 m. Bobotnya diperkirakan mencapai 14.500 ton. Menara Pisa memiliki 294 anak tangga. Dengan adanya menara ini, sektor pendapatan ekonomi jadi bertambah karena adanya objek wisata."
var pisa = new gltf_object("Pisa Tower", desk_pisa, "obj/pisa/scene.gltf", pan_pisa);
gltf_loader.load(pisa.getObjPath(), function (gltf) {
  onload(gltf, pisa, pisa_pos.x, pisa_pos.y, pisa_pos.z, 1 / 4, Math.PI / 2);
});

/**
 * Object Eiffel Tower
 */
const eiffel_pos = {
  x: 20,
  y: 0,
  z: 15
};
const desk_eiffel = "Dinamai sesuai nama perancangnya, Gustave Eiffel, Menara Eiffel adalah bangunan tertinggi di Paris dan salah satu struktur terkenal di dunia. Lebih dari 200.000.000 orang telah mengunjungi menara ini sejak pembangunannya tahun 1889, termasuk 6.719.200 orang tahun 2006, menjadikannya monumen berbayar yang paling banyak dikunjungi di dunia. Termasuk antena setinggi 24 m (79 kaki), struktur ini memiliki tinggi 325 m (1.063 kaki) sejak 2000, yang sama dengan bangunan konvensional bertingkat 81."
var eiffel = new gltf_object("Eiffel", desk_eiffel, "obj/eiffel/scene.gltf", pan_eiffel);
gltf_loader.load(eiffel.getObjPath(), function (gltf) {
  onload(gltf, eiffel, eiffel_pos.x, eiffel_pos.y, eiffel_pos.z, 1.5, Math.PI / 2);
});

/**
 * Object Taj Mahal
 */
const tajmahal_pos = {
  x: 5,
  y: 0,
  z: 25
};
const desk_tajmahal = "Taj Mahal (bahasa Urdu: تاج محل, Hindi: ताज महल) adalah sebuah monumen yang terletak di Agra, India. Dibangun atas keinginan Kaisar Mughal Shāh Jahān, anak Jahangir, sebagai sebuah mausoleum untuk istri Persianya, Arjumand Banu Begum, juga dikenal sebagai Mumtaz-ul-Zamani atau Mumtaz Mahal. Taj Mahal merupakan sebuah adi karya dari arsitektur Mughal. Shah Jahan, kaisar dari Kekaisaran Mughal memiliki kekayaan yang besar selama masa kejayaannya. Pada 1631 istri ketiganya dan merupakan istri yang paling dicintainya wafat sewaktu melahirkan putrinya Gauhara Begum, anak ke-14 mereka."
var tajmahal = new gltf_object("Taj Mahal", desk_tajmahal, "obj/tajmahal/scene.gltf", pan_taj);
gltf_loader.load(tajmahal.getObjPath(), function (gltf) {
  onload(gltf, tajmahal, tajmahal_pos.x, tajmahal_pos.y, tajmahal_pos.z, 1 / 15);
});

objects.push(monas);
objects.push(pisa);
objects.push(eiffel);
objects.push(tajmahal, coles);

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

okButton.onclick = function closeWindow(){
  keterangan.style.display = "none";
  state = PLAY
  controls.lock()
}

controls.addEventListener('unlock', function(){
  if(state == PLAY){
    ket_title.innerHTML = __title
    ket_deskripsi.innerHTML = __deskripsi
    state = PAUSE
  }
  else if(state == PANORAMA){
    ket_awal.style.display = "none"
    ket_panorama.style.display = "block"
    state = PANORAMA
  }
  keterangan.style.display = "block";
})

const onMouseClick = function (e) {
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
      player.positionX = camera.position.x;
      player.positionY = camera.position.y;
      player.positionZ = camera.position.z;
      setPanoramaImage(object.getPanorama());
      camera.position.set(0, -1000, 0);
      ket_title.innerHTML = object.Name;
      ket_deskripsi.innerHTML = object.Deskripsi;
      state = PANORAMA;
      controls.unlock();
    }
  }
};

document.addEventListener("click", onMouseClick, false);

// Movements
let speed = 1 / 2;

const onKeyDown = function (e) {
  if(state != PLAY) return
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
    case "KeyQ":
      camera.position.set(player.positionX, player.positionY, player.positionZ);
      state = PLAY;
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

playButton.onclick = function play(){
  main_menu.style.display = "none"
  keterangan.style.display = "block"
  ket_title.innerHTML = __title;
  ket_deskripsi.innerHTML = __deskripsi;
  mainloop()
  state = PLAY
}

