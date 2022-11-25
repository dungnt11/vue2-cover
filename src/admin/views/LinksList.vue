<template>
  <div>
    <el-button type="primary" @click="showCreateDialog">Thêm mới</el-button>
    <el-table :data="tableData" stripe style="width: 100%" emptyText="Không có dữ liệu">
      <el-table-column prop="name" label="Tên"> </el-table-column>
      <el-table-column prop="url" label="Đường dẫn"> </el-table-column>
      <el-table-column prop="isOpenNewPage" label="Mở trang mới">
        <template slot-scope="scope">{{ scope.row.isOpenNewPage }}</template>
      </el-table-column>
      <el-table-column prop="isNewPage" label="Mới">
        <template slot-scope="scope">{{ scope.row.isNewPage }}</template>
      </el-table-column>
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
              @confirm="deleteLink(scope.row)"
            >
              <i class="el-icon-delete" slot="reference"></i>
            </el-popconfirm>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`${selectedItem ? 'Chỉnh sửa' : 'Tạo mới'} liên kết`"
      :visible.sync="centerDialogVisible"
      width="500px"
      center
    >
      <div class="input-wrapper">
        <label>Tên *</label>
        <el-input
          placeholder="Nhập tên liên kết"
          label="Tên liên kết"
          v-model="name"
        ></el-input>
      </div>
      <div class="input-wrapper">
        <label>Đường dẫn *</label>
        <el-input placeholder="Nhập đường dẫn..." label="" v-model="url"></el-input>
      </div>
      <div class="input-wrapper">
        <label>Mở trang mới: </label>
        <el-checkbox v-model="isOpenNewPageModal">{{
          isOpenNewPageModal ? "Bật" : "Tắt"
        }}</el-checkbox>
      </div>
      <div class="input-wrapper">
        <label>Mới: </label>
        <el-checkbox v-model="isNewPageModal">{{
          isNewPageModal ? "Bật" : "Tắt"
        }}</el-checkbox>
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
      isOpenNewPageModal: false,
      isNewPageModal: false,
      selectedItem: null,
      name: "",
      url: "",
      isOpenNewPage: 0,
      isNewPage: 0,
    };
  },

  methods: {
    getLinksList() {
      Api.getLinksList().then((res) => {
        if (res.success == 1) {
          this.tableData = res.data;
        }
      });
    },

    showCreateDialog() {
      this.selectedItem = null;
      this.name = "";
      this.url = "";
      this.isOpenNewPage = 0;
      this.isNewPage = 0;
      this.centerDialogVisible = true;
    },

    showEditDialog(row) {
      this.selectedItem = row;
      this.name = row.name;
      this.url = row.url;
      this.isOpenNewPageModal = row.isOpenNewPageModal;
      this.isNewPageModal = row.isNewPageModal;
      this.centerDialogVisible = true;
    },

    deleteLink(link) {
      //
      Api.deleteLink(link._id).then((res) => {
        if (res.success == 1) {
          this.tableData = this.tableData.filter(
            (item) => item._id != link._id
          );
          return this.$notify({
            title: "Thành công!",
            message: `Đã xóa liên kết ${link.name}`,
            type: "success",
          });
        }
      });
      //
    },

    createOrUpdate() {
      let data = {
        name: this.name,
        url: this.url,
        isOpenNewPage: this.isOpenNewPage,
        isNewPage: this.isNewPage,
      };
      if (!this.selectedItem) {
        Api.createLink(data).then((res) => {
          if (res.success == 1) {
            data._id = res.data._id;
            this.tableData.push(data);
            this.centerDialogVisible = false;
            return this.$notify({
              title: "Thành công!",
              message: "Đã tạo mới một liên kết",
              type: "success",
            });
          }
        });
      } else {
        Api.updateLink(this.selectedItem._id, data).then((res) => {
          if (res.success == 1) {
            let index = this.tableData.findIndex((el) => {
              return el._id == this.selectedItem._id;
            });
            this.$set(this.tableData, index, {
              ...this.tableData[index],
              ...data,
            });

            this.centerDialogVisible = false;
            return this.$notify({
              title: "Thành công!",
              message: "Đã cập nhật liên kết",
              type: "success",
            });
          }
        });
      }
    },
  },

  created() {
    this.getLinksList();
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