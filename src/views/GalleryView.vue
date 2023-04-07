<template>
  <div class="row gallery-header">
    <div class="return col-1" @click="navigateUp">
      <img src="/icons8-doppelt-links-32.png" >
    </div>
    <div class="metadata col">
      <div class="checkpoint-option">
        CHECKPOINT OPTION
      </div>
      <div class="prompt-option">
        PROMPT OPTION
      </div>
    </div>
    <div class="copy-clipboard col-1">
      <img src="icons8-kopieren-64.png">
    </div>
  </div>
  <div class="list-scroll">
    <ul class="card-list">
      <!--create a row for each tag group/category/subclass depending on tree level-->
      <li class="card-item" v-for="title in currentCardChoices" :key="title">
        <!--create a card depending on tree level content/children-->
        <Card :title="title" @cardClicked="level === HierarchyLevels.TAG_GROUP ? selectTagGroup(title) : 
        level === HierarchyLevels.CATEGORY ? selectCategory(title) : 
        level === HierarchyLevels.SUBCATEGORY ? selectSubcategory(title) : selectTag(title)"
        :illustration="null">
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

      const navigationState = localStorage.getItem(this.NAVIGATION_STATE);

      if(navigationState) {
        console.log(`Gallery created with navigation state: \n${navigationState}.` )
        const { level, tagGroup, category, subcategory, tag } = JSON.parse(navigationState);
        this.level = level;
        this.selected.tagGroup = tagGroup;
        this.selected.category = category;
        this.selected.subcategory = subcategory;
        this.selected.tag = tag;
      }

      switch(this.level){
        case HierarchyLevels.TAG_GROUP:
          this.getTagGroups();
          break;
        case HierarchyLevels.CATEGORY:
          this.getTagGroupCategories(this.selected.tagGroup);
          break;
        case HierarchyLevels.SUBCATEGORY:
          this.getCategorySubTags(this.selected.category);
          break;
        case HierarchyLevels.TAG:
          this.getSubcategoryTags(this.selected.subcategory);
          break;
        default: 
          this.getTagGroups();
          break;
      }

      this.tagMap = getTagHierarchy();
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
        currentCardChoices: [],
        HIERARCHY_COLLECTION: 'DanbooruTags',
        NAVIGATION_STATE: 'galleryNavigationState',
        tagMap: []
      }
    },
    props: {

    },
    methods: {
      // Get the tag collection from firestore
      async getTagHierarchy() {
        const querySnapshot = await getDocs(collection(db, 'DanbooruTags'));
        querySnapshot.forEach((doc) => {
          this.tagMap.add({"tag": doc.id, "hierarchy":  doc.data()});
        })
      },
      selectTagGroup(tagGroup) {
        // console.log(`Clicked on ${tagGroup}.`)
        let tagGroupKey = this.titleToKey(tagGroup);
        this.selected.tagGroup = tagGroupKey;
        this.getTagGroupCategories(tagGroupKey);
        this.level = HierarchyLevels.CATEGORY;

        //save changes to session storage
      },
      selectCategory(category) {
        // console.log(`Clicked on ${category}.`)
        let categoryKey = this.titleToKey(category);
        this.level = HierarchyLevels.SUBCATEGORY;
        this.selected.category = categoryKey;
        this.getCategorySubTags(categoryKey);

        //save changes to session storage
      },
      selectSubcategory(subcategory) {
        let subKey = this.titleToKey(subcategory);
        this.level = HierarchyLevels.TAG;
        this.selected.subcategory = subKey;
        this.getSubcategoryTags(subKey);

        //save changes to session storage
      },
      selectTag(tag) {
        this.selected.tag = tag;

        // save changes to session storage
      },
      async getTagGroups() {
        const tagGroupSet = new Set();
        const querySnapshot = await getDocs(collection(db, 'DanbooruTags'));
        querySnapshot.forEach((doc) => {
          const tagGroup = doc.data()['tag group'];
          let titles = this.keyToTitle(tagGroup);
          tagGroupSet.add(titles);
        });
        const tagGroups = Array.from(tagGroupSet);
        this.currentCardChoices = tagGroups;
      
        //save changes to session storage
      },
      async getTagGroupCategories(tagGroup) {
        const categoriesSet = new Set();
        const q = query(collection(db, this.HIERARCHY_COLLECTION), where("tag group", "==", tagGroup));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const categoryName = doc.data().category;
          categoriesSet.add(this.keyToTitle(categoryName));
        });
        const categories = Array.from(categoriesSet);
        this.currentCardChoices = categories;
        

        //save changes to session storage
      },
      async getCategorySubTags(category) {
        // Show subcategories next to tags without subcategory
        const subcategoriesSet = new Set();
        const tagSet = new Set();
        const q = query(collection(db, this.HIERARCHY_COLLECTION) , where("tag group", "==", this.selected.tagGroup), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const subcategoryName = doc.data().subcategory;
          const tagName = doc.id;
          console.log(tagName);
          if (subcategoryName) {
            let subcategoryTitle = this.keyToTitle(subcategoryName);
            subcategoriesSet.add(subcategoryTitle);
          } else {
            tagSet.add(tagName);
          }
          //save changes to session storage
        });
        const subcategories = Array.from(subcategoriesSet);
          const tags = Array.from(tagSet);
          this.currentCardChoices = [...subcategories, ...tags]
      },
      async getSubcategoryTags(subcategory) {
        console.log(`Get Tags for ${subcategory} in l168.`)
        const tagSet = new Set();
        const q = query(collection(db, this.HIERARCHY_COLLECTION), where("tag group", "==", this.selected.tagGroup), where("category", "==", this.selected.category), where("subcategory", "==", subcategory));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const tag = doc.id;
          // console.log(`doc with tag: ${tagKey}`)
          tagSet.add(tag);
        });
        const tags = Array.from(tagSet);
        this.currentCardChoices = tags;
        //save changes to session storage
      },
      async getTagDetails(tag) {
        //save changes to session storage
      },
      navigateUp() {
        if (this.level > 0) {
          switch (this.level) {
            case HierarchyLevels.CATEGORY:
              this.selected.tagGroup = null;
              this.getTagGroups();
              break;
            case HierarchyLevels.SUBCATEGORY:
              this.selected.category = null;
              this.getTagGroupCategories(this.selected.tagGroup);
              break;
            case HierarchyLevels.TAG:
              this.getCategorySubTags(this.selected.category)
              this.selected.subcategory = null;
              
            
              break;
          }
          this.level--;
        }
      },
      titleToKey(title) {
        return title.toLowerCase(); //.replace(/[\s#]/g, '_').replace(/\s+/g, "");
      },
      keyToTitle(key) {
        let title = key.charAt(0).toUpperCase() + key.slice(1);
        return title;
      },
      saveNavigationState() {
        sessionStorage.setItem(this.NAVIGATION_STATE, JSON.stringify({
          level: this.level,
          selected: {
            tagGroup: this.selected.tagGroup,
            category: this.selected.category,
            subcategory: this.selected.subcategory,
            tag: this.selected.tag,
          }
        }))
      }
    },
    components: {
      Card
    }
  }
</script>

<style lang="scss" scoped>
.gallery-header {
  width: 100%;
  padding-left: 1rem;
  padding-top: 1vmin;
}

.metadata {
  background-color: black;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  padding: 0.5vmin;
  margin: 2px;
  display: flex;
  gap: 2vmin;

  .checkpoint-option {
    align-self: center;
    border-radius: 11px;
    padding: 0.5vmin;
    border: 1px solid white;
  }
  .prompt-option {
    align-self: center;
  }
}
  .list-scroll {
    margin-top: 0;
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


  .return, .copy-clipboard {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bs-dark);
    border-radius: 5px;
    margin: 2px;
    max-height: 38px;
    // padding: 4px;
     &:active {
      background-color: white;
      transform: scale(0.9)
     }
    
     img{
      width: 32px;
      height: 32px;
     }
  }

  .copy-clipboard{
    border: 2px solid black;
  }
</style>