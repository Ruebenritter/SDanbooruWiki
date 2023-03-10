
<template>
  <main class="col col-lg-10">
    <component :is="currentComponent"></component>
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

