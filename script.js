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
