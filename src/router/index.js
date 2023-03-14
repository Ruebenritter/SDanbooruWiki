import { createRouter, createWebHistory } from 'vue-router'
import GalleryView from "../views/GalleryView.vue"
import LinksView from "../views/LinksView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import ForgotPassword from "../views/ForgotPassword.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: {
        title: "Gallery"
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: "About",
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/links',
      name: 'links',
      component: LinksView,
      meta: {
        title: "Links"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: "Login"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: "Register"
      }
    },
    {
      path: '/login/pw-reset',
      name: 'pw-reset',
      component: ForgotPassword,
      meta: {
        title: "Forgot Password"
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | SDanbooruWiki`;
  next();
})

export default router
