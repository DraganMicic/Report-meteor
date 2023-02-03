import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OMagnitudi from "@/views/OMagnitudi";
import Detalji from "@/views/Detalji";
import Prijavi from "@/views/Prijavi";
import Izmeni from "@/views/Izmeni";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/magnitudes',
    name: 'magnitudes',
    component: OMagnitudi
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Detalji
  },
  {
    path: '/prijavi',
    name: 'prijavi',
    component: Prijavi
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Izmeni
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
