<template>
    <section class="projects-section">
      <h2 class="section-title">{{ data.title }}</h2>
      <p class="section-subtitle">{{ data.description }}</p>

      <div class="projects-grid">
        <div class="project-card" v-for="(project, index) in data.projects" :key="index">
          <a :href="project.url" target="_blank" class="project-link">
            <div class="project-image-container">
              <img :src="project.img" :alt="'Project ' + (index + 1)" class="project-image">
              <div class="project-overlay">
                <span class="view-text">View Project</span>
              </div>
            </div>
            <div class="project-info">
              <div v-html="project.desc" class="project-desc"></div>
            </div>
          </a>
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
  .projects-section {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }

  .projects-section:hover {
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

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .project-card {
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
  }

  .project-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }

  .project-image-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 16/9;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(99, 102, 241, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .view-text {
    color: white;
    font-weight: 600;
    font-size: 1.2rem;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .project-card:hover .view-text {
    transform: translateY(0);
  }

  .project-info {
    padding: 1.5rem 0;
  }

  .project-desc {
    color: #4b5563;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .projects-section {
      padding: 1.5rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
