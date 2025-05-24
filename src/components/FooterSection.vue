<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-text">
          <p>© {{ new Date().getFullYear() }} {{ personalInfo.name }}. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <a v-if="personalInfo.email" :href="personalInfo.email.replace(/^<a[^>]+>|<\/a>$/g, '')" class="footer-link">
            <span class="link-icon">✉️</span> Email
          </a>
          <a v-if="personalInfo.skype" :href="personalInfo.skype.replace(/^<a[^>]+>|<\/a>$/g, '')" class="footer-link" target="_blank">
            <span class="link-icon">💬</span> Skype
          </a>
          <a v-if="personalInfo.resume" :href="personalInfo.resume" class="footer-link" target="_blank">
            <span class="link-icon">📄</span> Resume
          </a>
        </div>
      </div>
    </footer>
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
  .footer {
    background: linear-gradient(135deg, #6366f1 0%, #10b981 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin-top: 3rem;
    position: relative;
    overflow: hidden;
    z-index: 2;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.1)" d="M0,0 L100,0 L100,100 L0,100 Z" /></svg>');
    opacity: 0.2;
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 1;
  }

  .footer-text {
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
  }

  .footer-link:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  .link-icon {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }

    .footer-links {
      margin-top: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  </style>
