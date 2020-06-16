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
          <i class="fab fa-html5"></i>
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
   ul{
      margin-left: 0;
    }
    li {
      display: inline-block;
      margin-right: 10px;
      &:first-child{
        :hover{
          color: #006097;
        }
      }
    }
    i {
      font-size: 3rem;
      &::before{
        margin-left: 0;
      }
    }
  }
</style>
