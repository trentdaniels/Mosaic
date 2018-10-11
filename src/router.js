import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Store from "./store";

Vue.use(Router);

const router = new Router({
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
      component: Home
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
      path: "/account",
      name: "account",
      component: () => import("./views/Account/Details.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/edit",
      name: "edit",
      component: () => import("./views/Account/Edit.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/delete",
      name: "delete",
      component: () => import("./views/Account/Delete.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/collections",
      name: "collections",
      component: () => import("./views/Account/Collections.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/creations",
      name: "creations",
      component: () => import("./views/Account/Creations.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/creations/create",
      name: "create",
      component: () => import("./views/Account/CreateProject.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user/:id",
      name: "userProfile",
      component: () => import("./views/Profile.vue"),
      meta: {
        requiresAuth: true
      },
      props: true,
      async beforeEnter(to, from, next) {
        await Store.dispatch("fetchUser", to.params.id);
        next();
      }
    },
    {
      path: "/timeline",
      name: "timeline",
      component: () => import("./views/Timeline.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/employ",
      name: "employ",
      component: () => import("./views/Employ.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/Messages.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let isLoggedIn = Store.getters.user;
  let needsAuthentication = to.matched.some(route => route.meta.requiresAuth);

  if (needsAuthentication && !isLoggedIn) {
    next("home");
  } else if (!needsAuthentication && isLoggedIn) {
    next();
  } else {
    next();
  }
});

export default router;
