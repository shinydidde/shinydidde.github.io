import Vue from 'vue'
import App from './App'
import AnimateWhenVisible from './components/AnimateWhenVisible'

import addPolyfills from './polyfills'
import './directives/validity'
import './styles/app.scss'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
firebase.initializeApp({
  projectId: 'portfolio-4ad8b',
  databaseURL: 'https://portfolio-4ad8b.firebaseio.com'
})
export const db = firebase.firestore()

Vue.component('AnimateWhenVisible', AnimateWhenVisible)
Vue.config.productionTip = false;

addPolyfills().then(() => {
  new Vue({
    el: '#app',
    render: h => h(App),
  });
})
