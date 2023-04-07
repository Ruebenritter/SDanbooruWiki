import { createRouter, createWebHistory } from 'vue-router'
import GalleryView from '../views/GalleryView.vue'
import LinksView from '../views/LinksView.vue'
// import HeroLanding from '../views/HeroLanding.vue'
// import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'heroLanding',
    //   component: LandingPage,
    //   meta: {
    //     title: 'Welcome'
    //   }
    // },
    {
      path: '/',
      name: 'gallery',
      component: GalleryView,
      meta: {
        title: 'Gallery'
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About'
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
        title: 'Links'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | SDanbooruWiki`
  next()
})

export default router
