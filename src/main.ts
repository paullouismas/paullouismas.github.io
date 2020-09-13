// Vue
import Vue from 'vue'

// Bulma
import './../node_modules/bulma/css/bulma.css'

// Bulma swatch
// import './../node_modules/bulmaswatch/darkly/bulmaswatch.min.css'

// Animate.css
import './../node_modules/animate.css/animate.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Main app
import App from './App.vue'

// Service worker
import './registerServiceWorker'

// Router
import router from './router'

// Vuex store
import store from './store'

Vue.config.productionTip = false

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
