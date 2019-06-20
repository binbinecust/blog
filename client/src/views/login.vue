<template lang='pug'>
.pst-rlt.h-p100.login
  .pst-absl.t-0.l-0.b-0.r-0.bg
    .w-500.color-white.vh
      el-tabs(v-model="activeTab")
        el-tab-pane(label="登录" name="login")
        el-tab-pane(label="注册" name="register")
      el-form(:model="oForm" size="small" label-width="100px" :rules="oFormRule" ref="oForm")
        el-form-item(label="用户名：" prop="name")
          el-input(v-model="oForm.name" placeholder="请输入用户名")
        el-form-item(label="邮箱：" v-if="activeTab === 'register'" prop="email")
          el-input(v-model="oForm.email" placeholder="请输入邮箱")
        el-form-item(label="手机：" v-if="activeTab === 'register'" prop="tel")
          el-input(v-model="oForm.tel" placeholder="请输入手机号")
        el-form-item(label="密码：" prop="password")
          el-input(v-model="oForm.password" placeholder="请输入密码" type="password")
        el-form-item(label="确认密码：" v-if="activeTab === 'register'" prop="dulPassword")
          el-input(v-model="oForm.dulPassword" placeholder="请确认密码" type="password")
        el-form-item
          .tlc
            el-button(type="primary" size="small" @click="fnClickLogin" v-if="activeTab === 'login'" :loading="isLoginLoading") 登录
            el-button(type="primary" size="small" @click="fnClickRegiste" v-else :loading="isRegLoading") 注册
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      } else {
        if (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(value)) {
          return callback(new Error('只能输入5-20个以字母开头、可带数字、“_”、“.”的字符串'));
        }
        return callback();
      }
    };
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      } else {
        if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
          return callback(new Error('邮箱格式不正确，请重新输入'));
        }
        return callback();
      }
    };
    const checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入电话号码'));
      } else {
        if (!/\d{11}/.test(value)) {
          return callback(new Error('请输入11位数字'));
        }
        return callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      } else {
        if (!/^(\w){6,20}$/.test(value)) {
          return callback(new Error('请输入只能输入6-20个字母、数字、下划线密码'));
        }
        return callback();
      }
    };
    const checkDulPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入校验密码'));
      } else {
        if (value !== this['oForm']['password']) {
          return callback(new Error('两次输入不相同，请重新输入，小傻瓜'));
        }
        return callback();
      }
    };
    return {
      isLoginLoading: false,
      isRegLoading: false,
      activeTab: 'login',
      oForm: {
        name: '',
        email: '',
        tel: '',
        password: '',
        dulPassword: ''
      },
      oFormRule: {
        name: [{ validator: checkName }],
        email: [{ validator: checkEmail }],
        tel: [{ validator: checkEmail }],
        password: [{ validator: checkPassword }],
        dulPassword: [{ validator: checkDulPassword }]
      }
    };
  },
  methods: {
    // ======================事件处理函数======================
    fnClickRegiste() {
      this.$refs['oForm']['validate'](valid => {
        if (valid) {
          this.isRegLoading = true;
          this.$dc.user
            .signup({ data: this.oForm })
            .then((res: any) => {
              this.$message.success(res.state.msg);
              this.activeTab = 'login';
            })
            .catch(err => {
              this.$message.error(err.response.data.state.msg);
            })
            .done(() => (this.isRegLoading = false));
        }
      });
    },
    fnClickLogin() {
      let { name, password } = this.oForm;
      this.$refs['oForm']['validate'](valid => {
        if (valid) {
          this.isLoginLoading = true;
          this.$store
            .dispatch('loginAct', { data: { name, password } })
            .then(res => {
              this.$message.success(res.state.msg);
              this.$router.push({ path: '/home' });
              this.isLoginLoading = false;
            })
            .catch(err => {
              this.isLoginLoading = false;
              this.$message.error(err.response.data.state.msg);
            });
        }
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
  background: url(https://cn.bing.com/az/hprichbg/rb/YosemiteBridge_ZH-CN10163806053_1920x1080.jpg) no-repeat;
  background-size: cover;
}
.login .el-form-item__label {
  color: white;
}

.login .el-tabs__item {
  color: white;
}
</style>
