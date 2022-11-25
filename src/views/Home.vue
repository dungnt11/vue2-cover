<template>
  <div class="home-container">
    <Header />
    <HomeTitle />
    <HomeReviews />
    <HomeChat />
  </div>
</template>
<style lang="scss" scoped>
.home-container {
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  @media (min-width: 600px) {
    border-left: 1px solid #d7dae2;
    border-right: 1px solid #d7dae2;
  }
}
</style>
<script>
import Header from "../components/Header.vue";
import HomeTitle from "../components/Home/Title.vue";
import HomeReviews from "../components/Home/Reviews.vue";
import HomeChat from "../components/Home/Chat.vue";
export default {
  name: "HomeApp",
  components: {
    Header,
    HomeTitle,
    HomeReviews,
    HomeChat,
  },

  mounted() {
    const width = document.querySelector(".home-container").clientWidth;
    document.body.style.setProperty("--width-container", width + "px");
    const height = window.innerHeight / 100;
    document.body.style.setProperty("--height", height + "px");
    window.addEventListener("resize", () => {
      const width = document.querySelector(".home-container").clientWidth;
      document.body.style.setProperty("--width-container", width + "px");
    });
  },
};
</script>
