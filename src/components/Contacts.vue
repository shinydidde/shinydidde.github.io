<template>
  <section id="contact" class="position">
    <Title :title="category.name" :description="category.description"/>
    <div class="section-content">
      <div class="row">
          <article v-for="(location, idx) in locations" :key="idx">
            <img :src="location.image">
            <h1>{{ location.name }}</h1>
          </article>
        </div>
    </div>
  </section>
</template>

<script>
import { group } from '../utils'
import Title from './Title'
import PersonalInfo from './PersonalInfo'
import { db } from '../main'

export default {
  name: 'Contacts',
  props: ['category', 'posts'],
  components: {
    Title,
    PersonalInfo,
  },
  data: () => ({
    name: '',
    email: '',
    message: '',
    isValidName: true,
    isValidEmail: true,
    isValidMessage: true,
    locations: []
  }),
  firestore () {
    return {
      locations: db.collection('locations')
    }},
  computed: {
    groupedPosts() {
      return group(this.posts)
    },
    personalInfo() {
      return this.groupedPosts['personal-information']
    },
  },
  methods: {
    formSubmited() {
      setTimeout(() => {
        this.name = this.email = this.message = ''
      }, 100)
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

  $bg-contact: map-get($colors, dark) !default;

  #contact {
    background-color: lighten($bg-contact, 84.6%);

    .row {
      margin-top: 20px;
    }
  }

  .contact-box {
    margin: 30px 0;
    padding: 0 10px;

    h3 {
      text-align: left;
      color: map-get($colors, dark);
      margin-bottom: 0px;
      font-size: 1.4rem;
    }

    i {
      font-size: 4rem;
      margin-left: -12px;
      color: map-get($colors, secondary);
    }

    p {
      margin-top: 5px;
    }
  }

  .errors-block {
    color: #f12b2b;
  }

  .btn-sent {
    border: none;
    color: #fff;
    line-height: 40px;
    padding: 0 25px;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 10px;
    float: right;
    background-color: map-get($colors, secondary);
    box-shadow: 0px 3px 3px rgba(0,0,0,0.6);

    &:active {
      margin-bottom: 2px;
      box-shadow: 0px 1px 3px rgba(0,0,0,0.6);
    }

    &:focus {
      outline: none;
    }
  }

  form {
    padding: 0 10px;
  }

  .form-group {
    display: block;
    margin-bottom: 20px;

    .star-required {
      font-weight: 900;
      font-size: 2rem;
      color: map-get($colors, secondary);
    }

    .title-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .validation {
      color: map-get($colors, error);
      animation-duration: 0.5s;
    }

    input,
    textarea {
      display: block;
      width: 100%;
      border: 1px solid lighten($bg-contact, 60%);
      margin-top: 5px;
      line-height: 4rem;
      text-indent: 1rem;
      font-size: 1.4rem;
      outline: none;
      background-color: transparent;
    }
  }
</style>
