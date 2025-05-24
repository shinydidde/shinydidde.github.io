import Vue from 'vue'
import Router from 'vue-router'
import AdminDashboard from '@/views/AdminDashboard.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/admin',
    //   name: 'Admin',
    //   component: AdminDashboard,
    // },
    { path: '/', name: 'Home', component: Home },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
