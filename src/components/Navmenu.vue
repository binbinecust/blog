<template lang='pug'>
el-menu.main-menu(default-active="activeNav"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
)
  el-menu-item(index="/index") 首页
  el-menu-item(index="/album") 相册
  el-submenu(index="/recall")
    template(slot="title") 回忆
    el-menu-item(index="/recall/hometown") 家乡
    el-menu-item(index="/recall/work") 工作
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      activeNav: "index"
    };
  },
  methods: {
    // ======================事件处理函数======================
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
}
</style>
