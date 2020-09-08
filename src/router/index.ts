import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: /* 'history' */'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/portfolio/',
      name: 'Portfolio',
      component: () => import(/* webpackChunkName: "Portofolio" */ '@/views/portfolio/Portfolio.vue')
    },
    {
      path: '/tools/sql-generator/',
      name: 'SQL Generator',
      component: () => import(/* webpackChunkName: "SQLGenerator" */ '@/views/tools/sql-generator/SQLGenerator.vue')
    },
    {
      path: '/tools/sql-generator/documentation/',
      name: 'SQL Generator - Documentation',
      component: () => import(/* webpackChunkName: "SQLGeneratorDocumentation" */ '@/views/tools/sql-generator/SQLGeneratorDocumentation.vue')
    },
    {
      path: '/tools/washer-dashboard/',
      name: 'Washer Dashboard',
      component: () => import(/* webpackChunkName: "WasherDashboard" */ '@/views/tools/washer-dashboard/WasherDashboard.vue')
    }
  ],
  linkExactActiveClass: 'is-active'
})

export default router
