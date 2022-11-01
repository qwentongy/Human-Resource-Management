<template>
  <!-- 头部导航一行容器 -->
  <div class="navbar">
    <!-- 左侧汉堡包图标组件 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 面包屑导航 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="company-name">
      <span>江苏传播按脚科技有限公司</span>
      <span class="ver-text">贵宾版</span>
    </div>

    <!-- 右侧菜单容器 -->
    <div class="right-menu">
      <!-- el-dropdown下拉菜单
        trigger:出发菜单下拉行为(click)
        第一个子标签,能看到的标签
      -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img :src="userHead" class="user-avatar">
          <!-- 用户名 -->
          <span>{{userName}}</span>
          <!-- 下拉箭头 -->
          <i class="el-icon-caret-bottom" />
        </div>
        <!-- 下拉菜单项 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>

          <!-- Element UI 里面必须要阻止默认事件自定义点击事件才能生效(native) -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
          <!-- divided 分割线 
          在组件身上的事件都是自定义事件(别看名字叫click，也是自定义事件)，需要让组件内用
          $emit('click')来触发，我们才能绑定click事件
          很不辛：el-dropdown-item组件内默认不支持点击事件->作者没写
          解决：可以给自定义事件，让vue绑定原生的点击事件
          代码：只需要给原生事件.native修饰符 -> 把此事件绑定在组件根标签上绑定原生事件
          -->
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userName',
      'userHead'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
        this.$confirm('确认退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await this.$store.dispatch('user/logout')
          // this.$route.path 拿到的是路由地址
          // this.$route.fullPath 拿到的是路由地址包括参数如params参数query参数
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          this.$message({
            type: 'success',
            message: '退出登录成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          });          
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(to right, #3b6af2, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .company-name {
    line-height: 46px;
    height: 100%;
    color: #fff;
    display: inline-block;
    .ver-text {
      background-color: rgba(255,255,255,.2);
      margin-left: 10px;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 12px;
      color: gold;
      box-shadow: 0 0 20px 10px gold;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        span {
          position: relative;
          bottom: 12px;
          color: white;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }

      }
    }
  }
}
</style>
