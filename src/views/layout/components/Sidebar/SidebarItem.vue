<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">


    
    <el-submenu :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0&&!child.childrenHidden"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
        <app-link v-else :key="child.name" :to="resolvePath(child.path)">
          <el-menu-item :index="resolvePath(child.path)" :class="[(child.meta && !child.meta.icon)?'pl_47':'']" class="child_item">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { validateURL } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  created() {
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return validateURL(routePath)
    }
  }
}
</script>
<style>
  /* .el-submenu__icon-arrow , .el-icon-arrow-down{
    color: #fff !important;
  } */
    .pl_47 {
    padding-left: 47px !important;
  }
  .el-submenu__title i {
    color: #fff !important;
  }
  .el-menu--collapse .el-submenu__title i {
    color: #fff !important;
    text-align: center !important;
    padding: 0 !important;
    margin-right: 0 !important;
  }
    .el-menu--collapse .el-submenu__title{
    text-align: center !important;
    padding: 0 !important;
    padding-left: 0 !important;
  }
  .el-submenu {
    /* margin-right: 0 !important; */
  }
  .el-submenu__icon-arrow {
    color: #fff !important;
  }
</style>