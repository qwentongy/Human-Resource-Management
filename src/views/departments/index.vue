<template>
  <div class="departments">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="组织结构" name="first">
          <!-- 内容 -->
          <div class="content">
            <!-- 头部 -->
            <div class="header">
              <TreeItem />
            </div>
            <!-- 列表内容 -->
            <!-- 
              知识点1:
                :叫动态属性,他会把右侧的东西看作是表达式,加了:就是表达式,不加就是字符串
                表达式:变量,常量和运算符组成(表达式在原地是有结果的)
              知识点2:
                标签上直接写属性,但是没有值此属性接到的默认值是true(布尔值)
                如果非要写注意要加:,负责true是字符串
             -->
            <el-tree
              :data="data"
              node-key="id"
              default-expand-all:
              false
              :expand-on-click-node="false"
            >
              <!-- 这里用的是一个废弃的插槽语法，其中slot-scope="obj" -->
              <!-- 代表用obj拿到插槽内部暴露出来的数据 -->
              <!-- v-slot="obj" obj里有node和data两个属性 -->
              <!-- node代表当前这个节点的信息，data代表当前这个节点里的数据 -->
              <!-- 如果我想拿到data，就得obj.data，麻烦 -->
              <!-- 所以，可以加大括号代表解构出这个obj里的属性 -->
              <!-- 本项目node属性没啥用，data属性有用，所以我只要拿data -->
              <template v-slot="{ data }">
                <TreeItem
                  :data="data"
                  :isroot="false"
                  @del="GetDeptList"
                  @add="activeAdd"
                  @view="activeView"
                />
              </template>
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 对话框 -->
      <!-- 
        
       -->
      <DeptDialog
        :showDialog.sync="showDialog"
        :id="currentId"
        @loadData="GetDeptList"
        :charge="charge"
        ref="DeptDialog"
      />
    </el-card>
  </div>
</template>

<script>
import { arrayToTree } from "@/utils";
import { deptListAPI, getChargeAPI ,deptDetailAPI } from "@/api/user";
import TreeItem from "@/views/departments/components/TreeItem";
import DeptDialog from "@/views/departments/components/DeptDialog";
export default {
  components: {
    TreeItem,
    DeptDialog,
  },
  data() {
    // 动态数据需要提前备好,否则很大概率会导致数据不渲染
    return {
      activeName: "first",
      data: [],
      showDialog: false,
      currentId: "",
      charge: [],
    };
  },
  methods: {
    async GetDeptList() {
      let res = await deptListAPI();
      const list = arrayToTree(res.data.depts, "");
      this.data = list;
    },
    // 显示添加对话框
    activeAdd(id) {
      this.showDialog = true;
      this.currentId = id;
    },
    // 获取负责人信息
    async GetChargeAPI() {
      let res = await getChargeAPI();
      this.charge = res.data
      console.log(res);
    },
    // 查看部门反填充数据
    async activeView(id) {
      this.showDialog = true
      const res = await deptDetailAPI(id)
      // console.log(res);
      this.$refs.DeptDialog.form = res.data
    },
  },
  mounted() {
    this.GetDeptList();
    this.GetChargeAPI();
  },
};
</script>

<style lang="scss" scoped>
.departments {
  padding: 20px;
  .content {
    padding: 40px 100px;
    .header {
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
  }

  .tree-item {
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
}
</style>
