import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import VueMoment from 'vue-moment'
import App from './App'
import AnimateWhenVisible from './components/AnimateWhenVisible'
import addPolyfills from './polyfills'
import './directives/validity'
import './styles/app.scss'

Vue.use(firestorePlugin, VueMoment)
firebase.initializeApp({
  projectId: 'portfolio-4ad8b',
  databaseURL: 'https://portfolio-4ad8b.firebaseio.com',
})
/* eslint-disable import/prefer-default-export */
export const db = firebase.firestore()

Vue.component('AnimateWhenVisible', AnimateWhenVisible)
Vue.config.productionTip = false;

addPolyfills().then(() => {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: h => h(App),
  });
})
