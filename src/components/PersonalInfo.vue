<template>
  <div>
    <h3>PERSONAL INFORMATION</h3>
    <!-- <h3 class="personal-header">{{ userName }}</h3> -->
    <div v-if="post.meta" class="info email"><strong>E-mail:</strong> {{ post.meta.email }}</div>
    <div v-if="post.meta" class="info"><strong>Skype:</strong> {{ post.meta.skype }}</div>
    <div v-if="post.meta" class="info"><strong>Phone Number:</strong> {{ post.meta.phone }}</div>
    <div v-if="post.meta" class="info"><strong>City:</strong> {{ post.meta.city }}</div>
    <div class="info"><strong>Experience:</strong> {{experience}} years</div>
    <Social/>
    <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/June2020-Resume.pdf?alt=media&token=6b443ded-2c8e-4817-bf00-602915831fb2">Download Resume</a>
  </div>
</template>

<script>
import Social from './Social';

export default {
  name: 'PersonalInfo',
  props: ['post', 'userName', 'experience'],
  components: {
    Social,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
$btn: map-get($colors, secondary) !default;

.info {
  margin-bottom: 10px;
}

 a {
      background-color: transparent;
      border: 1px solid $btn;
      padding: 10px 35px;
      font-weight: 600;
      font-size: 2rem;
      display: inline-block;
      transition: all 0.5s sceal-out;

      &:hover {
        color: lighten($btn, 10%);
      }
    }

.email {
  color: map-get($colors, primary);

  strong {
    color: lighten($text-color, 30%);
  }
}
</style>
