import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Rent from "../views/rent/Rent.vue";
import Lend from "../views/lend/Lend.vue";
import RentDetail from "../views/rent/RentDetail.vue";
import ReturnNFT from "../views/rent/ReturnNFT.vue";
import FAQ from "../views/FAQ.vue";

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect: "explorer",
    children: [
      {
        path: "explorer",
        name: "explorer",
        component: Rent,
      },
      {
        path: "me",
        name: "me",
        component: Lend,
      },
      {
        path: "rentdetail/:token/:tokenId",
        name: "rentdetail",
        component: RentDetail,
      },
      {
        path: "returnnft/:token/:tokenId",
        name: "returnnft",
        component: ReturnNFT,
      },
      {
        path: "faq",
        name: "faq",
        component: FAQ,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
