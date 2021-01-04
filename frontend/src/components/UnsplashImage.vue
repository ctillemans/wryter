<template>
  <div class="unsplash-image-container">
    <picture>
      <source media="(max-width: 400px)" v-bind:srcset="imageUrls.small">
      <source media="(max-width: 1080px)" v-bind:srcset="imageUrls.regular">
      <img v-bind:src="imageUrls.full" />
    </picture>

    <a class="image-credit"
      target="_blank"
      v-bind:href="imageCredit.url"
    >
      <svg
        class="bi bi-image-fill"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M.002 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-12a2 2 0 01-2-2V3zm1
            9l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71a.5.5 0 01.577-.094L15.002
            9.5V13a1 1 0 01-1 1h-12a1 1 0 01-1-1v-1zm5-6.5a1.5 1.5 0 11-3 0 1.5 1.5 0
            013 0z"
            clip-rule="evenodd"
        />
      </svg>
    </a>
     <div class="loader loading-img" v-if="loading"></div>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'UnsplashImage',
  props: {
    msg: String,
  },
  data() {
    return {
      imageUrls: {
        full: '',
        regular: '',
        small: '',
      },
      loading: false,
      imageCredit: {
        username: '',
        url: '',
      },
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true;
      const self = this;
      axios.get(`${process.env.VUE_APP_API_ROOT}/unsplash`)
        .then((response) => {
          self.loading = false;
          self.imageUrls = {
            full: response.data.urls.full,
            regular: response.data.urls.regular,
            small: response.data.urls.small,
          };
          self.imageCredit = {
            username: response.data.user.username,
            url: response.data.user.links.html,
          };
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.unsplash-image-container {
  position: relative;
  height: 100vh;
  overflow: visible;

  picture {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
  }
}

.image-credit {
  position: absolute;
  top: 90px;
  right: 30px;
  height: 30px;
  width: 30px;
  background: rgba(255,255,255,.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}

.loader {
  position: absolute;
  top: 25%;
  left: 50%;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #000000; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
