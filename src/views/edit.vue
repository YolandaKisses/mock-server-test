<template>
  <div class="edit">
    <el-row>
      <el-col :span="14" :offset="3">
        <!--编辑表单-->
        <el-form ref="editForm" size="small" label-width="140px" :model="editForm">
          <el-form-item label="姓名">
            <el-input type="text" size="small" v-model="editForm.name" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editForm.isMale" clearable>
              <el-option v-for="item in options" :key="item.dimCde" :label="item.dimNme" :value="item.dimCde">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="text" size="small" v-model="editForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="text" size="small" v-model="editForm.address"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="10">
        <el-button size="small" @click="close"> 取消 </el-button>
        <el-button type="primary" size="small" @click="saveFormData"> 保存 </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { update } from "../api/user";
export default {
  props: {
    editRow: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editForm: {
        id: "",
        name: "",
        isMale: "",
        mail: "",
        address: ""
      },
      options: [
        { dimCde: 1, dimNme: "男" },
        { dimCde: 2, dimNme: "女" }
      ]
    };
  },
  methods: {
    saveFormData() {
      update({
        row: JSON.parse(JSON.stringify(this.editForm))
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
        this.$emit("close");
      });
    },
    close() {
      this.$emit("close");
    }
  },
  watch: {
    editRow: {
      handler(val) {
        if (val) {
          this.editForm = JSON.parse(JSON.stringify(val));
        }
      },
      // 代表在wacth立即先去执行handler方法
      immediate: true
    }
  }
};
</script>

<style>
</style>