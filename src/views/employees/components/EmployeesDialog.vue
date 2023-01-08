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
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" :label-width="formLabelWidth">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.correctionTime"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="聘用形式" :label-width="formLabelWidth">
        <!-- 输入框才会自动触发校验,下拉框不会,如果需要一般设置失去焦点是时校验 -->
        <el-select v-model="form.formOfEmployment" placeholder="请选择">
          <el-option
            label="正式"
            value="正式"
          ></el-option>
          <el-option
            label="非正式"
            value="非正式"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" :label-width="formLabelWidth">
        <el-input v-model="form.workNumber" autocomplete="off" placeholder="1-20个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth">
        <el-select v-model="form.departmentName" placeholder="请选择">
          <el-option
            label="正式"
            value="正式"
          ></el-option>
          <el-option
            label="非正式"
            value="非正式"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="转正时间" :label-width="formLabelWidth">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.correctionTime"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="addEmployees">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { delEmp } from "@/api/user";
export default {
  name: "EmployeesDialog",
  props: {
    showDialog: {
      type: Boolean,
      default: true
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
    async addEmployees() {
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
