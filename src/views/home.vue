<template lang='pug'>
.p-10.home-page
  .mb-10
    p.color-red.mb-10 有什么想记录下来？
    quill-editor(
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @ready="onEditorReady($event)"
    )
    .tlr.mt-10
      el-button(@click="publish" type="primary" size="small" plain :loading="bIsLoading") 发布
  .ptb-20
    el-card.mb-10(v-for="item in aDaily")
      div(v-html="item")
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
</template>

<script lang='ts'>
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  data() {
    return {
      bIsLoading: false,
      aDaily: <any>[],
      content: '',
      editorOption: {
        // some quill options
      },
      oPageConf: {
        limit: 10,
        page: 1,
        total: null
      }
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    handleSizeChange(limit) {
      this.oPageConf.limit = limit;
      this.fnNetRDailyList();
    },
    handleCurrentChange(page) {
      this.oPageConf.page = page;
      this.fnNetRDailyList();
    },
    publish() {
      let oData = {
        userId: this.userId,
        content: this.content
      };
      this.$dc.daily
        .create({ data: oData })
        .then((res: any) => {
          this.$message.success(res.state.msg);
          this.content = '';
          let total: any = this.oPageConf.total;
          this.oPageConf.total = total ? total + 1 : this.oPageConf.total;
          this.aDaily.unshift(this.content);
        })
        .catch(e => {});
    },
    fnNetRDailyList() {
      let oData = {
        limit: this.oPageConf.limit,
        page: this.oPageConf.page,
        userId: this.userId
      };
      this.$dc.daily
        .list({ data: oData })
        .then((res: any) => {
          let result = res.result.data;
          this.aDaily = result.daily.map((item: any) => item.content);
          this.oPageConf.total = result.total;
        })
        .catch(e => {});
    }
  },
  computed: {
    ...mapState({
      userId(state: any) {
        return state.oUser.id;
      }
    })
  },
  mounted() {
    this.fnNetRDailyList();
  }
});
</script>

<style lang='scss'>
.home-page .ql-container {
  min-height: 100px;
}
</style>
