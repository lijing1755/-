<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="item in sys_groups" :key="item.id" :label="item.group_name_zn" :name="item.group_name"></el-tab-pane>
  </el-tabs>
</template>

<script>
import pathToRegexp from "path-to-regexp";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: ['activeName'],
  data() {
    return {

    };
  },
  watch: {

  },
  computed: {
    ...mapGetters(["sys_groups"])
  },
  created() {

  },
  methods: {
    handleClick() {
      console.log(this.activeName)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    display: flex;
    align-items: center;
    color: #97a8be;
    cursor: text;
  }
}
</style>
