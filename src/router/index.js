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
    path: "/listdetail",
    name: "listdetail",
    component: () => import("views/ListDetail")
  },
  {
    path: "/playpage",
    name: "playpage",
    component: () => import("views/PlayPage")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
