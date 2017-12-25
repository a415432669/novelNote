// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import * as filters from './filters'

import {MyHeader, MyIcon, VueConfirm} from '@components'

Vue.config.productionTip = false

Vue.use(VueConfirm)

Vue.component('my-header', MyHeader)
Vue.component('my-icon', MyIcon)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
