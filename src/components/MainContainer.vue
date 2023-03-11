
<template>
  <main class="col col-lg-10">
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

<style lang="scss" scoped>

</style>

