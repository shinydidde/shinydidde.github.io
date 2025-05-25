<template>
    <section class="about-section">
      <div class="section-header">
        <h2 class="section-title">{{ personalInfo.title }}</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">{{ personalInfo.subtitle }}</p>
      </div>

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
    background-color: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .about-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 0.5rem;
    position: relative;
    display: inline-block;
  }

  .section-divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 2px;
    margin: 1rem 0;
  }

  .section-subtitle {
    color: #6b7280;
    font-size: 1.1rem;
    margin: 0;
  }

  .about-content {
    line-height: 1.7;
    color: #4b5563;
  }

  .description >>> h1,
  .description >>> h2,
  .description >>> h3,
  .description >>> h4,
  .description >>> h5,
  .description >>> h6 {
    color: #2d3748;
    margin: 1.5rem 0 1rem;
  }

  .description >>> p {
    margin-bottom: 1.2rem;
  }

  .description >>> ul {
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }

  .description >>> li {
    margin-bottom: 0.8rem;
    position: relative;
    padding-left: 1.5rem;
    list-style: none;
  }

  .description >>> li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #6366f1;
  }

  .description >>> a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    position: relative;
  }

  .description >>> a:hover {
    color: #8b5cf6;
  }

  .description >>> a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #8b5cf6;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .description >>> a:hover::after {
    transform: scaleX(1);
    transform-origin: left;
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
