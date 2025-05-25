<template>
    <section class="skills-section">
      <div class="section-header">
        <h2 class="section-title">{{ data.title }}</h2>
        <p class="section-subtitle">{{ data.description }}</p>
      </div>

      <div class="skills-grid">
        <div class="skill-item" v-for="(logo, index) in data.logos" :key="index">
          <div class="skill-logo-container">
            <img :src="logo" :alt="'Skill ' + (index + 1)" class="skill-logo">
            <div class="skill-hover-effect" :style="{ '--hue': index * 15 }"></div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  }
  </script>

  <style scoped>
  .skills-section {
    background: rgba(30, 30, 46, 0.7);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 20px;
    border: 1px solid rgba(110, 69, 226, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: relative;
    overflow: hidden;
  }

  .skills-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(110, 69, 226, 0.4);
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .section-title {
    color: var(--accent-light);
    margin: 0 0 0.5rem;
    font-size: 2rem;
    font-weight: 700;
    position: relative;
    display: inline-block;
    letter-spacing: -0.025em;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    border-radius: 4px;
    transition: all 0.5s ease;
  }

  .skills-section:hover .section-title::after {
    width: 80px;
    background: linear-gradient(90deg, var(--accent), var(--secondary));
  }

  .section-subtitle {
    color: var(--text-light);
    margin: 0;
    font-size: 1.2rem;
    font-weight: 400;
    opacity: 0.8;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .skill-item {
    perspective: 1000px;
  }

  .skill-logo-container {
    background: rgba(40, 40, 60, 0.5);
    padding: 1.75rem;
    border-radius: 16px;
    border: 1px solid rgba(110, 69, 226, 0.2);
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform-style: preserve-3d;
    transform: translateZ(0);
    will-change: transform, box-shadow;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(5px);
  }

  .skill-item:hover .skill-logo-container {
    transform: translateY(-8px) rotateY(15deg);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(110, 69, 226, 0.4);
  }

  .skill-hover-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, hsla(var(--hue), 80%, 60%, 0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .skill-item:hover .skill-hover-effect {
    opacity: 1;
  }

  .skill-logo {
    width: 100%;
    height: auto;
    max-width: 60px;
    max-height: 60px;
    object-fit: contain;
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    filter: grayscale(30%) contrast(0.8) brightness(1.2);
    opacity: 0.8;
  }

  .skill-item:hover .skill-logo {
    filter: grayscale(0%) contrast(1) brightness(1.5);
    opacity: 1;
    transform: scale(1.2);
  }

  @media (max-width: 992px) {
    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 1.25rem;
    }

    .skill-logo-container {
      padding: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .skills-section {
      padding: 2rem;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 1rem;
    }

    .skill-logo-container {
      padding: 1.25rem;
    }

    .skill-logo {
      max-width: 50px;
      max-height: 50px;
    }
  }

  @media (max-width: 480px) {
    .skills-section {
      padding: 1.5rem;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
      gap: 0.75rem;
    }

    .skill-logo-container {
      padding: 1rem;
    }
  }
  </style>
