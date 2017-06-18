import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Card from '@/components/card/Card'
import Template from '@/components/template/Template'
import TemplateView from '@/components/template/TemplateView'

Vue.use(Router)

const Bar = { template: '<div>bar</div>' }

const routes = [
  {path: '/home', redirect: '/' },
  {path: '/', name: 'Home', component: Home},
  {path: '/card', name: 'Card', component: Card},
  {path: '/template', name: 'Template', component: Template},
  {path: '/template/view', name: 'TemplateView', component: TemplateView}  
]

// export default routes

export default new Router({
  routes: routes,
  mode: 'history'
})
