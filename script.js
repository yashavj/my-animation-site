let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, 200, 30, 0, Math.PI * 2);
  ctx.fill();

  x += 3;
  if (x > canvas.width) x = 0;

  requestAnimationFrame(draw);
}

draw();
