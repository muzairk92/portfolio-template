"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_NAME = "UZAIR KHAN";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sinceRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // Client-only animation logic is housed here because GSAP touches the DOM.
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Timeline coordinates the page-load hero motion.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(lettersRef.current, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.08
      }).from(
        [sinceRef.current, titleRef.current],
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.2
        },
        "-=0.3"
      );

      if (heroRef.current) {
        // ScrollTrigger handles the parallax drift while scrolling.
        gsap.to(heroRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom+=200 top",
            scrub: true
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl flex-col justify-between gap-10 overflow-hidden rounded-[3rem] border border-white/40 bg-white/70 px-6 py-12 text-center shadow-[0_45px_120px_rgba(15,23,42,0.25)] backdrop-blur-[30px] dark:border-white/10 dark:bg-white/10 sm:px-12 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.75),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.35),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.25),rgba(59,7,100,0.25))]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-noise rounded-[3rem]" aria-hidden />

      <div className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <p ref={sinceRef} className="text-left">
          Since 2014
        </p>
        <p ref={titleRef} className="text-right">
          UI/UX Designer · Web Developer
        </p>
      </div>

      <div className="space-y-6">
        <h1 className="flex flex-wrap justify-center gap-4 text-center font-display text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-black drop-shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
          {Array.from(HERO_NAME).map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              ref={(node) => {
                lettersRef.current[index] = node;
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
        <p className="text-balance text-lg text-slate-600 dark:text-slate-200">
          Building immersive brand experiences with delightful micro-interactions and performant web engineering.
        </p>
      </div>

      <div className="flex flex-col gap-3 text-left text-sm text-slate-500 dark:text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <span>Product strategy · Motion systems · Design systems</span>
        <span>Currently taking on select freelance collaborations</span>
      </div>
    </section>
  );
}
