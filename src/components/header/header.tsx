"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
      className="sticky top-6 z-30 mx-auto mb-12 flex w-full max-w-6xl items-center justify-between rounded-full border border-white/25 bg-white/80 px-5 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-700 shadow-[0_25px_65px_rgba(15,23,42,0.2)] backdrop-blur-2xl transition-all dark:border-white/5 dark:bg-slate-900/70 dark:text-slate-200"
    >
      <Link href="#home" className="flex items-center gap-3 text-slate-900 transition-colors dark:text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-base font-black text-white shadow-lg shadow-slate-900/30 dark:bg-white dark:text-slate-900">
          UZ
        </span>
        <span className="hidden text-[0.65rem] tracking-[0.4em] text-slate-600 dark:text-slate-200 sm:inline">
          Portfolio
        </span>
      </Link>

      <nav className="hidden items-center gap-3 md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="pill-link">
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <MagneticButton strength={0.55}>
          <Link href="#contact" className="cta-button">
            <span>Schedule a Call</span>
          </Link>
        </MagneticButton>
      </div>
    </header>
  );
}
