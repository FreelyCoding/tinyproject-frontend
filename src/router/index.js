import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from "@/views/about/AboutView";
import MainView from "@/views/main/MainView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'main',
        name: 'main',
        component: MainView
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: HomeView,
    children: [
      {
        path: 'detail',
        name: 'detail',
        component: AboutView
      }
    ]
  },
  {
    path: '/student',
    name: 'student',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeView
  },
  {
    path: '/class',
    name: 'class',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
