<template>
  <div class="portfolio-container">
    <!-- Animated background elements -->
    <div class="background-elements">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- Floating grid pattern -->
    <div class="grid-pattern"></div>

    <!-- Main content sections -->
    <HeaderBar :personalInfo="personalInfo" />

    <main class="portfolio-content">
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
      educationData: {}
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
  }
}
</script>

<style scoped>
.portfolio-container {
  position: relative;
  min-height: 100vh;
  background-color: #f9f9f9;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.background-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  z-index: 0;
  animation: float 15s ease-in-out infinite alternate;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #6366f1, transparent 70%);
  top: 20%;
  right: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #10b981, transparent 70%);
  bottom: 15%;
  left: 10%;
  animation-delay: 3s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #f59e0b, transparent 70%);
  top: 60%;
  left: 30%;
  animation-delay: 6s;
}

.grid-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px); */
  background-size: 40px 40px;
  z-index: 0;
  pointer-events: none;
}

.portfolio-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, 20px) scale(1.05); }
}

@media (max-width: 768px) {
  .portfolio-content {
    padding: 1rem;
    gap: 2rem;
  }

  .circle {
    display: none;
  }
}
</style>
