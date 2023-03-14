
<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modalMessage }}</p>
    </div>
    <button @click="closeModal">Close</button>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  created() {

  },
  data() {
    return {
    }
  },
  props: ["modalMessage"],
  methods: {
   closeModal() {
    this.$emit("close-modal");
   },
  },
}
</script>

<style lang="scss" scoped>

</style>

