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
      className="relative isolate mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-[2.5rem] border border-white/20 bg-white/20 px-6 py-16 text-center shadow-[0_45px_120px_rgba(15,23,42,0.35)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/5 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%)]" aria-hidden />

      <div className="flex w-full justify-between text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-300">
        <p ref={sinceRef}>Since 2014</p>
        <p ref={titleRef}>UI/UX Designer · Web Developer</p>
      </div>

      <h1 className="flex flex-wrap justify-center gap-2 text-center font-display text-[clamp(3rem,12vw,11rem)] font-black leading-[0.9] text-slate-900 drop-shadow-[0_12px_40px_rgba(15,23,42,0.35)] dark:text-white">
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
    </section>
  );
}
