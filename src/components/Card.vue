
<template>
  <div class="card m-2 overflow-hidden">
   <div class="card-content rounded">
    <h3 class="card-title">Tag Group</h3>
    <h4 class="card-subtitle">girl dark artstyle digital artist drawing pose portrait fantasy night moonlight melancholic sad lonely beauty fashion dress gothic elegant femme fatale </h4>
   </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
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

  .card {
    border: 1vm solid var(--bs-orange);
    aspect-ratio: 1 / 1.6;
    width: 24vmin;
    position: relative;
    background-image: url("/meinahentaiExample.png");
    background-size: cover;
  }

  .card::before {
    background: linear-gradient(
      130deg,
      transparent 0% 40%,
      var(--analog2-500) 66%,
      var(--primary-900) 83%,
      var(--analog1-500) 100%,
    );
    background-position: 0% 0%;
    background-size: 300% 300%;
    content: "";
    height: 100%;
    left: 0px;
    position: absolute;
    transition: background-position 350ms ease, transform 350ms ease;
    top: 0px;
    width: 100%;
    z-index: 1;
  } 

  .card:hover:before {
    background-position: 100% 100%;
    transform: scale(1.08, 1.03);
  }

  .card:hover > .card-content > .card-title {
    top: 5%;
  }
  .card:hover > .card-content > .card-subtitle {
    top: 5%;
  }

  .card-content {
    height: 100%;
    width: 100%;
    padding: 1vmin;
    z-index: 2;
  }

  .card-title,.card-subtitle {
    color: white;
    font-family: "Anek Latin", sans-serif;
    font-weight: 400;
    margin: 0px;
    top: 87%;
    left: 5%;
    transition: top 300ms ease, color 300ms ease;
  }

  .card-title{
    font-size: 4vmin;
  }

  .card-subtitle {
    font-size: 2vmin;
    margin-top: 1vmin;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 11;
  }

  
</style>

