<template>
  <div>
    <h3>FEW WORDS ABOUT ME</h3>
    <div class="first-paragraph" v-html="post"></div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: ['post'],
};
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';
  .first-paragraph{
    text-align: justify;
  }
</style>
