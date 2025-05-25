<template>
    <footer class="footer-section">
      <!-- logo -->
      <div class="footer-logo-wrapper">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/photo.png?alt=media&token=97d9bfc8-16ee-4c8e-b94a-bb3edb51a430"
          alt="Logo"
          class="footer-logo"
        />
      </div>

      <!-- gradient accent bar -->
      <div class="section-divider"></div>

      <div class="footer-container">
        <div class="footer-brand">
          <p>© {{ new Date().getFullYear() }} {{ personalInfo.name }}. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <a
            v-if="personalInfo.email"
            :href="'mailto:' + personalInfo.email.replace(/^<a[^>]+>|<\/a>$/g, '')"
            class="footer-link"
          >
            <svg class="link-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Email
          </a>
          <a
            v-if="personalInfo.skype"
            :href="personalInfo.skype.replace(/^<a[^>]+>|<\/a>$/g, '')"
            class="footer-link"
            target="_blank"
          >
            <svg class="link-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 17h-1v-1h1v1zm1.07-7.75l-.9.92C12.45 12.9 12 13.5 12 15h-1v-.5c0-1 .45-1.5 1.17-2.25l1.24-1.26c.37-.36.59-.86.59-1.49 0-1.28-.94-2.25-2.25-2.25S8 8.22 8 9.5H7c0-1.92 1.57-3.5 3.5-3.5s3.5 1.58 3.5 3.5c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            Skype
          </a>
          <a
            v-if="personalInfo.resume"
            :href="personalInfo.resume"
            class="footer-link"
            target="_blank"
          >
            <svg class="link-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Resume
          </a>
        </div>
      </div>
    </footer>
  </template>

  <script>
  export default {
    name: 'FooterSection',
    props: {
      personalInfo: {
        type: Object,
        required: true,
      },
    },
  }
  </script>

  <style scoped>
  .footer-section {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    padding: 2rem 1.5rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 2;
  }

  .footer-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  .footer-logo-wrapper {
    text-align: center;
    margin-bottom: 1rem;
  }

  .footer-logo {
    max-width: 120px;
    height: auto;
  }

  .section-divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 2px;
    margin: 0 auto 1.5rem;
  }

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .footer-brand p {
    margin: 0;
    font-size: 0.9rem;
    color: #4b5563;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4b5563;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .footer-link:hover {
    color: #6366f1;
    transform: translateY(-2px);
  }

  .link-icon {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      text-align: center;
    }
    .footer-links {
      justify-content: center;
      margin-top: 1rem;
    }
  }
  </style>
