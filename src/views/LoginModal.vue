<!--Login Modal opens when a login or register button inside the webpage is pressed.
    it contains three components: login, register and reset pw which open respectively 
  when clicked outside it should close
-->
<template>
  <div class="modal d-flex flex-column" tabindex="-1" role="dialog" @click="hideModal">
    <!--div for background effects-->
    <div class="modal-background d-flex" @click.stop="">
      <!--div for profile pic or event logos-->
      <div class="modal-logo"></div>
      <!-- div for login, register and reset pw forms -->
      <div class="modal-form">
        <component :is="activeForm" @switch="switchForm"></component>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginModal/LoginForm.vue'
import RegisterForm from '../components/LoginModal/RegisterForm.vue'
import ResetPWForm from '../components/LoginModal/ResetPWForm.vue'

export default {
  name: 'LoginModal',
  created() {
    this.switchForm(this.form)
  },
  data() {
    return {
      activeForm: null
    }
  },
  components: { LoginForm, RegisterForm, ResetPWForm },
  methods: {
    switchForm(form) {
      if (form === 'close') {
        this.hideModal()
      }
      this.activeForm = form
    },
    hideModal() {
      this.$emit('hideLoginModal')
    }
  },
  props: {
    form: {
      type: String,
      required: true
    }
  },
  watch: {
    form: function (newForm) {
      if (newForm === 'LoginForm') {
        this.activeForm = LoginForm
      }
      if (newForm === 'RegisterForm') {
        this.activeForm = RegisterForm
      }
      if (newForm === 'ResetPWForm') {
        this.activeForm = ResetPWForm
      }
      console.log('LoginModal: ' + this.activeForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 101;
  top: 50%;
  left: 50%;

  align-items: center;
  justify-content: center;
}

.modal-background {
  width: 50vmin;
  height: auto;
  aspect-ratio: 0.6;
  background-color: var(--bs-dark);

  border: 2px solid red;
  border-radius: 1vmin;

  padding: 2vmin;

  flex-direction: column;

  &:hover {
    border-color: var(--primary-900);
  }

  .modal-logo {
    background-image: url('/sdanbooru_logo_calm.png');
    background-size: cover;
    width: 80%;
    height: auto;
    aspect-ratio: 1;

    align-self: center;
  }

  .modal-form {
    align-self: center;
    padding-top: 4vmin;
    width: 100%;
  }
}
</style>
