<template>
  <div>
    <h3>PERSONAL INFORMATION</h3>
    <!-- <h3 class="personal-header">{{ userName }}</h3> -->
    <div v-if="post.meta" class="info email"><strong>E-mail : </strong>
    <span v-html="post.meta.email"></span></div>
    <div v-if="post.meta" class="info"><strong>Skype : </strong>
    <span v-html="post.meta.skype"></span></div>
    <div v-if="post.meta" class="info"><strong>Phone Number : </strong>
    <span v-html="post.meta.phone"></span></div>
    <div v-if="post.meta" class="info"><strong>City :</strong> {{ post.meta.city }}</div>
    <div class="info"><strong>Experience:</strong> {{experience}}</div>
    <Social/>
    <a class="download" target="_blank" v-bind:href="resume">Download Resume</a>
  </div>
</template>

<script>
import Social from './Social.vue';

export default {
  name: 'PersonalInfo',
  props: ['post', 'userName', 'experience', 'resume'],
  components: {
    Social,
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
$btn: map-get($colors, secondary) !default;

.info {
  margin-bottom: 10px;
  span a{
    color: black;
  }
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
        color: white;
        background-color: rgb(111, 111, 111);;
      }
    }

.email {
  color: map-get($colors, primary);

  strong {
    color: lighten($text-color, 30%);
  }
}
</style>
