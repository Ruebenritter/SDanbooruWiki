
<template>
  <!--Fireblog Tutorial Login Class #rework in custom style-->
  <div class="form-wrap d-flex justify-content-center gpt-3" >
    <form class="login align-self-center justify-content-center align-items-center p-1 ">
      <p class="login-register mb-2">
        Already have an account?
        <router-link class="router-link bg-dark" :to="{ name: 'login'}">Login now!</router-link>
      </p>
      <h2 class="secondary-gpt">Create your SDanbooruWiki account!</h2>
      <br>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="username" v-model="username" />
        </div>
        <div class="input">
          <input type="text" placeholder="email" v-model="email" />
        </div>
        <div class="input">
          <input type="text" placeholder="password" v-model="password" />
        </div>
      </div>
      <br>
      <button>Sign Up</button>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  created() {

  },
  data() {
    return {
      username: null,
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

<style lang="scss" scoped>

.register {
  h2 {
    max-width: 350px;
  }
}

</style>

