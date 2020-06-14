<template>
  <div>
    <h3>PERSONAL INFORMATION</h3>
    <h3 class="personal-header">{{ userName }}</h3>
    <div v-if="post.meta" class="info email"><strong>E-mail:</strong> {{ post.meta.email }}</div>
    <div v-if="post.meta" class="info"><strong>Skype:</strong> {{ post.meta.skype }}</div>
    <div v-if="post.meta" class="info"><strong>Phone Number:</strong> {{ post.meta.phone }}</div>
    <div v-if="post.meta" class="info"><strong>City:</strong> {{ post.meta.city }}</div>
    <div class="info"><strong>Experience:</strong> {{experience}} years</div>
    <Social/>
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

.info {
  margin-bottom: 10px;
}

.email {
  color: map-get($colors, primary);

  strong {
    color: lighten($text-color, 30%);
  }
}
</style>
