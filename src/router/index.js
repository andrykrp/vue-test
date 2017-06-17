import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Card from '@/components/Card'

Vue.use(Router)

const Bar = { template: '<div>bar</div>' }

export default new Router({
  routes: [
    {path: '/home', redirect: '/' },
    {path: '/', name: 'Home', component: Home},
    {path: '/card', name: 'Card', component: Card}
  ]
})
