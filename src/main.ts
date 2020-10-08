// Vue
import Vue from 'vue'

// Bulma
import 'bulma/css/bulma.css'

// Bulma swatch
import 'bulmaswatch/lux/bulmaswatch.min.css'

// Bulma tags input
import '@creativebulma/bulma-tagsinput/dist/css/bulma-tagsinput.css'

// Animate.css
import 'animate.css/animate.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
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
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
