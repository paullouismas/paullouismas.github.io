import Vue from 'vue'
import VueRouter from 'vue-router'

import Root from '@/views/Root.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: /* 'history' */'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root,
      redirect: { name: 'Home' },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'portfolio',
          name: 'Portfolio',
          component: () => import(/* webpackChunkName: 'Portfolio' */ '@/views/portfolio/Portfolio.vue')
        },
        {
          path: 'tools',
          name: 'Tools',
          component: () => import(/* webpackChunkName: 'Tools' */ '@/views/tools/Tools.vue'),
          redirect: { name: 'Home' },
          children: [
            {
              path: 'sql-generator',
              name: 'SQLGenerator',
              component: () => import(/* webpackChunkName: 'SQLGenerator' */ '@/views/tools/sql-generator/SQLGenerator.vue'),
              children: [
                {
                  path: 'documentation',
                  name: 'SQLGeneratorDocumentation',
                  component: () => import(/* webpackChunkName: 'SQLGenerator' */ '@/views/tools/sql-generator/SQLGeneratorDocumentation.vue')
                }
              ]
            },
            {
              path: 'washer-dashboard',
              name: 'WasherDashboard',
              component: () => import(/* webpackChunkName: 'WasherDashboard' */ '@/views/tools/washer-dashboard/WasherDashboard.vue')
            },
            {
              path: 'shifts-manager',
              name: 'ShiftsManager',
              component: () => import(/* webpackChunkName: 'ShiftsManager' */ '@/views/tools/shifts-manager/ShiftsManager.vue'),
              redirect: { name: 'ShiftsManagerHistory' },
              children: [
                {
                  path: 'history',
                  name: 'ShiftsManagerHistory',
                  component: () => import(/* webpackChunkName: 'ShiftsManager' */ '@/views/tools/shifts-manager/History.vue')
                },
                {
                  path: 'new-shift',
                  name: 'ShiftsManagerNewShift',
                  component: () => import(/* webpackChunkName: 'ShiftsManager' */ '@/views/tools/shifts-manager/NewShift.vue')
                },
                {
                  path: 'current-shift',
                  name: 'ShiftsManagerCurrentShift',
                  component: () => import(/* webpackChunkName: 'ShiftsManager' */ '@/views/tools/shifts-manager/CurrentShift.vue')
                },
                {
                  path: 'settings',
                  name: 'ShiftsManagerSettings',
                  component: () => import(/* webpackChunkName: 'ShiftsManager' */ '@/views/tools/shifts-manager/Settings.vue')
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  linkExactActiveClass: 'is-active'
})

export default router
