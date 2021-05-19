<template>
  <div class="cropper_box">
    <div class="clear">
      <div class="w55 inline_block left">
        <vue-cropper
          ref="cropper"
          :img="imgFile"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          :info="option.info"
          :can-scale="option.canScale"
          :auto-crop="!autoCrop"
          :auto-crop-width="imgW"
          :auto-crop-height="imgH"
          :fixed="option.fixed"
          :fixed-number="fixedNumber"
        />
      </div>
    </div>
    <div class="w40 dialog_left mgt30">
      <el-button type="primary" @click="uploadImgFun">
        确定
      </el-button>
      <el-button type @click="cancelOnUploadImg">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
import { dataURLtoFile } from '../../../static/utils/utils'
import { upload } from '@/api/api'
import { VueCropper } from 'vue-cropper'
export default {
  components: { VueCropper },
  props: ['imgFile', 'fixedNumber', 'imgW', 'imgH','autoCrop'],
  data() {
    return {
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式type
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 789, // 默认生成截图框宽度
        autoCropHeight: 657, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1] // 截图框的宽高比例
      }
    }
  },
  watch: {
    imgFile: function(file) {
      this.imgFile = file
    }
  },
  methods: {
    cancelOnUploadImg() {
      this.$emit('cancelFun', 'hide')
    },
    // 上传截图后的图片
    uploadImgFun() {
      this.$refs.cropper.getCropData(data => {
        // 提交到服务器
        var files = dataURLtoFile(data, 'head.jpeg')
        var rdata = new FormData()
        rdata.append('uploadFile', files)
        upload(rdata).then(res => {
          document.body.style.cursor = 'auto'
          this.$emit('upload', res.data)
        })
      })
    }
  }

}
</script>
<style>
    .cropper_box .w55{margin: 0 auto;}
    .cropper_box>.clear{padding-bottom: 30px;}
    .cropper_box button{width: 200px;}
    .cropper_box .dialog_left{text-align: center;}
</style>
