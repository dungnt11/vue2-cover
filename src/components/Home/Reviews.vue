<template>
  <div class="review" ref="review">
    <h2>{{ title }}</h2>
    <div ref="content">
      <VuePerfectScrollbar class="content">
        <p v-for="(item, index) in reviews" :key="index">
          <span class="name" v-if="item.name"> {{ item.name }}: </span>
          {{ item.content }}
        </p>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.review {
  background: #fff;
  padding: 0 30px;

  h2 {
    font-weight: 600;
    font-size: 1.25rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .content {
    max-height: 100px;
    overflow: hidden;
    p {
      margin: 10px 0;
      word-break: break-all;
      font-size: 0.875rem;
      color: #5e5e5e;
      .name {
        color: #000;
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }
}
</style>
<script>
import API_CLIENT from "@/api";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "HomeReviews",
  components: {
    VuePerfectScrollbar,
  },
  data: () => ({
    title: "Nhận xét khách hàng",
    reviews: [{ name: null, content: null }],
  }),
  mounted() {
    API_CLIENT.get("/api/comment/lists")
      .then((response) => {
        if (response?.data?.success === 1) {
          this.reviews = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  watch: {
    reviews() {
      this.$nextTick(() => {
        const height = this.$refs.review.clientHeight;
        document.body.style.setProperty("--height-reviews", height + "px");
      });
    },
  },
};
</script>
