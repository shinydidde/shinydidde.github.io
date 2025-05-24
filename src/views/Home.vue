<template>
  <div class="resume-page">
    <!-- Floating particles background -->
    <div class="particles">
      <div v-for="i in 30" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <!-- Colorful gradient circles -->
    <div class="gradient-circle circle-1"></div>
    <div class="gradient-circle circle-2"></div>
    <div class="gradient-circle circle-3"></div>

    <HeaderBar :personalInfo="personalInfo" />

    <main>
      <AboutSection :personalInfo="personalInfo" />
      <ExperienceSection :data="experienceData" />
      <SkillsSection :data="skillsData" />
      <ProjectsSection :data="projectsData" />
      <EducationSection :data="educationData" />
    </main>

    <FooterSection :personalInfo="personalInfo" />
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
    HeaderBar, AboutSection, ExperienceSection,
    SkillsSection, ProjectsSection, EducationSection,
    FooterSection
  },
  data() {
    return {
      personalInfo: {},
      experienceData: {},
      skillsData: {},
      projectsData: {},
      educationData: {},
      particleCount: 30
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
    } catch (e) {
      console.error('Data load failed:', e)
    }
  },
  methods: {
    particleStyle(i) {
      const size = Math.random() * 5 + 3
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      const x = Math.random() * 100
      const y = Math.random() * 100
      const opacity = Math.random() * 0.5 + 0.1
      const color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`

      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        opacity: opacity,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #6366f1;
  --primary-light: #8183f4;
  --secondary: #10b981;
  --secondary-light: #34d399;
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --bg-blur: rgba(255,255,255,0.95);
  --text-color: #2d3748;
  --text-light: #6b7280;
}

.resume-page {
  position: relative;
  font-family: 'Poppins', sans-serif;
  color: var(--text-color);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  overflow-x: hidden;
  min-height: 100vh;
}

/* Particles background */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  z-index: -1;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, 20px) rotate(45deg); }
  50% { transform: translate(0, 40px) rotate(90deg); }
  75% { transform: translate(-20px, 20px) rotate(135deg); }
}

/* Gradient circles */
.gradient-circle {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  z-index: -1;
  animation: pulse 15s ease-in-out infinite alternate;
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--primary-light), transparent 70%);
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--secondary-light), transparent 70%);
  bottom: -100px;
  left: -100px;
  animation-delay: 3s;
}

.circle-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, var(--accent-light), transparent 70%);
  top: 40%;
  left: -120px;
  animation-delay: 6s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.1); opacity: 0.3; }
}

main > * {
  margin: 4rem 0;
  position: relative;
  z-index: 1;
  background: var(--bg-blur);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

main > *:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

/* Responsive */
@media (max-width: 768px) {
  .resume-page {
    padding: 1rem;
  }

  .gradient-circle {
    display: none;
  }

  main > * {
    margin: 2.5rem 0;
    padding: 1.5rem;
  }
}
</style>
