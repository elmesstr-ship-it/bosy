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
    // Ultra-optimized particle count for 60fps on mobile
    const count = width < 768 ? 18 : 45;
    const colors = theme.palette.particleColors;
    const themeMode = theme.visualMode;

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      let type: Particle['type'] = 'sparkle';
      const rand = Math.random();

      if (themeMode === 'garden-romance') {
        if (rand < 0.45) type = 'petal';
        else if (rand < 0.75) type = 'heart';
        else type = 'sparkle';
      } else if (themeMode === 'futuristic-cyber') {
        if (rand < 0.4) type = 'butterfly';
        else if (rand < 0.7) type = 'heart';
        else type = 'star';
      } else {
        if (rand < 0.5) type = 'star';
        else type = 'heart';
      }

      const size = Math.random() * 9 + 6;
      const speedY = -(Math.random() * 0.7 + 0.3);
      const speedX = (Math.random() - 0.5) * 0.5;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX,
        speedY,
        opacity: Math.random() * 0.4 + 0.3,
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

  const triggerBurst = useCallback((clientX: number, clientY: number, count = 16) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const colors = theme.palette.particleColors;
    const burstParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3.5 + 1.5;

      burstParticles.push({
        x,
        y,
        size: Math.random() * 12 + 7,
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

  useEffect(() => {
    const handleCustomBurst = (e: CustomEvent<{ x: number; y: number; count?: number }>) => {
      triggerBurst(e.detail.x, e.detail.y, e.detail.count);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      triggerBurst(e.clientX, e.clientY, 10);
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

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    let lastTime = performance.now();

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.3, 0, size);
      c.bezierCurveTo(0, (size + topCurveHeight) / 1.3, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
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
      const outerRadius = size;
      const innerRadius = size * 0.35;

      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        c.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
        rot += step;
        c.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
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
      c.beginPath();
      c.ellipse(-size * 0.5, -size * 0.3, size * 0.5, size * 0.35, -Math.PI / 4, 0, Math.PI * 2);
      c.ellipse(size * 0.5, -size * 0.3, size * 0.5, size * 0.35, Math.PI / 4, 0, Math.PI * 2);
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

        p.x += p.speedX + Math.sin(p.phase) * 0.35;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.phase += dt * 1.8;

        if (Math.abs(p.speedX) > 1 || Math.abs(p.speedY) > 2) {
          p.opacity -= dt * 0.9;
          p.speedX *= 0.96;
          p.speedY *= 0.96;
          if (p.opacity <= 0.05) {
            particles.splice(i, 1);
            continue;
          }
        } else {
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
        } else {
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
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-700"
      style={{ opacity: 0.85 }}
    />
  );
};
