<template>
  <div>
      <AnimateWhenVisible :name="animate"  :duration="duration" :delay="delay">
        <div class="resume-item" v-for="post in posts" :key="post.title">
          <div class="year">{{ post.year }}</div>
          <div class="resume-description" v-html="post.title">
          </div>
          <div v-html="post.content"></div>
        </div>
      </AnimateWhenVisible>
  </div>
</template>

<script>
export default {
  name: 'ExperienceGroup',
  props: ['icon', 'posts', 'title', 'animate', 'duration', 'delay'],
}
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

  .position {
    position: relative;
  }

  .resume-icon {
    margin-bottom: 25px;

    i {
      font-size: 4rem;
      color: map-get($colors, secondary);
    }
  }

  .resume-item {
    text-align: left;
    border: 1px solid whitesmoke;
    padding: 20px;
    margin-bottom: 25px;

    p {
      font-size: 1.5rem;
      margin-top: 0;
    }

    .resume-description {
      font-size: 1.7rem;
      margin-bottom: 20px;
      > h3{
        color: black;
      }
    }

    .year {
      text-align: right;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }

  .group-name {
    color: map-get($colors, secondary);
  }
</style>
