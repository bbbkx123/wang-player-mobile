import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: "/music/recommend"
  },
  {
    path: "/music",
    name: "Music",
    component: () => import("views/Music"),
    children: [
      {
        path: "mine",
        name: "Mine",
        component: () => import("views/Mine"),
      }, 
      {
        path: "recommend",
        component: () => import("views/Recommend"),
      }
    ]
  },
  {
    path: "/about",
    name: "About",
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
