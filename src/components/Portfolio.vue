<template>
  <section id="portfolio" class="my-portfolio position">
    <Title :title="sectitle" :description="secdescription"/>

    <div class="section-content">
      <transition-group name="filter" tag="div" class="row justify-content-center">
        <div class="col-md-3 portfolio-item" v-for="post in posts" :key="post.url">
          <img :src="post.img" alt="Alt"/>
          <div class="portfolio-link">
            <a :href="post.url" class="popup_content" target="_blank">See</a>
          </div>
          <p class="desc">{{post.desc}}</p>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import Title from './Title'
import { db } from '../main';

export default {
  name: 'Portfolio',
  props: ['title', 'description'],
  components: {
    Title,
  },
  data() {
    return {
      posts: [],
      sectitle: '',
      secdescription: '',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      db.collection('personal')
        .doc('portfolio')
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) return;
          const data = snapshot.data();
          this.posts = data.projects;
          this.sectitle = data.title;
          this.secdescription = data.description;
        });
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

  $bg-portfolio: map-get($colors, dark) !default;
  $btn: map-get($colors, secondary) !default;

  .my-portfolio {
    background-color: $bg-portfolio;
    color: map-get($colors, light);
    min-height: 95vh;
  }

  /deep/ .text-wrapper {
    &:after {
      border-bottom: 1px solid map-get($colors, light);
    }
  }

  .breadcrumbs {
    text-align: center;

    li {
      display: inline-block;
      text-transform: uppercase;
      margin: 0 10px;
      color: lighten($bg-portfolio, 60%);
      cursor: pointer;

      &.active {
        color: map-get($colors, light);
        border-bottom: 1px solid $btn;
      }
    }
  }

  .portfolio-table {
    margin-bottom: 50px;
  }

  .portfolio-item {
    width: auto;
    max-height: 250px;
    overflow: hidden;
    margin-bottom: 40px;
    img {
      width: 100%;
    }
    .desc{
      text-align: center;
      margin-top: 20px;
    }
  }

  .portfolio-link {
    position: absolute;
    top: 0;
    left: 15px;
    width: 90%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    text-align: center;
    padding-top: 60%;
    opacity: 0;
    transition: all .5s ease-out;

    &:hover {
      opacity: 1;
      padding-top: 20%;
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
        color: lighten($btn, 30%);
      }
    }
  }
</style>
