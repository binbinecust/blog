<template lang='pug'>
.user-page
  el-form(:model="oForm" ref="oForm" :rules="oRules" size="small" label-width="100px")
    el-form-item(label="用户名：" prop="name")
      span {{ oUser.name }}
    el-form-item(label="邮箱：" prop="email")
      .calc-width
        p(v-show="!oEdit.isEmailEdit") {{ oUser.email }}
        el-input(v-model="oForm.email" placeholder="请输入邮箱" v-show="oEdit.isEmailEdit")
      span(@click="oEdit.isEmailEdit = !oEdit.isEmailEdit" :class="oEdit.isEmailEdit ? 'el-icon-circle-close-outline' : 'el-icon-edit-outline'")
    el-form-item(label="手机：" prop="tel")
      .calc-width
        p(v-show="!oEdit.isTelEdit") {{ oUser.tel }}
        el-input(v-model="oForm.tel" v-show="oEdit.isTelEdit" placeholder="请输入手机号")
      span(@click="oEdit.isTelEdit = !oEdit.isTelEdit" :class="oEdit.isTelEdit ? 'el-icon-circle-close-outline' : 'el-icon-edit-outline'")
    el-form-item(label="重置密码：")
      el-radio(v-model="oEdit.isResetPassword" :label="1") 是
      el-radio(v-model="oEdit.isResetPassword" :label="0") 否
    el-form-item(prop="password" v-if="oEdit.isResetPassword")
      el-input(v-model="oForm.password" placeholder="请输入密码" type="password")
    el-form-item(label="上传头像：")
      el-upload(
        action=""
        list-type="picture-card"
        :before-upload="handleBeforeUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        multiple
        :limit="2"
        :show-file-list="false"
      )
        img.avatar(:src="imageUrl" v-if="imageUrl")
        i.el-icon-plus(v-else)
      el-dialog(:visible.sync="dialogVisible")
        img(width="100%" :src="imageUrl")
    el-form-item
      .tlc
        el-button(type="primary" size="small" @click="save" :loading="isSaving") 保存
        el-button(size="small" @click="back") 返回首页
</template>

<script lang='ts'>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  data() {
    return {
      isSaving: false,
      dialogVisible: false,
      imageUrl: "",
      fileList: [],
      oEdit: {
        isTelEdit: false,
        isResetPassword: 0,
        isEmailEdit: false
      },
      oForm: {
        email: "",
        tel: "",
        password: ""
      },
      oRules: {}
    };
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
    handleBeforeUpload() {},
    handlePreview() {},
    handleRemove() {},
    save() {},
    back() {
      this.$router.push("/home");
    },
    // ======================业务逻辑函数======================
    // ========================纯函数=========================
    // ======================网络请求函数======================
    fnNetUSave() {
      this.isSaving = true;
    },
    // =======================初始化函数=======================
    initData() {
      this.oForm.email = this.oUser.email;
      this.oForm.tel = this.oUser.tel;
      this.imageUrl = this.oUser.avatar;
    }
  },
  mounted() {
    this.initData();
  }
});
</script>

<style lang='scss' scoped>
.calc-width {
  width: calc(100% - 30px);
  display: inline-block;
  margin-right: 10px;
}

.avatar {
  width: 150px;
}
</style>
