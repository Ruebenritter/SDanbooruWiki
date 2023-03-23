<script setup>
  // import { RouterLink, RouterView } from 'vue-router'
</script>


<template>

  <div class="container-fluid">
    <!--row with header-->
    <div class="header-split row">
      <header class="py-1 bg-dark">
        <div class="container-fluid d-grid gap-2 align-items-center" style="grid-template-columns: 1fr 2fr 1fr;">
          <div class="col-lg-4">
            <!--Logo in header with gallery link-->
            <router-link class="text-decoration-none" :to="{ name: 'heroLanding'}">
              <div class="row">
                <div class="col-1 logo-image"></div>
                <h4 class="logo-text col-1">SDanbooruWiki</h4>
              </div>
            </router-link>
          </div>
          <div class="d-flex align-items-center">
            <form class="w-100 me-5">
              <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form>
          </div>
          <HeaderProfile @showLoginModal="showModal"></HeaderProfile>
        </div>
      </header>
      <LoginModal v-if="loginModalShow" :form="activeForm" @hideLoginModal="hideModal"></LoginModal>
    </div>
    <!--row with 3 column: menu, main, banner-->
    <div class="page-split row">
      <!-- Sidebar for navigation menu -->
      <div class="banner-left col-2 bg-dark">
        <SidebarMenu />
      </div>
      <!-- Main Column should contain main page content -->
      <div class="main-center col-8 bg-dark">
        <MainContainer></MainContainer>
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
  import HeaderProfile from "./components/HeaderProfile.vue";
  import LoginModal from "./views/LoginModal.vue";

  export default {
    components: {
      SidebarMenu,
      MainContainer,
      HeaderProfile,
      LoginModal,
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
      },
      showModal(form) {
        this.activeForm = form;
        this.loginModalShow = true;
        console.log("App: " + this.activeForm);
      },
      hideModal() {
        this.activeForm = null;
        this.loginModalShow = false;
      }
    },
    data() {
      return {
        sidebarDisabled: null,
        loginModalShow: null,
        activeForm: "",
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

    .logo-text {
      height: 100%;
      font-size: 4vmin;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      color: #27ae60;
      padding: 0;
      padding-left: 1vmin;
      margin: 0;
      align-self: center;
    }

    .logo-image {
      background-image: url("/sdanbooru_logo_calm.png");
      background-size: cover;
      padding: 0;
      margin: 0;
      height: 6vmin;
      width: 6vmin;
      align-self: center;
      
    }
  }

  .banner-left {
    height: 100vh;
    padding: 0px;
    border-right: 1px solid var(--primary-900);
  }

  .main-center {
    height: 93vh;
    padding: 0;
  }

  .banner-right {
    height: 100vh;
    // border-left: 1px solid var(--primary-900);
  }
</style>