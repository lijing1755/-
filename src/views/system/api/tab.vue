<template>
  <div class="tab-container">
    <span style="margin-bottom: 20px;">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-circle-plus-outline"
        @click="addForm.visible = true"
      >
        添加组别
      </el-button>
    </span>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" closable @tab-remove="handleRemoveTab">
      <el-tab-pane v-for="item in dataList" :key="item.api_group_name" :name="item.api_group_name">
        <span slot="label" @dblclick="handleEditTab(item)">
          <el-tooltip effect="dark" content="双击编辑" placement="bottom-start">
            <el-button type="text">{{ item.api_group_name }}</el-button>
          </el-tooltip>
        </span>
        <keep-alive>
          <tab-pane v-if="activeName==item.api_group_name" :group_id="item.api_group_id" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <el-dialog center :visible.sync="addForm.visible" title="新增组别">
      <el-form ref="addForm" :model="addForm" :rules="rules" status-icon label-width="80px" style="width: 400px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" clearable />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addForm.description" type="textarea" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addForm.sort" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addForm.visible = false">
          取 消
        </el-button>
        <el-button @click="resetForm('addForm')">
          重置
        </el-button>
        <el-button type="primary" @click="submitForm('addForm', submitAddForm)">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog center :visible.sync="editForm.visible" title="编辑组别">
      <el-form ref="editForm" :model="editForm" :rules="rules" status-icon label-width="80px" style="width: 400px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" clearable />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="editForm.description" type="textarea" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="editForm.sort" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm.visible = false">
          取 消
        </el-button>
        <el-button @click="resetForm('editForm')">
          重置
        </el-button>
        <el-button type="primary" @click="submitForm('editForm', submitEditForm)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, edit, remove } from '@/api/system/apiGroup'
import tabPane from './components/tabPane'

export default {
  name: 'Tab',
  components: { tabPane },
  data() {
    return {
      dataList: null,
      listQuery: {},
      activeName: '',
      addForm: {
        name: '',
        description: '',
        sort: 1,
        visible: false
      },
      editForm: {
        name: '',
        description: '',
        sort: 1,
        visible: false
      },
      rules: {
        name: [
          { required: true, message: '请输入组别名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填入组别描述信息', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入组别排序', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData().then(() => {
      this.activeName = this.dataList[0].api_group_name
    })
  },
  methods: {
    fetchData() {
      return list(this.listQuery).then(res => {
        this.dataList = res.data
      })
    },
    handleEditTab(targetTab) {
      this.editForm.id = targetTab.api_group_id
      this.editForm.name = targetTab.api_group_name
      this.editForm.description = targetTab.api_group_description
      this.editForm.sort = targetTab.api_group_sort
      this.editForm.visible = true
    },
    handleRemoveTab(targetName) {
      this.dataList.forEach((tab, index) => {
        if (tab.api_group_name === targetName) {
          remove(tab.api_group_id).then(res => {
            const nextTab = this.dataList[index + 1] || this.dataList[index - 1]
            if (nextTab) {
              this.activeName = nextTab.api_group_name
              this.dataList = this.dataList.filter(tab => tab.api_group_name !== targetName)
              return
            }
          })
        }
      })
    },
    submitAddForm() {
      add(this.addForm).then(res => {
        this.fetchData()
      }).then(() => {
        this.activeName = this.addForm.name
      }).finally(() => {
        this.addForm.visible = false
      })
    },
    submitEditForm() {
      edit(this.editForm.id, this.editForm).then(res => {
        this.fetchData()
      }).then(() => {
        this.activeName = this.editForm.name
      }).finally(() => {
        this.editForm.visible = false
      })
    },
    submitForm(formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        callback()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
