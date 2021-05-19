<template>
  <div>
    <el-dialog center :visible.sync="addForm.visible" fullscreen :title="$t('table.add')">
      <el-form ref="addForm" :model="addForm" class="form-container" status-icon label-width="200px">
        <el-form-item :label="$t('submerchant.areaCode')" prop="areaCode">
          <el-input v-model="addForm.areaCode" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.bankAccountHolderName')" prop="bankAccountHolderName">
          <el-input v-model="addForm.bankAccountHolderName" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.bankAccountName')" prop="bankAccountName">
          <el-input v-model="addForm.bankAccountName" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.bankAccountNo')" prop="bankAccountNo">
          <el-input v-model="addForm.bankAccountNo" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.bankAccountType')" prop="bankAccountType">
          <el-input v-model="addForm.bankAccountType" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.bankLineNumber')" prop="bankLineNumber">
          <el-input v-model="addForm.bankLineNumber" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.businessLicenseExpiredDate')" prop="businessLicenseExpiredDate">
          <el-input v-model="addForm.businessLicenseExpiredDate" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.businessLicenseImage')" prop="businessLicenseImage">
          <el-input v-model="addForm.businessLicenseImage" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.businessLicenseNo')" prop="businessLicenseNo">
          <el-input v-model="addForm.businessLicenseNo" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.legalPersonIdentificationBackendImage')" prop="legalPersonIdentificationBackendImage">
          <el-upload
            ref="upload"
            :show-file-list="false"
            :auto-upload="false"
            :on-success="(res,file)=>{return handleUploadSuccess(res,file)}"
            :on-error="handleError"
            :on-change="(file)=>{return fileChange(file)}"
            class="uploader"
            action="javascript:void"
            accept="image/jpeg, image/jpg, image/png"
          >
            <img v-if="addForm.legalPersonIdentificationBackendImage" :src="addForm.legalPersonIdentificationBackendImage" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon" />
          </el-upload>
          <span>建议上传图片比例为1:1</span>
        </el-form-item>
        <el-form-item :label="$t('submerchant.legalPersonIdentificationExpiredDate')" prop="legalPersonIdentificationExpiredDate">
          <el-input v-model="addForm.legalPersonIdentificationExpiredDate" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.legalPersonIdentificationFrontImage')" prop="legalPersonIdentificationFrontImage">
          <el-upload
            ref="upload"
            :show-file-list="false"
            :auto-upload="false"
            :on-success="(res,file)=>{return handleUploadSuccess(res,file)}"
            :on-error="handleError"
            :on-change="(file)=>{return fileChange1(file)}"
            class="uploader"
            action="javascript:void"
            accept="image/jpeg, image/jpg, image/png"
          >
            <img v-if="addForm.legalPersonIdentificationFrontImage" :src="addForm.legalPersonIdentificationFrontImage" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon" />
          </el-upload>
          <span>建议上传图片比例为1:1</span>
        </el-form-item>
        <el-form-item :label="$t('submerchant.legalPersonIdentificationNo')" prop="legalPersonIdentificationNo">
          <el-input v-model="addForm.legalPersonIdentificationNo" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.legalPersonIdentificationType')" prop="legalPersonIdentificationType">
          <el-select v-model="addForm.legalPersonIdentificationType" style="width: 200px;" class="filter-item" placeholder="请选择">
            <el-option label="身份证" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('submerchant.legalPersonName')" prop="legalPersonName">
          <el-input v-model="addForm.legalPersonName" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.merchantId')" prop="merchantId">
          <el-input v-model="addForm.merchantId" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.name')" prop="name">
          <el-input v-model="addForm.name" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.settleCycle')" prop="settleCycle">
          <el-input v-model="addForm.settleCycle" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.settleMode')" prop="settleMode">
          <el-select v-model="addForm.settleMode" style="width: 200px;" class="filter-item" placeholder="请选择">
            <el-option label="T" value="T" />
            <el-option label="D" value="D" />
            <el-option label="D0" value="D0" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('submerchant.settleTargetType')" prop="settleTargetType">
          <el-select v-model="addForm.settleTargetType" style="width: 200px;" class="filter-item" placeholder="请选择">
            <el-option label="BANK_ACCOUNT" value="BANK_ACCOUNT" />
            <el-option label="CHANNEL_ACCOUNT" value="CHANNEL_ACCOUNT" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('submerchant.shortName')" prop="shortName">
          <el-input v-model="addForm.shortName" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.telephone')" prop="telephone">
          <el-input v-model="addForm.telephone" clearable />
        </el-form-item>
        <el-form-item :label="$t('submerchant.type')" prop="type">
          <el-select v-model="addForm.type" style="width: 200px;" class="filter-item" placeholder="请选择">
            <el-option label="PERSONAL" value="PERSONAL" />
            <el-option label="ENTERPRISE" value="ENTERPRISE" />
            <el-option label="CHANNEL" value="CHANNEL" />
            <el-option label="INNER" value="INNER" />
            <el-option label="MINI" value="MINI" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('submerchant.useUSCC')" prop="useUSCC">
          <el-switch v-model="addForm.useUSCC" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addForm.visible = false">
          取 消
        </el-button>
        <el-button @click="resetForm('addForm')">
          重置
        </el-button>
        <el-button type="primary" @click="submitForm('addForm', handleAddFormSubmit)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { upload } from '@/api/system/image'

export default {
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'danger'
    }
  },
  data() {
    return {
      addForm: {
        areaCode: '',
        bankAccountHolderName: '',
        bankAccountName: '',
        bankAccountNo: '',
        bankAccountType: '',
        bankLineNumber: '',
        businessLicenseExpiredDate: '',
        businessLicenseImage: '',
        businessLicenseNo: '',
        legalPersonIdentificationBackendImage: '',
        legalPersonIdentificationExpiredDate: '',
        legalPersonIdentificationFrontImage: '',
        legalPersonIdentificationNo: '',
        legalPersonIdentificationType: '',
        legalPersonName: '',
        merchantId: '',
        name: '',
        settleCycle: '',
        settleMode: '',
        settleTargetType: '',
        shortName: '',
        telephone: '',
        type: '',
        useUSCC: false,
        visible: true
      }

    }
  },
  watch: {},
  created() {

  },
  methods: {
    handleError() {
      this.$message({
        type: 'error',
        message: '服务器开了小差，请稍后再试'
      })
    },
    fileChange(file) {
      if (!this.isLt2M(file)) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      var formData = new FormData()
      formData.append('file', file.raw)
      formData.append('target', this.IMAGE_TARGET.CHANNEL_LOGO)
      formData.append('userId', -1)
      upload(formData).then(res => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.addForm.legalPersonIdentificationBackendImage = URL.createObjectURL(file.raw)
        this.addForm.logoImage = res.data.fileName
      })
    },
    fileChange1(file) {
      if (!this.isLt2M(file)) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      var formData = new FormData()
      formData.append('file', file.raw)
      formData.append('target', this.IMAGE_TARGET.CHANNEL_LOGO)
      formData.append('userId', -1)
      upload(formData).then(res => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.addForm.legalPersonIdentificationFrontImage = URL.createObjectURL(file.raw)
      })
    }
  }
}
</script>
<style >
.form-container {
    width: 80%;
    margin: 50px;
}
.uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader .el-upload:hover {
  border-color: #409eff;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uploader-img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
