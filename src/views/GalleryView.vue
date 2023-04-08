<template>
  <div class="row gallery-header">
    <div class="return col-1" @click="navigateUp">
      <img src="/icons8-doppelt-links-32.png">
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
        level === HierarchyLevels.SUBCATEGORY ? selectSubcategory(title) : selectTag(title)" :illustration="null">
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
      // Load collections from session storage if possible
      const storedTagMap = sessionStorage.getItem(this.STORED_TAG_MAP);
      const storedImgMap = sessionStorage.getItem(this.STORED_IMG_MAP);
      const storedTimestamp = sessionStorage.getItem(this.STORED_DATA_TIMESTAMP);

      if ((storedTimestamp && Date.now() - storedTimestamp < 86400000) && storedTagMap && storedImgMap) {
        this.tagMap = JSON.parse(storedTagMap);
        this.imgMap = JSON.parse(storedImgMap);
      } else {

        // Get the tag collection from firestore
        const querySnapshot = await getDocs(collection(db, this.HIERARCHY_COLLECTION));
        querySnapshot.forEach((doc) => {
          this.tagMap.push({
            "tag": doc.id,
            "hierarchy": doc.data()
          });
        });

        // Get image link collection form firestore
        const illustrationData = await getDocs(collection(db, this.IMG_LINK_COLLECTION));
        illustrationData.forEach((doc) => {
          this.imgMap.push({
            "uid": doc.id,
            "metadata": doc.data(),
          });
        });

        // Save the current collections in session storage for ease of access
        sessionStorage.setItem(this.STORED_DATA_TIMESTAMP, Date.now());
        sessionStorage.setItem(this.STORED_TAG_MAP, JSON.stringify(this.tagMap));
        sessionStorage.setItem(this.STORED_IMG_MAP, JSON.stringify(this.imgMap));
      }



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
        currentCardChoices: [],

        // Firestore collection names
        HIERARCHY_COLLECTION: 'DanbooruTags', // contains all tags that can be viewed in sdanbooru wiki
        IMG_LINK_COLLECTION: 'TagIllustrations', // contains all img links for tags in the tag map
        //  session storage for firestore collections
        STORED_TAG_MAP: 'STORED_TAG_MAP',
        STORED_IMG_MAP: 'STORED_IMG_MAP',
        STORED_DATA_TIMESTAMP: 'STORED_DATA_TIMESTAMP',

        NAVIGATION_STATE: 'GALLERY_NAVIGATION_STATE',

        // gallery content maps
        tagMap: [],
        imgMap: [],

        // Gallery filter options
        selectedCheckpoint: "",
        selectedPrompt: "",

        availableCheckpoints: [],
        availablePrompts: [],
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
        const tagGroupSet = new Set();
        this.tagMap.forEach((doc) => {
          tagGroupSet.add(this.keyToTitle(doc.hierarchy["tag group"]));
        });
        const tagGroups = Array.from(tagGroupSet);
        this.currentCardChoices = tagGroups;

        //save changes to session storage
      },

      getTagGroupCategories(tagGroup) {
        const categorySet = new Set();
        this.tagMap.forEach((doc) => {
          if (doc.hierarchy["tag group"] == tagGroup) {
            categorySet.add(this.keyToTitle(doc.hierarchy.category));
          }
          const categories = Array.from(categorySet);
          this.currentCardChoices = categories;
        })
        // this.currentCardChoices = categories;


      },
      getCategorySubTags(category) {
        const subcategorySet = new Set();
        const tagSet = new Set();
        this.tagMap.forEach((doc) => {
          if (doc.hierarchy.category == category) {
            let subcategory = doc.hierarchy.subcategory;
            if (subcategory) {
              subcategorySet.add(this.keyToTitle(subcategory));
            } else {
              tagSet.add(doc.tag);
            }
          }
        });
        const subcategories = Array.from(subcategorySet);
        const tags = Array.from(tagSet);
        this.currentCardChoices = [...subcategories, ...tags]
      },
      getSubcategoryTags(subcategory) {
        const tagSet = new Set();
        this.tagMap.forEach((doc) => {
          if (doc.hierarchy.subcategory == subcategory) {
            tagSet.add(doc.tag)
          }
        });
        const tags = Array.from(tagSet);
        this.currentCardChoices = tags;

      },
      getTagDetails(tag) {
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
          this.saveNavigationState();
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


  .return,
  .copy-clipboard {
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

  .copy-clipboard {
    border: 2px solid black;
  }
</style>