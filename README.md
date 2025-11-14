# Portfolio Hero Section (Next.js 14 + GSAP)

A learning-focused hero section inspired by the Uzair Khan sketch. Built with the Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP, and a Lottie-powered theme toggle.

## Tech Stack
- **Next.js 14 App Router** for streaming server components and file-based routing inside `src/app`.
- **TypeScript** for end-to-end type safety.
- **Tailwind CSS** for utility-first styling.
- **GSAP + ScrollTrigger** for the requested load + parallax animations.
- **Lottie-react + next-themes** for the animated light/dark mode switch.

## File/Folder Overview
```
├── src
│   ├── app
│   │   ├── layout.tsx      // Root layout (Server Component)
│   │   ├── page.tsx        // Hero route (Server Component)
│   │   └── globals.css     // Tailwind layers + custom utilities
│   ├── components
│   │   ├── header          // Sticky navigation bar
│   │   ├── hero            // Hero section with GSAP animations
│   │   ├── theme           // Theme toggle + Lottie animation
│   │   ├── providers       // Next-themes provider wrapper
│   │   └── ui              // Reusable UI helpers (magnetic button)
│   ├── data                // Lottie JSON data
│   └── hooks               // Custom hooks (e.g., magnetic hover)
├── public                  // Static assets (placeholders)
├── tailwind.config.ts      // Tailwind setup pointing at src/**/*
├── postcss.config.mjs      // PostCSS pipeline
├── tsconfig.json           // TypeScript compiler configuration
└── next.config.mjs         // Next.js configuration
```

### Server vs. Client Components
- **`src/app/layout.tsx` & `src/app/page.tsx`** render on the server (no `use client` directive). They handle metadata, fonts, and streaming shell markup.
- **Interactive pieces** such as the header, hero animations, theme toggle, and magnetic button opt into the Client Component model via the `'use client'` directive. They rely on React hooks (`useEffect`, `useRef`, `useState`) and browser-only APIs (GSAP DOM measurements, matchMedia, etc.).

### Component Organization
| Component | Type | Responsibility |
|-----------|------|----------------|
| `Header` | Client | Sticky navigation, nav pills, CTA, magnetic hover, header entrance animation. |
| `Hero` | Client | Displays the giant name, supporting text, GSAP load/parallax animations. |
| `ThemeToggle` | Client | Connects `next-themes` to a Lottie animation for the sun/moon transition. |
| `MagneticButton` | Client | Higher-order component that applies the GSAP-based cursor attraction effect. |

### GSAP Usage
- **Setup:** `gsap.registerPlugin(ScrollTrigger)` occurs inside `useEffect` to ensure code only runs in the browser.
- **Page load timeline:** Hero letters animate via `gsap.timeline` with staggered `yPercent` reveals followed by the supporting captions.
- **Scroll-triggered parallax:** `ScrollTrigger` translates the hero container based on scroll position for the soft drift effect.
- **Magnetic cursor:** The `useMagneticHover` hook measures pointer deltas and feeds them to `gsap.to` for subtle button translations.

### Custom Hooks
- `useMagneticHover` centralizes the GSAP-powered hover logic so any CTA can become "magnetic" simply by wrapping it in `<MagneticButton>`.

### Theme Toggle & Lottie
- The `ThemeProvider` (in `components/providers`) uses `next-themes` to switch Tailwind's `class` strategy between `light` and `dark`.
- `ThemeToggle` holds a `LottieRefCurrentProps` ref to scrub through `themeToggleAnimation`. The animation plays forward when enabling dark mode and reverses for light mode.

## Running the Project
```bash
npm install
npm run dev
```
> **Note:** If your environment restricts access to npm, install packages from a mirror or add them manually to a local registry. The codebase itself is ready for a standard `npm install`.

## Learning Notes
1. **`use client`** is mandatory whenever a component relies on hooks or browser-only libraries such as GSAP or Lottie.
2. **TypeScript types** (e.g., literal `as const` nav arrays, exported animation types) help ensure props remain typed even across dynamic animations.
3. **GSAP in Next.js** should live inside `useEffect`/`useLayoutEffect` with `gsap.context` so animations clean up when components unmount.
4. **App Router file structure** keeps route segments in `src/app`. Nested folders would create additional routes (`app/(marketing)/page.tsx`, etc.) and layouts.
5. **Tailwind + CSS variables** allow the background gradients + glassmorphism styles to react instantly to theme changes.

## Screenshot / Preview
Run `npm run dev`, visit `http://localhost:3000`, and you will see the animated hero that matches the provided sketch but with modernized typography and interactions.
