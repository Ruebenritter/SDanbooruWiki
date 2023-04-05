<template>
  <button @click="navigateUp">BACK</button>
  <div class="list-scroll">
    <ul class="card-list">
      <!--create a row for each tag group/category/subclass depending on tree level-->
      <li class="card-item" v-for="title, index in currentCardChoices" :key="index">
        <!--create a card depending on tree level content/children-->
        <Card :title="title" @cardClicked="level === HierarchyLevels.TAG_GROUP ? selectTagGroup(title) : 
        level === HierarchyLevels.CATEGORY ? selectCategory(title) : 
        level === HierarchyLevels.SUBCATEGORY ? selectSubcategory(title) : selectTag(title)">
        </Card>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {
    HierarchyLevels
  } from "../config.js"
  // console.log("Gallery setup!");
</script>

<script>
  import Card from '../components/Card.vue'
  import db from '../firebase/firebaseInit.js'
  import {
    collection,
    getDocs,
    query,
    where
  } from 'firebase/firestore'

  export default {
    name: 'GalleryView',
    created() {
      console.log('Gallery created!');
      const lastLoadedCategory = localStorage.getItem('lastLoadedCategory');
      if (this.level != lastLoadedCategory)
        this.loadTagGroups();
      else {
        const cardChoices = localStorage.getItem('currentCardChoices');
        this.currentCardChoices = JSON.parse(cardChoices);
      }
    },
    data() {
      return {
        level: HierarchyLevels.TAG_GROUP, // default: tag groups then: category > subcategory > tag  
        selected: {
          tagGroup: String,
          category: String,
          subcategory: String,
          tag: String,
        },
        availableChoices: {
          categories: [],
          subcategories: [],
          tags: [],
          tagDetails: [],
        },
        currentCardChoices: [],
        HIERARCHY_COLLECTION: 'DanbooruTags',
      }
    },
    props: {
      
    },
    methods: {
      async loadTagGroups() {
        console.log("Called loadTagGroups");
        const tagGroupSet = new Set();
        const querySnapshot = await getDocs(collection(db, 'DanbooruTags'));
        querySnapshot.forEach((doc) => {
          const tagGroup = doc.data()['tag group'];
          // Set every word to UpperCase
          let tagTitle = this.keyToTitle(tagGroup)
          tagGroupSet.add(tagTitle);
        });
        const tagGroups = Array.from(tagGroupSet);
        this.currentCardChoices = tagGroups;
        this.lastLoadedCategory = 'tag groups';
        localStorage.setItem('currentCardChoices', JSON.stringify(tagGroups))
        localStorage.setItem('lastLoadedCategory', this.level)

      },
      removeLocalStorageHierarchy() {
        localStorage.removeItem('currentCardChoices');
        localStorage.removeItem('lastLoadedCategory');
      },
      selectTagGroup(tagGroup) {
        console.log(`Clicked on ${tagGroup}.`)
        this.selected.tagGroup = tagGroup;
        // logic to get available categories and update currentCardChoices
        this.getTagGroupCategories(tagGroup);
        this.level++;
        console.log(`Selected tag group: New level is ${this.level}`)
      },
      selectCategory(category) {
        console.log(`Clicked on ${category}.`)
        this.level = HierarchyLevels.SUBCATEGORY;
        this.selected.category = category
        // logic to get available subcategories and tags and update currentCardChoices
      },
      selectSubcategory(subcategory) {
        this.level = HierarchyLevels.TAG;
        this.selected.subcategory = subcategory;
        // logic to get available tags and update currentCardChoices
      },
      selectTag(tag) {
        // logic to show tag details in card
        this.selected.tag = tag;
      },
      async getTagGroupCategories(tagGroup){
        let tagGroupKey = this.titleToKey(tagGroup);
        console.log(`Get categories for ${tagGroupKey}`);
        const categoriesSet = new Set();
        const q = query(collection(db, this.HIERARCHY_COLLECTION), where("tag group", "==", tagGroupKey));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const categoryName = doc.data().category;
          // Set every word to UpperCase
          let categoryTitle = this.keyToTitle(categoryName);
          categoriesSet.add(categoryTitle);
        });
        const categories = Array.from(categoriesSet);
        this.currentCardChoices = []
        this.currentCardChoices = [...categories];
        console.log(this.currentCardChoices);
        this.lastLoadedCategory = 'category';
        localStorage.setItem('currentCardChoices', JSON.stringify(this.currentCardChoices))
        localStorage.setItem('lastLoadedCategory', this.level)
      },
      async getCategorySubTags(category){

      },
      async getSubcategorytags(subcategory) {

      },
      async getTagDetails(tag) {

      },
      navigateUp() {
        switch(this.level) {
          case 1:
            this.selected.tagGroup = null;
            this.availableChoices.categories = []
            this.loadTagGroups();
            break;
          case 2:
            this.selected.category = null;
            this.availableChoices.subcategories = [];
            this.availableChoices.tags = [];
            break;
          case 3:
            this.selected.subcategory = null;
            this.availableChoices.tags = [];
            break;
        }
        this.level--;
      },
      titleToKey(title) {
        return title.toLowerCase(); //.replace(/[\s#]/g, '_').replace(/\s+/g, "");
      },
      keyToTitle(key) {
        let title = key.charAt(0).toUpperCase() + key.slice(1);
          title = title.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }).join(' ')
          return title;
      }
    },
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
    display: grid;
    grid-template-columns: repeat(auto-fit, clamp(10vmin, 30vw, 24vmin));
    gap: 1rem;
    // flex-wrap: wrap;
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