// src/main.js
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import VueMoment from 'vue-moment'
import App from './App.vue'
import router from './router'
import addPolyfills from './polyfills'
import './directives/validity'
import '@/styles/app.scss'

Vue.use(firestorePlugin)
Vue.use(VueMoment)
Vue.config.productionTip = false

addPolyfills().then(() => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App),
  })
})
