<template>
  <section id="contact" class="position">
    <Title :title="sectitle" :description="secdescription"/>
    <div class="section-content container">
      <div class="row">
          <div class="col-3 col-md-2 ver-ailgn" v-for="(skill, idx) in skills" :key="idx">
            <img :src="skill">
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import Title from './Title'
import PersonalInfo from './PersonalInfo'
import { db } from '../main'

export default {
  name: 'Skills',
  components: {
    Title,
    PersonalInfo,
  },
  data: () => ({
    skills: [],
    sectitle: '',
    secdescription: '',
  }),
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      db.collection('personal')
        .doc('skills')
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) return;
          const data = snapshot.data();
          this.skills = data.logos;
          this.sectitle = data.title;
          this.secdescription = data.description;
        });
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';
.section-content{
    margin-top: 30px;
  }
img{
    margin-bottom: 40px;
    width: 65px;
}
.ver-ailgn{
  margin-top: auto;
  margin-bottom: auto;
}

</style>
