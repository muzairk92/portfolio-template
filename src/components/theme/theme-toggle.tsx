"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { themeToggleAnimation } from "@/data/themeToggleAnimation";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    // Delay rendering of the animation until after hydration to avoid mismatch.
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !animationRef.current) return;
    const isDark = (theme ?? resolvedTheme) === "dark";
    animationRef.current.goToAndStop(isDark ? 60 : 0, true);
  }, [mounted, resolvedTheme, theme]);

  const handleToggle = () => {
    if (!animationRef.current) return;
    const isDark = (theme ?? resolvedTheme) === "dark";
    animationRef.current.setDirection(isDark ? -1 : 1);
    animationRef.current.play();
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 transition-colors hover:border-slate-900/40 dark:border-white/20 dark:bg-white/10"
      aria-label="Toggle theme"
    >
      {mounted && (
        <Lottie
          lottieRef={animationRef}
          animationData={themeToggleAnimation}
          autoplay={false}
          loop={false}
          className="h-9 w-9"
        />
      )}
      {!mounted && <span className="text-xs">···</span>}
    </button>
  );
}
