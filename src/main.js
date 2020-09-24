import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
//ядро
import core from './plugins/core'

Vue.config.productionTip = false

//подключение ядра
Vue.use(core)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
