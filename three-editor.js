// === 3D Editor ===
let scene, camera, renderer, model;

function init3DEditor() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / 600, 0.1, 1000);
  camera.position.set(0, 1, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, 600);
  document.getElementById("editor3d").appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 2);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  // Example 3D object
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  model = cube;

  // Controls (optional, for orbit)
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // Handle resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 600;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 600);
  });
}

init3DEditor();
