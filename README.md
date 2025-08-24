# Portfolio Website

A modern, interactive personal portfolio website built with Next.js 15, featuring a unique "Playful Mode" toggle that transforms the professional layout into an engaging, animated experience with floating characters and interactive elements.

## 🌟 Features

- **Dual Mode Interface**: Toggle between professional and playful layouts
- **Dynamic Content**: Firebase/Firestore integration for content management
- **Animated Characters**: Interactive floating characters in playful mode
- **Static Export**: Optimized for static hosting (GitHub Pages)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Built with TypeScript for robust development
- **Modern Stack**: Next.js 15 with App Router and Server Components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (for content management)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shinydidde/shinydidde.github.io.git
cd shinydidde.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file with Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production with static export
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase/Firestore
- **Fonts**: Poppins (professional), Patrick Hand (playful), Permanent Marker
- **Icons**: React Icons
- **Deployment**: Static export for GitHub Pages

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page component
│   └── admin/             # Admin interface
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── *Section.tsx      # Page sections
│   └── FloatingCharacter.tsx
├── contexts/             # React contexts
│   └── PlayfulContext.tsx
├── lib/                  # Utilities and services
│   ├── firebase.ts       # Firebase configuration
│   └── firestoreService.ts # Data fetching
├── public/               # Static assets
└── types/                # TypeScript definitions
```

### Data Management

Content is stored in Firebase Firestore with the following collections:
- `hero` - Hero section content
- `about` - About section information
- `skills` - Technical skills and categories
- `experience` - Work experience timeline
- `projects` - Portfolio projects
- `education` - Educational background
- `footer` - Footer content and social links

### Playful Mode System

The site features a unique dual-mode interface:
- **Professional Mode**: Clean, minimalist design suitable for recruiters
- **Playful Mode**: Animated characters, colorful styling, and interactive elements
- State managed via React Context and persisted to localStorage
- Smooth transitions powered by Framer Motion

## 🎨 Customization

### Colors

The site uses a custom color palette defined in `tailwind.config.js`:
- Teal: Primary professional color
- Magenta: Playful accent color
- Mustard: Secondary playful color
- Lime: Highlight color

### Content Management

Content can be updated through:
1. **Firebase Console**: Direct database editing
2. **Admin Interface**: Built-in admin panel at `/admin`
3. **Code Updates**: Modify Firestore service functions

### Adding New Sections

1. Create component in `/components`
2. Add data fetching to `firestoreService.ts`
3. Create Firestore collection
4. Import and use in `app/page.tsx`

## 📱 Deployment

The site is configured for static export and deployment on GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. The static files are generated in the `out/` directory

3. Deploy to GitHub Pages or any static hosting service

## 🔧 Development

### Adding Features

1. Follow existing patterns for component structure
2. Use the playful context for mode-aware components
3. Maintain type safety with TypeScript
4. Test both professional and playful modes

### Performance Considerations

- Images are unoptimized for static export compatibility
- Framer Motion animations are conditionally rendered
- Firebase data is fetched at build time for static generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both modes thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♀️ Contact

For questions or feedback, please reach out through the contact form on the website or connect via the social links in the footer.