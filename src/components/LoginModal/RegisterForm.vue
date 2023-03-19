<template>
  <div class="form-wrapper">
    <h4 class="register-task">Create your SDanbooruWiki account!</h4>
    <div class="login-options">
      <p class="" @click="switchForm('LoginForm')">
        Already have an account?
      </p>
    </div>
    <form class="register">
      <input type="text" placeholder="username" v-model="username" />
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
      <button class="">SIGN UP</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'RegisterForm',
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
      switchForm(newForm) {
        this.$emit('switch', newForm)
      }
    },
  }
</script>


<style lang="scss" scoped>
  .register-task {
    font-family: Arial, Helvetica, sans-serif;
    color: white;
  }

  .login-optinos {
    padding: 0;
  }
</style>