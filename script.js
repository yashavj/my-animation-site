let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let colorPicker = document.getElementById("colorPicker");

let frames = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
let currentFrame = 0;
let drawing = false;
let x, y;
let playing = false;

// Draw lines
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [x, y] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (drawing = false));

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = 3;
  ctx.stroke();
  [x, y] = [e.offsetX, e.offsetY];
  saveCurrentFrame();
});

// Clear the current frame
document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveCurrentFrame();
});

// Save current drawing as image
document.getElementById("saveBtn").addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `frame${currentFrame + 1}.png`;
  link.href = canvas.toDataURL();
  link.click();
});

// Go to next frame
document.getElementById("nextFrame").addEventListener("click", () => {
  saveCurrentFrame();
  currentFrame++;
  if (!frames[currentFrame]) {
    frames[currentFrame] = ctx.createImageData(canvas.width, canvas.height);
  }
  loadFrame(currentFrame);
  updateFrameInfo();
});

// Go to previous frame
document.getElementById("prevFrame").addEventListener("click", () => {
  if (currentFrame > 0) {
    saveCurrentFrame();
    currentFrame--;
    loadFrame(currentFrame);
    updateFrameInfo();
  }
});

// Play the animation
document.getElementById("playBtn").addEventListener("click", () => {
  if (playing) return;
  playing = true;
  playAnimation();
});

function saveCurrentFrame() {
  frames[currentFrame] = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function loadFrame(index) {
  ctx.putImageData(frames[index], 0, 0);
}

function updateFrameInfo() {
  document.getElementById("frameInfo").textContent = `Frame: ${currentFrame + 1}`;
}

function playAnimation() {
  let frame = 0;
  let interval = setInterval(() => {
    ctx.putImageData(frames[frame], 0, 0);
    frame++;
    if (frame >= frames.length) {
      clearInterval(interval);
      playing = false;
    }
  }, 200); // speed: 200ms per frame
}
// Mobile touch events
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent scrolling
  drawing = true;
  let touch = e.touches[0];
  let rect = canvas.getBoundingClientRect();
  x = touch.clientX - rect.left;
  y = touch.clientY - rect.top;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!drawing) return;
  let touch = e.touches[0];
  let rect = canvas.getBoundingClientRect();
  let newX = touch.clientX - rect.left;
  let newY = touch.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newX, newY);
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = 3;
  ctx.stroke();

  x = newX;
  y = newY;
  saveCurrentFrame();
});

canvas.addEventListener("touchend", () => (drawing = false));
// Mobile touch events
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent scrolling
  drawing = true;
  let touch = e.touches[0];
  let rect = canvas.getBoundingClientRect();
  x = touch.clientX - rect.left;
  y = touch.clientY - rect.top;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!drawing) return;
  let touch = e.touches[0];
  let rect = canvas.getBoundingClientRect();
  let newX = touch.clientX - rect.left;
  let newY = touch.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newX, newY);
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = 3;
  ctx.stroke();

  x = newX;
  y = newY;
  saveCurrentFrame();
});

canvas.addEventListener("touchend", () => (drawing = false));
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
