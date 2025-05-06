const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Player position and movement
let x = 100;
let y = 300;
let vx = 0;
let vy = 0;
let gravity = 0.6;
let jumping = false;
const speed = 4;

// Platform and trap setup
const groundY = 350;
const gearTrap = { x: 400, y: groundY - 20, width: 40, height: 20, active: false };

// Keyboard controls
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

// Draw player
function drawCat() {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 32, 32);
}

// Draw ground and gear trap
function drawEnvironment() {
  // Ground
  ctx.fillStyle = "#555";
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

  // Gear trap
  ctx.fillStyle = gearTrap.active ? "red" : "yellow";
  ctx.fillRect(gearTrap.x, gearTrap.y, gearTrap.width, gearTrap.height);
  ctx.fillStyle = "black";
  ctx.font = "12px sans-serif";
  ctx.fillText("GEAR", gearTrap.x + 5, gearTrap.y + 14);
}

// Update movement and logic
function update() {
  x += vx;

  // Horizontal bounds
  if (x < 0) x = 0;
  if (x > canvas.width - 32) x = canvas.width - 32;

  // Vertical physics
  vy += gravity;
  y += vy;

  // Ground collision
  if (y + 32 >= groundY) {
    y = groundY - 32;
    vy = 0;
    jumping = false;
  }

  // Gear trap activation
  if (
    x + 32 > gearTrap.x &&
    x < gearTrap.x + gearTrap.width &&
    y + 32 >= gearTrap.y &&
    y + 32 <= gearTrap.y + gearTrap.height + 10
  ) {
    gearTrap.active = true;
    setTimeout(() => {
      alert("GEAR TRAP! You fell into the maintenance hole!");
      x = 100;
      y = 300;
      vx = 0;
      vy = 0;
      gearTrap.active = false;
    }, 100);
  }
}

// Game loop
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEnvironment();
  drawCat();
  update();
  requestAnimationFrame(loop);
}

loop();
