/**
 * Lightweight GSAP-inspired helpers used to animate the hero typography.
 * The API mirrors a tiny portion of GSAP's surface so the rest of the UI code
 * reads very similarly to a typical GSAP + React implementation.
 */
export type TweenTarget = HTMLElement | SVGElement;

export type TweenProps = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
};

export interface TweenOptions {
  duration?: number;
  delay?: number;
  ease?: (progress: number) => number;
  onComplete?: () => void;
}

const defaultEase = (t: number) => 1 - Math.pow(1 - t, 3);

type Cancelable = () => void;

function applyInitialState(target: TweenTarget, props: TweenProps) {
  const transforms: string[] = [];

  if (typeof props.x === "number") {
    transforms.push(`translateX(${props.x}px)`);
  }

  if (typeof props.y === "number") {
    transforms.push(`translateY(${props.y}px)`);
  }

  if (typeof props.scale === "number") {
    transforms.push(`scale(${props.scale})`);
  }

  if (transforms.length > 0) {
    target.style.transform = transforms.join(" ");
  }

  if (typeof props.opacity === "number") {
    target.style.opacity = String(props.opacity);
  }
}

function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function animate(target: TweenTarget, from: TweenProps, to: TweenProps, options: TweenOptions = {}): Cancelable {
  const { duration = 0.8, delay = 0, ease = defaultEase, onComplete } = options;
  const startTime = performance.now() + delay * 1000;
  const values = {
    opacity: {
      from: from.opacity ?? parseFloat(getComputedStyle(target).opacity || "1"),
      to: to.opacity ?? parseFloat(getComputedStyle(target).opacity || "1"),
    },
    x: {
      from: from.x ?? 0,
      to: to.x ?? 0,
    },
    y: {
      from: from.y ?? 0,
      to: to.y ?? 0,
    },
    scale: {
      from: from.scale ?? 1,
      to: to.scale ?? 1,
    },
  };

  applyInitialState(target, from);

  let rafId = 0;

  const step = (timestamp: number) => {
    if (timestamp < startTime) {
      rafId = requestAnimationFrame(step);
      return;
    }

    const elapsed = Math.min(timestamp - startTime, duration * 1000);
    const rawProgress = duration === 0 ? 1 : elapsed / (duration * 1000);
    const eased = ease(Math.min(rawProgress, 1));

    const transforms: string[] = [];

    if (from.x !== undefined || to.x !== undefined) {
      transforms.push(`translateX(${interpolate(values.x.from, values.x.to, eased)}px)`);
    }

    if (from.y !== undefined || to.y !== undefined) {
      transforms.push(`translateY(${interpolate(values.y.from, values.y.to, eased)}px)`);
    }

    if (from.scale !== undefined || to.scale !== undefined) {
      transforms.push(`scale(${interpolate(values.scale.from, values.scale.to, eased)})`);
    }

    if (transforms.length > 0) {
      target.style.transform = transforms.join(" ");
    }

    if (from.opacity !== undefined || to.opacity !== undefined) {
      target.style.opacity = String(interpolate(values.opacity.from, values.opacity.to, eased));
    }

    if (rawProgress < 1) {
      rafId = requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    }
  };

  rafId = requestAnimationFrame(step);

  return () => cancelAnimationFrame(rafId);
}

export function fromTo(target: TweenTarget, from: TweenProps, to: TweenProps, options?: TweenOptions) {
  return animate(target, from, to, options);
}

export class Timeline {
  private tasks: Cancelable[] = [];

  fromTo(target: TweenTarget, from: TweenProps, to: TweenProps, options?: TweenOptions) {
    const cancel = animate(target, from, to, options);
    this.tasks.push(cancel);
    return this;
  }

  clear() {
    this.tasks.forEach((cancel) => cancel());
    this.tasks = [];
  }
}

export function timeline() {
  return new Timeline();
}
