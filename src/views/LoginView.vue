<template>
  <!--Fireblog Tutorial Login Class #rework in custom style-->
  <div class="form-wrap d-flex justify-content-center gpt-3" >
    <form class="login align-self-center justify-content-center align-items-center p-1 ">
      <p class="login-register mb-2">
        Don't have an account?
        <router-link class="router-link bg-dark" :to="{ name: 'register'}">Register now!</router-link>
      </p>
      <h2 class="secondary-gpt">Login to SDanbooruWiki</h2>
      <br>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="email" v-model="email" />
        </div>
        <div class="input">
          <input type="text" placeholder="password" v-model="password" />
        </div>
      </div>
      <router-link class="router-link forgot-password" :to="{ name: 'pw-reset'}">
        Forgot your password?
      </router-link>
      <br>
      <button>Sign In</button>
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
<style lang="scss">
  .form-wrap {
    overflow: hidden;
    height: 80vh;
    margin: 0 auto;
    width: 90%;

    @media (min-width: 900px) {
      width: 100%;
    }

    form {

      h2 {
        font-size: 32px;
        
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }
      }
    }

    .forgot-password {
      cursor: pointer;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: coral;
      }
    }

  }

  //Color suggestions for buttons, highlights by chatgpt
  .gpt-1 {
    color: deepskyblue
  }
  .gpt-2 {
    color: #ffef00;
  }
  .gpt-3 {
    color: coral;
  }
  .gpt-4 {
    color: violet;
  }
  .gpt-5 {
    color: #228b22;
  }
  .bg-gray {
    background-color: #444654
  }
</style>