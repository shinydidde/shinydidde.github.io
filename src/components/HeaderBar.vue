<template>
    <header class="header">
      <div class="header-content">
        <div class="profile">
          <img :src="personalInfo.img" alt="Profile" class="profile-img">
          <div class="profile-text">
            <h1 class="name">{{ personalInfo.name }}</h1>
            <h2 class="position">{{ personalInfo.position }}</h2>
            <div class="location">{{ personalInfo.city }}</div>
          </div>
        </div>

        <div class="contact-info">
          <div class="contact-item" v-if="personalInfo.email">
            <span class="icon">✉️</span>
            <div v-html="personalInfo.email"></div>
          </div>
          <div class="contact-item" v-if="personalInfo.mobile">
            <span class="icon">📱</span>
            <div v-html="personalInfo.mobile"></div>
          </div>
          <div class="contact-item" v-if="personalInfo.skype">
            <span class="icon">💬</span>
            <div v-html="personalInfo.skype"></div>
          </div>
          <a v-if="personalInfo.resume" :href="personalInfo.resume" class="resume-btn" target="_blank">
            Download Resume
            <span class="download-icon">⬇️</span>
          </a>
        </div>
      </div>
    </header>
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
  .header {
    background: linear-gradient(135deg, #6366f1 0%, #10b981 50%, #f59e0b 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    margin-bottom: 3rem;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }

  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.1)" d="M0,0 L100,0 L100,100 L0,100 Z" /></svg>');
    opacity: 0.2;
  }

  .header-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    position: relative;
    z-index: 1;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid white;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .profile-text {
    color: white;
  }

  .name {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .position {
    margin: 0.5rem 0 0;
    font-size: 1.2rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.95rem;
  }

  .icon {
    font-size: 1.2rem;
  }

  .resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    color: #6366f1;
    padding: 0.7rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .resume-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    background: #f8f9fa;
  }

  .download-icon {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      text-align: center;
    }

    .profile {
      flex-direction: column;
      text-align: center;
    }

    .contact-info {
      align-items: center;
    }
  }
  </style>
