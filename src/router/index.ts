import Vue, { VueConstructor } from 'vue'
import VueRouter from 'vue-router'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import Root from '@/views/Root.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const defaultLayoutWithNavbarAndFooter = (defaultElement: VueConstructor<Vue> | (() => Promise<typeof import('*.vue')>)) => ({
  navbar: Navbar,
  default: defaultElement,
  footer: Footer
})

const router = new VueRouter({
  mode: /* 'history' */'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root,
      children: [
        {
          path: '',
          name: 'Home',
          components: defaultLayoutWithNavbarAndFooter(Home)
        },
        {
          path: 'portfolio',
          name: 'Portfolio',
          components: defaultLayoutWithNavbarAndFooter(() => import(/* webpackChunkName: "Portfolio" */ '@/views/portfolio/Portfolio.vue'))
        },
        {
          path: 'tools',
          name: 'Tools',
          components: defaultLayoutWithNavbarAndFooter(() => import(/* webpackChunkName: "Tools" */ '@/views/tools/Tools.vue')),
          children: [
            {
              path: 'sql-generator',
              name: 'SQL Generator',
              component: () => import(/* webpackChunkName: "SQLGenerator" */ '@/views/tools/sql-generator/SQLGenerator.vue'),
              children: [
                {
                  path: 'documentation',
                  name: 'SQL Generator Documentation',
                  component: () => import(/* webpackChunkName: "SQLGenerator" */ '@/views/tools/sql-generator/SQLGeneratorDocumentation.vue')
                }
              ]
            },
            {
              path: 'washer-dashboard',
              name: 'Washer Dashboard',
              component: () => import(/* webpackChunkName: "WasherDashboard" */ '@/views/tools/washer-dashboard/WasherDashboard.vue')
            }
          ]
        }
      ]
    }
  ],
  linkExactActiveClass: 'is-active'
})

export default router
