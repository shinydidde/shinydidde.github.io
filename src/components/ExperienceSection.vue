<template>
    <section class="experience-section">
      <h2 class="section-title">{{ data.title }}</h2>
      <p class="section-subtitle">{{ data.description }}</p>

      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in data.timeline" :key="index">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-year">{{ item.year }}</div>
            <div v-html="item.title" class="timeline-position"></div>
            <div v-html="item.content" class="timeline-description"></div>
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
  .experience-section {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }

  .experience-section:hover {
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

  .timeline {
    position: relative;
    padding-left: 30px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: linear-gradient(to bottom, #6366f1, #10b981, #f59e0b);
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 2rem;
  }

  .timeline-dot {
    position: absolute;
    left: -38px;
    top: 5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6366f1;
    border: 3px solid white;
    box-shadow: 0 0 0 4px #6366f1;
  }

  .timeline-item:nth-child(2n) .timeline-dot {
    background: #10b981;
    box-shadow: 0 0 0 4px #10b981;
  }

  .timeline-item:nth-child(3n) .timeline-dot {
    background: #f59e0b;
    box-shadow: 0 0 0 4px #f59e0b;
  }

  .timeline-content {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  .timeline-year {
    color: #f59e0b;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .timeline-position {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  .timeline-position >>> h3 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }

  .timeline-description {
    color: #4b5563;
    line-height: 1.6;
  }

  .timeline-description >>> ul {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  .timeline-description >>> li {
    margin-bottom: 0.5rem;
    position: relative;
  }

  .timeline-description >>> li::before {
    content: '•';
    color: #6366f1;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }

  @media (max-width: 768px) {
    .experience-section {
      padding: 1.5rem;
    }

    .timeline {
      padding-left: 20px;
    }

    .timeline-dot {
      left: -28px;
    }
  }
  </style>
