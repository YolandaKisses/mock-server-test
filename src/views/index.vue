<template>
  <div class="curd">
    <el-card class="box-card">
      <div class="toolbar">
        <QueryForm ref="QueryForm" :model="formQuery" :formList="formList" :buttonList="buttonList" labelWidth="auto" />
      </div>
      <div class="tabletable_top">
        <div class="tableTitle">用户列表</div>
        <div class="tableRight">
          <el-upload
            class="upload-demo"
            action="/api/user/uploadfile"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-button type="primary" size="small" @click="add" style="margin-left: 10px">新增</el-button>
        </div>
      </div>
      <div class="tablelist">
        <el-table ref="tableData" :data="tableData" border>
          <el-table-column
            v-for="(col, i) in tableColumns"
            :key="i"
            :prop="col.prop"
            :label="col.label"
            :align="col.align"
          >
            <template slot-scope="scope">
              <span v-if="col.prop === 'isMale'">
                {{ scope.row[col.prop] | genderFilter(that) }}
              </span>
              <span v-else>{{ scope.row[col.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" @click="update(scope.row)">编辑</el-link>
              <el-link :underline="false" type="primary" @click="del(scope.row.id)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-drawer
      title="编辑"
      :visible.sync="visible"
      :close-on-press-escape="false"
      :wrapper-closable="false"
      :destroy-on-close="true"
      size="34.2%"
      direction="rtl"
    >
      <edit @close="close" :editRow="editRow" />
    </el-drawer>
  </div>
</template>

<script>
import { getUserInfo, deleteList, upload } from "../api/user";
import edit from "./edit.vue";
export default {
  components: { edit },
  data() {
    return {
      fileList: [],
      that: this,
      formQuery: {
        selectVal: ""
      },
      formList: [
        {
          prop: "selectVal",
          label: "性别",
          type: "select",
          filterable: true,
          clearable: true,
          options: [
            { dimCde: 1, dimNme: "男" },
            { dimCde: 2, dimNme: "女" }
          ],
          optionProps: { value: "dimCde", label: "dimNme" },
          size: "mini"
        }
      ],
      buttonList: [
        { name: "下载", size: "small", type: "primary", click: this.download },
        {
          name: "查询",
          type: "primary",
          size: "small",
          loading: false,
          click: this.onQuery
        },
        { name: "重置", size: "small", click: this.chongzhi }
      ],
      tableData: [],
      tableColumns: [
        { label: "名称", prop: "name", align: "center" },
        { label: "性别", prop: "isMale", align: "center" },
        { label: "邮箱", prop: "mail", align: "center" },
        { label: "地址", prop: "address", align: "center" }
      ],
      options: [
        { dimCde: "1", dimNme: "男" },
        { dimCde: "2", dimNme: "女" }
      ],
      visible: false,
      editRow: {}
    };
  },
  filters: {
    genderFilter(val, that) {
      const obj = that.options.find((item) => item.dimCde == val);
      if (obj) {
        return obj.dimNme;
      }
    }
  },
  created() {
    this.onQuery();
    console.log(this.$CommonUtils.timeStamp2String("1652508000000", 9));
  },
  methods: {
    onQuery() {
      getUserInfo(this.formQuery).then((res) => {
        this.tableData = res.data;
      });
    },
    chongzhi() {
      this.$refs.QueryForm.Form().resetFields();
    },
    del(id) {
      deleteList({
        id
      }).then((res) => {
        if (res.resutCode === "1") {
          this.$message({
            type: "success",
            message: res.data
          });
        } else {
          this.$message({
            type: "error",
            message: res.data
          });
        }
        this.onQuery();
      });
    },
    update(row) {
      this.visible = true;
      this.editRow = row;
    },
    add() {
      this.visible = true;
      this.editRow = {
        id: "",
        name: "",
        mail: "",
        address: "",
        isMale: ""
      };
    },
    close() {
      this.visible = false;
      this.onQuery();
    },
    download() {
      if (this.formQuery.selectVal) {
        window.open(`http://localhost:3000/user/download?selectVal=${this.formQuery.selectVal}`, "self");
      } else {
        window.open("http://localhost:3000/user/download", "self");
      }
    },
    handleSuccess(file) {
      this.$message({
        type: "success",
        message: "导入成功"
      });
      this.onQuery();
    },
    handleError() {
      this.$message({
        type: "error",
        message: "导入失败"
      });
    }
  }
};
</script>

<style lang="less">
.el-link {
  padding-right: 10px;
}

.tabletable_top {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 14px;
  .tableTitle {
    border-left: 3px solid #4f95dd;
    padding-left: 10px;
    color: #4f95dd;
    font-weight: bold;
  }
  .tableRight {
    display: flex;
  }
}
</style>
 