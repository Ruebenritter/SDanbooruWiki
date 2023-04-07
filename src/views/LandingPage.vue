<!--rework heroLanding so the card fan animation can work- PAUSED -->
<template>
  <div class="blockout">
    <div class="landing-page-background">
      <div class="row">
        <!--Show welcome text and hold info panels-->
        <div class="col info-wrapper">
          <div class="welcome-box">
            <h1 class="welcome-text">
              Welcome to SDanbooruWiki
            </h1>
          </div>
        </div>
        <div class="col bg-img-container">
          <img class="bg-hero-image" src="girl_holding_card.png">
        </div>
      </div>

    </div>
  </div>
  <!--Absolutely or fixed card items with animation-->
  <div class="glowing-card" @mouseover="showInfoCards = true" @mouseleave="showInfoCards = false"></div>
  <div class="card-container">
    <div class="info-card"></div>
  </div>
</template>

<script>
  export default {
    name: 'LandingPage',
    created() {

    },
    data() {
      return {
        showInfoCards: false,
      }
    },
    props: {

    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  .blockout {
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }

  .landing-page-background {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(to left,
        black 66%,
        var(--bs-dark));
  }

  .bg-img-container {
    background-color: teal;
    margin: 0;
    padding: 0;
  }

  @media only screen and (min-width: 1200px) {
    .bg-hero-image {
      transform: scaleX(-1) translateX(0) translateY(0);
    }

    .glowing-card {
      position: absolute;
      top: 61.5%;
      left: 61.3%;
      width: 225px;
      height: 310px;
      background-color: transparent;
      border-radius: 12px;
      box-shadow: 0px 0px 100px 30px rgba(215, 210, 0, 0.6);
      transform: rotateZ(-12.8deg);
      z-index: 22;
    }

    .glowing-card:hover {
      box-shadow: 10px 10px 120px 50px gold;
    }

    .glowing-card:hover+.info-wrapper .info-card {
      background-color: blue;
    }

  }

  @media only screen and (max-width: 1200px) {
    .bg-hero-image {
      transform: scaleX(-1) translateX(10%) translateY(-8%);
    }
  }

  @media only screen and (max-width: 768px) {
    .bg-hero-image {
      transform: scaleX(-1) scale(0.9) translateX(20%) translateY(-8%);
    }
  }
</style>