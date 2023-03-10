import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LinksView from "../views/LinksView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: HomeView,
      meta: {
        title: "gallery"
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: "about",
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
        title: "links"
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = '${to.meta.title} | SDanbooruWiki';
  next();
})

export default router
