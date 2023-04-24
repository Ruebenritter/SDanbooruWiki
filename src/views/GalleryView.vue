<template>
  <div class="row gallery-header">
    <div class="return col-1" @click="navigateUp">
      <img src="/icons8-doppelt-links-32.png">
    </div>
    <div class="metadata col">
      <div class="prompt-option">
        {{currentPrompt}}
      </div>
    </div>
  </div>
  <div class="list-scroll">
    <ul class="card-list">
      <!--create a row for each tag group/category/subclass depending on tree level-->
      <li class="card-item selectables" v-for="title in currentNavCardChoices" :key="title">
        <!--create a card depending on tree level content/children-->
        <Card :title="title" @cardClicked="level === HierarchyLevels.TAG_GROUP ? selectTagGroup(title) : 
        level === HierarchyLevels.CATEGORY ? selectCategory(title) : 
        level === HierarchyLevels.SUBCATEGORY ? selectSubcategory(title) : selectTag(title)" :illustration="null">
        </Card>
      </li>

        <li class="card-item tags" v-for="(doc, index) in currentTagCardChoices" :key="index">
          <!--create a card depending on tree level content/children-->
          <component :is="illustrationCardComponent" :docSnapshot="doc"></component>
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
  } from 'firebase/firestore'

  export default {
    name: 'GalleryView',
    created() {

      const navigationState = sessionStorage.getItem(this.NAVIGATION_STATE);
      console.log(`Current session storage contains ${navigationState}.`);
      if (navigationState) {
        console.log(`Gallery created with navigation state: \n${navigationState}.`)
        const {
          level,
          selectedTagGroup,
          selectedCategory,
          selectedSubcategory,
          selectedTag
        } = JSON.parse(navigationState);
        this.level = level;
        this.selected.tagGroup = selectedTagGroup;
        this.selected.category = selectedCategory;
        this.selected.subcategory = selectedSubcategory;
        this.selected.tag = selectedTag;
      } else {
        // Set navigation state with level 0 and no selections
        console.log(`Set new navigation state in session storage!`);
        this.saveNavigationState();
      }
    },
    async mounted() {

      // Set Gallery Components with appropriate content

      switch (this.level) {
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
    },
    data() {
      return {
        // navigation state
        level: HierarchyLevels.TAG_GROUP, // default: tag groups then: category > subcategory > tag  
        selected: {
          tagGroup: "",
          category: "",
          subcategory: "",
          tag: "",
        },

        currentNavCardChoices: [],
        currentTagCardChoices: [],
        currentPrompt: "example, prompt, masterpiece, best quality",

        // Firestore collection names: collections are nested inside each other
        FIRESTORE_TAG_GROUPS: 'tag_groups',
        FIRESTORE_CATEGORIES: 'categories',
        FIRESTORE_SUBCATEGORIES: 'subcategories',
        FIRESTORE_TAGS: 'tags',
        FIRESTORE_TAG_ILLUSTRATION_DATA: 'illustrations',
        //  session storage for firestore collections
        SESSION_STORAGE_TAG_GROUPS: 'storedTagGroups',
        SESSION_STORAGE_CATEGORIES: 'storedCategories',
        SESSION_STORAGE_SUBCATEGORIES: 'storedSubcategories',
        SESSION_STORAGE_TAGS: 'storedTags',

        NAVIGATION_STATE: 'GALLERY_NAVIGATION_STATE',

        // Gallery filter options
        selectedCheckpoint: "",
        selectedPrompt: "",

        availableCheckpoints: [],
        availablePrompts: [],

        illustrationCardComponent: null,
      }
    },
    props: {

    },
    methods: {

      selectTagGroup(tagGroup) {
        // Update gallery state
        let tagGroupKey = this.titleToKey(tagGroup);
        this.selected.tagGroup = tagGroupKey;
        this.getTagGroupCategories(tagGroupKey);
        this.level = HierarchyLevels.CATEGORY;
        // Save state to session storage
        this.saveNavigationState();
      },
      selectCategory(category) {
        // Update gallery state
        let categoryKey = this.titleToKey(category);
        this.level = HierarchyLevels.SUBCATEGORY;
        this.selected.category = categoryKey;
        this.getCategorySubTags(categoryKey);
        //save changes to session storage
        // this.updateNavigationState("selectedCategory", categoryKey);
        this.saveNavigationState();
      },
      selectSubcategory(subcategory) {
        let subKey = this.titleToKey(subcategory);
        this.level = HierarchyLevels.TAG;
        this.selected.subcategory = subKey;
        this.getSubcategoryTags(subKey);
        //save changes to session storage
        this.saveNavigationState();
      },
      selectTag(tag) {
        this.selected.tag = tag;
        // save changes to session storage
        this.saveNavigationState();
      },
      // GETTERS

      async getTagGroups() {
        // Check session storage first
        const storedTagGroups = sessionStorage.getItem(this.SESSION_STORAGE_TAG_GROUPS);
        if (storedTagGroups && JSON.parse(storedTagGroups).length > 0) {
          console.log("Took tag groups from session storage!");

          const tagGroups = JSON.parse(storedTagGroups);

          this.currentNavCardChoices = tagGroups;
        } else {
          console.log("Requested tag groups from firestore!");
          const tagGroups = [];
          const q = collection(db, this.FIRESTORE_TAG_GROUPS);
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            tagGroups.push(this.keyToTitle(doc.id));
          })
          sessionStorage.setItem(this.SESSION_STORAGE_TAG_GROUPS, JSON.stringify(tagGroups));
          this.currentNavCardChoices = tagGroups;
        }
      },
      // Load categories of selected tag group from session storage or cloud firestore
      async getTagGroupCategories(tagGroup) {
        const storedCategories = sessionStorage.getItem(this.SESSION_STORAGE_CATEGORIES);
        if (storedCategories && JSON.parse(storedCategories).length > 0) {
          console.log("Taking categories from session storage!");

          const categories = JSON.parse(storedCategories);
          this.currentNavCardChoices = categories;
        } else {
          console.log("Requesting categories from cloud firestore!");
          const categories = [];
          const q = collection(db, this.FIRESTORE_TAG_GROUPS, this.titleToKey(tagGroup), this.FIRESTORE_CATEGORIES);
          console.log(q);
          try {
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              categories.push(doc.id);
            });
            sessionStorage.setItem(this.SESSION_STORAGE_CATEGORIES, JSON.stringify(categories));
            this.currentNavCardChoices = categories;
          } catch (e) {
            console.log("Error getting collection: ", e);
          }

        }
      },

      // Load subcategories of selected category from session storage or cloud firestore
      async getCategorySubTags(category) {

        // Dynamic import of illustrated Card Component
        try{
        const { default: IllustratedCard } = await import('../components/IllustratedCard.vue');
        this.illustrationCardComponent = IllustratedCard;
        console.log('Card component loaded succesfully:', IllustratedCard);
        }catch(error){
          console.error('Failed to import Card component:', error)
        }
        

        const storedSubcategories = sessionStorage.getItem(this.SESSION_STORAGE_SUBCATEGORIES);
        if (storedSubcategories && JSON.parse(storedSubcategories).length > 0) {
          console.log("Taking subcategories and tags from session storage!");

          const subcategories = JSON.parse(storedSubcategories);
          this.currentNavCardChoices = subcategories;
        } else {
          console.log("Taking subcategories and tags from cloud firestore!")
          const subcategories = [];
          const tagsIllustrationInfo = []
          const subquery = collection(db, this.FIRESTORE_TAG_GROUPS, this.selected.tagGroup, this
            .FIRESTORE_CATEGORIES, category, this.FIRESTORE_SUBCATEGORIES);
          const tagquery = collection(db, this.FIRESTORE_TAG_GROUPS, this.selected.tagGroup, this
            .FIRESTORE_CATEGORIES, category, this.FIRESTORE_TAGS);

          const subquerySnapshot = await getDocs(subquery);
          const tagquerySnapshot = await getDocs(tagquery);

          subquerySnapshot.forEach((doc) => {
            subcategories.push(doc.id);
          })
          // Store tags separately as they will contain metadata and illustration relevant to display
          tagquerySnapshot.forEach((doc) => {
            tagsIllustrationInfo.push(doc);
          })
          this.currentNavCardChoices = subcategories;
          this.currentTagCardChoices = tagsIllustrationInfo;
          sessionStorage.setItem(this.SESSION_STORAGE_SUBCATEGORIES, JSON.stringify(subcategories));
          sessionStorage.setItem(this.SESSION_STORAGE_TAGS, JSON.stringify(tagsIllustrationInfo));
        }

      },
      async getSubcategoryTags(subcategory) {
        try{
        const { default: IllustratedCard } = await import('../components/IllustratedCard.vue');
        this.illustrationCardComponent = IllustratedCard;
        console.log('Card component loaded succesfully:', IllustratedCard);
        }catch(error){
          console.error('Failed to import Card component:', error)
        }

        const tagsIllustrationInfo = []
        const tagquery = collection(db, this.FIRESTORE_TAG_GROUPS, this.selected.tagGroup, this
            .FIRESTORE_CATEGORIES, this.selected.category, this.FIRESTORE_SUBCATEGORIES, subcategory, this.FIRESTORE_TAGS);
        const tagquerySnapshot = await getDocs(tagquery);

        tagquerySnapshot.forEach((doc) => {
          tagsIllustrationInfo.push(doc);
        });
        this.currentNavCardChoices = [];
        this.currentTagCardChoices = tagsIllustrationInfo;

      },
      getTagDetails(tag) {
        //save changes to session storage
      },
      navigateUp() {
        if (this.level > 0) {
          switch (this.level) {
            case HierarchyLevels.CATEGORY:
              console.log("Navigating up from categories!");
              this.selected.tagGroup = null;
              sessionStorage.setItem(this.SESSION_STORAGE_CATEGORIES, []);
              this.getTagGroups();
              break;
            case HierarchyLevels.SUBCATEGORY:
              console.log("Navigating up from subcategories!");
              this.selected.category = null;
              this.currentTagCardChoices = null;
              this.currentNavCardChoices = null;
              sessionStorage.setItem(this.SESSION_STORAGE_SUBCATEGORIES, []);
              sessionStorage.setItem(this.SESSION_STORAGE_TAGS, []);

              this.getTagGroupCategories(this.selected.tagGroup);
              break;
            case HierarchyLevels.TAG:
              console.log("Navigating up from tags!");
              sessionStorage.setItem(this.SESSION_STORAGE_TAGS, []);
              this.selected.subcategory = null;
              this.currentNavCardChoices = null;
              this.currentTagCardChoices = null;
              this.getCategorySubTags(this.selected.category);
              break;
          }
          this.level--;
          this.saveNavigationState();
        }
      },
      titleToKey(title) {
        return title.toLowerCase().replace(" ", "_"); //.replace(/[\s#]/g, '_').replace(/\s+/g, "");
      },
      keyToTitle(key) {
        let title = key.charAt(0).toUpperCase() + key.slice(1);
        title = title.replace('_', ' ');
        return title;
      },
      saveNavigationState() {
        sessionStorage.setItem(this.NAVIGATION_STATE, JSON.stringify({
          level: this.level,
          selectedTagGroup: this.selected.tagGroup,
          selectedCategory: this.selected.category,
          selectedSubcategory: this.selected.subcategory,
          selectedTag: this.selected.tag,
        }))
      },
      updateNavigationState(key, newValue) {
        // Pull 
        const currentNavState = sessionStorage.getItem(this.NAVIGATION_STATE);
        if (currentNavState) {
          const parsedNavState = JSON.parse(currentNavState);
          // Update
          parsedNavState[key] = newValue;
          // Push
          sessionStorage.setItem(this.NAVIGATION_STATE, JSON.stringify(parsedNavState));
        }
      }
    },
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
    color: var(--primary-900);
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
    padding: 0.5vmin;
    margin: 2px;
    display: flex;
    gap: 2vmin;
    min-height: 30px;

    .prompt-option {
      align-self: center;
      padding: 0.1vmin;
    }
  }

  .list-scroll {
    margin-top: 0;
    width: 100%;
    height: 90vh;
    overflow-y: scroll;
    padding-bottom: 5vmin;
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


  .return {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-900);
    border-radius: 5px;
    margin: 2px;
    max-height: 38px;

    // padding: 4px;
    &:active {
      background-color: white;
      transform: scale(0.9)
    }

    img {
      width: 32px;
      height: 32px;
    }
  }
</style>