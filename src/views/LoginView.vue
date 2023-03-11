<template>
  <!--Fireblog Tutorial Login Class #rework in custom style-->
  <div class="form-wrap d-flex justify-content-center">
    <form class="login align-self-center">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'register'}">Register now!</router-link>
      </p>
      <h2>Login to SDanbooruWiki</h2>
      <br>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="email" v-model="email" />
        </div>
        <div class="input">
          <input type="text" placeholder="password" v-model="password" />
        </div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'pw-reset'}">
        Forgot your password?
      </router-link>
      <br>
      <button>Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
  export default {
    name: 'LoginView',
    components: {

    },
    created() {

    },
    data() {
      return {
        email: null,
        password: null,
      }
    },
    props: {

    },
    methods: {

    },
  }
</script>

<!--Login, Register and ForgotPassword view share css-->
<style lang="css">
.form-wrap {
  overflow: hidden;
  height: 80vh;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
}
</style>