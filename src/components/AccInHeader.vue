<!--The Account in header controls the vue components displayed in the header top right section-->
<!--when logged in show a profile image and dropdown menu for account related settings-->
<!--when logged out show a login/register option-->
<template>
  <div>
   <!--Switch the Login & Profile elemtns depending on login status later #rework-->
   
   <router-link v-if="!userLoggedIn" class="link" :to="{ name: 'login'}">Login/Register</router-link>

<div class="flex-shrink-0 right dropdown" v-if="userLoggedIn">
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
</template>

<script>
export default {
  name: 'AccInHeader',
  created() {

  },
  data() {
    return {
      userLoggedIn: false,
    }
  },
  props: {
   
  },
  methods: {
   
  },
}
</script>

<style lang="scss" scoped>

</style>

