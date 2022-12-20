// Sample Router config. Need to add About and NotFound components.
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/nba",
    name: "nba",
    component: () => import("@/views/nba-view.vue"),
  },
  {
    path: "/nfl",
    name: "nfl",
    component: () => import("@/views/nfl-view.vue"),
  },
  {
    path: "/mlb",
    name: "mlb",
    component: () => import("@/views/mlb-view.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"), // Lazy loading this route
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
