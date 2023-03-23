
<template>
  <div class="welcome d-flex">
    <h1 class="welcome-message">Welcome to SDanbooruWiki</h1>
    <h4 class="subtitle"> A comprehensive illustrated guide to danbooru prompt effects in selected Stable Diffusion models.</h4>
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
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url("/hero_banner_library.png");
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  align-items: center;
  

  .welcome-message {
    font-family: "Merriweather", serif;
    color: white;
    font-size: 8vmin;
    top: 10%;
  }

  .subtitle {
    font-family: 'Arial', sans-serif;
    color: white;
    font-size: 3vmin;
    top: 10%;
  }
}
</style>

