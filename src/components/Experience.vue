<template>
  <section id="experience" class="my-cv position">
    <Title :title="jobtitle" :description="jobdescription" />
    <AnimateWhenVisible name="fadeUp" class="section-content">
      <div class="container-fluid">
        <div class="row">
          <ExperienceGroup :posts="posts" class="col-12 col-md" icon="icon-briefcase"
          title="Jobs" animate="fadeUp" :duration="1" :delay="0"/>
        </div>
      </div>
    </AnimateWhenVisible>
  </section>
</template>

<script>
import Title from './Title.vue';
import ExperienceGroup from './ExperienceGroup.vue';
import { db } from '../main';

export default {
  name: 'Experience',
  props: ['icon', 'title', 'animate', 'duration', 'delay', 'description'],
  components: {
    Title,
    ExperienceGroup,
  },
  data() {
    return {
      posts: [],
      jobtitle: '',
      jobdescription: '',
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
          this.posts = data.timeline;
          this.jobtitle = data.title;
          this.jobdescription = data.description;
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

  $linear: map-get($colors, dark);

  .row {
    padding-top: 20px;
    text-align: center;
  }

  @media(min-width: #{map-get($breakpoints, small)}) {

    .left {
      text-align: right;
      border-right: 2px solid lighten($linear, 80%);
    }

    .right {
      text-align: left;
    }
  }

</style>
