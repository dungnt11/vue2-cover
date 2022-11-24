<template>
  <div class="container">
    <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="users-list">
          <i class="el-icon-user"></i>
          <span>Danh sách người dùng</span>
        </el-menu-item>
        <el-menu-item index="links-list">
          <i class="el-icon-link"></i>
          <span>Liên kết</span>
        </el-menu-item>

        <el-menu-item index="comments">
          <i class="el-icon-s-comment"></i>
          <span>Bình luận</span>
        </el-menu-item>

         <el-menu-item index="chat">
          <i class="el-icon-chat-round"></i>
          <span>Chat</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="main">
      <header>
        <div class="profile"> 
          <el-dropdown :hide-on-click="false" @command="handleCommand" >
            <span class="el-dropdown-link">
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout"
                ><i class="el-icon-switch-button"></i>Đăng
                xuất</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <!-- <footer></footer> -->
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: { Header },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;

        default:
      }
    },

    logout() {
      localStorage.removeItem("adminToken");
      this.$router.push({ name: "admin-login" });
    },
  },
};
</script>

<style lang="scss" scoped>
$sidebar-width: 300px;
.container {
  display: flex;
  .main {
    flex-grow: 1;
    header {
      position: fixed;
      background: rgb(225, 223, 223);
      height: 50px;
      width: calc(100% - $sidebar-width);
      box-sizing: border-box;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .profile{
        margin-left: auto;
      }
    }
    main {
      margin: 50px 0;
      padding: 20px;
    }
    footer {
      position: fixed;
      background: rgb(225, 223, 223);
      height: 50px;
      width: calc(100% - $sidebar-width);
      right: 0;
      bottom: 0;
    }
  }
}
.menu {
  width: $sidebar-width;
  height: 100vh;
  background: #0e0e0e;
}
</style>
