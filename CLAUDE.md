# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15 that features a unique "playful mode" toggle. The site displays personal information, skills, experience, projects, and education in both professional and playful layouts with animated characters and interactive elements.

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
- **Layout**: `app/layout.tsx` sets up global providers, fonts, and floating elements
- **Main Page**: `app/page.tsx` fetches all data and renders section components
- **Sections**: Each major section (Hero, About, Skills, etc.) is a separate component in `/components`
- **UI Components**: Reusable components in `/components/ui/`

### Playful Mode System
- **Context**: `contexts/PlayfulContext.tsx` manages global playful mode state
- **Toggle**: Controlled via `usePlayfulMode()` hook, persists to localStorage
- **CSS Classes**: Components conditionally render based on `isPlayfulMode` state
- **Characters**: Floating animated characters appear/disappear based on playful mode

### Styling
- **Tailwind CSS**: Custom color palette (teal, magenta, mustard, lime)
- **Fonts**: Poppins for professional mode, Patrick Hand for playful mode, Permanent Marker for playful titles
- **Animations**: Framer Motion for character movements and transitions

### Static Export
- **Configuration**: `next.config.ts` enables static export with unoptimized images
- **Deployment**: Built to `/out` directory for static hosting (GitHub Pages)
- **Images**: Stored in `/public` with Firebase Storage as fallback for dynamic content

## Key Files
- `contexts/PlayfulContext.tsx` - Global playful mode state management
- `lib/firestoreService.ts` - Type-safe Firestore data fetching
- `components/FloatingCharacter.tsx` - Animated character system
- `tailwind.config.js` - Custom color scheme and font configuration