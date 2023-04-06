<template>
  <div class="card m-2 overflow-hidden" :style="{ backgroundImage: cardIllustration }"
    @click="$emit('cardClicked', this.title)">
    <div class="card-content rounded">
      <h3 class="card-title">{{ title }}</h3>
      <h4 class="card-subtitle">
        Preview card content here!
      </h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardItem',
    created() {
      this.getBackgroundImage();
    },
    data() {
      return {
        cardIllustration: `url('/meinahentaiExample.png')`
      }
    },
    props: {
      title: String,
    },
    methods: {
      async getBackgroundImage() {
        const title = this.title.toLowerCase().replace(/[\s#]/g, '_').replace(/\s+/g, "");
        const imagePath = `/TagGroupIllustrations/${title}_illustration.png`;
        let fileExists = await this.fileExists(imagePath);
        // console.log(fileExists);
        if (fileExists) {
          this.cardIllustration = `url(${imagePath})`
        }
      },
      async fileExists(url) {
        try {
          const response = await fetch(url);
          return response.ok;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    border: 1vm solid var(--bs-orange);
    aspect-ratio: 0.6;
    width: clamp(10vmin, 30vw, 24vmin);
    position: relative;
    background-size: cover;
    z-index: 3;
  }

  .card::before {
    background: linear-gradient(130deg,
        transparent 0% 40%,
        transparent 66%,
        transparent 83%,
        var(--primary-900) 100%);
    background-position: 0% 0%;
    background-size: 300% 300%;
    content: '';
    height: 100%;
    left: 0px;
    position: absolute;
    transition: background-position 350ms ease, transform 350ms ease;
    top: 0px;
    width: 100%;
    z-index: 3;
  }

  .card:hover:before {
    background-position: 100% 100%;
    transform: scale(1.08, 1.03);
  }

  .card:hover>.card-content>.card-title {
    top: 5%;

  }

  .card:hover>.card-content>.card-subtitle {
    top: 5%;
  }

  .card-content {
    height: 100%;
    width: 100%;
    padding: 1vmin;
    z-index: 4;
  }

  .card-title,
  .card-subtitle {
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin: 0px;
    top: 87%;
    left: 5%;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    transition: top 300ms ease, color 300ms ease;
  }

  .card-title {
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