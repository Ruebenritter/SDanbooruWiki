<template id="illustration-card" >
  <div class="card bg-dark" ref="card">
    <div class="content-loading" v-if="loading">
      <img class="image-loading" src="/gifs/dancing_dog.gif" alt="Loading...">
    </div>
    <div class="content-error" v-else-if="error">
      <!--Show error message!-->
      <img class="error-image" src="/cover_images/error_thisisfine.png" alt="Error!">
      <h3 class="error-message">This image is fine. I promise!</h3>
      <h2 class="illustration-tag">{{docSnapshot.id}}</h2>
    </div>
    <div class="content-illustration" v-else>
      <!--Display the correct illustration-->
      <img class="illustration-image" v-bind:src="imageUrl" alt="Illustration">
      <h1 class="illustration-tag" :style="{ fontSize: tagFontSize }">{{ docSnapshot.id }}</h1>
    </div>
  </div>
</template>
<!--Illustrated cards are cards for tag elements. They grab the fitting illustration from the firestore cloud document related to the tag.-->>
<script>
  import {
    getDocs,
    query,
    // where,
    collection
  } from '@firebase/firestore';
  import {
    storage
  } from '../firebase/firebaseInit.js'
  import {
    toRaw
  } from 'vue'
  import {
    ref as storageRef,
    getDownloadURL
  } from "firebase/storage"


  export default {
    name: 'IllustratedCard',
    props: {
      docSnapshot: {
        type: Object,
        required: true,
        validator: (value) => {
          // validate if needed
          return true;
        }
      },
      index: {
        type: Number,
        required: false,
      }
    },
    data() {
      return {
        loading: true,
        error: false,
        imageUrl: null,
      }
    },
    mounted() {
      this.loading = true;

      this.$nextTick(() => {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadImage();
              this.intersectionObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.5,
        }
      );
      this.intersectionObserver.observe(this.$refs.card);
    });
    },
    methods: {
      async loadImage() {
        try {
          let docSnapshotRaw = toRaw(this.docSnapshot);
          const illustrationColRef = collection(docSnapshotRaw.ref, "tag_illustrations");
          const illustrationQuery = query(illustrationColRef);
          // where(prompt == filter option prompt)
          // where(checkpoint == gallery option checkpoint)
          const querySnapshot = await getDocs(illustrationQuery);
          // For now take the first element
          const illustrationDoc = querySnapshot.docs[0];
          if (!illustrationDoc) {
            throw new Error("No illustration found!");
          }
          const imagePath = illustrationDoc.data()['png_cloud_storage'];

          getDownloadURL(storageRef(storage, imagePath)).then((url) => {
            console.log(url);
            this.imageUrl = url;
            this.loading = false;
          }).catch((error) => { throw new Error(error)})

        } catch (e) {
          console.log(e);
          this.error = true;
          this.loading = false;
        }
      }
    },
    computed: {
      tagFontSize() {
        let tagLength = this.docSnapshot.id.length;
        if( tagLength > 12)
          return '1.8rem';
        if ( tagLength > 10)
          return '2rem';
        if ( tagLength > 8)
          return '2.4rem';
        return '2.6rem';
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    border: 1vm solid var(--bs-orange);
    border-radius: 11px;
    aspect-ratio: 0.6;
    width: clamp(10vmin, 30vw, 24vmin);
    position: relative;
    overflow: hidden;
    margin: 1vmin;
    z-index: 3;
  }

  .content-loading {
    width: 100%;
    height: 100%;

    .image-loading {
      background-color: var(--primary-900);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content-error {
    width: 100%;
    height: 100%;

    .error-image {
      height: 100%;
      height: 100%;
      object-fit: cover;
    }

    .error-message {
      position: absolute;
      left: 10%;
      top: 5%;
      color: white;
      font-family: Arial, Helvetica, sans-serif;

    }

    .illustration-tag {
      position: absolute;
      bottom: 5%;
      left: 10%;
      font-style: italic;
      color: red;
    }
  }

  .content-illustration {
    height: 100%;
    width: 100%;
    .illustration-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
  }

  .illustration-tag {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    margin: 1vmin;
    bottom: 0;
    left: 0;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 25;
    width: 80%;
  }

 
  }
</style>