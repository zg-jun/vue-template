/**路由文件 */

const Login = () => import("@views/login/login.vue");
const Main = () => import("@views/main.vue");

export default [
  {
    path: "/",
    redirect: { name: "login" }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/main",
    name: "main",
    component: Main
  }
];
