<template>
    <section class="projects-section">
      <div class="section-header">
        <h2 class="section-title">{{ data.title }}</h2>
        <p class="section-subtitle">{{ data.description }}</p>
      </div>

      <div class="projects-grid">
        <a class="project-card" v-for="(project, index) in data.projects" :key="index"
           :href="project.url"
           target="_blank"
           :style="{ '--hue': index * 40 }">
          <div class="project-image-container">
            <img :src="project.img" :alt="'Project ' + (index + 1)" class="project-image">
            <div class="project-overlay">
              <div class="project-overlay-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="project-icon">
                  <path fill-rule="evenodd" d="M15.75 2.25a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V4.81L8.03 12.03a.75.75 0 01-1.06-1.06l7.22-7.22h-2.69a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zm-7.5 4.5a.75.75 0 01.75.75v10.19l7.22-7.22a.75.75 0 111.06 1.06l-7.22 7.22h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l7.22-7.22a.75.75 0 00-1.06-1.06L8.81 16.5H6.12a.75.75 0 010-1.5h4.5z" clip-rule="evenodd" />
                </svg>
                <span class="project-view">View Project</span>
              </div>
            </div>
          </div>
          <div class="project-info">
            <div v-html="project.desc" class="project-desc"></div>
            <div class="project-tags" v-if="project.tags">
              <span class="project-tag" v-for="(tag, tagIndex) in project.tags" :key="tagIndex">
                {{ tag }}
              </span>
            </div>
          </div>
        </a>
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

  .projects-section:hover {
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

  .projects-section:hover .section-title::after {
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

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .project-card {
    text-decoration: none;
    color: inherit;
    display: block;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateZ(0);
    will-change: transform;
    background: rgba(40, 40, 60, 0.5);
    border: 1px solid rgba(110, 69, 226, 0.2);
    position: relative;
    backdrop-filter: blur(5px);
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, hsla(var(--hue), 80%, 60%, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .project-card:hover::before {
    opacity: 1;
  }

  .project-card:hover {
    transform: translateY(-10px) rotateZ(1deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(110, 69, 226, 0.4);
  }

  .project-image-container {
    position: relative;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    aspect-ratio: 16/9;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .project-card:hover .project-image {
    transform: scale(1.1);
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    padding: 2rem;
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .project-card:hover .project-overlay-content {
    transform: translateY(0);
  }

  .project-icon {
    width: 30px;
    height: 30px;
    color: var(--light);
    background: var(--primary);
    padding: 0.5rem;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(110, 69, 226, 0.5);
  }

  .project-view {
    color: var(--light);
    font-weight: 600;
    font-size: 1.1rem;
  }

  .project-info {
    padding: 1.75rem;
  }

  .project-desc {
    color: var(--text);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-tag {
    background: rgba(110, 69, 226, 0.2);
    color: var(--primary-light);
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  @media (max-width: 992px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .projects-section {
      padding: 2rem;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .project-info {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .projects-section {
      padding: 1.5rem;
    }

    .project-info {
      padding: 1.25rem;
    }
  }
  </style>
