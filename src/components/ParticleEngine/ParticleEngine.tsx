import React, { useEffect, useRef, useCallback } from 'react';
import type { BirthdayThemeConfig } from '../../birthday/types';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'heart' | 'sparkle' | 'star' | 'butterfly' | 'orb';
  phase: number;
}

interface ParticleEngineProps {
  theme: BirthdayThemeConfig;
}

export const ParticleEngine: React.FC<ParticleEngineProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const initParticles = useCallback((width: number, height: number) => {
    // Determine count based on screen width (fewer on mobile for top performance)
    const count = width < 768 ? 35 : 70;
    const colors = theme.palette.particleColors;
    const themeMode = theme.visualMode;

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      let type: Particle['type'] = 'sparkle';
      const rand = Math.random();

      if (themeMode === 'garden-romance') {
        if (rand < 0.4) type = 'petal';
        else if (rand < 0.7) type = 'heart';
        else if (rand < 0.9) type = 'sparkle';
        else type = 'orb';
      } else if (themeMode === 'futuristic-cyber') {
        if (rand < 0.35) type = 'butterfly';
        else if (rand < 0.65) type = 'heart';
        else if (rand < 0.85) type = 'star';
        else type = 'sparkle';
      } else {
        // Celestial or royal
        if (rand < 0.4) type = 'star';
        else if (rand < 0.7) type = 'sparkle';
        else type = 'heart';
      }

      const size = type === 'orb' ? Math.random() * 25 + 15 : Math.random() * 12 + 6;
      const speedY = -(Math.random() * 0.8 + 0.3); // gently rising upwards
      const speedX = (Math.random() - 0.5) * 0.6;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX,
        speedY,
        opacity: Math.random() * 0.5 + 0.3,
        maxOpacity: Math.random() * 0.4 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        type,
        phase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, [theme]);

  // Burst function for global click or special element clicks
  const triggerBurst = useCallback((clientX: number, clientY: number, count = 18) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const colors = theme.palette.particleColors;
    const burstParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4 + 2;

      burstParticles.push({
        x,
        y,
        size: Math.random() * 14 + 8,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 1,
        maxOpacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        type: Math.random() > 0.4 ? 'heart' : 'sparkle',
        phase: Math.random() * Math.PI,
      });
    }

    particlesRef.current.push(...burstParticles);
  }, [theme]);

  // Expose burst event listener on window for any component to invoke
  useEffect(() => {
    const handleCustomBurst = (e: CustomEvent<{ x: number; y: number; count?: number }>) => {
      triggerBurst(e.detail.x, e.detail.y, e.detail.count);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      // Background click releases hearts
      triggerBurst(e.clientX, e.clientY, 12);
    };

    window.addEventListener('bosy-burst' as any, handleCustomBurst as any);
    window.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('bosy-burst' as any, handleCustomBurst as any);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [triggerBurst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = performance.now();

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // bottom left curve
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.3, 0, size);
      // bottom right curve
      c.bezierCurveTo(0, (size + topCurveHeight) / 1.3, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // top right curve
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawPetal = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.ellipse(0, 0, size * 0.45, size * 0.9, 0, 0, Math.PI * 2);
      c.fill();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const spikes = 4;
      const step = Math.PI / spikes;
      let rot = (Math.PI / 2) * 3;
      let x = 0;
      let y = 0;
      const outerRadius = size;
      const innerRadius = size * 0.35;

      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(0, -outerRadius);
      c.closePath();
      c.fill();
    };

    const drawButterfly = (c: CanvasRenderingContext2D, size: number, phase: number) => {
      const flap = Math.sin(phase * 4) * 0.5 + 0.8;
      c.save();
      c.scale(flap, 1);
      // Left upper wing
      c.beginPath();
      c.ellipse(-size * 0.5, -size * 0.3, size * 0.5, size * 0.35, -Math.PI / 4, 0, Math.PI * 2);
      c.fill();
      // Right upper wing
      c.beginPath();
      c.ellipse(size * 0.5, -size * 0.3, size * 0.5, size * 0.35, Math.PI / 4, 0, Math.PI * 2);
      c.fill();
      // Left lower wing
      c.beginPath();
      c.ellipse(-size * 0.35, size * 0.25, size * 0.35, size * 0.25, Math.PI / 6, 0, Math.PI * 2);
      c.fill();
      // Right lower wing
      c.beginPath();
      c.ellipse(size * 0.35, size * 0.25, size * 0.35, size * 0.25, -Math.PI / 6, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Motion physics
        p.x += p.speedX + Math.sin(p.phase) * 0.4;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.phase += dt * 2;

        // Fade out burst particles or wrap ambient particles
        if (Math.abs(p.speedX) > 1 || Math.abs(p.speedY) > 2) {
          p.opacity -= dt * 0.8;
          p.speedX *= 0.96;
          p.speedY *= 0.96;
          if (p.opacity <= 0.05) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          // Ambient wrapping
          if (p.y < -30) {
            p.y = h + 20;
            p.x = Math.random() * w;
          }
          if (p.x < -30) p.x = w + 20;
          if (p.x > w + 30) p.x = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

        if (p.type === 'heart') {
          drawHeart(ctx, p.size);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.size);
        } else if (p.type === 'star') {
          drawStar(ctx, p.size);
        } else if (p.type === 'butterfly') {
          drawButterfly(ctx, p.size, p.phase);
        } else if (p.type === 'orb') {
          // Soft ambient glowing orb
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
      style={{ opacity: 0.9 }}
    />
  );
};
