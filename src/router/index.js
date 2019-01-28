import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const home = () => import("@/page/home.vue");
const slider = () => import("@/page/slider.vue");
const prizeCollect = () => import("@/page/prizeCollect.vue");
const prizeContent = () => import("@/page/prizeContent.vue");
const writeInfo = () => import("@/page/writeInfo.vue");
const company = () => import("@/page/company.vue");
const inputInfo = () => import('@/page/inputInfo.vue')

export default new Router({
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
      path: "/prizeContent",
      name: "prizeContent",
      component: prizeContent
    },
    {
      path: "/writeInfo",
      name: "writeInfo",
      component: writeInfo
    },
    {
      path: "/company",
      name: "company",
      component: company
    },
    {
      path: '/inputInfo',
      name: 'inputInfo',
      component: inputInfo
    },
    {
      path: '*',
      redirect(to) {
        return "/home";
      }
    }
  ]
});
