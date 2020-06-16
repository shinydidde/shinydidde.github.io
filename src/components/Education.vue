<template>
  <section id="experience" class="my-cv position">
    <Title title="Education" description="" />
    <AnimateWhenVisible name="fadeUp" :duration="1.5" class="section-content">
        <div class="row">
            <div class="col-md-4 resume-item" v-for="post in posts" :key="post.title">
                <div class="year">{{ post.year }}</div>
                <div class="resume-description" v-html="post.title"></div>
                <div class="resume-description" v-html="post.desc"></div>
                <div v-html="post.content"></div>
            </div>
        </div>
    </AnimateWhenVisible>
  </section>
</template>

<script>
import Title from './Title'
import { db } from '../main';

export default {
  name: 'Education',
  components: {
    Title,
  },
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      db.collection('personal')
        .doc('experience')
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) return;
          const data = snapshot.data();
          this.posts = data.education;
        });
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';
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
      font-weight: 600;
      margin-bottom: 5px;
    }
  }

</style>
