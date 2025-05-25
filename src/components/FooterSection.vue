<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-text">
          <p>© {{ new Date().getFullYear() }} {{ personalInfo.name }}. All rights reserved.</p>
        </div>
        <div class="footer-links">
          <a v-if="personalInfo.email" :href="personalInfo.email.replace(/^<a[^>]+>|<\/a>$/g, '')" class="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            <span>Email</span>
          </a>
          <a v-if="personalInfo.skype" :href="personalInfo.skype.replace(/^<a[^>]+>|<\/a>$/g, '')" class="footer-link" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
            <span>Skype</span>
          </a>
          <a v-if="personalInfo.resume" :href="personalInfo.resume" class="footer-link" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
            <span>Resume</span>
          </a>
        </div>
      </div>

      <div class="footer-decoration"></div>
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
    background: linear-gradient(135deg, var(--primary-dark), var(--darker));
    color: var(--light);
    padding: 3rem 2rem;
    border-radius: 30px 30px 0 0;
    position: relative;
    overflow: hidden;
    z-index: 2;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.3);
    margin-top: 4rem;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238a6eff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .footer-decoration {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
    animation: rainbow 8s linear infinite;
    background-size: 400% 400%;
  }

  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-text {
    font-size: 0.95rem;
    opacity: 0.8;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-link {
    color: var(--light);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
    position: relative;
  }

  .footer-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-light);
    transition: width 0.3s ease;
  }

  .footer-link:hover::after {
    width: 100%;
  }

  .footer-link svg {
    width: 18px;
    height: 18px;
    transition: all 0.3s ease;
  }

  .footer-link:hover svg {
    transform: translateY(-2px);
    color: var(--accent-light);
  }

  @media (max-width: 768px) {
    .footer {
      padding: 2rem 1.5rem;
      margin-top: 2rem;
    }

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

  @media (max-width: 480px) {
    .footer {
      padding: 1.5rem 1rem;
    }

    .footer-links {
      gap: 1rem;
    }
  }
  </style>
