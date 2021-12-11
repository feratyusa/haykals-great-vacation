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
