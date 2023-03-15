<script setup>
  // import { RouterLink, RouterView } from 'vue-router'
</script>


<template>

  <div class="container-fluid">
    <!--row with header-->
    <div class="row">
      
        <header class="py-2 bg-dark">
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
     
    </div>
    <!--row with 3 columsn: menu, main, banner-->
    <div class="row">
      <!-- Sidebar for navigation menu -->
      <div class="banner-left col-2 bg-dark">
        <SidebarMenu/>
      </div>
      <!-- Main Column should contain main page content -->
      <div class="main-center col-8 bg-dark">
        <MainContainer>s</MainContainer>
      </div>
      <!-- Banner showcasing extra info regarding the main container-->
      <div class="banner-right col-2 bg-dark">
        <aside>
          <!-- Banner content goes here -->
        </aside>
      </div>
      <!--Alternatively row with different columns: Login?-->
    </div>
  </div>


</template>

<script>
  import SidebarMenu from "./components/SidebarMenu.vue"
  import MainContainer from "./components/MainContainer.vue"
  import {
    useMenuStore
  } from "./store";
  import AccInHeader from "./components/AccInHeader.vue";

  export default {
    components: {
      SidebarMenu,
      MainContainer,
      AccInHeader,
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
        if (this.$route.name == "login" || this.$route.name == "register" || this.$route.name == "forgot password") {
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
  header {
    border-bottom: 1px solid;
    border-color: var(--primary-900);
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

  .banner-left {
    height: 100vh;
    padding: 0px;
    border-right: 1px solid var(--primary-900);
  }

  .main-center {
    height: 100vh;
  }

  .banner-right {
    height: 100vh;
    // border-left: 1px solid var(--primary-900);
  }
</style>