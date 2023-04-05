<template>
  <div class="landing-background-cover">
    <div class="row">
      <div class="col-7 info-panel">
        <div class="welcome-text" :class="{ moveUp: cardsVisible, reset: resetCards }">
          <h1 class="title">Welcome to SDanbooruWiki!</h1>
          <h5 class="subtitle">
            A comprehensive, illustrated guide to danbooru prompt effects in selected Stable
            Diffusion models.
          </h5>
        </div>
      </div>
      <div class="slanted-border"></div>
      <div class="col background-image">
        <div class="card-shine" @mouseover="presentCards"></div>
        <div class="popout-card-left"></div>
    <div class="popout-card-mid"></div>
    <div class="popout-card-right"></div>
      </div>
    </div>
    <!--:class="{'show': cardFan}" v-show="cardsVisible"-->
   
  </div>
</template>

<script>
export default {
  name: 'HeroLanding',
  created() {},
  data() {
    return {
      cardsVisible: false,
      cardFan: false,
      resetCards: false
    }
  },
  props: {},
  methods: {
   
  }
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
  transition: transform 500ms ease;
}

.welcome-text.moveUp {
  padding-top: 10vmin;
  transform: translateY(-30%);
}

.welcome-text.reset {
  transition-duration: 1s;
}

.background-image {
  position: fixed;
  right: -10%;
  background-image: url('/girl_holding_card.png');
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

  @media (min-width: 1280px) {
    display: initial;
  }
}

.card-shine {
  position: absolute;
  top: 60%;
  left: 59%;
  width: 23vmin;
  height: 32vmin;
  border-radius: 12px;
  transform: rotateZ(13deg);
  z-index: 3;
  transition: transform 0.5s ease;
}

.card-shine::before {
  content: '';
  position: absolute;
  top: 2%;
  left: 0;
  width: 95%;
  height: 95%;
  border-radius: 12px;
  box-shadow: 0px 0px 100px 30px rgba(215, 210, 0, 0.6);
}

.card-shine:hover::before {
  box-shadow: 0px 0px 200px 50px rgba(215, 210, 0, 0.8);
}

.card-shine:hover .popout-card-left {
  transform: translate(-50%, -50%);
}

.card-shine:hover .popout-card-mid {
  transform: translate(-100%, -50%);
}

.card-shine:hover .popout-card-right {
  transform: translate(-150%, -50%);
}


.popout-card-left,
.popout-card-mid,
.popout-card-right {
  position: absolute;
  top: 60%;
  right: 20%;
  width: 23vmin;
  height: 32vmin;
  background-color: gold;
  border: 2px solid black;
  border-radius: 12px;
  transform: translate(0%, -50%);
  transition: transform 0.5s ease;
}

.popout-card-left {
  z-index: 4;
}
.popout-card-mid{
  z-index: 5;
}
.popout-card-right{
  z-index: 6;
}

</style>
