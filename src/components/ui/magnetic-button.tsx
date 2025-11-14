"use client";

import { cloneElement } from "react";
import { useMagneticHover } from "@/hooks/useMagneticHover";

type MagneticButtonProps = {
  children: React.ReactElement;
  strength?: number;
  asChild?: boolean;
};

export function MagneticButton({ children, strength = 0.3 }: MagneticButtonProps) {
  const { ref, handleMouseLeave, handleMouseMove } = useMagneticHover({ strength });

  // cloneElement lets us enhance any focusable element without imposing styles.
  return cloneElement(children, {
    ref,
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseMove?.(event);
      handleMouseMove(event);
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseLeave?.(event);
      handleMouseLeave();
    }
  });
}
