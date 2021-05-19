<template>
  <div>
    <div style="width:100%;display:flex" v-if="fileList.length != 0">
      <div class="file-box" :key="item.url" v-for="(item, index) in fileList" :style="{width:!type?'100px':''}">
        <span v-if="!isLook" class="file-del" @click="delFile(index)">X</span>
        <el-image
          :preview-src-list="srcList"
          fit="cover"
          :src="item"
          style="width:100%;hight:100%"
          v-if="!type"
        ><div slot="error" class="image-slot"></div>
        </el-image>
        <video
          v-else
          style="width: 100%;height:300px"
          :src="item"
          controls
        ></video>
      </div>
    </div>
    <el-button @click="onBeforeUpload" v-if="type && fileList.length == 0"
      >选择视频</el-button
    >
    <ImgCutter
    :sizeChange='!sizeChange'
    :cutWidth='cutWidth'
    :cutHeight='cutHeight'
      @cutDown="cutDown"
      v-if="
        (!type && (!this.num && this.fileList.length == 0)) ||
          (this.num && this.fileList.length < 9)
      "
    ></ImgCutter>
  </div>
</template>

<script>
import OSS from "ali-oss";
import { mapGetters } from "vuex";
import { uploadImage, ossUploadFile } from "@/utils/request";
import ImgCutter from "vue-img-cutter";
import {dateformat} from '@/utils'
export default {
  name: "upload",
  components: { ImgCutter },
  data() {
    return {
      base: process.env.VUE_APP_BASE_IMG,
      loading: false,
      client: null
    };
  },
  props: {
    sizeChange:Boolean,
    cutHeight:Number,
    cutWidth:Number,
    fileList: Array,
    srcList: Array,
    name: String,
    num: Boolean,
    isLook: Boolean,
    type: Boolean //视频图片
  },
  computed: {
    ...mapGetters(["oss"])
  },
  mounted() {
    this.getOss();
  },
  methods: {
    getOss() {
      console.log(this.oss);
      let {
        oss_access_id,
        OSS_access_key,
        oss_endpoint,
        oss_test_bucket
      } = this.oss;
      this.client = new OSS({
        secure:true,
        region: oss_endpoint,
        accessKeyId: oss_access_id,
        accessKeySecret: OSS_access_key,
        bucket: oss_test_bucket
      });
    },

    //裁剪图片
    cutDown: function(res) {
      // if (!this.num && this.fileList.length != 0) {
      //   this.$message.warning("只能选择1个文件!");
      //   return false;
      // }
      console.log(res);
      this.checkFile(res.file);
    },
    close() {
      this.$emit("changevisible");
      // console.log(this.themeVisible);
    },
    changeTime(e) {
      console.log(e);
      this.form.start_time = e[0];
      this.form.end_time = e[1];
    },
    delFile(index) {
      this.srcList.splice(index, 1);
      this.fileList.splice(index, 1);
      console.log(this.fileList);
      this.$emit("addFile", false, this.name, index);
    },
    checkStr(arr, type) {
      return arr.some(item => {
        return item == type;
      });
    },
    onBeforeUpload() {
      if (!this.num && this.fileList.length != 0) {
        this.$message.warning("只能选择1个文件!");
        return false;
      }
      let input = document.createElement("input");
      input.addEventListener("change", this.checkFile, false);
      input.type = "file";
      input.accept = "video/*";
      input.click();
    },
    checkFile(file) {
      
      console.log(file);
      // console.log(file.path[0].files[0],11111111111111111);
      this.loading = this.$loading({
        lock: true,
        text: "文件上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let from = new FormData();
      if (this.type) {
        //上传视频
        var url = URL.createObjectURL(file.target.files[0]);
        //经测试，发现audio也可获取视频的时长
        var audioElement = new Audio(url);

        var duration;
        audioElement.addEventListener("loadedmetadata", _event => {
          duration = audioElement.duration;
          console.log(parseInt(duration), "秒数");
          // this.addForm.second.push(parseInt(duration));
        });
        // from.append("upload_file", file.path[0].files[0]);
        // ossUploadFile(from).then(res => {
        //   this.loading.close();
        //   this.fileList.push(this.base + res.data);
        //   this.srcList.push(this.base + res.data);
        //   this.$emit("addFile", res.data, this.name, parseInt(duration));
        // });
        this.client
          .multipartUpload('/upload/file/'+dateformat()+'/'+new Date().getTime()+'/'+file.target.files[0].name, file.target.files[0])
          .then(res => {
            console.log(res, "oss直传");
            let str = res.res.requestUrls[0]
              ? res.res.requestUrls[0].split("?")[0]
              : "";
            this.loading.close();
            this.fileList.push(str);
            this.srcList.push(str);
            this.$emit("addFile", res.name, this.name, parseInt(duration));
          });
      } else {
        //上传图片
        from.append("uploadImageName", file);
        uploadImage(from).then(res => {
          this.loading.close();
          this.fileList.push(this.base + res.data);
          this.srcList.push(this.base + res.data);

          this.$emit("addFile", res.data, this.name);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.file-box {
  width: 500px;
  height: auto;
  margin-right: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.file-del {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 15px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  text-align: center;
  z-index: 10;
  line-height: 20px;
}
</style>
