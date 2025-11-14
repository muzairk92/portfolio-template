"use client";

import { useRef } from "react";
import gsap from "gsap";

type MagneticHoverOptions = {
  strength?: number;
};

type MagneticHoverHandlers = {
  handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
  ref: React.RefObject<HTMLElement>;
};

export function useMagneticHover({ strength = 0.3 }: MagneticHoverOptions = {}): MagneticHoverHandlers {
  // Ref holds whichever element should follow the cursor.
  const targetRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const node = targetRef.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const relativeX = event.clientX - (bounds.left + bounds.width / 2);
    const relativeY = event.clientY - (bounds.top + bounds.height / 2);

    gsap.to(node, {
      x: relativeX * strength,
      y: relativeY * strength,
      duration: 0.4,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    const node = targetRef.current;
    if (!node) return;

    gsap.to(node, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)"
    });
  };

  return { ref: targetRef, handleMouseLeave, handleMouseMove };
}
