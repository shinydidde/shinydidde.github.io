<template>
  <div class="social-wrap">
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/mruduladidde/" target="_blank">
          <i class="icon-linkedin-squared"></i>
        </a>
      </li>
       <li>
        <a href="https://github.com/shinydidde" target="_blank">
          <i class="icon-github-squared"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Social',
}
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

 .social-wrap {
    li {
      display: inline-block;
      margin-right: 10px;
    }

    i {
      font-size: 3rem;
    }
  }
</style>
