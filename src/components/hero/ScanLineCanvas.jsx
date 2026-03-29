import React, { useRef, useEffect } from 'react';
import { colors } from '../../content/brand';

const ScanLineCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let scanY = 0;
    let particles = [];
    let frameCount = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.width / window.devicePixelRatio;
    const h = () => canvas.height / window.devicePixelRatio;

    const draw = () => {
      const width = w();
      const height = h();

      ctx.clearRect(0, 0, width, height);

      // ── Scan line with gradient glow ──
      scanY += 0.8;
      if (scanY > height) {
        scanY = 0;
        particles = [];
      }

      const glowSize = 40;
      const gradient = ctx.createLinearGradient(0, scanY - glowSize, 0, scanY + glowSize);
      gradient.addColorStop(0, 'rgba(91, 127, 255, 0)');
      gradient.addColorStop(0.45, 'rgba(91, 127, 255, 0.12)');
      gradient.addColorStop(0.5, 'rgba(91, 127, 255, 0.4)');
      gradient.addColorStop(0.55, 'rgba(91, 127, 255, 0.12)');
      gradient.addColorStop(1, 'rgba(91, 127, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - glowSize, width, glowSize * 2);

      // Core scan line
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.strokeStyle = 'rgba(91, 127, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── Corner bracket reticles ──
      const bracketLen = 20;
      const bracketInset = 16;
      const bracketStroke = 2;
      ctx.strokeStyle = colors.coral;
      ctx.lineWidth = bracketStroke;
      ctx.lineCap = 'square';

      // Top-left
      ctx.beginPath();
      ctx.moveTo(bracketInset, bracketInset + bracketLen);
      ctx.lineTo(bracketInset, bracketInset);
      ctx.lineTo(bracketInset + bracketLen, bracketInset);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(width - bracketInset - bracketLen, bracketInset);
      ctx.lineTo(width - bracketInset, bracketInset);
      ctx.lineTo(width - bracketInset, bracketInset + bracketLen);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(bracketInset, height - bracketInset - bracketLen);
      ctx.lineTo(bracketInset, height - bracketInset);
      ctx.lineTo(bracketInset + bracketLen, height - bracketInset);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(width - bracketInset - bracketLen, height - bracketInset);
      ctx.lineTo(width - bracketInset, height - bracketInset);
      ctx.lineTo(width - bracketInset, height - bracketInset - bracketLen);
      ctx.stroke();

      // ── Particles ──
      if (frameCount % 3 === 0 && scanY > 20) {
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width * 0.8 + width * 0.1,
            y: scanY,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.6 + 0.3,
            opacity: 0.7 + Math.random() * 0.3,
          });
        }
      }

      particles = particles.filter((p) => p.opacity > 0.02);

      for (const p of particles) {
        p.y -= p.speed;
        p.opacity *= 0.992;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 127, 255, ${p.opacity})`;
        ctx.fill();
      }

      // ── Text readouts ──
      ctx.font = '10px "JetBrains Mono", monospace';

      // SCANNING... top left
      ctx.fillStyle = 'rgba(91, 127, 255, 0.5)';
      ctx.fillText('SCANNING...', bracketInset + 6, bracketInset + bracketLen + 20);

      // Y-coordinate counter bottom right
      const yText = `Y: ${Math.floor(scanY).toString().padStart(4, '0')}`;
      const measure = ctx.measureText(yText);
      ctx.fillStyle = 'rgba(91, 127, 255, 0.4)';
      ctx.fillText(yText, width - bracketInset - measure.width - 4, height - bracketInset - 8);

      frameCount++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ borderRadius: '20px' }}
    />
  );
};

export default ScanLineCanvas;
