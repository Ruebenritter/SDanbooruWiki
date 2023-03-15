<template>
  <div class="card-container">
    <!--create a row for each tag group/category/subclass depending on tree level-->
     <div class="card-item row p-1" v-for="index in 8" :key="index">
      <!--create a card depending on tree level content/children-->
      <Card v-for="index in 5" :key="index"></Card>
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
  .card-container {
    overflow: scroll;
  }
</style>