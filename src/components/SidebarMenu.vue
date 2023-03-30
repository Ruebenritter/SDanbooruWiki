<template>
  <div id="menu-sidebar" :data-active-index="activeIndex">
    <div id="menu-items">
      <div
        class="menu-item-wrapper px-3"
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        @mouseover="activeIndex = menuItem.id"
      >
        <router-link class="menu-item" :to="{ name: menuItem.title }">
          {{ menuItem.label }}</router-link
        >
      </div>
    </div>
    <div id="menu-background-pattern"></div>
  </div>
</template>

<script>
import { useMenuStore } from '../store'

export default {
  name: 'sidebar-menu',
  setup() {
    const menuStore = useMenuStore()
    const menuItems = menuStore.menuItems

    return {
      menuItems
    }
  },
  props: {},
  data() {
    return {
      activeIndex: null
    }
  },
  methods: {},
  components: {},

  computed: {
    console: () => console,
    window: () => window
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  color: var(--primary-900);
  font-size: clamp(1vmin, 4vw, 4vmin);
  font-family: 'Arial', 'Roboto', sans-serif;
  text-decoration: none;
}

#menu-items {
  position: relative;
  z-index: 2;
}

#menu-sidebar {
  height: 100%;
  width: 100%;
}

// hover effects
#menu-items:hover > .menu-item-wrapper:not(:hover) {
  opacity: 0.3;
}
#menu-items:hover ~ #menu-background-pattern {
  background-size: 4.5vmin 4.5vmin;
  opacity: 0.4;
}
#menu-sidebar[data-active-index='0'] > #menu-background-pattern {
  background-position: 0% -33%;
}

#menu-sidebar[data-active-index='1'] > #menu-background-pattern {
  background-position: 0% -66%;
}

#menu-sidebar[data-active-index='2'] > #menu-background-pattern {
  background-position: 0% -100%;
}

#menu-sidebar[data-active-index='3'] > #menu-background-pattern {
  background-position: 0% -100%;
}

#menu-background-pattern {
  height: 100vh;
  width: 100vw;
  opacity: 0.2;
  background-image: radial-gradient(gray 9%, transparent 9%);

  background-position: 0% 0%;
  background-size: 5vmin 5vmin;

  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;

  transition: opacity 800ms ease, background-size 800ms ease, background-position 800ms ease;
}
</style>
