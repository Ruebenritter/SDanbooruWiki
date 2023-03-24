<template>
  <div class="landing-background-cover">
    <div class="row">
      <div class="col-7 info-panel">
        <div class="welcome-text">
          <h1 class="title">Welcome to SDanbooruWiki!</h1>
          <h5 class="subtitle">A comprehensive, illustrated guide to danbooru prompt effects in selected Stable
            Diffusion models.</h5>
        </div>
      </div>
      <div class="slanted-border"></div>
      <div class="col background-image"></div>
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeroLanding',
    created() {

    },
    data() {
      return {}
    },
    props: {

    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  .row {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  .landing-background-cover {
    background-color: var(--bs-dark);

    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }

  .welcome-text {
    color: white;
    font-family: Arial, Helvetica, sans-serif;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .background-image {
    position: fixed;
    right: -10%;
    background-image: url("/girl_holding_card.png");
    transform: scaleX(-1);
    background-size: cover;
    height: 100%;
    width: 50vw;
  }

  .slanted-border {
    display: none;
    position: absolute;
    top: 25%;
    left: -15%;
    height: 0;
    border-top: 100vh solid transparent;
    border-right: 50vw solid black;
    transform: rotateZ(-35deg);
    z-index: 0;
    @media (min-width: 950px) {
      display: initial;
    }
  }
</style>