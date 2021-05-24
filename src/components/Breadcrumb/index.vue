<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        v-if="item.meta.title && index == levelList.length - 1"
        :key="item.path"
      >
        <!-- <i class="el-icon-edit"></i> -->
        <div
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          <div>{{ item.meta.title }}</div>
        </div>
        <router-link v-else :to="item.redirect || item.path">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      levelList: null,
      options: [],
      value: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  computed: {
    ...mapGetters(["school_list"]),
    school_id: {
      get() {
        return this.$store.state.user.school_id;
      },
      set(newValue) {
        this.$store.state.user.school_id = newValue;
      }
    },
    organization_name() {
      return localStorage.getItem('organization_name')
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const { params } = this.$route;
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          var toPath = pathToRegexp.compile(item.path);
          item.path = toPath(params);
          return true;
        }
      });
      const first = matched[0];
      if (first && first.name !== "首页") {
        matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
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
    color: #fff;
    cursor: text;
  }
}
</style>
