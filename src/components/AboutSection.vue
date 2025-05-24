<template>
    <section class="about-section">
      <h2 class="section-title">{{ personalInfo.title }}</h2>
      <p class="section-subtitle">{{ personalInfo.subtitle }}</p>

      <div class="about-content">
        <div v-html="personalInfo.description" class="description"></div>
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
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }

  .about-section:hover {
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

  .about-content {
    line-height: 1.7;
  }

  .description {
    color: #4b5563;
  }

  .description >>> h1,
  .description >>> h2,
  .description >>> h3,
  .description >>> h4,
  .description >>> h5,
  .description >>> h6 {
    color: #1f2937;
    margin: 1.5rem 0 1rem;
  }

  .description >>> ul {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  .description >>> li {
    margin-bottom: 0.5rem;
    position: relative;
  }

  .description >>> li::before {
    content: '•';
    color: #f59e0b;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }

  .description >>> a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .description >>> a:hover {
    color: #10b981;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .about-section {
      padding: 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
    }
  }
  </style>
