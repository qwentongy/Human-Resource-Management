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
            <el-tree
              :data="data"
              node-key="id"
              default-expand-all: false
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
                />
              </template>
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 对话框 -->
      <DeptDialog
      :showDialog="showDialog"
      :id="currentId"
      @close="close"
      @loadData="GetDeptList"
      />
    </el-card>
  </div>
</template>

<script>
import {arrayToTree} from '@/utils'
import {deptListAPI} from '@/api/user'
import TreeItem from "@/views/departments/components/TreeItem";
import DeptDialog from '@/views/departments/components/DeptDialog'
export default {
  components: {
    TreeItem,
    DeptDialog
  },
  data() {
    // 动态数据需要提前备好,否则很大概率会导致数据不渲染
    return {
      activeName: "first",
      data: [],
      showDialog: false,
      currentId: ''
    }
  },
  methods: {
    async GetDeptList() {
        let res = await deptListAPI();
        const list = arrayToTree(res.data.depts,'')
        this.data = list
    },
    // 显示添加对话框
    activeAdd(id) {
        this.showDialog = true
        this.currentId = id
    },
    // 关闭添加对话框
    close() {
        this.showDialog = false
        // this.$message('已取消')
    },
  },
  mounted() {
    this.GetDeptList()
  }
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
