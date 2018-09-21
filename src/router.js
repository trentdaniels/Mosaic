import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Store from "./store";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/getstarted",
      name: "getstarted",
      component: () => import('./views/UserStart.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account/Details.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/account/edit',
      name: 'edit',
      component: () => import('./views/Account/Edit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account/delete',
      name: 'delete',
      component:() => import('./views/Account/Delete.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ],
  beforeEach(to, from, next) {
    let isLoggedIn = Store.getters.isLoggedIn;
    let needsAuthentication = to.matched.some(route => route.meta.requiresAuth);

    if (needsAuthentication && !isLoggedIn) {
      next("login");
    } else if (!needsAuthentication && isLoggedIn) {
      next();
    } else {
      next();
    }
  }
});
