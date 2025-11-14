import { useEffect, useRef } from "@minireact";
import { timeline } from "gsap";
import LottieBadge from "./LottieBadge";

const Hero = () => {
  const headingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = headingRef.current;
    if (!target) return;
    const lines = Array.from(target.querySelectorAll("[data-letter]"));
    const tl = timeline();
    lines.forEach((element, index) => {
      tl.fromTo(
        element as HTMLElement,
        { opacity: 0, y: index % 2 === 0 ? 80 : -80 },
        { opacity: 1, y: 0 },
        { duration: 0.9, delay: index * 0.05 }
      );
    });

    return () => tl.clear();
  }, []);

  return (
    <main className="flex grow flex-col gap-12 px-6 py-10 lg:flex-row lg:px-12 lg:py-16">
      <section className="flex flex-col gap-10" style={{ flex: 0.35 }}>
        <div className="text-xs uppercase tracking-[0.45em] text-muted">Florida, USA</div>
        <div>
          <p className="text-sm text-muted">UI/UX Designer · Web Developer</p>
          <p className="mt-3 max-w-sm text-base text-body">
            Crafting intuitive interfaces and scalable front-end experiences for over ten years with a focus on
            purposeful motion.
          </p>
        </div>
        <LottieBadge />
      </section>

      <section className="hero-name flex flex-col leading-[0.85]" ref={headingRef}>
        <span className="text-hero" data-letter>
          Uzair
        </span>
        <span className="text-hero" data-letter>
          Khan
        </span>
      </section>

      <section className="flex flex-col justify-between text-right" style={{ flex: 0.2 }}>
        <div className="uppercase tracking-[0.35em] text-muted">Available for freelance</div>
        <div className="text-xs uppercase tracking-[0.35em] text-muted">Since 2014</div>
      </section>
    </main>
  );
};

export default Hero;
