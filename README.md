# Uzair Khan Portfolio Hero (React + Vite)

A single-screen portfolio splash inspired by the provided wireframe. This rebuild removes the previous Next.js stack and replaces it with a lightweight React + TypeScript + Vite setup that focuses on a full-height hero, glassy header, GSAP-powered typography, and a responsive light/dark theme toggle.

## Tech Stack
- **React 18 + TypeScript** rendered through Vite for instant feedback.
- **Vite** dev server/bundler for a zero-config DX.
- **GSAP** for the staggered entrance timeline, looping wave motion, and pointer-reactive glow.
- **Modern CSS** (custom properties + clamp + backdrop blur) to deliver the clean look without relying on utility frameworks.

## Project Structure
```
├── index.html              # Vite entry
├── src
│   ├── App.tsx             # Layout shell with header + hero
│   ├── main.tsx            # React root render
│   ├── components
│   │   ├── Header.tsx      # Sticky navigation, nav pills, CTA, theme toggle
│   │   ├── Hero.tsx        # Full-height hero + GSAP animations
│   │   └── ThemeToggle.tsx # Emoji-based toggle wired to the theme hook
│   ├── hooks
│   │   └── useTheme.ts     # Persists theme + syncs with prefers-color-scheme
│   └── styles
│       ├── app.css         # Component-level styling for header + hero
│       └── index.css       # Global tokens, resets, typography
├── package.json            # Scripts + deps
├── tsconfig*.json          # TypeScript configs for app + build tools
└── vite.config.ts          # Vite + React plugin
```

## Key Implementation Notes
- **Full viewport hero:** `.hero` uses `min-height: 100vh` with generous padding and a blurred glass container so the first screen feels immersive on any device.
- **Theme system:** `useTheme` stores the current theme in `localStorage`, respects the user’s OS preference on first load, and writes a `data-theme` attribute to `<html>` so CSS variables update instantly.
- **GSAP animation flow:** `Hero.tsx` builds a timeline inside `useLayoutEffect` to stagger the header, hero letters, and metadata. A separate looping tween keeps each letter gently bobbing, and a pointer listener drives the glowing orb for subtle parallax.
- **Type safety:** Components are typed by default, hooks expose explicit return shapes, and the TypeScript compiler (via `npm run lint`) ensures there are no implicit `any`s.

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite in development mode. |
| `npm run build` | Type-check via `tsc -b` then bundle the site. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run TypeScript in no-emit mode for fast type-checking. |

> **Note:** Installing dependencies may fail in this execution environment because external network calls to npm are blocked. The project is otherwise ready for a standard `npm install` on your machine.

## Customization Tips
- Update the nav labels or CTA text directly inside `Header.tsx`.
- Swap fonts or tweak the typography scale inside `src/styles/index.css` and `src/styles/app.css`.
- Extend the hero timeline in `Hero.tsx` with extra GSAP effects (e.g., SplitText, ScrollTrigger) if you need more complex sequences.
