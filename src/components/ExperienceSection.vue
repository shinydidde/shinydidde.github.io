<template>
    <section class="experience-section">
      <div class="section-header">
        <h2 class="section-title">{{ data.title }}</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">{{ data.description }}</p>
      </div>

      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in data.timeline" :key="index">
          <div class="timeline-dot" :style="{ backgroundColor: dotColors[index % dotColors.length] }"></div>
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
    },
    data() {
      return {
        dotColors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#3b82f6']
      }
    }
  }
  </script>

  <style scoped>
  .experience-section {
    background-color: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .experience-section:hover {
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
    width: 2px;
    background: linear-gradient(to bottom, #6366f1, #8b5cf6, #10b981, #f59e0b);
    border-radius: 1px;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 2.5rem;
  }

  .timeline-dot {
    position: absolute;
    left: -29px;
    top: 5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 2px currentColor;
  }

  .timeline-content {
    background-color: #f9fafb;
    padding: 1.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .timeline-item:hover .timeline-content {
    background-color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transform: translateX(5px);
  }

  .timeline-year {
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .timeline-position {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  .timeline-position >>> h3 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }

  .timeline-description {
    color: #4b5563;
    line-height: 1.7;
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
      left: -22px;
    }
  }
  </style>
