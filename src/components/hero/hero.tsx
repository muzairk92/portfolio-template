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
      const letters = lettersRef.current.filter(
        (letter): letter is HTMLSpanElement => Boolean(letter)
      );

      // Timeline coordinates the page-load hero motion.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(letters, {
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

      if (letters.length) {
        // Creates a subtle wave so the wordmark keeps shimmering.
        gsap.to(letters, {
          yPercent: -4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 3.2,
          stagger: {
            each: 0.1,
            from: "center",
            yoyo: true
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
      className="relative isolate mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-between gap-10 overflow-hidden rounded-[3rem] border border-white/40 bg-white/80 px-6 py-12 text-center shadow-[0_45px_120px_rgba(15,23,42,0.25)] backdrop-blur-[30px] dark:border-white/10 dark:bg-white/5 sm:px-12 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.65),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.45),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.25),rgba(59,7,100,0.25))]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 hero-noise rounded-[3rem]" aria-hidden />

      <div className="flex flex-col gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <p ref={sinceRef} className="text-left">
          Since 2014
        </p>
        <p ref={titleRef} className="text-right">
          UI/UX Designer · Web Developer
        </p>
      </div>

      <div className="space-y-6">
        <h1 className="flex flex-wrap justify-center gap-4 text-center font-display text-[clamp(4rem,12vw,12rem)] font-black leading-[0.85] text-black">
          {Array.from(HERO_NAME).map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              ref={(node) => {
                lettersRef.current[index] = node;
              }}
              className="hero-letter"
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
