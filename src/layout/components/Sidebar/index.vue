<template>
  <!-- 左侧侧边栏完全容器 -->
  <div :class="{ 'has-logo': showLogo }">
    <!-- 顶部logo组件 -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 
      内容容器
      el-scrollbar 是element-ui的隐藏彩蛋,官方文档没有
      滚动条组件:内容设置超出隐藏,不出现滚动条
    
    -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 
        下拉菜单 
        :default-active 当前激活菜单的 index
        :collapse  是否水平折叠收起菜单(false不要)
        :unique-opened  是否只保持一个子菜单展开
        mode  菜单排列模式 vertical 垂直排列
      -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 文档说: el-menu里应该每行是el-menu-item,为何这里是sidebar-item呢?
        这里是封装的一个sidebar-item组件,真正的el-menu-item封装在里面
      -->
        <!-- 直接拿到路由规则对象数组,遍历产生每一个sidebar-item(el-menu-item)侧边栏的每一行 -->
        <!-- 为什么没有把所有的数组对象遍历出来?

      -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      // this.$router.options.routes返回的是路由表规则对象数组
      return this.$router.options.routes;
    },
    // 设置默认菜单激活path值
    activeMenu() {
      const route = this.$route; // 当前页面路由信息对象(路由规则数组对象)
      const { meta, path } = route; //拿到元信息对象和路径
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path; // 返回路径
    },
    // 是否展示侧边栏顶部logo -> vuex(settings) -> 初始值src/settings
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    // 是否折叠
    isCollapse() {
      // 拿到vuex里面侧边栏opened状态值(true展开,false折叠)
      // 是折叠,折叠为false,所以取反
      return !this.sidebar.opened;
    },
  },
};
</script>
