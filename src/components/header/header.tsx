"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import clsx from "clsx";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Blog", href: "#blog" }
] as const;

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      // Header floats into view on page load to match the requested intro animation.
      gsap.from(headerRef.current, {
        y: -32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-4 z-20 mb-16 flex items-center justify-between rounded-full border border-white/15 bg-white/40 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/10"
    >
      <Link href="#home" className="text-lg font-semibold tracking-[0.2em]">
        UZ
      </Link>

      <nav className="hidden gap-3 sm:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-full border border-white/40 bg-white/70 px-4 py-1 text-sm font-medium text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
              "dark:border-white/10 dark:bg-white/10 dark:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <MagneticButton asChild strength={0.4}>
          <Link
            href="#contact"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-2xl shadow-slate-900/40 transition-all hover:shadow-slate-900/60 dark:bg-white dark:text-slate-900"
          >
            Schedule a Call
          </Link>
        </MagneticButton>
      </div>
    </header>
  );
}
