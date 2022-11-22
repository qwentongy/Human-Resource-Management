<template>
  <div>
    <el-card class="box-card first">
      <el-button type="primary">导入</el-button>
      <el-button type="primary">+ 新增员工</el-button>
    </el-card>
    <el-card class="box-card">
      <a-table :columns="columns" :data-source="data" bordered>
        <template slot="username" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <!-- <template slot="title" slot-scope="currentPageData"> Header </template> -->
        <!-- <template slot="footer" slot-scope="currentPageData"> Footer </template> -->
      </a-table>
    </el-card>
  </div>
</template>

<script>
import { empList } from "@/api/user.js";
export default {
  data() {
    return {
      data: {},
      columns: [
        {
          title: "序号",
          dataIndex: "username",
          scopedSlots: { customRender: "username" },
        },
        {
          title: "姓名",
          dataIndex: "username",
          scopedSlots: { customRender: "username" },
        },
        {
          title: "手机号",
          // className: "column-money",
          dataIndex: "mobile",
        },
        {
          title: "工号",
          dataIndex: "workNumber",
        },
        {
          title: "聘用形式",
          dataIndex: "formOfEmployment",
        },
        {
          title: "部门",
          dataIndex: "departmentName",
        },
        {
          title: "入职时间",
          dataIndex: "createTime",
        },
        {
          title: "是否在职",
          dataIndex: inServiceStatus == 1 ? "在职" : "离职",
        },
        {
          title: "工号",
          dataIndex: "workNumber",
        },
        {
          title: "工号",
          dataIndex: "workNumber",
        },
      ],
      page: 1,
      size: 10,
    };
  },
  methods: {
    async GetEmpList() {
      const res = await empList({
        page: this.page,
        size: this.size,
      });
      console.log(res);
      this.data = res.data.rows;
    },
  },
  mounted() {
    this.GetEmpList();
  },
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
</style>
