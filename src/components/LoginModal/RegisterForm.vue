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
      <button @click.prevent="register" class="">SIGN UP</button>
      <div v-show="error" class="error">{{ this.errorMsg }}</div>
    </form>
  </div>
</template>

<script>
import { firebaseApp } from "../../firebase/firebaseInit"
import db from "../../firebase/firebaseInit.js";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

  export default {
    name: 'RegisterForm',
    created() {

    },
    data() {
      return {
        username: "",
        email: "",
        password: "",
        error: "",
        errorMsg: "",
      }
    },
    props: {

    },
    methods: {
      switchForm(newForm) {
        this.$emit('switch', newForm)
      },
      async register() {
        if ( this.email !== "" &&
        this.username !== "" &&
        this.password !== "")
        {
          // reset error message
          this.error = false;
          this.errorMsg = "";

          const firebaseAuth = getAuth();
          createUserWithEmailAndPassword(firebaseAuth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          });
     
          /*
          const dataBase = db.collection("users").doc(user.uid);
          await dataBase.set({
            username: this.username,
            email: this.email,
          });*/
          this.$router.push({name: 'gallery'});

          return;
        }

        this.error = true;
        this.errorMsg = "Please fill out all fields!";
        return;
      },
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