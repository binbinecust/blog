<template lang='pug'>
.home
  Navmenu
</template>

<script lang='ts'>
import Navmenu from "@/components/Navmenu.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    Navmenu
  },
  data() {
    return {};
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

<style lang='scss' scoped>
</style>
