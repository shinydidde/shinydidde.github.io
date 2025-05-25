<template>
    <section class="experience-section">
      <div class="section-header">
        <h2 class="section-title">{{ data.title }}</h2>
        <p class="section-subtitle">{{ data.description }}</p>
      </div>

      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in data.timeline" :key="index">
          <div class="timeline-dot" :style="dotStyle(index)"></div>
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
    methods: {
      dotStyle(index) {
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        return {
          backgroundColor: colors[index % colors.length],
          boxShadow: `0 0 0 5px ${colors[index % colors.length]}20`
        };
      }
    }
  }
  </script>

  <style scoped>
  .experience-section {
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

  .experience-section:hover {
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

  .experience-section:hover .section-title::after {
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

  .timeline {
    position: relative;
    padding-left: 40px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    width: 4px;
    background: linear-gradient(to bottom, var(--primary), var(--accent), var(--secondary));
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(110, 69, 226, 0.5);
  }

  .timeline-item {
    position: relative;
    padding-bottom: 3rem;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: 16px;
    top: 8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid var(--dark);
    z-index: 1;
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .timeline-item:hover .timeline-dot {
    transform: scale(1.3);
    box-shadow: 0 0 15px currentColor;
  }

  .timeline-content {
    background: rgba(40, 40, 60, 0.5);
    padding: 1.75rem;
    border-radius: 16px;
    border: 1px solid rgba(110, 69, 226, 0.2);
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    backdrop-filter: blur(5px);
  }

  .timeline-item:hover .timeline-content {
    border-color: rgba(110, 69, 226, 0.4);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transform: translateX(10px);
  }

  .timeline-year {
    color: var(--accent-light);
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(0, 212, 255, 0.1);
    border-radius: 50px;
    border: 1px solid rgba(0, 212, 255, 0.2);
  }

  .timeline-position {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--light);
    line-height: 1.3;
  }

  .timeline-position >>> h3 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }

  .timeline-description {
    color: var(--text-light);
    line-height: 1.8;
    font-size: 1.05rem;
  }

  .timeline-description >>> ul {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  .timeline-description >>> li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 1.75rem;
  }

  .timeline-description >>> li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75em;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 8px var(--accent);
  }

  @media (max-width: 768px) {
    .experience-section {
      padding: 2rem;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
    }

    .timeline {
      padding-left: 30px;
    }

    .timeline::before {
      left: 15px;
    }

    .timeline-dot {
      left: 11px;
    }

    .timeline-content {
      padding: 1.5rem;
    }

    .timeline-position {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .experience-section {
      padding: 1.5rem;
    }

    .timeline {
      padding-left: 25px;
    }

    .timeline-dot {
      width: 14px;
      height: 14px;
      left: 10px;
    }

    .timeline-content {
      padding: 1.25rem;
    }
  }
  </style>
