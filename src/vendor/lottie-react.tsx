import { useEffect, useRef } from "@minireact";

export interface OrbitFrame {
  radius: number;
  strokeWidth: number;
  alpha: number;
  color: string;
}

export interface OrbitAnimationData {
  name: string;
  duration: number;
  frames: OrbitFrame[];
}

export interface LottieProps {
  animationData: OrbitAnimationData;
  loop?: boolean;
  size?: number;
  className?: string;
  speed?: number;
}

/**
 * Very small canvas based animation helper that mimics the ergonomics of Lottie.
 */
export const LottieOrbit = ({
  animationData,
  loop = true,
  size = 72,
  className = "",
  speed = 1,
}: LottieProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let rafId = 0;
    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    const draw = () => {
      const { duration, frames } = animationData;
      context.clearRect(0, 0, canvas.width, canvas.height);

      frames.forEach((orbit, index) => {
        const offset = (frame / duration) * Math.PI * 2 + index * 0.6;
        const wobble = Math.sin(offset) * 2;
        context.save();
        context.lineWidth = orbit.strokeWidth;
        context.globalAlpha = orbit.alpha;
        context.strokeStyle = orbit.color;
        context.beginPath();
        context.ellipse(center.x, center.y, orbit.radius + wobble, (orbit.radius + wobble) * 0.7, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      });

      frame += speed;
      if (!loop && frame >= animationData.duration) {
        cancelAnimationFrame(rafId);
        return;
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [animationData, loop, size, speed]);

  return <canvas ref={canvasRef} width={size} height={size} className={`lottie-canvas ${className}`.trim()} />;
};

export default LottieOrbit;
