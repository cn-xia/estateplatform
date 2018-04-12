import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import search from '@/pages/search'

import imqa from '@/pages/imqa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'imqa',
      component: imqa
    },
    {
      path:'/search',
      name:'search',
      component:search
    }
  ]
})
