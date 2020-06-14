<template>
  <div>
    <AnimateWhenVisible name="bounce">
      <h3>Photo</h3>
      <div class="person">
        <a @click.prevent="isModalVisible = true" class="me-photo">
          <img src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/latest.jpg?alt=media&token=b69a6f74-1687-4a85-b1f1-ed602d37cb57" alt="Personal Photo"/>
        </a>
      </div>
    </AnimateWhenVisible>

    <ModalView v-if="isModalVisible" @close="isModalVisible = false">
      <img src="https://firebasestorage.googleapis.com/v0/b/portfolio-4ad8b.appspot.com/o/latest.jpg?alt=media&token=b69a6f74-1687-4a85-b1f1-ed602d37cb57" alt="Personal Photo"/>
    </ModalView>
  </div>
</template>

<script>
import ModalView from './ModalView'

export default {
  name: 'Photo',
  components: {
    ModalView,
  },
  data: () => ({
    isModalVisible: false,
  }),
}
</script>

<style scoped lang="scss">
.person {

  a:focus {
    outline: none;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
  }
}

img {
  max-width: 100%;
}
</style>
