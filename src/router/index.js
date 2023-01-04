// Sample Router config. Need to add About and NotFound components.
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import nbaStandings from "@/components/nba/nba-standings.vue";
import nbaScores from "@/components/nba/nba-scores.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/nba",
    name: "nba",
    component: () => import("@/views/nba-view.vue"),
    children: [
      {
        // nbaStandings will be rendered inside nba-view's <router-view>
        // when /nba/standings is matched
        path: "standings",
        component: nbaStandings,
      },
      {
        path: "scores",
        component: nbaScores,
      },
    ],
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
