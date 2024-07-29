import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Detail from '@/pages/Detail'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/knight/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})


