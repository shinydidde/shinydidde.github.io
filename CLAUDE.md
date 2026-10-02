# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15. It has a dark, neon "prism" look with a WebGL scene (React Three Fiber) behind the content, and shows hero, about, skills, experience, education and contact sections.

## Key Commands

- **Development**: `npm run dev` - Start development server on localhost:3000
- **Build**: `npm run build` - Create production build with static export
- **Lint**: `npm run lint` - Run ESLint checks
- **Production**: `npm start` - Start production server

## Architecture

### Data Layer
- **Firebase/Firestore**: All content is stored in Firestore collections (`hero`, `about`, `skills`, `experience`, `projects`, `education`, `footer`)
- **Data Service**: `lib/firestoreService.ts` provides typed fetch functions for each collection
- **Static Generation**: Page data is fetched at build time using Next.js server components

### Component Structure
- **Layout**: `app/layout.tsx` sets up fonts (Unbounded display, Manrope body, JetBrains Mono) and SEO metadata
- **Main Page**: `app/page.tsx` fetches all data (server component) and renders the sections; derived stats (years, companies) are computed here
- **Sections**: `components/site/` — `Nav`, `Hero`, `Marquee`, `About`, `Skills`, `Experience`, `Education`, `Contact`
- **Shared UI**: `components/site/primitives.tsx` (client: `Reveal`, `TiltCard`, `SectionHeading`); `components/site/format.ts` (server-safe: `PRISM` palette, `prismAt`, text helpers). Keep plain helpers in `format.ts` — functions exported from a `'use client'` module can't be called from server components.

### Splash
- `components/site/Splash.tsx` — loading screen (sketch portrait painted in colour by a rising wave, progress ring, status lines); coloured-pencil portraits (`public/images/site/me/`) pop in at random spots via `SplashPortraits.tsx`. Shown once per session (`SPLASH_INIT_SCRIPT` in `app/layout.tsx`); add `?splash` to the URL to replay. `useSplashDone()` lets sections start intros after it lifts.
- Images live in `public/images/site/` as WebP with lossless alpha (lossy alpha leaves a faint haze that glow filters turn into a visible box)

### 3D Scene
- `components/three/SceneBackground.tsx` — fixed, full-screen layer; lazy-loads the canvas with `ssr: false`, has a gradient fallback and a scroll-driven dark veil
- `components/three/WorldScene.tsx` — R3F canvas: a low-poly nature planet (trees, flowers, a low-poly model of the owner (`Me`) walking her white dog Cherry (red collar + name tag) on a leash (`WalkingPair`) and two ginger cats, plus wildlife: fox, deer, elephant, bear, tiger, lion, snake, sheep, hedgehog, squirrel, turtle, bunny, owl, a spider dangling from a tree, songbirds on treetops, duck and frog in the pond, birds, butterflies, clouds); animal spots are in `RESERVED` and kept off the walking lane (`RUN_AXIS`) under stars and a moon, all built from primitives; `Choreographer` moves/turns it based on scroll progress and pointer
- Seasonal extras from the visitor's local date (`getSeason`): December adds a decorated Christmas tree (`ChristmasTree`) and snowfall (`Snow`); January adds a "Happy New Year <year>" sign and fireworks. Preview any time with `?season=december` or `?season=january`.
- The skills sphere in `components/site/Skills.tsx` is DOM-based (projected tags), not WebGL

### Styling
- **Tailwind CSS**: `ink` background shades and `prism` neon palette (pink, orange, yellow, lime, cyan, violet)
- **Utility classes** in `app/globals.css`: `.glass`, `.text-rainbow`, `.ring-rainbow`, `.section-label`, `.section-title`
- **Animations**: Framer Motion for reveals/tilt/menu; respects `prefers-reduced-motion`

### Static Export
- **Configuration**: `next.config.ts` enables static export with unoptimized images
- **Deployment**: Built to `/out` directory for static hosting (GitHub Pages)
- **Images**: Stored in `/public` with Firebase Storage as fallback for dynamic content

## Key Files
- `lib/firestoreService.ts` - Type-safe Firestore data fetching
- `components/three/WorldScene.tsx` - WebGL nature-world background scene
- `app/admin/` + `components/AdminPage.tsx` - Firestore JSON editor (auth-gated)
- `tailwind.config.js` - Custom color scheme and font configuration