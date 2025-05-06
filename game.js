const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 300;
let vy = 0;
let gravity = 0.6;
let jumping = false;

function drawCat() {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 32, 32); // nanti diganti sprite kucing
}

function update() {
  vy += gravity;
  y += vy;

  if (y > 300) {
    y = 300;
    vy = 0;
    jumping = false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !jumping) {
    vy = -12;
    jumping = true;
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCat();
  update();
  requestAnimationFrame(loop);
}

loop();
