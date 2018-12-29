<template lang='pug'>
.p-10.home-page
  .mb-10
    p.color-red.mb-10 有什么想记录下来？
    quill-editor(
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    )
    .tlr.mt-10
      el-button(@click="publish" type="primary" size="small" plain :loading="bIsLoading") 发布
  .ptb-20

    el-tabs(v-model="activeTab" type="card" @tab-click="handleTabClick")
      el-tab-pane(label="全部" name="all")
      el-tab-pane(label="我的" name="my")
      el-tab-pane(label="我关心的" name="care")
      el-card.mb-10(v-for="item in aActiveDaily")
        div(v-html="item")
        .tlr
          v-icon(name="regular/thumbs-up" scale="1")
          v-icon(name="thumbs-up" scale="1")
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

export default Vue.extend({
  data() {
    return {
      activeTab: 'all',
      bIsLoading: false,
      myDaily: <any>[],
      careDaily: <any>[],
      aActiveDaily: <any>[],
      allDaily: <any>[],
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
    handleTabClick(tab) {
      this.activeTab = tab.name;
      this.aActiveDaily = this[`${tab.name}Daily`];
      this.oPageConf = {
        limit: 10,
        page: 1,
        total: null
      };
      this.fnNetRDailyList();
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
        content: this.content
      };
      this.$dc.daily
        .create({ data: oData })
        .then((res: any) => {
          this.$message.success(res.state.msg);
          let total: any = this.oPageConf.total;
          this.oPageConf.total = total ? total + 1 : this.oPageConf.total;
          this.myDaily.unshift(this.content);
          this.content = '';
        })
        .catch(e => {});
    },
    fnNetRDailyList() {
      let oData = {
        limit: this.oPageConf.limit,
        page: this.oPageConf.page
      };
      this.$dc.daily
        .list({ data: oData })
        .then((res: any) => {
          let result = res.result.data;
          this.myDaily = result.daily.map((item: any) => item.content);
          this.oPageConf.total = result.total;
        })
        .catch(e => {});
    }
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
