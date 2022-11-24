<template>
  <div class="a">
    <span> THIS IS HOME</span>
      <router-link to="/">List Team</router-link>
  </div>
</template>
<style lang="scss" scoped>
.a {
  color: #2196f3;
  span {
    color: #000;
  }
}
</style>
<script>
import HomeApi from "@/api/modules/HomeApi";

export default {
  name: "Home",
  components: {},
  computed: {},
  data: () => ({}),
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {}, //when keep-alive
  deactivated() {}, //when keep-alive
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // getDatList(){
    //   HomeApi.getDatList()
    // }
  },
};
</script>
