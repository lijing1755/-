<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <breadcrumb />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="">
          <svg-icon icon-class="user" style="margin-right:10px" />
          <span style="margin-right:10px">{{ user_nickname }}</span>
          <span style="margin-right:10px">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link class="inlineBlock" to="/"> -->
          <el-dropdown-item>
            <div @click="show_dialog">
              修改密码
            </div>
          </el-dropdown-item>
          <!-- </router-link> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <!-- <el-dialog title="修改密码" :visible.sync="show" width="30%"></el-dialog> -->
    <el-drawer title="修改密码" :visible.sync="show">
      <div style="width:100%;padding:20px">
        <el-form label-width="80">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入新密码" size="mini" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" placeholder="请确认密码" size="mini" show-password></el-input>

        </el-form-item>
      </el-form>
        <el-button size="mini" @click="submit">保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import {
  putMyPassword
} from "@/api/system/user";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "user_nickname"])
  },
  data() {
    return {
      show: false,
      form:{
        password:'',
        confirmPassword:''
      }
    };
  },
  methods: {
    show_dialog() {
      this.show = true
    },
    submit() {
      putMyPassword(this.form).then(res=>{
        this.show = false
            this.$message({
              message: this.$t("action.success"),
              type: "success"
            });
      })
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
