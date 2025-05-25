<template>
    <section class="education-section">
      <h2 class="section-title">{{ data.title }}</h2>
      <p class="section-subtitle">{{ data.description }}</p>

      <div class="education-grid">
        <div
          class="education-card"
          v-for="(item, index) in data.education"
          :key="index"
        >
          <div class="education-header">
            <h3 class="education-degree" v-html="item.title"></h3>
            <div class="education-year">{{ item.year }}</div>
          </div>
          <div class="education-institution" v-html="item.content"></div>
          <div class="education-desc">{{ item.desc }}</div>
        </div>
      </div>
    </section>
  </template>

  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  }
  </script>

  <style scoped>
  .education-section {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .education-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
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

  .education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .education-card {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  }

  .education-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .education-degree {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
  }

  .education-year {
    background: #6366f1;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .education-institution {
    color: #4b5563;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .education-desc {
    color: #6b7280;
    font-size: 0.9rem;
  }

  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .education-section {
      padding: 2rem;
    }
    .section-title {
      font-size: 1.6rem;
    }
    .education-degree {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    .education-section {
      padding: 1.5rem;
    }
    .education-grid {
      grid-template-columns: 1fr;
    }
    .section-title {
      font-size: 1.4rem;
    }
    .section-subtitle {
      font-size: 1rem;
    }
    .education-degree {
      font-size: 1rem;
    }
  }
  </style>
