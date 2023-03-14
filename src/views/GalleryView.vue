<template>
  <div class="card-container">
    <div class="row" v-for="index in 16" :key="index">
      <div class="col-lg-3 col-sm-6">
        <Card></Card>
      </div>
      <div class="col-lg-3 col-sm-6">
        <Card></Card>
      </div>
      <div class="col-lg-3 col-sm-6">
        <Card></Card>
      </div>
      <div class="col-lg-3 col-sm-6">
        <Card></Card>
      </div>
    </div>
  </div>

</template>

<script>
  import Card from '../components/Card.vue';

  export default {
    name: "GalleryView",
    created() {},
    data() {
      return {};
    },
    props: {},
    methods: {},
    components: {
      Card
    }
  }
</script>

<style lang="scss" scoped>
  .gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    grid-auto-rows: minmax(200px, auto);

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }

  .card-container {
    height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>