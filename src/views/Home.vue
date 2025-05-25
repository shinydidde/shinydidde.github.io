<template>
  <div class="portfolio-page">
    <!-- Floating particles background -->
    <div class="particles">
      <div v-for="i in particleCount" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <!-- Gradient animated background -->
    <div class="gradient-bg"></div>

    <HeaderBar :personalInfo="personalInfo" />

    <main>
      <AboutSection :personalInfo="personalInfo" class="section-animate" />
      <ExperienceSection :data="experienceData" class="section-animate" />
      <SkillsSection :data="skillsData" class="section-animate" />
      <ProjectsSection :data="projectsData" class="section-animate" />
      <EducationSection :data="educationData" class="section-animate" />
    </main>

    <FooterSection :personalInfo="personalInfo" />

    <!-- Back to Top Floating Action Button -->
    <button class="fab" :class="{ visible: showFab }" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
import {
  fetchPersonalInfo,
  fetchExperience,
  fetchSkills,
  fetchProjects,
  fetchEducation
} from '@/services/firestoreService'

import HeaderBar from '@/components/HeaderBar.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'ResumePage',
  components: {
    HeaderBar,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    ProjectsSection,
    EducationSection,
    FooterSection
  },
  data() {
    return {
      personalInfo: {},
      experienceData: {},
      skillsData: {},
      projectsData: {},
      educationData: {},
      particleCount: 50,
      observer: null,
      showFab: false
    }
  },
  async created() {
    try {
      const [
        personalInfo,
        experienceData,
        skillsData,
        projectsData,
        educationData
      ] = await Promise.all([
        fetchPersonalInfo(),
        fetchExperience(),
        fetchSkills(),
        fetchProjects(),
        fetchEducation()
      ])
      Object.assign(this, {
        personalInfo,
        experienceData,
        skillsData,
        projectsData,
        educationData
      })

      this.$nextTick(() => {
        this.setupIntersectionObserver();
      })
    } catch (e) {
      console.error('Data load failed:', e)
    }
  },
  mounted() {
    // Show back-to-top button after scrolling down
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    particleStyle(i) {
      const size = Math.random() * 8 + 3
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      const x = Math.random() * 100
      const y = Math.random() * 100
      const opacity = Math.random() * 0.5 + 0.1
      const hue = Math.random() * 360
      const color = `hsla(${hue}, 80%, 60%, ${opacity})`

      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        opacity: opacity,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        borderRadius: Math.random() > 0.5 ? '50%' : '0'
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    handleScroll() {
      this.showFab = window.pageYOffset > 300
    },
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      }, {
        threshold: 0.1
      })

      document.querySelectorAll('.section-animate').forEach(section => {
        this.observer.observe(section)
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600&display=swap');

:root {
  --primary: #6e45e2;
  --primary-dark: #4a2bb8;
  --primary-light: #8a6eff;
  --secondary: #ff7b25;
  --secondary-dark: #e05a00;
  --secondary-light: #ff9d5c;
  --accent: #00d4ff;
  --accent-dark: #00a5cc;
  --accent-light: #5fe2ff;
  --dark: #1e1e2e;
  --darker: #141420;
  --light: #f8fafc;
  --lighter: #ffffff;
  --text: #f5f6fa;
  --text-light: #d1d5db;
  --border: rgba(255, 255, 255, 0.1);
}

.portfolio-page {
  position: relative;
  font-family: 'Poppins', sans-serif;
  color: var(--text);
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: var(--dark);
  z-index: 1;
}

/* Animated gradient background */
.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--dark), var(--darker));
  z-index: -2;
}

/* Floating particles */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: var(--primary);
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, 10px) rotate(5deg); }
  50% { transform: translate(0, 20px) rotate(0deg); }
  75% { transform: translate(-20px, 10px) rotate(-5deg); }
}

/* Section animations */
.section-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.section-animate.animate {
  opacity: 1;
  transform: translateY(0);
}

/* Floating action button */
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(110, 69, 226, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.fab.visible {
  opacity: 1;
  transform: translateY(0);
}

.fab:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 25px rgba(110, 69, 226, 0.6);
}

.fab svg {
  width: 24px;
  height: 24px;
}

main {
  padding: 2rem;
  padding-top: 0;
}

main > * {
  margin: 3rem 0;
  position: relative;
  z-index: 1;
  background: rgba(30, 30, 46, 0.7);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateZ(0);
  will-change: transform, box-shadow;
}

main > *:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  border-color: rgba(110, 69, 226, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .portfolio-page {
    padding: 0 1rem;
  }

  main > * {
    margin: 2rem 0;
    padding: 1.5rem;
  }

  .fab {
    bottom: 1rem;
    right: 1rem;
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  main > * {
    padding: 1.25rem;
  }
}
</style>
