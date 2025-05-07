import { useEffect, useRef } from 'react';

export default function GameCanvas({ resetTrigger }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Resize canvas to maintain 16:9 aspect ratio
    function resizeCanvas() {
      const aspectRatio = 16 / 9;
      let width = window.innerWidth;
      let height = window.innerHeight;
      if (width / height > aspectRatio) width = height * aspectRatio;
      else height = width / aspectRatio;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Game state
    let x = 100, y = 300, vx = 0, vy = 0;
    let gravity = 0.6, jumping = false;
    const speed = 4;
    let cameraX = 0;
    const groundY = 350;
    let currentLevel = 1;
    let lives = 3;

    // Obstacles
    const gearTrap = { x: 300, y: groundY - 20, width: 40, height: 20, active: false };

    // Load image
    const catImg = new Image();
    catImg.src = '/assets/images/cat.png';

    const sfx = {
      gear: { play() {} },
    };

    // Keyboard controls
    const keyDown = (e) => {
      if (e.code === 'ArrowRight') vx = speed;
      else if (e.code === 'ArrowLeft') vx = -speed;
      else if (e.code === 'Space' && !jumping) {
        vy = -12;
        jumping = true;
      }
    };
    const keyUp = (e) => {
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') vx = 0;
    };
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    // Drawing
    function drawCat() {
      if (catImg.complete) {
        ctx.drawImage(catImg, canvas.width / 2 - 16, y, 32, 32);
      }
    }

    function drawEnvironment() {
      ctx.fillStyle = '#444';
      ctx.fillRect(-cameraX, groundY, 3000, canvas.height - groundY);

      // Gear trap
      ctx.fillStyle = gearTrap.active ? 'red' : 'yellow';
      ctx.fillRect(gearTrap.x - cameraX, gearTrap.y, gearTrap.width, gearTrap.height);
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.fillText('GEAR', gearTrap.x - cameraX + 5, gearTrap.y + 14);
    }

    function drawHUD() {
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(`Lives: ${lives}`, 10, 20);
    }

    function update() {
      x += vx;
      vy += gravity;
      y += vy;

      if (y + 32 >= groundY) {
        y = groundY - 32;
        vy = 0;
        jumping = false;
      }

      cameraX = x - canvas.width / 2;
      if (cameraX < 0) cameraX = 0;

      // Gear trap logic
      if (
        x + 32 > gearTrap.x &&
        x < gearTrap.x + gearTrap.width &&
        y + 32 >= gearTrap.y
      ) {
        gearTrap.active = true;
        sfx.gear.play();
        setTimeout(() => {
          alert('GEAR TRAP!');
          x = 100;
          y = 300;
          gearTrap.active = false;
        }, 100);
      }

      // Death
      if (y > canvas.height) {
        lives--;
        if (lives <= 0) {
          alert('Game Over!');
          lives = 3;
          currentLevel = 1;
          x = 100;
        } else {
          alert(`You fell! Lives left: ${lives}`);
          x = 100;
        }
        y = 300;
      }
    }

    // Main game loop (only start after image is loaded)
    catImg.onload = () => {
      function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEnvironment();
        drawCat();
        drawHUD();
        update();
        requestAnimationFrame(loop);
      }
      loop();
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [resetTrigger]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
