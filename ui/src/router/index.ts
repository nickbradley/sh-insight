import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Submit from "@/views/Submit.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard/:submissionId?',
    name: 'Dashboard',
    component: Dashboard,
    props: (route) => ({ submissionId: route.params.submissionId })
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit
  }
]

const router = new VueRouter({
  routes
})

export default router
