<!--Login Modal opens when a login or register button inside the webpage is pressed.
    it contains three components: login, register and reset pw which open respectively 
  when clicked outside it should close
-->
<template>
  <div class="modal" tabindex="-1" role="dialog" @click="$emit('hideLoginModal')">
    <!--div for background effects-->
    <div class="modal-background" @click.stop="">
      <!--div for profile pic or event logos-->
      <div class="modal-logo">
        logo
      </div>
      <!-- div for login, register and reset pw forms -->
      <div class="modal-form">
        form
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginModal',
    created() {

    },
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="scss" scoped>
  .modal {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: fixed;
    transform: translate( -50%, -50%);
    z-index: 101;
    top: 50%;
    left: 50%;

    align-items: center;
    justify-content: center;
  }

  .modal-background {
    width: 50vmin;
    height: auto;
    aspect-ratio: 0.7;
    background-color: var(--bs-dark);
    display: block;
  }
  
  
</style>