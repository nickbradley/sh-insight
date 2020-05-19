import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { ReportService } from './services/ReportService'
import { EmailService } from './services/EmailService'
import {Api} from "@/Api";

Vue.config.productionTip = false

const apiConfig = {
  baseURL: process.env.NODE_ENV === 'production' ? location.origin : 'http://localhost:8080'
};
const api = new Api(apiConfig);

Vue.prototype.$reportService = new ReportService(api)
Vue.prototype.$emailService = new EmailService(api)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
