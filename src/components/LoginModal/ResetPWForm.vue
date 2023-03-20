
<template>
  <div class="form-wrapper">
    <form class="reset-pw">
      <input type="text" placeholder="email" v-model="email">
      <button class="reset-button">Request new password</button>
    </form>
    <div class="login-options">
      <p @click="returnToLogin('LoginForm')">Back to login</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPWForm',
  created() {

  },
  data() {
    return {
      email: null,
    }
  },
  props: {
   
  },
  methods: {
   returnToLogin(form) {
    this.$emit('switch', form);
   }
  },
}
</script>

<style lang="scss" scoped>

</style>

