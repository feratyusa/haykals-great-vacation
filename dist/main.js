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
const controls = new THREE.OrbitControls(camera, renderer.domElement);
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
