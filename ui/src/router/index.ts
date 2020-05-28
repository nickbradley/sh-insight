import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Demo from '../views/Demo.vue'
import Submit from "@/views/Submit.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home - SH>Insight"
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: "About - SH>Insight"
    }
  },
  {
    path: '/dashboard/:submissionId?',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: "Dashboard - SH>Insight"
    },
    props: (route) => ({ submissionId: route.params.submissionId })
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
    meta: {
      title: "Demo - SH>Insight"
    }
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
