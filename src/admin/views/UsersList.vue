<template>
  <el-table :data="tableData" stripe style="width: 100%" emptyText="Không có dữ liệu">
    <el-table-column prop="username" label="Tên đăng nhập"> </el-table-column>
    <el-table-column prop="zalo" label="Số Zalo"> </el-table-column>
    <el-table-column prop="birthday" label="Ngày sinh">
      <template slot-scope="scope">{{
        moment(new Date(scope.row.birthday)).format("DD-MM-YYYY")
      }}</template>
    </el-table-column>
    <el-table-column prop="isAccess" label="Trạng thái">
      <template slot-scope="scope">
        <el-tag
          v-if="scope.row.isAccess"
          type="success"
        >
          Kích hoạt
        </el-tag>
        <el-tag
          v-else
          type="danger"
          class="pointer"
        >
          Vô hiệu hóa
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="isAccess" label="Hành động">
      <template slot-scope="scope">
        <el-tag
          v-if="!scope.row.isAccess"
          type="success"
          effect="dark"
          @click="toggleAccess(scope.row)"
          class="pointer"
        >
          Cho phép truy cập
        </el-tag>
        <el-tag
          v-else
          type="danger"
          effect="dark"
          @click="toggleAccess(scope.row)"
          class="pointer"
        >
          Dừng truy cập
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Api from "../api";
import moment from "moment";
export default {
  data() {
    return {
      moment,
      tableData: [],
    };
  },

  methods: {
    getUsersList() {
      Api.getUsersList().then((res) => {
        if (res.success == 1) {
          this.tableData = res.data;
        }
      });
    },

    toggleAccess(row) {
      Api.changeUesrAcess(row._id, { isAccess: !row.isAccess }).then((res) => {
        if (res.success == 1) {
          row.isAccess = res.data.isAccess;
          return this.$notify({
            title: "Thành công!",
            message: "Đã cập nhật người dùng",
            type: "success",
          });
        }
      });
    },
  },

  mounted() {
    this.getUsersList();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>