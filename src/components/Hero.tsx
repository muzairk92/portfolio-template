import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LETTERS = 'UZAIR KHAN'.split('');

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.site-header', {
        y: -40,
        opacity: 0,
        duration: 0.8,
      });

      tl.from(
        '.hero-letter',
        {
          yPercent: 120,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
        },
        '-=0.3'
      );

      tl.from(
        '.hero-meta',
        {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.8,
        },
        '-=0.4'
      );

      gsap.to('.hero-letter', {
        yPercent: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 2.6,
        stagger: {
          each: 0.1,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = node.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(node.querySelector('.hero-glow'), {
        x: x * 40,
        y: y * 40,
        duration: 0.6,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-glow" aria-hidden />
      <div className="hero-content">
        <div className="hero-grid">
          <p className="hero-meta hero-meta__left">Since 2014</p>
          <div className="hero-name" aria-label="Uzair Khan">
            {LETTERS.map((letter, index) => (
              <span key={`${letter}-${index}`} className="hero-letter">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <p className="hero-meta hero-meta__right">UI/UX Designer and Web Developer</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
