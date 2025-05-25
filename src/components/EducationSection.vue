<template>
    <section class="education-section">
      <div class="section-header">
        <h2 class="section-title">{{ data.title }}</h2>
        <p class="section-subtitle">{{ data.description }}</p>
      </div>

      <div class="education-grid">
        <div class="education-card" v-for="(item, index) in data.education" :key="index">
          <div class="education-header">
            <h3 class="education-degree" v-html="item.title"></h3>
            <div class="education-year">{{ item.year }}</div>
          </div>
          <div class="education-institution" v-html="item.content"></div>
          <div class="education-desc">{{ item.desc }}</div>

          <div class="education-decoration" :style="{ '--hue': index * 60 }"></div>
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
  .education-section {
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

  .education-section:hover {
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

  .education-section:hover .section-title::after {
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

  .education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .education-card {
    background: rgba(40, 40, 60, 0.5);
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid rgba(110, 69, 226, 0.2);
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateZ(0);
    will-change: transform, box-shadow;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(5px);
  }

  .education-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(110, 69, 226, 0.4);
  }

  .education-decoration {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, hsla(var(--hue), 80%, 60%, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(50%, -50%);
    transition: all 0.5s ease;
  }

  .education-card:hover .education-decoration {
    transform: translate(30%, -30%) scale(1.2);
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .education-degree {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--light);
    line-height: 1.4;
    position: relative;
    z-index: 1;
  }

  .education-degree >>> h3 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }

  .education-year {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: var(--light);
    padding: 0.35rem 1rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 4px 15px rgba(110, 69, 226, 0.3);
  }

  .education-institution {
    color: var(--accent-light);
    font-weight: 500;
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 1.1rem;
  }

  .education-desc {
    color: var(--text-light);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  @media (max-width: 992px) {
    .education-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .education-card {
      padding: 1.75rem;
    }
  }

  @media (max-width: 768px) {
    .education-section {
      padding: 2rem;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
    }

    .education-grid {
      grid-template-columns: 1fr;
    }

    .education-card {
      padding: 1.5rem;
    }

    .education-degree {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    .education-section {
      padding: 1.5rem;
    }

    .education-card {
      padding: 1.25rem;
    }

    .education-header {
      flex-direction: column;
      gap: 0.75rem;
    }

    .education-year {
      align-self: flex-start;
    }
  }
  </style>
