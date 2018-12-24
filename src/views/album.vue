<template lang='pug'>
div
  p.inbl.mr-20.fw-600.lh-140.vtal-bt 上传图片：
  el-upload.inbl(
    action="/api/upload"
    name="album"
    list-type="picture-card"
    :show-file-list="false"
    :on-success="handleSuccess"
    :data="{userId: userId, name: name}"
  )
    i.el-icon-plus
  el-card.mt-50(v-if="aImgList.length")
    el-card.w-200.mr-10.mb-10.inbl(v-for="item in aImgList")
      .tlc
        img.max-w-p100(:src="item.url" @click="fnShowImgModal(item.url)")
      .tlc.mt-5 {{ item.name }}
    .tlr.mt-10
      el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="oPageConf.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="oPageConf.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="oPageConf.total"
      )
  el-dialog(
    :visible.sync="bIsImgDialogVisable"
    width="700"
    center
  )
    .tlc
      img.max-w-p100(:src="imgDialogUrl")
</template>

<script lang='ts'>
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  data() {
    return {
      bIsImgDialogVisable: false,
      imgDialogUrl: '',
      name: '',
      aImgList: <any>[],
      oPageConf: {
        limit: 10,
        page: 1,
        total: null
      }
    };
  },
  computed: {
    ...mapState({
      userId(state: any) {
        return state.oUser.id;
      }
    })
  },
  methods: {
    // ======================事件处理函数======================
    handleSuccess(res, file) {
      this.$message.success(res.result.state.msg);
      let name = file.name.split('.')[0];
      this.aImgList.unshift({ url: res.result.data.url, name: name });
      let total = <any>this.oPageConf.total;
      this.oPageConf.total = total ? total + 1 : 1;
    },
    handleSizeChange(limit) {
      this.oPageConf.limit = limit;
      this.fnNetRAlbumList();
    },
    handleCurrentChange(page) {
      this.oPageConf.page = page;
      this.fnNetRAlbumList();
    },
    fnShowImgModal(url) {
      this.bIsImgDialogVisable = true;
      this.imgDialogUrl = url;
    },
    // ======================业务逻辑函数======================
    // ========================纯函数=========================
    // ======================网络请求函数======================
    fnNetRAlbumList() {
      let oData = {
        limit: this.oPageConf.limit,
        page: this.oPageConf.page,
        userId: this.userId
      };
      this.$dc.album
        .list({ data: oData })
        .then((res: any) => {
          let result = res.result.data;
          this.aImgList = result.imgList;
          this.oPageConf.total = result.total;
        })
        .catch(e => {});
    }
    // =======================初始化函数=======================
  },
  mounted() {
    this.fnNetRAlbumList();
  }
});
</script>

<style lang='scss' scoped>
</style>
