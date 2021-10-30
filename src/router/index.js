import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pokemon from '../views/Pokemon.vue'
import Bitcoin from '../views/Bitcoin.vue'
import Todo from '../views/Todo.vue'
import Form from '../views/Form.vue'
import Casos from '../views/Casos.vue'
import Encuesta from '../views/Encuesta.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Casos',
    component: Casos
  },
  {
    path: '/pokemon/:pokemon',
    name: 'Pokemon',
    component: Pokemon
  },
  {
    path: '/bitcoin',
    name: 'Bitcoin',
    component: Bitcoin
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
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/covid',
    name: 'Casos',
    component: Casos
  },
  {
    path: '/encuesta',
    name: 'Encuesta',
    component: Encuesta
  }
]

const router = new VueRouter({
  routes
})

export default router
