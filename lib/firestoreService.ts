// lib/firestoreService.ts
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

/** helpers **/
function getString(x: unknown): string {
  return typeof x === 'string' ? x : ''
}
function getStringArray(x: unknown): string[] {
  return Array.isArray(x) ? x.filter(i => typeof i === 'string') : []
}
function getObjectArray<T>(raw: unknown, mapFn: (o: Record<string,unknown>) => T): T[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(i => typeof i === 'object' && i !== null)
    .map(i => mapFn(i as Record<string,unknown>))
}

export interface HeroData {
  name:         string
  role:         string
  avatarUrl:    string
  logo:         string
  backgrounds:  string[]
  catchPhrase:  string
  scrollPrompt: string

  // new (all optional in Firestore)
  normalRoles?:   string[]
  memeRoles?:     string[]
  normalFacts?:   string[]
  memeFacts?:     string[]
  memeTitle?:     string
  normalButtonText?: string
  memeButtonText?:   string
  sticker1?: { emoji: string; text: string }
  sticker2?: { emoji: string; text: string }
}

function getSticker(x: unknown): { emoji: string; text: string } | undefined {
  if (!x || typeof x !== 'object') return undefined
  const o = x as Record<string, unknown>
  const emoji = getString(o.emoji)
  const text  = getString(o.text)
  return emoji || text ? { emoji, text } : undefined
}

export async function fetchHero(): Promise<HeroData> {
  const snap = await getDoc(doc(db, 'hero', 'info'))
  if (!snap.exists()) {
    return {
      name:'', role:'', avatarUrl:'', logo:'',
      backgrounds:[], catchPhrase:'', scrollPrompt:'',
      normalRoles:[], memeRoles:[], normalFacts:[], memeFacts:[]
    }
  }

  const d = snap.data() as Record<string, unknown>

  return {
    name:         getString(d.name),
    role:         getString(d.role),
    avatarUrl:    getString(d.avatarUrl),
    logo:         getString(d.logo),
    backgrounds:  getStringArray(d.backgrounds),
    catchPhrase:  getString(d.catchPhrase),
    scrollPrompt: getString(d.scrollPrompt),

    // 🔹 pull roles & facts directly from Firestore
    normalRoles:  getStringArray(d.normalRoles),
    memeRoles:    getStringArray(d.memeRoles),
    normalFacts:  getStringArray(d.normalFacts),
    memeFacts:    getStringArray(d.memeFacts),

    // optional extras (safe if missing)
    memeTitle:        getString(d.memeTitle),
    normalButtonText: getString(d.normalButtonText),
    memeButtonText:   getString(d.memeButtonText),
    sticker1: getSticker(d.sticker1),
    sticker2: getSticker(d.sticker2),
  }
}

/** 2) ABOUT **/
export interface AboutFact {
  text: string;
  icon: string; // e.g. "lightbulb", "code", "fire"...
}
export interface AboutData {
  title: string;
  subtitle: string;
  bio: string;            // HTML string
  illustration: string;
  memeTitle?: string;
  memeSubtitle?: string;
  normalFacts?: AboutFact[];
  memeFacts?: AboutFact[];
  buttonText?: {
    normal: string;
    meme: string;
  };
}

export async function fetchAbout(): Promise<AboutData> {
  const snap = await getDoc(doc(db, 'about', 'info'));
  if (!snap.exists()) {
    return { illustration: '', title: '', subtitle: '', bio: '' };
  }

  // Narrow away Firestore's DocumentData (which is [k: string]: any)
  const d = snap.data() as Record<string, unknown>;

  const normalFacts = getObjectArray<AboutFact>(d.normalFacts, (o) => ({
    text: getString(o.text),
    icon: getString(o.icon),
  }));

  const memeFacts = getObjectArray<AboutFact>(d.memeFacts, (o) => ({
    text: getString(o.text),
    icon: getString(o.icon),
  }));

  // buttonText is optional and nested — guard and map safely
  const rawBtn: unknown = d['buttonText'];
  let buttonText: AboutData['buttonText'] | undefined;
  if (rawBtn && typeof rawBtn === 'object' && !Array.isArray(rawBtn)) {
    const btn = rawBtn as Record<string, unknown>;
    buttonText = {
      normal: getString(btn.normal),
      meme:   getString(btn.meme),
    };
  }

  return {
    illustration: getString(d.illustration),
    title:        getString(d.title),
    subtitle:     getString(d.subtitle),
    bio:          getString(d.bio),

    memeTitle:    getString(d.memeTitle),
    memeSubtitle: getString(d.memeSubtitle),
    normalFacts,
    memeFacts,
    buttonText,
  };
}

/** 3) SKILLS **/
export interface SkillCategory {
  type:  string
  items: SkillItem[]
}
export interface SkillsListData {
  title:      string
  categories: SkillCategory[]
}

export interface SkillItem {
  name: string
  icon: string
}
export async function fetchSkillsList(): Promise<SkillsListData> {
  const snap = await getDoc(doc(db, 'skills', 'list'))
  if (!snap.exists()) {
    return { title:'', categories:[] }
  }
  const d = snap.data()!
  const cats = getObjectArray(d.categories, o => ({
    type: getString(o.type),
    items: getObjectArray(o.items, i => ({
      name: getString(i.name),
      icon: getString(i.icon)
    }))
  }))
  return {
    title:      getString(d.title),
    categories: cats
  }
}

/** 4) EXPERIENCE **/
export interface ExperienceEntry {
  year:    string
  role:    string
  details: string[]
}
export interface ExperienceListData {
  title:   string
  entries: ExperienceEntry[]
}
export async function fetchExperienceList(): Promise<ExperienceListData> {
  const snap = await getDoc(doc(db, 'experience', 'list'))
  if (!snap.exists()) {
    return { title:'', entries:[] }
  }
  const d = snap.data()!
  const entries = getObjectArray(d.entries, o => ({
    year:    getString(o.year),
    role:    getString(o.role),
    details: getStringArray(o.details)
  }))
  return {
    title:   getString(d.title),
    entries
  }
}

/** 5) PROJECTS **/
export interface ProjectItem {
  title:       string
  description: string
  image:       string
  link:        string
}
export interface ProjectsListData {
  title: string
  items: ProjectItem[]
}
export async function fetchProjectsList(): Promise<ProjectsListData> {
  const snap = await getDoc(doc(db, 'projects', 'list'))
  if (!snap.exists()) {
    return { title:'', items:[] }
  }
  const d = snap.data()!
  const items = getObjectArray(d.items, o => ({
    title:       getString(o.title),
    description: getString(o.description),
    image:       getString(o.image),
    link:        getString(o.link),
  }))
  return {
    title: getString(d.title),
    items
  }
}

/** 6) CONTACT **/
export interface ContactData {
  heading:    string
  email:      string
  phone:      string
  skype:      string
  footerText: string
}
export async function fetchContactInfo(): Promise<ContactData> {
  const snap = await getDoc(doc(db, 'contact', 'info'))
  if (!snap.exists()) {
    return { heading:'', email:'', phone:'', skype:'', footerText:'' }
  }
  const d = snap.data()!
  return {
    heading:    getString(d.heading),
    email:      getString(d.email),
    phone:      getString(d.phone),
    skype:      getString(d.skype),
    footerText: getString(d.footerText),
  }
}

/** 7) EDUCATION **/
export interface EducationEntry {
  year:        string;  // e.g. "Jan '24 – Jan '25"
  title:       string;  // e.g. "Masters - Information Systems with Computing"
  institution: string;  // e.g. "Dublin Business School"
  grade:       string;  // e.g. "74% First Class Honours"
}

export interface EducationListData {
  title:   string;            // section heading, e.g. "Education"
  entries: EducationEntry[];
}

export async function fetchEducationList(): Promise<EducationListData> {
  const snap = await getDoc(doc(db, "education", "list"));
  if (!snap.exists()) {
    return { title: "", entries: [] };
  }
  const d = snap.data()!;

  // 🔥 Switch here to use d.entries:
  const raw: unknown[] = Array.isArray(d.entries) ? d.entries : [];
  const entries = getObjectArray(raw, (o) => ({
    year:        getString(o.year),
    title:       getString(o.title),
    institution: getString(o.institution ?? o.content),
    grade:       getString(o.grade       ?? o.desc),
  }));

  return {
    title:   getString(d.title),
    entries,
  };
}

/** 8) THEME **/
export interface ThemeSettings {
  colors: {
    primary:   string
    secondary: string
    accent:    string
    bg:        string
    text:      string
  }
  font:      string
  animation: {
    duration: number
    easing:   string
  }
}
export async function fetchThemeSettings(): Promise<ThemeSettings> {
  const snap = await getDoc(doc(db, 'theme', 'settings'))
  if (!snap.exists()) {
    return {
      colors: { primary:'#', secondary:'#', accent:'#', bg:'#', text:'#' },
      font:'', animation:{ duration:0, easing:'' }
    }
  }
  const d = snap.data()!
  return {
    colors: {
      primary:   getString(d.colors?.primary),
      secondary: getString(d.colors?.secondary),
      accent:    getString(d.colors?.accent),
      bg:        getString(d.colors?.bg),
      text:      getString(d.colors?.text),
    },
    font:      getString(d.font),
    animation: {
      duration: typeof d.animation?.duration === 'number' ? d.animation.duration : 0,
      easing:   getString(d.animation?.easing),
    }
  }
}


export type FooterData = Readonly<{
  name: string;
  avatar: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    skype: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  copy: {
    headingNormal: string;
    headingMeme: string;
    bioNormal: string;
    bioMeme: string;
    footerTextNormal: string;
    footerTextMeme: string;
    copyrightNormal: string; // supports {year}
    copyrightMeme: string;   // supports {year}
    nameSuffixMeme: string;
    dmTitleNormal: string;
    dmTitleMeme: string;
    dmListNormal: string[];
    dmListMeme: string[];
  };
}>;

export async function fetchFooterInfo(): Promise<FooterData> {
  const snap = await getDoc(doc(db, 'footer', 'info'));
  if (!snap.exists()) {
    return {
      name: '',
      avatar: '',
      contact: { email: '', phone: '', location: '', skype: '' },
      social:  { github: '', linkedin: '', twitter: '', instagram: '' },
      copy: {
        headingNormal: '', headingMeme: '',
        bioNormal: '', bioMeme: '',
        footerTextNormal: '', footerTextMeme: '',
        copyrightNormal: '', copyrightMeme: '',
        nameSuffixMeme: '',
        dmTitleNormal: '', dmTitleMeme: '',
        dmListNormal: [], dmListMeme: []
      }
    };
  }

  const d = snap.data() as Record<string, unknown>;
  const c  = (d.contact && typeof d.contact === 'object') ? d.contact as Record<string,unknown> : {};
  const s  = (d.social  && typeof d.social  === 'object') ? d.social  as Record<string,unknown> : {};
  const cp = (d.copy    && typeof d.copy    === 'object') ? d.copy    as Record<string,unknown> : {};

  return {
    name:   getString(d.name),
    avatar: getString(d.avatar),
    contact: {
      email:    getString(c.email),
      phone:    getString(c.phone),
      location: getString(c.location),
      skype:    getString(c.skype),
    },
    social: {
      github:    getString(s.github),
      linkedin:  getString(s.linkedin),
      twitter:   getString(s.twitter),
      instagram: getString(s.instagram),
    },
    copy: {
      headingNormal:    getString(cp.headingNormal),
      headingMeme:      getString(cp.headingMeme),
      bioNormal:        getString(cp.bioNormal),
      bioMeme:          getString(cp.bioMeme),
      footerTextNormal: getString(cp.footerTextNormal),
      footerTextMeme:   getString(cp.footerTextMeme),
      copyrightNormal:  getString(cp.copyrightNormal),
      copyrightMeme:    getString(cp.copyrightMeme),
      nameSuffixMeme:   getString(cp.nameSuffixMeme),
      dmTitleNormal:    getString(cp.dmTitleNormal),
      dmTitleMeme:      getString(cp.dmTitleMeme),
      dmListNormal:     getStringArray(cp.dmListNormal),
      dmListMeme:       getStringArray(cp.dmListMeme),
    }
  };
}
