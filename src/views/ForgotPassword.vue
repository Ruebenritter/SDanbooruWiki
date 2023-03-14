
<template>
  <div class="reset-password">
    <LoginModal v-if="modalActive" v-on:close-modal="closeModal"/>
   <div class="form-wrap">
    <form class="reset">
      <h2>Reset Password</h2>
      <p>Forgot your password? Enter your email to reset it!</p>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="email" v-model="email"/>
        </div>
        <button>Reset</button>
      </div>
    </form>
   </div>
  </div>
</template>

<script>
import LoginModal from '../components/LoginModal.vue';

export default {
    name: "ForgotPassword",
    created() {
    },
    data() {
        return {
          email: null,
          modalActive: true,
          modalMessage: "Modal Test"
        };
    },
    props: {},
    methods: {
      closeModal() {
        this.modalActive = !this.modalActive;
        this.email = "";
      }
    },
    components: { LoginModal }
}
</script>

<style lang="scss" scoped>
  .reset-password {
    position: relative;

    .form-wrap {
      .reset {
        h2 {

        }
      }
    }
  }
</style>

