import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: "/home/recommend"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("views/Home"),
    children: [
      {
        path: "mine",
        name: "mine",
        component: () => import("views/Mine"),
      }, 
      {
        path: "recommend",
        name: "recommend",
        component: () => import("views/Recommend"),
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "views/About")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
