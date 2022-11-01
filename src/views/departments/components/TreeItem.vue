<template>
  <div class="tree-item">
    <div class="left bold">{{ data.name }}</div>
    <div class="right">
      <span class="manager">{{ data.manager }}</span>
      <!-- 
        通过阅读官方文档发现el-dropdown的事件，
        不是给每一项加的，而是给 el-dropdown整体加的，
        加的command事件，此时点击任意某一项都会触发，
        所以还需要给每一项加command做标识
       -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">添加子部门</el-dropdown-item>
          <el-dropdown-item command="view" v-if="!isroot"
            >查看部门</el-dropdown-item
          >
          <el-dropdown-item command="del" v-if="!isroot"
            >删除部门</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { delDeptAPI } from "@/api/user";
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          name: "江苏传智播客教育科技股份有限公司",
          manager: "负责人",
        };
      },
    },
    // 让调用者传入一个标记，有这个标记代表是在顶部，没有就代表不在顶部
    isroot: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async handleCommand(cmd) {
      switch (cmd) {
        case "add":
          // 做添加子部门
          this.$emit("add",this.data.id)
          break;
        case "view":
          // 做查看部门
          break;
        case "del":
          // 做删除
          // 弹出确认框
          try {
            await this.$confirm(
              "此操作将永久删除该部门, 是否继续?",
              "是否删除",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            );

            // 点了确定就发请求，因为点了取消会进到catch
            await delDeptAPI(this.data.id);
            // console.log(this);
            // console.log(this.data);
            // 弹出提示
            this.$message.success("删除成功");
            // 刷新数据 - 子传父
            this.$emit("del");
          } catch(error) {
            console.log(error);
          }

          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  .bold {
    font-weight: 700;
  }
  .right {
    .manager {
      margin-right: 30px;
    }
  }
}
</style>
