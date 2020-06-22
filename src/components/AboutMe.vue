<template>
  <section id="about" ref="about">
    <Title :title="info.name" :description="info.subtitle" />
    <div class="section-content">
      <div class="container-fluid">
        <div class="row">
          <AnimateWhenVisible name="fadeLeft" class="col-12 col-md order-2 order-md-0">
            <Description :post="info.description" />
          </AnimateWhenVisible>
          <Photo :img="info.img" class="col-12 col-md text-center" />
          <AnimateWhenVisible name="fadeRight" class="col-12 col-md">
            <PersonalInfo
              :post="info"
              :userName="info.name"
              :experience="experience"
              :resume="info.resume"
            />
          </AnimateWhenVisible>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import Title from './Title';
import Photo from './Photo';
import PersonalInfo from './PersonalInfo';
import Description from './Description';
import { db } from '../main';

export default {
  components: {
    Title,
    Description,
    Photo,
    PersonalInfo,
  },
  data() {
    return {
      info: {},
      experience: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      db.collection('personal')
        .doc('info')
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) return;
          const data = snapshot.data();
          this.info = {
            name: data.name,
            description: data.description,
            title: data.title,
            subtitle: data.subtitle,
            img: data.img,
            resume: data.resume,
            meta: {
              email: data.email,
              skype: data.skype,
              phone: data.mobile,
              city: data.city,
            },
          };
        });
      const startdateMoment = moment('08/24/2014');
      const enddateMoment = moment(new Date());

      if (
        startdateMoment.isValid() === true &&
        enddateMoment.isValid() === true
      ) {
        // getting the difference in years
        const years = enddateMoment.diff(startdateMoment, 'years');

        // moment returns the total months between the two dates, subtracting the years
        // eslint-disable-next-line
        const months = enddateMoment.diff(startdateMoment, 'months') - years * 12;

        // to calculate the days, first get the previous month and then subtract it
        startdateMoment.add(years, 'years').add(months, 'months');
        const days = enddateMoment.diff(startdateMoment, 'days');
        // eslint-disable-next-line
        this.experience = years + ' years ' + months + ' months and ' + days + ' days';
      }
    },
  },
};
</script>


<style scope lang="scss">
@import "@/styles/variables.scss";
$bg-about-me: map-get($colors, dark);
#about {
  background-color: lighten($bg-about-me, 84.6%);
  .col-12 {
    margin-top: 50px;
  }
}
.text-center {
  text-align: center;
}
@media (min-width: #{map-get($breakpoints, medium)}) {
  .section-content {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
