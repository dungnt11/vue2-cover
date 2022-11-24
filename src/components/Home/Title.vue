<template>
  <div class="title" ref="title">
    <h2>{{ title }}</h2>
    <div class="list-work">
      <a
        rel="noopener noreferrer"
        v-for="(item, index) in listsWork"
        :key="index"
        :href="item.url"
        :target="item.isOpenNewPage ? '_blank' : null"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            d="M10.765 13.8226L7.70487 16.8827C7.70487 16.8827 7.70487 16.8828 7.7048 16.8828C7.7048 16.8828 7.7048 16.8829 7.70473 16.8829C6.43929 18.1484 4.38014 18.1485 3.11455 16.8829C2.50145 16.2698 2.16389 15.4546 2.16389 14.5877C2.16389 13.7209 2.50145 12.9059 3.11434 12.2928C3.11441 12.2927 3.11448 12.2926 3.11455 12.2925L6.17465 9.23238C6.59711 8.80985 6.59711 8.12476 6.17457 7.7023C5.75211 7.27984 5.06703 7.27984 4.64449 7.7023L1.5844 10.7625C1.58418 10.7627 1.58396 10.763 1.58375 10.7632C0.562466 11.7848 0 13.1431 0 14.5877C0 16.0327 0.562682 17.3912 1.58447 18.413C2.63915 19.4676 4.02439 19.9949 5.40971 19.9949C6.79503 19.9949 8.18035 19.4676 9.23489 18.413V18.4129C9.23496 18.4129 9.23496 18.4128 9.23496 18.4128L12.2951 15.3526C12.7175 14.9302 12.7175 14.2451 12.295 13.8226C11.8726 13.4001 11.1876 13.4001 10.765 13.8226Z"
            fill="#666666"
          />
          <path
            d="M20 5.40713C20 3.96216 19.4372 2.60367 18.4155 1.58188C16.3062 -0.52733 12.8742 -0.527258 10.765 1.58188C10.765 1.58203 10.7648 1.5821 10.7648 1.58224L7.70473 4.64219C7.2822 5.06466 7.2822 5.74981 7.70473 6.17228C7.91607 6.38362 8.19291 6.48921 8.46981 6.48921C8.74664 6.48921 9.02362 6.38354 9.23482 6.17228L12.2948 3.11233C12.2949 3.11218 12.2951 3.11211 12.2952 3.11197C13.5606 1.84652 15.6198 1.84645 16.8854 3.11197C17.4984 3.72507 17.8361 4.5402 17.8361 5.40713C17.8361 6.27398 17.4986 7.08897 16.8856 7.70207C16.8855 7.70214 16.8855 7.70222 16.8854 7.70229L13.8253 10.7625C13.4028 11.1849 13.4028 11.87 13.8254 12.2925C14.0366 12.5038 14.3135 12.6095 14.5904 12.6095C14.8673 12.6095 15.1442 12.5038 15.3554 12.2925L18.4155 9.23237C18.4157 9.23215 18.416 9.23187 18.4162 9.23165C19.4375 8.21001 20 6.85174 20 5.40713Z"
            fill="#666666"
          />
          <path
            d="M6.1748 13.8226C6.38606 14.0338 6.66297 14.1395 6.9398 14.1395C7.21671 14.1395 7.49361 14.0338 7.70488 13.8226L13.8252 7.70222C14.2477 7.27975 14.2477 6.59467 13.8252 6.17213C13.4028 5.74967 12.7177 5.74967 12.2951 6.17213L6.1748 12.2924C5.75226 12.715 5.75226 13.4001 6.1748 13.8226Z"
            fill="#666666"
          />
        </svg>
        <span class="link-name">{{ item.name }}</span>
        <span v-if="item.isNewPage" class="new">Mới</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  background: #fff;
  padding: 0 30px;
  overflow: hidden;

  h2 {
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 6px;
  }
  .list-work {
    a {
      display: flex;
      align-items: center;
      color: #666666;
      text-decoration: none;
      line-height: 2.5rem;
      &:hover {
        color: #2196f3;
        text-decoration: underline;
        .icon path {
          fill: #2196f3;
        }
      }

      .icon {
        margin-right: 5px;
      }

      .new {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.68rem;
        background-color: #50ABFF;
        color: #fff;
        border-radius: 8px;
        height: 1.1rem;
        width: 1.9rem;
        margin-left: 6px;
      }
    }
  }

  @keyframes blinker {
    25% {
      color: rgb(15, 15, 228);
    }
    50% {
      color: rgb(231, 6, 6);
      opacity: 0.7;
    }
    75% {
      color: rgb(243, 243, 13);
      opacity: 0.7;
    }
  }

  @keyframes blinker-icon {
    25% {
      fill: rgb(15, 15, 228);
    }
    50% {
      fill: rgb(231, 6, 6);
      opacity: 0.7;
    }

    70% {
      fill: rgb(243, 243, 13);
    }
  }

  @keyframes move-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
}
</style>
<script>
import API_CLIENT from "@/api";

export default {
  name: "HomeTitle",
  data: () => ({
    title: "Việc làm thêm tại nhà",
    listsWork: [{ name: "", url: "", isOpenNewPage: 0, isNewPage: 0 }],
  }),

  created() {
    API_CLIENT.get("/api/link/lists")
      .then((response) => {
        if (response?.data?.success === 1) {
          this.listsWork = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  mounted() {},

  watch: {
    listsWork() {
      this.$nextTick(() => {
        const height = this.$refs.title.clientHeight;
        document.body.style.setProperty("--height-title", height + "px");
      });
    },
  },
};
</script>
