<template>
  <div class="form-wrapper">
    <form class="login">
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="password" v-model="password" />
      <button @click.prevent="signIn" class="login-button">SIGN IN</button>
      <div v-show="error" class="error">{{ this.errorMsg }}</div>
    </form>
    <div class="login-options">
      <p @click="switchFormTo('RegisterForm')">Register now!</p>
      <p @click="switchFormTo('ResetPWForm')">Forgot password?</p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'LoginForm',
  created() {},
  data() {
    return {
      email: '',
      password: '',
      error: null,
      errorMsg: ''
    }
  },
  props: {},
  methods: {
    switchFormTo(newForm) {
      this.$emit('switch', newForm)
    },
    signIn() {
      const firebaseAuth = getAuth()
      signInWithEmailAndPassword(firebaseAuth, this.email, this.password)
        .then((userCredential) => {
          this.error = false
          this.errorMsg = ''

          const user = userCredential.user
          this.switchFormTo('close')
          this.$router.push({ name: 'gallery' })
        })
        .catch((error) => {
          this.error = true
          this.errorMsg = error.message
        })
    }
  }
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
  // border: 3px solid black;

  form {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    // border: 3px solid teal;
    width: 80%;

    input,
    button {
      margin: 4px;
      height: 4vmin;
      border: 2px solid var(--primary-900);
      border-radius: 0.5vmin;
    }

    button {
      background-color: var(--analog1-500);
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
