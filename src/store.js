import { defineStore } from 'pinia'
import GalleryView from './views/GalleryView.vue'
import LinksView from './views/LinksView.vue'
import AboutView from './views/AboutView.vue'

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    menuItems: [
      { id: 0, label: 'Gallery', path: '/', title: 'gallery' },
      { id: 1, label: 'Links', path: '/links', title: 'links' },
      { id: 2, label: 'About', path: '/about', title: 'about' }
    ],
    selectedMenuItem: 'default no selection',
    galleryImages: [],
    imagesLoaded: null,
    currentPath: '/'
  }),
  getters: {
    getSelectedMenuItem: (state) => {
      return state.selectedMenuItem
    },
    getCurrentComponent() {
      const componentMap = {
        '/': GalleryView,
        '/links': LinksView,
        '/about': AboutView
      }
      return componentMap[this.currentPath]
    }
  },
  actions: {
    setActiveItem(item) {
      useMenuStore.state.selectedMenuItem = item
    },
    setCurrentPath(path) {
      console.log(path)
      this.currentPath = path
    }
  }
})
