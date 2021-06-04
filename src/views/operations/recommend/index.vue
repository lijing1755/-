<template>
  <div class="app-container" style="padding: 24px">
    <div class="app_content">
      <!-- <el-upload
        class="avatar-uploader"
        :action="API"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-error='errorr'>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
      <el-upload
        class="avatar-uploader"
        :action="API"
        ref="name"
        name='uploadImageName'
        accept="image/jpeg,image/png"
        :show-file-list='false'
        :before-upload="beforeAvatarUpload"
        :on-success='handleAvatarSuccess'
        :on-error='errorr'
        :on-change='onChange'
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="radio">
        <el-radio v-model="radio" label="1">URL</el-radio>
        <el-radio v-model="radio" label="2">商品ID</el-radio>
      </div>
      <div class="input">
        <el-input v-model="input" :placeholder="radio==1?'请输入URL路径':'请输入商品ID'"></el-input>
      </div>
      <div class="radio">
        是否启用
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
      <div class="radio">
        <el-button @click="submit" type="success" icon="el-icon-check">保存提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  headPageInfo,
  editHeadPage
} from '@/api/system/activate'
export default {
  data() {
    return {
      API:process.env.VUE_APP_API+'/system/uploadImage',
      imageUrl: '',
      radio:'1',
      input:'',
      value:false,
      URL:'https://jupinshop.oss-cn-shenzhen.aliyuncs.com/',
    }
  },
  watch: {

  },
  created() {
    this.headPageInfo()
  },
  computed: {
 
  },
  methods: {
    onChange(file, fileList){
      console.log('???????')
      console.log(file)
      console.log(fileList)
    },
    errorr(err, file, fileList){
      console.log('上传失败')
      console.log(err)
      console.log(file)
      console.log(efileListr)
    },
    headPageInfo (){
      headPageInfo().then(res => {
        console.log('返回的数据',res)
          this.imageUrl = res.data.head_pic;
          this.radio = res.data.type+'';
          this.input = res.data.type_name;
          this.value = res.data.is_use==1?true:false
      })
    },
    submit (){
      let data = {
        head_pic : this.imageUrl,
        type : this.radio,
        type_name : this.input,
        is_use : this.value?'1':'0'
      };
      editHeadPage(data).then(res => {
        console.log('++++++++++',res)
        this.$message({
          message: '提交成功',
          type: 'success'
        });
        console.log(data);
      })
      
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = this.URL+res.imgPath;
      
      this.$refs.name.clearFiles()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      return isJPG && isLt2M;
    }
  },
};
</script>

<style>
.el-tree-node__content{
  height: 50px;
  /* background: #E3E8F3; */
}
.el-tree-node__children{
  background: #fff;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  height: 50px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  /* height: 178px; */
  display: block;
}
.radio{
  margin: 20px 0px;
}
</style>
