<template>
  <!-- 如果路由对象hidden字段为true,就不让这个路由对象产生侧边栏这一行导航
    对象.不存在属性  值为undefined(null具体值,你得赋予才能是null)
  -->
  <div v-if="!item.hidden">
    <!-- 路由对象children只有一个要展示侧边导航栏就用这个 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- 
        link:左侧一行,点击跳转链接组件
        当前对象没有children/children筛选为0,但是你的父级路由对象没有meta,我也不给你显示左侧导航
        无论children有没有,你都必须要有meta才能在左侧显示
      -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 中间夹插槽传入link中slot,就是a标签中间显示的文字+图标内容
          el-menu-item:才是el-menu具体的一项(一行)
          index:唯一标志(index的值和menu的default-active匹配,当前的行就会有激活样式)
          值:和当前a标签跳转的路径一样(路由路径作为唯一标识)
        -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 
            icon:图标 若子路由没有图标,则问父级item要,若item.meta有则传&&后面的item.meta.icon,若也没有传undefined
            title:标题
          -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 路由对象children大于一个时用这个 非常复杂 递归组件 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // 路由信息对象 ->路由数组的每个对象
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: 直接挂载到组件身上(独立的)
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 字面意思:判断是有一个孩子要展示,children里是否有一个对象而且hidden不能为true
    // children形参:父级item路由对象children数组(子路由规则对象数组)
    // parent:父级item路由对象
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false  // return给filter方法内部,告诉filter遍历时,遇到return false,此item项就不会被filter内部新数组收集
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item    // 暂存一下当前仅有得一个孩子路由对象
          return true   // 让filter收集起来
        }
      })

      // 如果子菜单只有一个路由对象需要显示导航,就命中这里
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有children,或者children数组里子对象属性hidden都为true
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      // 如果筛选出来的子路由对象超过一个,就会返回false 就会用el-submenu
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
