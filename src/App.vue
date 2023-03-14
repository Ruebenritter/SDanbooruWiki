<script setup>
// import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
  <!--
-->
  <header class="py-3 h-10 bg-dark">
    <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr 1fr;">
      <div class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none">
          <router-link :to="{ name: 'gallery'}">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="32" height="32" /></router-link>
      </div>

      <div class="d-flex align-items-center">
        <form class="w-100 me-3">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>
      </div>

      <AccInHeader></AccInHeader>
    </div>
  </header>
    <div class="row bg-dark">
    <SidebarMenu  v-if="!sidebarDisabled" @menuItemClick="handleItemClick"/>
    <MainContainer/>
    <div class="col-1" v-if="!sidebarDisabled">
      <img src="/banner_girl.png" alt="mdo"  class="img-fluid">
    </div>
  </div>
  

  
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue"
import MainContainer from "./components/MainContainer.vue"
import { useMenuStore } from "./store";
import AccInHeader from "./components/AccInHeader.vue";

export default {
  components: {
    SidebarMenu,
    MainContainer: MainContainer,
    AccInHeader
},
  created() {
    this.checkRoute();
  },
  methods: {
    handleItemClick(item) {
      const store = useMenuStore();
      store.setCurrentPath(item.path)
    },
    checkRoute() {
      if ( this.$route.name == "login" || this.$route.name == "register" || this.$route.name == "forgot password") {
        this.sidebarDisabled = true;
        return;
      }
      this.sidebarDisabled = false;
    }
  },
  data() {
    return {
      sidebarDisabled: null,
    }
  },
  watch: {
    $route() {
      this.checkRoute();
      console.log(this.sidebarDisabled);
    }
  }
}

</script>

<style lang="scss" scoped>
.right {
  position: absolute;
  right: 0px;
  padding: 10px;
}

.img-fluid {
  width: 256px;
  height: 800px;
  object-fit: cover;
  position: absolute;
  padding-right: 20px;
}

header {
  border-bottom: 1px solid;
  border-color:var(--primary-900);
  form {
    input {
      border-color: var(--primary-900);
    }
  }

  .form-control {
    background-color: black;
    color: white;
  }
}
</style>
