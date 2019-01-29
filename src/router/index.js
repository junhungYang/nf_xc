import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const home = () => import("@/page/home.vue");
const slider = () => import("@/page/slider.vue");
const prizeCollect = () => import("@/page/prizeCollect.vue");
const company = () => import("@/page/company.vue");

export default new Router({
  // mode:'history',
  routes: [
    {
      path: "/home",
      name: "name",
      component: home
    },
    {
      path: "/slider",
      name: "slider",
      component: slider
    },
    {
      path: "/prizeCollect",
      name: "prizeCollect",
      component: prizeCollect
    },
    {
      path: "/company",
      name: "company",
      component: company
    },

    {
      path: '*',
      redirect(to) {
        return "/home";
      }
    }
  ]
});
