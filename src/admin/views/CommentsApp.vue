<template>
  <div>
    <el-button type="primary" @click="showCreateDialog">Thêm mới</el-button>
    <el-table :data="tableData" stripe style="width: 100%" emptyText="Không có dữ liệu">
      <el-table-column prop="name" label="Tên"> </el-table-column>
      <el-table-column prop="content" label="Nội dung"> </el-table-column>
      <el-table-column label="Hành động">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Chỉnh sửa"
            placement="top"
            style="margin-right: 10px"
          >
            <i class="el-icon-edit" @click="showEditDialog(scope.row)"></i>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="Xóa" placement="top">
            <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              icon="el-icon-info"
              icon-color="red"
              title="Bạn có muốn xóa liên kết này?"
              @confirm="deleteCommemt(scope.row)"
            >
              <i class="el-icon-delete" slot="reference"></i>
            </el-popconfirm>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`${selectedItem ? 'Chỉnh sửa' : 'Tạo mới'} bình luận`"
      :visible.sync="centerDialogVisible"
      width="500px"
      center
    >
      <div class="input-wrapper">
        <label>Tên *</label>
        <el-input
          placeholder="Nhập tên người bình luận"
          label="Tên người bình luận"
          v-model="name"
        ></el-input>
      </div>
      <div class="input-wrapper">
        <label>Nội dung *</label>
        <el-input
          placeholder="Nhập nội dung..."
          label="Nội dung bình luận"
          v-model="content"
        ></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createOrUpdate">Xác nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "../api";
import moment from "moment";
export default {
  data() {
    return {
      centerDialogVisible: false,
      moment,
      tableData: [],
      selectedItem: null,
      name: "",
      content: "",
    };
  },

  methods: {
    getCommentsList() {
      Api.getCommentsList().then((res) => {
        if (res.success == 1) {
          this.tableData = res.data;
        }
      });
    },

    showCreateDialog() {
      this.selectedItem = null;
      this.name = "";
      this.content = "";

      this.centerDialogVisible = true;
    },

    showEditDialog(row) {
      this.selectedItem = row;
      this.name = row.name;
      this.content = row.content;

      this.centerDialogVisible = true;
    },

    createOrUpdate() {
      let data = {
        name: this.name,
        content: this.content,
      };
      if (!this.selectedItem) {
        Api.createComment(data).then((res) => {
          if (res.success == 1) {
            data._id = res.data._id;
            this.tableData.push(data);
            this.centerDialogVisible = false;
            return this.$notify({
              title: "Thành công!",
              message: "Đã tạo mới một bình luận",
              type: "success",
            });
          }
        });
      } else {
 
        Api.updateComment(this.selectedItem._id, data).then((res) => {
          if (res.success == 1) {
            let index = this.tableData.findIndex((el) => {
              return el._id == this.selectedItem._id;
            });
            this.$set(this.tableData, index, {...this.tableData[index], ...data});
            this.centerDialogVisible = false;
            return this.$notify({
              title: "Thành công!",
              message: "Đã cập nhật bình luận",
              type: "success",
            });
          }
        });
      }
    },

    deleteCommemt(comment){
       Api.deleteCommemt(comment._id).then((res) => {
        if (res.success == 1) {
          this.tableData = this.tableData.filter(
            (item) => item._id != comment._id
          );
          return this.$notify({
            title: "Thành công!",
            message: `Đã xóa bình luận.`,
            type: "success",
          });
        }
      });
    }
  },

  mounted() {
    this.getCommentsList();
  },
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.input-wrapper {
  margin-bottom: 10px;
  label {
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 5px;
  }
}
</style>