<template lang='pug'>
el-menu.main-menu(
  :default-active="$route.meta.path"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  @select="selectMenu"
)
  el-menu-item(index="/home") 首页
  el-menu-item(index="/album") 相册
  el-menu-item(index="/square") 广场
  el-submenu(index="/other")
    template(slot="title") 其他
    el-menu-item(index="/other1") 其他1
    el-menu-item(index="/other2") 其他2
  el-submenu(index="/user")
    template(slot="title")
      img.avatar(:src="oUser.avatar")
      span {{ oUser.name }}
    el-menu-item(index="/user") 个人中心
    el-menu-item(index="/logout" @click="logout") 退出
</template>

<script lang='ts'>
import Vue from 'vue';
import cookies from 'js-cookie';
import { mapState } from 'vuex';

export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    ...mapState({
      oUser(state: any) {
        return state.oUser;
      }
    })
  },
  methods: {
    // ======================事件处理函数======================
    selectMenu(key) {
      this.$router.push(key);
    },
    logout() {
      cookies.remove('binbinfang');
      localStorage.removeItem('isLogin');
      localStorage.removeItem('oUser');
      this.$router.push('/login');
    }
    // ======================业务逻辑函数======================
    // ========================纯函数=========================
    // ======================网络请求函数======================
    // =======================初始化函数=======================
  }
});
</script>

<style lang='scss'>
.main-menu.el-menu {
  padding-left: 100px;

  > li {
    padding: 0 100px;
  }

  .avatar {
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
