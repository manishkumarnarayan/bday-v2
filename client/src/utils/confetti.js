// Custom canvas confetti and magical particles system

export function triggerConfetti(options = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = (canvas.width = window.innerWidth * dpr);
  const height = (canvas.height = window.innerHeight * dpr);
  ctx.scale(dpr, dpr);

  const colors = options.colors || [
    '#f43f5e', '#ec4899', '#d946ef', '#a855f7',
    '#fb7185', '#fda4af', '#fbbf24', '#f59e0b',
    '#38bdf8', '#34d399', '#fde047', '#fed7aa'
  ];

  const particleCount = options.count || 120;
  const originX = options.originX !== undefined ? options.originX * window.innerWidth : window.innerWidth / 2;
  const originY = options.originY !== undefined ? options.originY * window.innerHeight : window.innerHeight * 0.6;

  const shapes = options.shapes || ['circle', 'rect', 'heart', 'star'];
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const speed = 4 + Math.random() * 12;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
      vy: Math.sin(angle) * speed - 6 - Math.random() * 6,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      alpha: 1,
      gravity: 0.28 + Math.random() * 0.15,
      friction: 0.985,
    });
  }

  let animationFrame;
  const startTime = performance.now();
  const duration = options.duration || 3200;

  function render(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let activeCount = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.friction;
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - elapsed / duration);

      if (p.alpha > 0.01 && p.y < window.innerHeight + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'heart') {
          ctx.beginPath();
          const s = p.size / 10;
          ctx.moveTo(0, s * 3);
          ctx.bezierCurveTo(-s * 5, -s * 2, -s * 7, s * 5, 0, s * 9);
          ctx.bezierCurveTo(s * 7, s * 5, s * 5, -s * 2, 0, s * 3);
          ctx.fill();
        } else if (p.shape === 'star') {
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = p.size / 2;
          const innerRadius = p.size / 4;
          for (let s = 0; s < spikes * 2; s++) {
            const r = s % 2 === 0 ? outerRadius : innerRadius;
            const a = (s * Math.PI) / spikes;
            const sx = Math.cos(a) * r;
            const sy = Math.sin(a) * r;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }
    }

    if (activeCount > 0 && elapsed < duration) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  animationFrame = requestAnimationFrame(render);
}

export function triggerGrandCelebration() {
  triggerConfetti({ originX: 0.2, originY: 0.5, count: 80 });
  setTimeout(() => triggerConfetti({ originX: 0.8, originY: 0.5, count: 80 }), 250);
  setTimeout(() => triggerConfetti({ originX: 0.5, originY: 0.3, count: 120 }), 500);
}
