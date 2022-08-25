import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Timer from "../views/Timer.vue"
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "sign-up", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  { path: "/timer", component: Timer}
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
