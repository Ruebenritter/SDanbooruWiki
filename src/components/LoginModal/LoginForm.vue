<template>
  <div class="form-wrapper">
    <form class="login">
          <input type="text" placeholder="email" v-model="email" />
          <input type="text" placeholder="password" v-model="password" />
          <button class="login-button">SIGN IN</button>
    </form>
    <div class="login-options">
      <p @click="switchFormTo('RegisterForm')">Register now!</p>
      <p @click="switchFormTo('ResetPWForm')">Forgot password?</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginForm',
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
      switchFormTo(newForm) {
        this.$emit('switch', newForm);
      }
    },
  }
</script>

<style lang="scss">
  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    background-color: transparent;
    border: 3px solid black;

    form {
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: 3px solid teal;
      width: 80%;

      input, button {
        margin: 4px;
        height: 4vmin;
        border: 2px solid var(--primary-900);
        border-radius: 0.5vmin;
      }
    }
  }

  .login-options {
    display: flex;

    p {
      color: var(--primary-900);
      font-family: Arial, Helvetica, sans-serif;
      font-size: small;

      padding: 1vmin;

      transition: color 500ms ease;

      &:hover {
        color: white;
      }
    }
  }
</style>