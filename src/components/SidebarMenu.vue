
<template>
<nav 
  class="sidebar-menu col-2 navbar-expand-lg navbar-light bg-light">
  <div 
    class="container-fluid">
    <ul class="navbar-nav list-unstyled ps-0" v-for="menuItem in menuItems" :key="menuItem.id">
      <li class="nav-item pb-1">
        <a class="nav-link link-dark" @click="$emit('menuItemClick', menuItem)">
        {{ menuItem.label }}</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { useMenuStore } from '../store';

export default {
  name: 'sidebar-menu',
  setup() {
    const menuStore = useMenuStore();
    const menuItems = menuStore.menuItems;

    return {menuItems}
  },
  props: {
  },
  methods: {
  },
  components: {
    
  },
  
  computed: {
    console: () => console,
    window: () => window,
  }

}
</script>


<style lang="scss" scoped>

</style>

