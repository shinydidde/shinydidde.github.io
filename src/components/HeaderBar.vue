<template>
  <header class="modern-header">
    <div class="header-container">
      <div class="profile-section">
        <div class="avatar-wrapper">
          <img :src="personalInfo.img" alt="Profile" class="avatar">
          <div class="status-indicator"></div>
        </div>
        <div class="profile-info">
          <h1 class="name">{{ personalInfo.name }}</h1>
          <h2 class="title">{{ personalInfo.position }}</h2>
          <div class="location">
            <svg class="location-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {{ personalInfo.city }}
          </div>
        </div>
      </div>

      <div class="contact-section">
        <div class="contact-methods">
          <a v-if="personalInfo.email" :href="'mailto:' + personalInfo.email.replace(/^<a[^>]+>|<\/a>$/g, '')" class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span class="contact-text">Email Me</span>
          </a>

          <a v-if="personalInfo.mobile" :href="'tel:' + personalInfo.mobile.replace(/^<a[^>]+>|<\/a>$/g, '')" class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <span class="contact-text">Call Me</span>
          </a>
        </div>

        <a v-if="personalInfo.resume" :href="personalInfo.resume" class="resume-button" target="_blank">
          Download CV
          <svg class="download-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
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
.modern-header {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.modern-header:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  gap: 2rem;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.status-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #10b981;
  border: 2px solid white;
}

.profile-info {
  color: #2d3748;
}

.name {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
}

.title {
  margin: 0.3rem 0 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #6b7280;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.location-icon {
  opacity: 0.7;
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-methods {
  display: flex;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.contact-item:hover {
  color: #6366f1;
}

.contact-icon {
  opacity: 0.8;
}

.resume-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
}

.resume-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
}

.download-icon {
  margin-left: 0.2rem;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .contact-methods {
    justify-content: center;
  }
}
</style>
