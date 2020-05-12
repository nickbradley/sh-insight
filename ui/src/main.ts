import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { ReportService } from './services/ReportService'

Vue.config.productionTip = false
Vue.prototype.$reportService = new ReportService(location.host)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
