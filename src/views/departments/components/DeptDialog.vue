<template>
  <!-- 
    以前技术:
      (1)父组件内,给子标签一个@自定义事件='事件处理函数',在事件处理函数中,接收到子元素传过来的值,修改需要变更的数据
      (2)子组件中,在恰当的时机,通过this.$emit('自定义事件名',值)
    .sync语法糖:
      (1)父组件内,给子组件对应的对应的props变量名.sync = "父范围变量名"
      (2)子组件中,在恰当得时机,通过this.$emit('update:props变量名',值)
    .sync的作用:他会在运行时,给当前绑定的
   -->
  <el-dialog
    :title="title"
    :visible="showDialog"
    @update:visible="(val) => $emit('update:showDialog', val)"
  >
    <el-form :model="form">
      <el-form-item label="部门名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" :label-width="formLabelWidth">
        <!-- 输入框才会自动触发校验,下拉框不会,如果需要一般设置失去焦点是时校验 -->
        <el-select
          v-model="form.manager"
          placeholder="请选择负责人"
        >
          <el-option
            v-for="c in charge"
            :key="c.id"
            :label="c.username"
            :value="c.username"
          ></el-option>
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
import { addDeptAPI, editDeptAPI } from "@/api/user";
export default {
  name: "DeptDialog",
  props: {
    showDialog: {
      type: Boolean,
    },
    charge: {
      type: Array,
      default: () => [], // eslint要求引用数据类型必须要有默认值
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      // showDialog: false,
      form: {},
      formLabelWidth: "120px",
    };
  },
  methods: {
    close() {
      this.form = {};
      this.$emit("update:showDialog", false);
    },
    async addDept() {
      if (this.form.id) {
        await editDeptAPI(this.form);
        this.$message.success("修改成功");
        this.close();
        this.$emit("loadData");
      } else {
        try {
          await addDeptAPI({
            ...this.form,
            pid: this.id,
          });
          this.$message.success("添加成功");
          this.close();
          this.$emit("loadData");
        } catch (error) {}
      }
    },
  },
  computed: {
    title() {
      return this.form.id ? "查看部门" : "添加部门";
    },
  },
};
</script>

<style></style>
