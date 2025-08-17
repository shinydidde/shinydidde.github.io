# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15 that features a unique "meme mode" toggle. The site displays personal information, skills, experience, projects, and education in both normal and meme-themed layouts with animated characters and interactive elements.

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

### Meme Mode System
- **Context**: `contexts/MemeContext.tsx` manages global meme mode state
- **Toggle**: Controlled via `useMemeMode()` hook, persists to localStorage
- **CSS Classes**: Components conditionally render based on `isMemeMode` state
- **Characters**: Floating animated characters appear/disappear based on meme mode

### Styling
- **Tailwind CSS**: Custom color palette (teal, magenta, mustard, lime)
- **Fonts**: Patrick Hand for handwritten feel, Permanent Marker for titles
- **Animations**: Framer Motion for character movements and transitions

### Static Export
- **Configuration**: `next.config.ts` enables static export with unoptimized images
- **Deployment**: Built to `/out` directory for static hosting (GitHub Pages)
- **Images**: Stored in `/public` with Firebase Storage as fallback for dynamic content

## Key Files
- `contexts/MemeContext.tsx` - Global meme mode state management
- `lib/firestoreService.ts` - Type-safe Firestore data fetching
- `components/FloatingCharacter.tsx` - Animated character system
- `tailwind.config.js` - Custom color scheme and font configuration