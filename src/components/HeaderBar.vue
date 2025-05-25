<template>
    <header class="header">
      <div class="header-content">
        <div class="profile">
          <div class="profile-img-container">
            <img :src="personalInfo.img" alt="Profile" class="profile-img">
            <div class="profile-img-border"></div>
            <div class="profile-img-glow"></div>
          </div>
          <div class="profile-text">
            <h1 class="name">{{ personalInfo.name }}</h1>
            <h2 class="position">{{ personalInfo.position }}</h2>
            <div class="location">{{ personalInfo.city }}</div>
          </div>
        </div>

        <div class="contact-info">
          <div class="contact-items">
            <div class="contact-item" v-if="personalInfo.email">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <div v-html="personalInfo.email" class="contact-text"></div>
            </div>
            <div class="contact-item" v-if="personalInfo.mobile">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <div v-html="personalInfo.mobile" class="contact-text"></div>
            </div>
            <div class="contact-item" v-if="personalInfo.skype">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.17 2.06c-.38-.01-.76.04-1.13.14-1.18.33-2.01 1.2-2.41 2.27-.14.37-.19.76-.17 1.16.03.52.18 1.04.45 1.51.26.47.63.87 1.08 1.16.04.03.07.05.11.07.1.04.2.06.3.08.05.01.1.02.15.02h1.48c.06 0 .11-.01.15-.03.1-.03.18-.1.21-.2l.19-.68c.05-.18.07-.37.07-.56 0-.23-.05-.45-.15-.66-.2-.45-.61-.77-1.11-.86-.25-.05-.51-.04-.76.04-.25.08-.47.22-.63.41-.16.19-.26.42-.29.66-.02.12-.04.23-.1.33-.05.1-.13.18-.23.22-.05.02-.1.03-.16.03h-1.9c-.06 0-.12-.01-.17-.03-.16-.06-.27-.21-.29-.38-.01-.04-.01-.08-.01-.12 0-.31.05-.62.15-.91.3-.9.99-1.61 1.91-1.86.46-.13.93-.13 1.39-.01.46.12.86.37 1.17.72.3.34.5.76.56 1.21.05.31.07.63.05.95 0 .16-.02.32-.05.48l-.13.52c-.03.1-.01.21.04.3.05.09.13.16.23.19.04.02.09.03.14.03h1.47c.12 0 .23-.05.31-.14.08-.09.12-.2.11-.32-.02-.24-.03-.49-.02-.73.01-.45.09-.9.23-1.33.15-.44.37-.84.66-1.19.29-.35.64-.64 1.04-.85.4-.21.83-.35 1.28-.41.45-.06.9-.05 1.35.04.45.09.87.27 1.25.52.38.25.7.58.95.97.25.39.42.82.5 1.28.08.46.07.93-.03 1.39-.1.46-.3.89-.58 1.27-.28.38-.64.7-1.06.93-.06.03-.1.08-.13.14-.03.06-.04.12-.03.19.01.06.03.12.07.17.04.05.09.09.15.11.06.02.12.03.18.02h1.91c.12 0 .22-.06.29-.15.06-.09.08-.2.05-.31-.05-.24-.08-.48-.09-.73-.01-.25.01-.5.06-.74.14-.75.54-1.41 1.11-1.87.57-.46 1.28-.68 2-.63.36.03.71.11 1.04.23.33.12.63.3.9.52.27.22.5.48.68.73.18.25.33.55.45.89.12.34.19.71.21 1.09.02.38-.09.75-.25 1.08-.46.33-.21.62-.47.85-.78.23-.31.4-.66.5-1.04.1-.38.13-.78.08-1.17-.05-.39-.17-.77-.36-1.11-.19-.34-.44-.64-.75-.89-.31-.25-.66-.44-1.04-.57-.38-.13-.78-.19-1.18-.18z" />
                  <path d="M12.44 14.56c.34.34.75.57 1.21.67.45.1.92.02 1.83-.43 2.28-.45.45-1.37.88-2.28.43-.45-.1-.87-.33-1.21-.67-.34-.34-.57-.75-.67-1.21-.1-.45-.02-.92.23-1.32.25-.4.64-.68 1.09-.78.46-.1.92-.02 1.32.23.4.25.68.64.78 1.09z" />
                </svg>
              </div>
              <div v-html="personalInfo.skype" class="contact-text"></div>
            </div>
          </div>
          <a v-if="personalInfo.resume" :href="personalInfo.resume" class="resume-btn" target="_blank">
            <span>Download CV</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
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
    background: linear-gradient(135deg, var(--primary-dark), var(--darker));
    color: var(--light);
    padding: 4rem 2rem 3rem;
    border-radius: 0 0 30px 30px;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    z-index: 2;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238a6eff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .header-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .profile-img-container {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
    border: 3px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease;
  }

  .profile-img-border {
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    z-index: 1;
    animation: rotate 8s linear infinite;
  }

  .profile-img-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--primary-light), transparent 70%);
    z-index: 0;
    opacity: 0.5;
    filter: blur(10px);
    animation: pulse 3s ease infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }

  .profile-text {
    color: var(--light);
  }

  .name {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: var(--light); /* Fallback color */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* For browsers that don't support background-clip text */
@supports not (-webkit-background-clip: text) {
  .name {
    color: var(--accent-light);
    background: none;
  }
}

  .position {
    margin: 0.5rem 0 0;
    font-size: 1.3rem;
    font-weight: 500;
    opacity: 0.9;
    color: var(--accent-light);
  }

  .location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    opacity: 0.8;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .contact-items {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .contact-item:hover {
    transform: translateX(5px);
  }

  .contact-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .contact-item:hover .contact-icon {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .contact-icon svg {
    width: 20px;
    height: 20px;
    color: var(--light);
  }

  .contact-text {
    font-size: 1rem;
    line-height: 1.4;
  }

  .contact-text >>> a {
    color: var(--light);
    text-decoration: none;
    transition: all 0.2s ease;
    position: relative;
  }

  .contact-text >>> a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-light);
    transition: width 0.3s ease;
  }

  .contact-text >>> a:hover::after {
    width: 100%;
  }

  .contact-text >>> a:hover {
    color: var(--accent-light);
  }

  .resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--light);
    color: var(--primary-dark);
    padding: 0.9rem 1.75rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transform: translateZ(0);
    will-change: transform;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .resume-btn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: var(--lighter);
  }

  .resume-btn svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }

  .resume-btn:hover svg {
    transform: translateY(2px);
  }

  @media (max-width: 992px) {
    .header {
      padding: 3rem 1.5rem 2rem;
      border-radius: 0 0 20px 20px;
    }

    .header-content {
      flex-direction: column;
      text-align: center;
    }

    .profile {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }

    .contact-info {
      width: 100%;
      align-items: center;
    }

    .contact-items {
      width: 100%;
    }

    .resume-btn {
      width: 100%;
      justify-content: center;
    }

    .name {
      font-size: 2rem;
    }

    .position {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 576px) {
    .header {
      padding: 2.5rem 1rem 1.5rem;
    }

    .profile-img-container {
      width: 100px;
      height: 100px;
    }

    .name {
      font-size: 1.8rem;
    }

    .contact-item {
      gap: 0.75rem;
    }

    .contact-icon {
      width: 40px;
      height: 40px;
    }
  }
  </style>
