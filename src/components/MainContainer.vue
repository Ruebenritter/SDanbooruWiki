
<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import { useMenuStore } from '../store'


export default {
  name: 'MainContainer',
  created() {

  },
  data() {
    return {
    }
  },
  props: {
   
  },
  methods: {
   
  },
  computed: {
    currentComponent() {
      const menuStore = useMenuStore();

      return menuStore.getCurrentComponent
    }
    
  }
}
</script>

<style lang="css" scoped>
main {
  height: 100%;
  z-index: 3;
}
</style>

