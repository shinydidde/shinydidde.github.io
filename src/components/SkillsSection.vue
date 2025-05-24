<template>
    <section class="skills-section">
      <h2 class="section-title">{{ data.title }}</h2>
      <p class="section-subtitle">{{ data.description }}</p>

      <div class="skills-grid">
        <div class="skill-item" v-for="(logo, index) in data.logos" :key="index">
          <img :src="logo" :alt="'Skill ' + (index + 1)" class="skill-logo">
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
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }

  .skills-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
  }

  .section-title {
    color: #6366f1;
    margin: 0 0 0.5rem;
    font-size: 1.8rem;
    font-weight: 700;
    position: relative;
    display: inline-block;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #10b981);
    border-radius: 2px;
  }

  .section-subtitle {
    color: #6b7280;
    margin: 0 0 2rem;
    font-size: 1.1rem;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .skill-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
    padding: 1.5rem 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    aspect-ratio: 1/1;
  }

  .skill-item:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    background: white;
  }

  .skill-logo {
    width: 100%;
    height: auto;
    max-width: 50px;
    max-height: 50px;
    object-fit: contain;
    filter: grayscale(30%);
    transition: all 0.3s ease;
  }

  .skill-item:hover .skill-logo {
    filter: grayscale(0%);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .skills-section {
      padding: 1.5rem;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
      gap: 1rem;
    }
  }
  </style>
