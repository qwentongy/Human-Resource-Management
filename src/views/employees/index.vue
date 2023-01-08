<template>
  <div>
    <el-card class="box-card first">
      <el-button type="primary">导入</el-button>
      <el-button type="primary" @click="addEmployees">+ 新增员工</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          type="index"
          :index="indexMethod"
          label="序号"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" width="120">
        </el-table-column>
        <el-table-column prop="formOfEmployment" label="聘用形式" width="200">
        </el-table-column>
        <el-table-column prop="departmentName" label="部门" width="180">
        </el-table-column>
        <el-table-column prop="correctionTime" label="入职时间" width="200">
        </el-table-column>
        <el-table-column prop="timeOfEntry" label="是否在职" width="120">
        </el-table-column>
        <el-table-column prop="enableState" label="状态" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot-scope="scope">
            <el-button @click="lookClick(scope.row)" type="text" size="small"
              >查看</el-button>
            <el-button @click="positiveClick(scope.row)" type="text" size="small">转正</el-button>
            <el-button @click="changeClick(scope.row)" type="text" size="small">调岗</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">离职</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">角色</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="total" @current-change='handleCurrentChange' > </el-pagination>
        <span class="demonstration">共{{total}}条</span>
      </div>
    </el-card>

    <!-- 弹窗 -->
    <EmployeesDialog
      ref="EmployeesDialog"
      :showDialog.sync="showDialog"
      :form="form"
    />
  </div>
</template>

<script>
import { empList , delEmp , lookAPI } from "@/api/user.js";
import EmployeesDialog from "@/views/employees/components/EmployeesDialog.vue"
export default {
  components: {
    EmployeesDialog
  },
  data() {
    return {
      tableData: [] || undefined,
      total: 0,
      showDialog: false,
      page: 1,
      // size: 0
      form: {} || undefined,
    };
  },
  methods: {
    async lookClick(row) {
      const res = await lookAPI(row.id)
      this.$refs.EmployeesDialog.form = res.data
      this.showDialog = true
    },
    deleteClick() {

    },
    async GetEmpList() {
      const res = await empList({
        page: this.page,
        size: this.size,
      });
      // console.log(res);
      this.tableData = res.data.rows;
      this.total = res.data.total
    },
    indexMethod(index) {
      return index + 1;
    },

    // 显示对话框
    addEmployees() {
      this.showDialog = true
    },

    // 页码变化回调
    handleCurrentChange(page) {
      this.page = page
      this.GetEmpList();
    },

  },
  mounted() {
    this.GetEmpList();
  },
  computed: {},
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 98%;
  margin: 20px;
}
.first {
  display: flex;
  flex-direction: row-reverse;
}
.block {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
  
}
.demonstration {
    line-height: 35px;
  }
</style>
