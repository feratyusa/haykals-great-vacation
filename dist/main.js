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
  LUKISAN = 3,
  PAUSE = 4;
var state = MAINMENU;

// Haykal
const player = {
  positionX: 25 * 2,
  positionY: 3,
  positionZ: 4 * 2,
};

/**
 * HTML Elements
 */
const main_menu = document.getElementById("menu");
const playButton = document.getElementById("play");
const keterangan = document.getElementById("keterangan");
const ket_title = document.getElementById("title");
const ket_deskripsi = document.getElementById("deskripsi");
const ket_awal = document.getElementById("ket-awal");
const ket_panorama = document.getElementById("ket-panorama");
const okButton = document.getElementById("ok");

const __title = "Welcome to THE MUSEUM";
const __deskripsi =
  "Hari ini adalah hari libur. Haykal sedang berkujung ke sebuah museum. Akan tetapi, 'museum' ini berbeda dengan museum yang lainnya. Ikutilah perjalanan Haykal mengunjungi MUSEUM!";

/**
 * Canvas, Camera, and Scene
 *
 */

// canvas
const canvas = document.getElementById("c");

// scene and fog
const scene = new THREE.Scene();
scene.background = new THREE.Color("grey");

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(player.positionX, player.positionY, player.positionZ);

/**
 * Maps Representation w/o Objects
 *
 * xn = Col 5 + 3*n
 * zn = Line 31 + n
 */
const maps = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2],
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
texture_floor0.repeat.set(110, 110);

// Panorama Texture
const pan_monas = loader_texture.load("panorama/monas.png");
const pan_pisa = loader_texture.load("panorama/pisa.png");
const pan_eiffel = loader_texture.load("panorama/eiffel.jpg");
const pan_coles = loader_texture.load("panorama/collesseum.jpg");
const pan_taj = loader_texture.load("panorama/tajmahal.jpg");

//Lukisan
const lukisan1 = new THREE.TextureLoader().load("lukisan/Lee-Man-Fong-Bali-Life.jpg");
const lukisan2 = new THREE.TextureLoader().load("lukisan/Hendra-Gunawan-ALI-SADIKIN-PADA-MASA-PERANG-KEMERDEKAAN.jpg");
const lukisan3 = new THREE.TextureLoader().load("lukisan/Hendra-Gunawan-Pandawa-Dadu-1973.jpg");
const lukisan4 = new THREE.TextureLoader().load("lukisan/Rudolf-Bonnet-Market-Scene-1948.jpg");
const lukisan5 = new THREE.TextureLoader().load("lukisan/Two-balinese-man.jpg");
const lukisan6 = new THREE.TextureLoader().load("lukisan/world-map.jpg");

// Text
const welcome = loader_texture.load("background/welcome.png");
const wah = loader_texture.load("background/mumei.jpeg");

// Audio
const listener = new THREE.AudioListener();
camera.add(listener);
const main_bgm = new THREE.Audio(listener);
const loader_main_bgm = new THREE.AudioLoader();
loader_main_bgm.load(
  "music/slowmotion.mp3",
  function (res) {
    main_bgm.setLoop(true);
    main_bgm.setBuffer(res);
    main_bgm.setVolume(0.5);
  },
  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // onError callback
  function (err) {
    console.log("Error");
  }
);

/**
 *
 * All the functions and utils for the app
 *
 */

// Museum
const MAP_WIDTH = 55;
const MAP_LENGTH = 50;
const WALL_WIDTH_DEPTH = 2;
const WALL_HEIGHT = 60;
const WALL_HEIGHT1 = 15;
const WALL_WIDTH_DEPTH1 = 1;
const ROOF_WIDTH = 100;
const ROOF_HEIGHT = 100;

// Make PlaneGeometry
function makeFloor(texture) {
  const geometry = new THREE.PlaneGeometry(120, 120);
  const material = new THREE.MeshPhongMaterial({ map: texture });
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
function makeSpotLight() {
  const light = new THREE.SpotLight(0xffffff, 0.7);
  return light;
}

// Make PointLight
function makePointLight() {
  const light = new THREE.PointLight(0xffffff, 1, 100, 2);
  return light;
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
      } else if (maps[z][x] == 2) {
        const wall1 = makeWall(texture_wall1);
        wall1.position.set(x * WALL_WIDTH_DEPTH, 6, z * WALL_WIDTH_DEPTH);
        scene.add(wall1);
      } else if (maps[z][x] == 3) {
        const wall2 = makeWall1(texture_wall1);
        wall2.position.set(x * WALL_WIDTH_DEPTH, 6, z * WALL_WIDTH_DEPTH);
        scene.add(wall2);
      } else if (maps[z][x] == 5) {
        const light = makePointLight();
        light.position.set(x * WALL_WIDTH_DEPTH, 30, z * WALL_WIDTH_DEPTH);
        scene.add(light);
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
  Object.setPos(x, y, z);
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

const DEPAN = 0,
  KANAN = 1,
  KIRI = 2;
class lukisan_object {
  constructor(nama, deskripsi, size, position) {
    this.Nama = nama;
    this.Deskripsi = deskripsi;
    this.Size = {
      w: size.w,
      h: size.h,
    };
    this.Position = {
      x: position.x,
      y: position.y,
      z: position.z,
    };
  }
  setMesh(mesh) {
    this.Mesh = mesh;
  }
  getMesh() {
    return this.Mesh;
  }
}

function addLukisan(lukisan, texture, rotation, light_pos) {
  // Lukisan
  const geometry = new THREE.PlaneGeometry(lukisan.Size.w, lukisan.Size.h);
  const material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(lukisan.Position.x, lukisan.Position.y, lukisan.Position.z);
  mesh.rotation.y = rotation;
  lukisan.setMesh(mesh);
  scene.add(lukisan.getMesh());

  // Lampu
  const light = makeSpotLight();
  if (light_pos == DEPAN) {
    light.position.set(lukisan.Position.x, lukisan.Position.y + 6, lukisan.Position.z - 6);
  } else if (light_pos == KIRI) {
    light.position.set(lukisan.Position.x + 6, lukisan.Position.y + 6, lukisan.Position.z);
  } else if (light_pos == KANAN) {
    light.position.set(lukisan.Position.x - 6, lukisan.Position.y + 6, lukisan.Position.z);
  }
  light.target.position.set(lukisan.Position.x, lukisan.Position.y, lukisan.Position.z);
  scene.add(light);
  scene.add(light.target);
}

var lukisans = [];

const desk_bali_life = "Oleh Lee Man Fong, 1962";
const size_bali_life = {
  w: 9,
  h: 5,
};
const pos_bali_life = {
  x: 5.5,
  y: 6,
  z: 92,
};
const bali_life = new lukisan_object("Bali Life", desk_bali_life, size_bali_life, pos_bali_life);
addLukisan(bali_life, lukisan1, Math.PI / 2, KIRI);

const desk_ali_sadikin = "Oleh Hendra Gunawan, 1978";
const size_ali_sadikin = {
  w: 9,
  h: 5,
};
const pos_ali_sadikin = {
  x: 34,
  y: 6,
  z: 102.5,
};
const ali_sadikin = new lukisan_object("Ali Sadikin Pada Masa Perang", desk_ali_sadikin, size_ali_sadikin, pos_ali_sadikin);
addLukisan(ali_sadikin, lukisan2, Math.PI, DEPAN);

const desk_pandawa_dadu = "Oleh Hendra Gunawan, 1971";
const size_pandawa_dadu = {
  w: 9,
  h: 5,
};
const pos_pandawa_dadu = {
  x: 54,
  y: 6,
  z: 102.5,
};
const pandawa_dadu = new lukisan_object("Pandawa Dadu", desk_pandawa_dadu, size_pandawa_dadu, pos_pandawa_dadu);
addLukisan(pandawa_dadu, lukisan3, Math.PI, DEPAN);

const desk_market_scene = "Oleh S. Sudjojono, 1979";
const size_market_scene = {
  w: 9,
  h: 5,
};
const pos_market_scene = {
  x: 14,
  y: 6,
  z: 102.5,
};
const market_scene = new lukisan_object("Market Scene", desk_market_scene, size_market_scene, pos_market_scene);
addLukisan(market_scene, lukisan4, Math.PI, DEPAN);

const desk_lukisan_5 = "Oleh Rudolf Bonnet, 1948";
const size_lukisan_5 = {
  w: 9,
  h: 5,
};
const pos_lukisan_5 = {
  x: 74,
  y: 6,
  z: 102.5,
};
const lukisan_5 = new lukisan_object("Lukisan 5", desk_lukisan_5, size_lukisan_5, pos_lukisan_5);
addLukisan(lukisan_5, lukisan5, Math.PI, DEPAN);

const desk_world_map = "Oleh Rudolf Bonnet, 1954";
const size_world_map = {
  w: 14,
  h: 10,
};
const pos_world_map = {
  x: 92,
  y: 6,
  z: 91,
};
const world_map = new lukisan_object("World Map", desk_world_map, size_world_map, pos_world_map);
addLukisan(world_map, lukisan6, Math.PI / 2, KANAN);

lukisans.push(bali_life, ali_sadikin, pandawa_dadu, market_scene, lukisan_5, world_map);

// const pic1 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan1, side: THREE.DoubleSide }));
// scene.add(pic1);
// pic1.translateX(5.5).translateY(6).translateZ(92);
// pic1.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);
// const pic1_spotlight = makeSpotLight();
// pic1_spotlight.position.set(5.5, 7, 92);
// pic1_spotlight.target.position.set(5.5,0,92);
// scene.add(pic1_spotlight)
// scene.add(pic1_spotlight.target)

// const pic2 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan2, side: THREE.DoubleSide }));
// scene.add(pic2);
// pic2.translateX(34).translateY(6).translateZ(102.5);
// pic2.rotation.y = Math.PI / -2;
// pic2.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

// const pic3 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan3, side: THREE.DoubleSide }));
// scene.add(pic3);
// pic3.translateX(54).translateY(6).translateZ(102.5);
// pic3.rotation.y = Math.PI / -2;
// pic3.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

// const pic4 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan4, side: THREE.DoubleSide }));
// scene.add(pic4);
// pic4.translateX(14).translateY(6).translateZ(102.5);
// pic4.rotation.y = Math.PI / -2;
// pic4.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

// const pic5 = new THREE.Mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshPhongMaterial({ map: lukisan5, side: THREE.DoubleSide }));
// scene.add(pic5);
// pic5.translateX(74).translateY(6).translateZ(102.5);
// pic5.rotation.y = Math.PI / -2;
// pic5.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

// const pic6 = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshPhongMaterial({ map: lukisan6, side: THREE.DoubleSide }));
// scene.add(pic6);
// pic6.translateX(92).translateY(7).translateZ(91);
// // pic6.rotation.y = Math.PI / -2;
// pic6.rotateOnAxis(new THREE.Vector3(0, -1, 0), Math.PI / 2);

/**
 * Board
 */
const welcome_board = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshPhongMaterial({ map: welcome, side: THREE.DoubleSide }));
welcome_board.position.set(25.5 * WALL_WIDTH_DEPTH, 20, 17 * WALL_WIDTH_DEPTH);
welcome_board.rotation.y = Math.PI;
scene.add(welcome_board);

const wahwah = new THREE.Mesh(new THREE.PlaneGeometry(20, 40), new THREE.MeshPhongMaterial({ map: wah, side: THREE.DoubleSide }));
wahwah.position.set(25.5 * WALL_WIDTH_DEPTH, 10, 38 * WALL_WIDTH_DEPTH);
wahwah.rotation.y = Math.PI;
scene.add(wahwah);

/**
 * Object Monas
 */
const monas_pos = {
  x: 5,
  y: 0,
  z: 12,
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
  x: 30,
  y: -14,
  z: 23,
};
const desk_coles =
  "Koloseum (bahasa Latin: Colosseum atau Colisseum; bahasa Italia: Colosseo) adalah sebuah peninggalan bersejarah berupa arena gladiator, dibangun oleh Vespasian. Tempat pertunjukan yang besar berbentuk elips yang disebut amfiteater atau dengan nama aslinya Amphitheatrum Flavium, yang termasuk salah satu dari Enam Puluh Sembilan Keajaiban Dunia Pertengahan. Situs ini terletak di kota kecil di Italia, Roma, yang didirikan oleh Wali kota Vespasianus pada masa Domitianus dan diselesaikan oleh anaknya Titus, dan menjadi salah satu karya terbesar dari arsitektur Kekaisaran Romawi yang pernah dibangun. Koloseum dirancang untuk menampung 50.000 orang penonton.";
var coles = new gltf_object("Colesseum", desk_coles, "obj/colesseum/scene.gltf", pan_coles);
gltf_loader.load(coles.getObjPath(), function (gltf) {
  onload(gltf, coles, coles_pos.x, coles_pos.y, coles_pos.z, 1);
});

/**
 * Object Pisa
 */
const pisa_pos = {
  x: 5,
  y: 1,
  z: 23,
};
const desk_pisa =
  "Menara Miring Pisa (Bahasa Italia: Torre pendente di Pisa atau disingkat Torre di Pisa), atau lebih dikenal dengan Menara Pisa, adalah sebuah campanile atau menara lonceng katedral di kota Pisa, Italia. Menara Pisa sebenarnya dibuat agar berdiri secara vertikal seperti menara lonceng pada umumnya, tetapi mulai miring tak lama setelah pembangunannya dimulai pada Agustus 1173. Ia terletak di belakang katedral dan merupakan bangunan ketiga Campo dei Miracoli (lapangan pelangi) kota Pisa. Ketinggian menara ini adalah 55,86 m dari permukaan tanah terendah dan 56,70 m dari permukaan tanah tertinggi. Kelebaran dinding di bawahnya mencapai 4,09 m dan di puncak 2,48 m. Bobotnya diperkirakan mencapai 14.500 ton. Menara Pisa memiliki 294 anak tangga. Dengan adanya menara ini, sektor pendapatan ekonomi jadi bertambah karena adanya objek wisata.";
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
  z: 23,
};
const desk_eiffel =
  "Dinamai sesuai nama perancangnya, Gustave Eiffel, Menara Eiffel adalah bangunan tertinggi di Paris dan salah satu struktur terkenal di dunia. Lebih dari 200.000.000 orang telah mengunjungi menara ini sejak pembangunannya tahun 1889, termasuk 6.719.200 orang tahun 2006, menjadikannya monumen berbayar yang paling banyak dikunjungi di dunia. Termasuk antena setinggi 24 m (79 kaki), struktur ini memiliki tinggi 325 m (1.063 kaki) sejak 2000, yang sama dengan bangunan konvensional bertingkat 81.";
var eiffel = new gltf_object("Eiffel", desk_eiffel, "obj/eiffel/scene.gltf", pan_eiffel);
gltf_loader.load(eiffel.getObjPath(), function (gltf) {
  onload(gltf, eiffel, eiffel_pos.x, eiffel_pos.y, eiffel_pos.z, 1.5, Math.PI / 2);
});

/**
 * Object Taj Mahal
 */
const tajmahal_pos = {
  x: 45,
  y: 0,
  z: 25,
};
const desk_tajmahal =
  "Taj Mahal (bahasa Urdu: تاج محل, Hindi: ताज महल) adalah sebuah monumen yang terletak di Agra, India. Dibangun atas keinginan Kaisar Mughal Shāh Jahān, anak Jahangir, sebagai sebuah mausoleum untuk istri Persianya, Arjumand Banu Begum, juga dikenal sebagai Mumtaz-ul-Zamani atau Mumtaz Mahal. Taj Mahal merupakan sebuah adi karya dari arsitektur Mughal. Shah Jahan, kaisar dari Kekaisaran Mughal memiliki kekayaan yang besar selama masa kejayaannya. Pada 1631 istri ketiganya dan merupakan istri yang paling dicintainya wafat sewaktu melahirkan putrinya Gauhara Begum, anak ke-14 mereka.";
var tajmahal = new gltf_object("Taj Mahal", desk_tajmahal, "obj/tajmahal/scene.gltf", pan_taj);
gltf_loader.load(tajmahal.getObjPath(), function (gltf) {
  onload(gltf, tajmahal, tajmahal_pos.x, tajmahal_pos.y, tajmahal_pos.z, 1 / 15);
});

objects.push(monas);
objects.push(pisa);
objects.push(eiffel);
objects.push(tajmahal, coles);

/**
 * Renderer, Controls, and Raycaster
 *
 */

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Raycaster
const raycast = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Controls
const controls = new PointerLockControls(camera, renderer.domElement);

okButton.onclick = function closeWindow() {
  if (state == PANORAMA) {
    state = PANORAMA;
  } else if (state == LUKISAN) {
    state = PAUSE;
  } else {
    state = PLAY;
  }
  if (!main_bgm.isPlaying) main_bgm.play();
  keterangan.style.display = "none";
  controls.lock();
};

controls.addEventListener("lock", function () {
  if (state == PAUSE) {
    state = PLAY;
  }
});

controls.addEventListener("unlock", function () {
  if (state == PLAY) {
    ket_title.innerHTML = __title;
    ket_deskripsi.innerHTML = __deskripsi;
    state = PAUSE;
  } else if (state == PANORAMA) {
    ket_awal.style.display = "none";
    ket_panorama.style.display = "block";
    state = PANORAMA;
  } else if (state == LUKISAN) {
    ket_awal.style.display = "none";
    ket_panorama.style.display = "none";
    state = LUKISAN;
  }
  keterangan.style.display = "block";
});

const onMouseClick = function (e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycast.setFromCamera(mouse, camera);
  const intersects = raycast.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    var showPanorama = false,
      showLukisan = false;
    var object, lukisan;
    // Check Objects
    for (var i = 0; i < objects.length; i++) {
      if (intersects[0].object == objects[i].getMesh()) {
        showPanorama = true;
        object = objects[i];
        break;
      }
    }
    // Check Lukisan
    for (var i = 0; i < lukisans.length; i++) {
      if (intersects[0].object == lukisans[i].getMesh()) {
        showLukisan = true;
        lukisan = lukisans[i];
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
    } else if (showLukisan) {
      if (state == PAUSE) {
        state = PLAY;
        return;
      }
      ket_title.innerHTML = lukisan.Nama;
      ket_deskripsi.innerHTML = lukisan.Deskripsi;
      state = LUKISAN;
      controls.unlock();
    }
  }
};

document.addEventListener("click", onMouseClick, false);

// Movements
let speed = 1 / 2;

const onKeyDown = function (e) {
  if (state == PANORAMA) {
    if (e.code == "KeyQ") {
      camera.position.set(player.positionX, player.positionY, player.positionZ);
      state = PLAY;
    }
  } else if (state == PLAY) {
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
  } else return;
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

playButton.onclick = function play() {
  main_menu.style.display = "none";
  keterangan.style.display = "block";
  ket_title.innerHTML = __title;
  ket_deskripsi.innerHTML = __deskripsi;
  mainloop();
  state = PLAY;
};
