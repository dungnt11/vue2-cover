<template>
  <div>
    <div>
      <div class="input-wrapper">
        <el-checkbox v-model="config.auto">Auto Chat</el-checkbox>
      </div>
      <div class="input-wrapper" style="margin-top: 10px">
        <label class="color-label">Thời gian: </label>
        <el-input-number
          v-model="config.time"
          :step="0.1"
          :max="10"
          size="small"
        ></el-input-number>
        <span class="color-label">giây</span>
        <div class="input-wrapper">
          <el-button type="primary" @click="updateConfig">Cập nhật</el-button>
        </div>
      </div>
    </div>

    <el-row :gutter="20" class="tables-wrapper">
      <el-col :span="24" :md="8">
        <h2>Người dùng</h2>
        <div class="table-header">
          <el-input placeholder="Nhập tên người dùng" v-model="user"></el-input>
          <el-button type="primary" @click="addUser" :disabled="!user"
            >Thêm</el-button
          >
        </div>
        <el-table
          :data="tableDataUser"
          stripe
          style="width: 100%"
          max-height="500px"
          emptyText="Không có dữ liệu"
        >
          <el-table-column prop="name" label="Tên"> </el-table-column>
          <el-table-column label="Hành động" width="100px">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="Xóa"
                placement="top"
              >
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Bạn có muốn xóa người dùng này này?"
                  @confirm="deleteUser(scope.row._id)"
                >
                  <i class="el-icon-delete" slot="reference"></i>
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" :md="16">
        <h2>Chat</h2>
        <div class="table-header">
          <el-input placeholder="Nhập nội dung chat" v-model="chat"></el-input>
          <el-button type="primary" @click="addChat" :disabled="!chat"
            >Thêm</el-button
          >
        </div>
        <el-table
          :data="tableDataChat"
          stripe
          style="width: 100%"
          max-height="500px"
          emptyText="Không có dữ liệu"
        >
          <el-table-column prop="content" label="Tên"> </el-table-column>
          <el-table-column label="Hành động" width="100px">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="Xóa"
                placement="top"
              >
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Bạn có muốn xóa nội dung này?"
                  @confirm="deleteChat(scope.row._id)"
                >
                  <i class="el-icon-delete" slot="reference"></i>
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from "../api";
export default {
  data() {
    return {
      config: {},
      tableDataUser: [],
      tableDataChat: [],
      user: "",
      chat: "",
    };
  },

  methods: {
    updateConfig() {
      // const data = {
      //   auto: this.auto,
      //   time: this.time,
      // };
      Api.setChatConfig(this.config).then((res) => {
        if (res.success == 1) {
          return this.$notify({
            title: "Thành công!",
            message: "Đã cập nhật cấu hình chat",
            type: "success",
          });
        }
      });
    },
    addUser() {
      const data = { name: this.user };
      Api.createFakeUser(data).then((res) => {
        this.user = "";
        this.tableDataUser.splice(0, 0, {
          _id: res.data._id,
          name: data.name,
        });
      });
    },
    addChat() {
      const data = { content: this.chat };
      Api.createChat(data).then((res) => {
        this.tableDataChat.splice(0, 0, {
          _id: res.data._id,
          content: data.content,
        });
        this.chat = "";
        return this.$notify({
          title: "Thành công!",
          message: "Đã Thêm mới người dùng",
          type: "success",
        });
      });
    },

    deleteUser(id) {
      Api.deleteFakeUser(id).then(() => {
        this.tableDataUser = this.tableDataUser.filter(
          (item) => item._id != id
        );

        return this.$notify({
          title: "Thành công!",
          message: "Đã xóa người dùng",
          type: "success",
        });
      });
    },

    deleteChat(id) {
      Api.deleteChat(id).then(() => {
        this.tableDataChat = this.tableDataChat.filter(
          (item) => item._id != id
        );
        return this.$notify({
          title: "Thành công!",
          message: "Đã xóa nội dung chat.",
          type: "success",
        });
      });
    },
  },

  created() {
    Api.getFakeUsersList().then((res) => {
      this.tableDataUser = res.data;
    });

    Api.getChatList().then((res) => {
      this.tableDataChat = res.data;
    });

    Api.getChatConfig().then((res) => {
      this.config = res.data;
     
    });
  },
};
</script>

<style lang="scss" scoped>
.color-label {
  color: #606266;
}
span.color-label {
  display: inline-block;
  margin-left: 8px;
}
.input-wrapper {
  margin-top: 12px;
}

.table-header {
  display: flex;

  button {
    margin-left: 10px;
  }
}

.tables-wrapper {
  margin-top: 20px;
}
</style>