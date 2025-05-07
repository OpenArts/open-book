import Vue from "vue";
import VueRouter from "vue-router";
import allPostsView from "@/views/all-posts-view.vue";
import ReelsView from "@/views/reels-view.vue";
import ProfileView from "@/views/profile-view.vue";
import SearchView from "@/views/search-view.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: allPostsView,
  },
  {
    name: "profile-view",
    path: "/profile",
    component: ProfileView,
  },
  {
    name: "reels-view",
    path: "/reels",
    component: ReelsView,
  },
  {
    name: "SearchView",
    path: "/search",
    component: SearchView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
