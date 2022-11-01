<template>
  <el-dialog title="新增部门" :visible.sync="showDialog">
    <el-form :model="form">
      <el-form-item label="部门名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" :label-width="formLabelWidth">
        <!-- 输入框才会自动触发校验,下拉框不会,如果需要一般设置失去焦点是时校验 -->
        <el-select v-model="form.manager" placeholder="请选择负责人" @blur="$refs.form.validateField('manager')">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入部门介绍"
          v-model="form.introduce"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="addDept">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addDeptAPI} from '@/api/user'
export default {
  name: "DeptDialog",
  props: ["showDialog", "id"],
  data() {
    return {
      // showDialog: false,
      form: {},
      formLabelWidth: "120px",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async addDept() {
      try {
        await addDeptAPI({
          ...this.from,
          pid: this.id
        })
        this.$message.success('添加成功')
        this.close()
        this.$emit('loadData')
      } catch (error) {
        
      }
    },
  },
};
</script>

<style></style>
