<template lang='pug'>
.pst-rlt.h-p100.login
  .pst-absl.t-0.l-0.b-0.r-0.bg
    .w-500.color-white.vh
      el-tabs(v-model="activeTab")
        el-tab-pane(label="登录" name="login")
        el-tab-pane(label="注册" name="register")
      el-form(:model="oForm" size="small" label-width="100px")
        el-form-item(label="用户名：")
          el-input(v-model="oForm.name" placeholder="请输入用户名")
        el-form-item(label="邮箱：" v-if="activeTab === 'register'")
          el-input(v-model="oForm.email" placeholder="请输入邮箱")
        el-form-item(label="手机：" v-if="activeTab === 'register'")
          el-input(v-model="oForm.tel" placeholder="请输入手机号")
        el-form-item(label="密码：")
          el-input(v-model="oForm.password" placeholder="请输入密码" type="password")
        el-form-item(label="确认密码：" v-if="activeTab === 'register'")
          el-input(v-model="oForm.dulPassword" placeholder="请确认密码" type="password")
        el-form-item
          .tlc
            el-button(type="primary" size="small" @click="fnClickLogin" v-if="activeTab === 'login'") 登录
            el-button(type="primary" size="small" @click="fnClickRegiste" v-else) 注册
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      activeTab: "login",
      oForm: {
        name: "",
        email: "",
        tel: "",
        password: "",
        dulPassword: ""
      }
    };
  },
  methods: {
    // ======================事件处理函数======================
    fnClickRegiste() {
      this.$dc.user
        .signup({ data: this.oForm })
        .then(res => {
          this.$message.success(res.state.msg);
        })
        .catch(err => {
          this.$message.error(err.response.data.state.msg);
        });
    },
    fnClickLogin() {
      let { name, password } = this.oForm;
      this.$dc.user
        .login({ data: { name, password } })
        .then(res => {
          this.$message.success(res.state.msg);
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          this.$message.error(err.response.data.state.msg);
        });
    }
    // ======================业务逻辑函数======================
    // ========================纯函数=========================
    // ======================网络请求函数======================
    // =======================初始化函数=======================
  }
});
</script>

<style lang='scss'>
.login .bg {
  background: url(https://cn.bing.com/az/hprichbg/rb/ChristmasIslandCrab_ZH-CN11742198976_1920x1080.jpg)
    no-repeat;
  background-size: cover;
}
.login .el-form-item__label {
  color: white;
}

.login .el-tabs__item {
  color: white;
}
</style>
