<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.w_auto {
  width: auto !important;
}
.block {
  margin-top: 10px;
}
.filter-container .el-input--suffix .el-input__inner{
  padding-right: 2px;
}
.el-date-editor .el-range-separator{
  width: 7%;
}
.quill_uploader{display: none;}
.w55{width: 800px; height: 700px;}
  .total_data{
    clear: both;
    overflow: hidden;
    padding: 0;
    margin-bottom: 0;
  }
  .total_data li{float: left; padding-right: 40px; list-style: none; margin-bottom: 6px;}
  .list{
    border: 1px solid #ccc;
    padding: 48px;
    margin: 24px 1% 0 0;
    box-sizing: border-box;
  }
  .img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 12px;
    vertical-align: middle;
  }
  .title{
    padding: 4px 12px;
    box-sizing: border-box;
    margin: 24px 0 0;
    border-left: 2px solid #409EFF;
  }
  .edit{
    color: #409EFF;
    &:hover{
      cursor: pointer;
    }
  }
  .flex{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .inline-flex{
      align-items: center;
      display: inline-flex;
    }
  }
  .uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 80px;
    height: 80px;
    overflow: hidden;
  }
  .uploader{
    img{
      width: 100%;
      height: auto;
    }
  }
  .uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
.summary_num{display:inline-block; margin-right: 15px; float: left;}
.clear{clear: both; overflow: hidden;}
.el-dialog__header {
    text-align: left;
    padding-left: 30px;
}
.el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
.el-select--medium {
  width: 100%;
}
</style>
