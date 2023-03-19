
<template>
  <div class="welcome d-flex">
    <h1 class="welcome-message">Welcome to SDanbooruWiki</h1>
  </div>
</template>

<script>
export default {
  name: 'HeroLanding',
  created() {

  },
  data() {
    return {
    }
  },
  props: {
   
  },
  methods: {
   
  },
}
</script>

<style lang="scss" scoped>
.welcome {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("/hero_banner_library.png");
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  justify-content: center;
  

  .welcome-message {
    font-family: "Merriweather", serif;
    color: white;
    font-size: 8vmin;
    top: 10%;
  }
}
</style>

