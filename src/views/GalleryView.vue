<template>
  <div class="list-scroll">
    <ul class="card-list">
      <!--create a row for each tag group/category/subclass depending on tree level-->
      <li class="card-item" v-for="index in 25" :key="index">
        <!--create a card depending on tree level content/children-->
        <Card v-for="index in 5" :key="index"></Card>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '../components/Card.vue'

export default {
  name: 'GalleryView',
  created() {},
  data() {
    return {}
  },
  props: {},
  methods: {},
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
.list-scroll {
  margin-top: 1vh;
  width: 100%;
  height: 90vh;
  overflow-y: scroll;
}
.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.card-item {
  flex: 1 0 calc(20% - 5px);
  margin: 1px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--primary-900);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--analog2-500);
}
</style>
