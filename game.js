const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 300;
let vx = 0;
let vy = 0;
let gravity = 0.6;
let jumping = false;

const speed = 4;

function drawCat() {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 32, 32); // Nanti diganti sprite kucing
}

function update() {
  // Update posisi horizontal
  x += vx;

  // Batas kiri-kanan layar
  if (x < 0) x = 0;
  if (x > canvas.width - 32) x = canvas.width - 32;

  // Update posisi vertical
  vy += gravity;
  y += vy;

  // Ground
  if (y > 300) {
    y = 300;
    vy = 0;
    jumping = false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    vx = speed;
  } else if (e.code === "ArrowLeft") {
    vx = -speed;
  } else if (e.code === "Space" && !jumping) {
    vy = -12;
    jumping = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
    vx = 0;
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCat();
  update();
  requestAnimationFrame(loop);
}

loop();
