<template>
    <section class="about-section">
      <div class="section-header">
        <h2 class="section-title">{{ personalInfo.title }}</h2>
        <p class="section-subtitle">{{ personalInfo.subtitle }}</p>
      </div>

      <div class="about-content">
        <div v-html="personalInfo.description" class="description"></div>

        <div class="social-links" v-if="personalInfo.social">
          <a v-for="(link, index) in personalInfo.social" :key="index"
             :href="link.url"
             class="social-link"
             :style="{ '--hue': index * 60 }"
             target="_blank">
            <component :is="link.icon" v-if="link.icon" class="social-icon" />
            <span class="social-text">{{ link.name }}</span>
          </a>
        </div>
      </div>
    </section>
  </template>

  <script>
  export default {
    props: {
      personalInfo: {
        type: Object,
        required: true
      }
    }
  }
  </script>

  <style scoped>
  .about-section {
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

  .about-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(110, 69, 226, 0.1) 0%, transparent 70%);
    z-index: -1;
    animation: rotate 20s linear infinite;
  }

  .about-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(110, 69, 226, 0.4);
  }

  .section-header {
    margin-bottom: 2.5rem;
    position: relative;
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

  .about-section:hover .section-title::after {
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

  .about-content {
    line-height: 1.8;
    color: var(--text);
  }

  .description {
    color: var(--text);
    font-size: 1.1rem;
  }

  .description >>> h1,
  .description >>> h2,
  .description >>> h3,
  .description >>> h4,
  .description >>> h5,
  .description >>> h6 {
    color: var(--light);
    margin: 1.5rem 0 1rem;
    font-weight: 600;
  }

  .description >>> p {
    margin-bottom: 1.5rem;
  }

  .description >>> ul {
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }

  .description >>> li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 1.75rem;
  }

  .description >>> li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75em;
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px var(--accent);
  }

  .description >>> a {
    color: var(--accent-light);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
  }

  .description >>> a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-light);
    transition: width 0.3s ease;
  }

  .description >>> a:hover::after {
    width: 100%;
  }

  .description >>> strong {
    font-weight: 600;
    color: var(--light);
  }

  .description >>> em {
    color: var(--secondary-light);
    font-style: italic;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    background: hsla(var(--hue), 80%, 40%, 0.2);
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid hsla(var(--hue), 80%, 60%, 0.3);
    backdrop-filter: blur(5px);
  }

  .social-link:hover {
    background: hsla(var(--hue), 80%, 50%, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px hsla(var(--hue), 80%, 50%, 0.2);
    border-color: hsla(var(--hue), 80%, 70%, 0.5);
  }

  .social-icon {
    width: 20px;
    height: 20px;
  }

  .social-text {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .about-section {
      padding: 2rem;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
    }

    .description {
      font-size: 1rem;
    }

    .social-links {
      gap: 0.75rem;
    }

    .social-link {
      padding: 0.6rem 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .about-section {
      padding: 1.5rem;
    }

    .section-title {
      font-size: 1.6rem;
    }

    .social-links {
      flex-direction: column;
    }

    .social-link {
      justify-content: center;
    }
  }
  </style>
