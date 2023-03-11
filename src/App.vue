<script setup>
// import { RouterLink, RouterView } from 'vue-router'

</script>


<template>
  <!--
-->
  <header class="py-3 mb-3 border-bottom">
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

      <!--Switch the Login & Profile elemtns depending on login status later #rework-->
      <router-link class="link" :to="{ name: 'login'}">Login/Register</router-link>

      <div class="flex-shrink-0 right dropdown">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false" data-bs-popper="static">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">Submit TagImg</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
    </div>
  </header>
  <div class="row">
    <SidebarMenu @menuItemClick="handleItemClick"/>
    <MainContainer/>
  </div>

  
</template>

<script>
import SidebarMenu from "./components/SidebarMenu.vue"
import MainContainer from "./components/MainContainer.vue"
import { useMenuStore } from "./store";

export default {
  components: {
    SidebarMenu,
    MainContainer: MainContainer,
  },
  methods: {
    handleItemClick(item) {
      const store = useMenuStore();
      store.setCurrentPath(item.path)
    },
   
  },
  }

</script>

<style scoped>
.right {
  position: absolute;
  right: 0px;
  padding: 10px;
}
</style>
