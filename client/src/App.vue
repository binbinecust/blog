<template lang='pug'>
#app
  router-view
</template>

<script lang='ts'>
/// <reference path="./fedc/index.d.ts" />
import Vue from "vue";

export default Vue.extend({
  name: "app",
  data() {
    return {};
  },
  mounted() {
    console.log(9999)
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
@import "./assets/css/atom-common.min.css";
@import "./assets/css/atom-pc.1.min.css";
@import "./assets/css/atom-pc.2.min.css";
@import "./assets/css/atom-pc.3.min.css";
@import "./assets/css/atom-pc.4.min.css";
@import "./assets/css/atom-pc.min.css";
@import "./style/base.scss";
@import "./style/define-atom.scss";
@import "./style/color.scss";
</style>
