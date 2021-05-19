<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304155"
      text-color="#FFFFFF"
      active-text-color="#ffffff"
    >
    <el-menu-item index="1">
      <template>
        <div style="width:100%; font-size:20px">{{systemName}}</div>
      </template>
    </el-menu-item>
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      systemName: process.env.VUE_APP_SYSTEM_NAME
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created(){
    // console.log(this.permission_routers,"22222222222222222")
  }
}
</script>
