import Vue from "vue";
import VueRouter from "vue-router";
import Test from "@/views/Test";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/test",
      name: "test",
      component: Test,
    },
  ],
});
