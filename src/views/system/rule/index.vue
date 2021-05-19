<template>
  <div class="app-container">
    <div class="app_content">
      <el-tabs v-model="listQuery.rule_group" @tab-click="changeGroups">
        <el-tab-pane v-for="item in sys_groups" :key="item.id" :label="item.group_name_zn" :name="item.group_name">
        </el-tab-pane>
      </el-tabs>
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.rule_name" :placeholder="$t('table.name')" style="width: 200px;margin-right:20px" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <!-- <el-button v-waves class="filter-item"  @click="handleFilter">
        {{ $t('table.search') }}
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;"  @click="handleAdd">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" prop="rule_id" width="100" align="center" />
      <el-table-column :label="$t('table.createTime')" prop="rule_create_time" width="200" align="center" />
      <el-table-column :label="$t('table.name')" prop="rule_name" min-width="350" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.rule_name" class="edit-input" size="mini" />
            <el-button class="cancel-btn" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">
              cancel
            </el-button>
          </template>
          <span v-else>{{ scope.row.rule_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">
            {{ $t('table.confirm') }}
          </el-button>
          <el-button v-else type="primary" size="mini" @click="scope.row.edit=!scope.row.edit">
            {{ $t('table.edit') }}
          </el-button>
          <el-button type="warning" size="mini" @click="handleBindClick(scope.row)">
            {{ $t('action.resource') }}
          </el-button>
          <el-button v-if="scope.row.rule_status" type="info" size="mini" @click="handlePatchStatus(scope.row)">
            {{ $t('table.disable') }}
          </el-button>
          <el-button v-else size="mini" type="success" @click="handlePatchStatus(scope.row)">
            {{ $t('table.enable') }}
          </el-button>
          <el-popover
            v-model="scope.row.removePopoverVisble"
            placement="top"
            width="160"
            style="margin-left: 10px"
          >
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.removePopoverVisble = false">
                取消
              </el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.row)">
                确定
              </el-button>
            </div>
            <el-button slot="reference" size="mini" type="danger">
              {{ $t('table.delete') }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.list_rows"
      @pagination="fetchData"
    />

    <el-dialog center :visible.sync="addForm.visible" :title="$t('table.add')">
      <el-form ref="addForm" :model="addForm" status-icon label-width="80px">
        <el-form-item :label="$t('table.name')" prop="rule_name" clearable>
          <el-input v-model="addForm.rule_name" />
        </el-form-item>
        <el-form-item :label="$t('table.status')" prop="rule_status">
          <el-switch v-model="addForm.rule_status" />
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

    <el-dialog center
      :title="dialog.textMap[dialog.status]"
      :visible.sync="dialog.bind.visible"
      height="800px"
      width="1200px"
      @close="handleBindDialogClose"
    >
      <div v-loading="dialog.loading">
        <el-select
          v-model="dialog.bind.activeResourceType"
          style="padding-bottom: 20px"
          @change="handleResourceTypeChange"
        >
          <el-option
            v-for="item in dialog.bind.resourceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button v-if="ifTree()" type="primary" @click="handleTreeSubmit">
          {{ $t('table.submit') }}
        </el-button>

        <el-tree
          v-if="ifTree()"
          ref="elementTree"
          :data="tree.data"
          :props="tree.props"
          node-key="ele_id"
          show-checkbox
          default-expand-all
        />

        <div v-if="ifTransfer()">
          <el-transfer
            v-model="transfer.value"
            :data="transfer.data"
            :props="transfer.props"
            :titles="[$t('transfer.toBinding'), $t('transfer.binded')]"
            :button-texts="[$t('transfer.unbind'), $t('transfer.bind')]"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            class="transfer-class"
            filterable
            @change="handleTransferChange"
          >
            <span slot-scope="{ option }">{{ option.api_name }} - {{ option.api_http_method }} - {{ option.api_endpoint }}</span>
          </el-transfer>
          <pagination
            v-show="transfer.total > 0"
            slot="left-footer"
            :total="transfer.total"
            :page.sync="transfer.listQuery.page"
            :limit.sync="transfer.listQuery.list_rows"
            class="transfer-footer"
            @pagination="fetchApiData"
          />
        </div>
      </div>
    </el-dialog>
      </div>
  </div>
</template>

<script>
import { lists as listApi } from '@/api/system/api'
import { listTree as listElementTree } from '@/api/system/element'
import { lists, get, post, editName, remove, patchStatus, putResources } from '@/api/system/rule'
import Pagination from '@/components/Pagination'
import treeTransfer from 'el-tree-transfer'
import waves from '@/directive/waves'
import { mapGetters } from "vuex";

export default {
  components: { Pagination, treeTransfer },
  directives: { waves },
  filters: {
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        list_rows: 20,
        rule_group: ''
      },
      addForm: {
        rule_name: '',
        rule_status: true,
        visible: false
      },
      dialog: {
        textMap: {
          bind: this.$t('action.resource')
        },
        bind: {
          resourceTypeOptions: [
            // {
            //   value: 'API',
            //   label: '接口'
            // },
            {
              value: 'ELEMENT',
              label: '元素'
            }
          ],
          activeResourceType: 'ELEMENT',
          visible: false
        },
        status: '',
        loading: false
      },
      transfer: {
        total: 0,
        listQuery: {
          page: 1,
          list_rows: 20
        },
        row: {},
        data: [],
        value: [],
        props: {
          key: 'api_id',
          label: 'api_name'
        },
        title: ['绑定', '资源']
      },
      tree: {
        row: {},
        data: {},
        props: {
          children: 'children',
          label: (data, node) => `${data.ele_name} - ${data.ele_key}`
        }
      }
    }
  },
  watch: {},
  created() {
    this.$store.dispatch('GetSysGroups').then(res=>{
      this.listQuery.rule_group = res[0].group_name
      this.fetchData();
    })
  },
  computed: {
    ...mapGetters(["sys_groups"])
  },
  methods: {
    changeGroups() {
      this.fetchData()
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
    },
    fetchData() {
      this.listLoading = true
      lists(this.listQuery).then(res => {
        // 处理inlieEdit，保存原始值
        this.list = res.data.data.map(v => {
          this.$set(v, 'edit', false)
          v.originalName = v.rule_name
          return v
        })
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleAdd() {
      this.addForm.visible = true
      this.$nextTick(() => {
        this.$refs['addForm'].resetFields()
      })
    },
    handleAddFormSubmit() {
      this.addForm.rule_group = this.listQuery.rule_group
      this.addForm.rule_status = this.addForm.rule_status?1:0
      post(this.addForm).then(() => {
        this.listQuery.page = 1
        return this.fetchData()
      }).then((res) => {
        this.addForm.visible = false
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      })
    },
    handleDelete(row) {
      remove({id: row.rule_id}).then(() => {
        return this.fetchData()
      }).then(() => {
        row.removePopoverVisble = false
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      })
    },
    cancelEdit(row) {
      row.rule_name = row.originalName
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      const rule_name = row.rule_name
      editName({id: row.rule_id, rule_name: rule_name }).then(() => {
        row.originalName = rule_name
      })
      this.$message({
        message: this.$t('action.success'),
        type: 'success'
      })
    },
    ifTree() {
      return !this.dialog.loading && this.dialog.bind.activeResourceType === 'ELEMENT'
    },
    ifTransfer() {
      return !this.dialog.loading && this.dialog.bind.activeResourceType === 'API'
    },
    handleBindDialogClose() {
      // 取消已选中
      if (this.ifTree()) {
        this.$refs.elementTree.setCheckedKeys([])
        return
      }

      if (this.ifTransfer) {
        this.transfer.value = []
        return
      }
    },
    handleBindClick(row) {
      this.dialog.bind.visible = true
      this.transfer.row = row
      this.dialog.status = 'bind'
      this.handleBindResource(row.rule_id, this.dialog.bind.activeResourceType)
    },
    handleBindResource(rule_id, resourceType) {
      this.dialog.loading = true
      return (() => {
        switch (resourceType) {
          case 'API':
            return this.handleBindApi(rule_id)
          case 'ELEMENT':
            return this.handleBindElement(rule_id)
          default :
            return new Promise()
        }
      })().finally(() => {
        this.dialog.loading = false
      })
    },
    handleBindElement(rule_id) {
      return listElementTree({ele_group: this.listQuery.rule_group}).then((res) => {
        this.tree.data = res.data
      }).then(() => {
        // 获取本rule对应的资源信息
        get({id: rule_id}).then(res => {
          console.log(res)
          res.data.resources.ELEMENT.forEach(item => {
                this.$refs.elementTree.setChecked(item.ele_id, true, false)
              })
          // this.$refs.elementTree.setCheckedKeys(
          //   res.data.resources.ELEMENT.filter(v => v.ele_parent_id).map((v) => {
          //     return v.ele_id
          //   })
          // )
        })
      })
    },
    handleBindApi(rule_id) {
      // 获取全部api
      return this.fetchApiData()
    },
    fetchApiData() {
      console.log(98989)
      return listApi(this.transfer.listQuery).then(res => {
        this.transfer.total = res.data.total
        return res.data.data
      }).then((apiList) => {
        // 获取本rule对应的资源信息
        get(this.transfer.row.rule_id).then(res => {
          const map = new Map()
          apiList = res.data.resources.API.concat(apiList).filter((r) => !map.has(r.api_id) && map.set(r.api_id, 1))
          this.transfer.data = apiList
          this.transfer.value = res.data.resources.API.map((v) => {
            return v.api_id
          })
        })
      })
    },
    handleResourceTypeChange(value) {
      this.handleBindResource(this.transfer.row.rule_id, value)
    },
    handleTreeSubmit() {
      this.dialog.loading = true
      const checkedKeys = this.$refs.elementTree.getCheckedKeys()
      // transfer 和 tree改变的是同一个rule
      putResources({id: this.transfer.row.rule_id, resource_ids: checkedKeys, resource_type: 'ELEMENT'}).then(() => {
        return this.handleBindElement(this.transfer.row.rule_id)
      }).then(() => {
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      }).finally(() => {
        this.dialog.loading = false
      })
    },
    handleTransferChange(resource_ids) {
      this.dialog.loading = true
      putResources(this.transfer.row.rule_id, resource_ids, 'API').then(() => {
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      }).finally(() => {
        // this.dialog.loading = false
      })
    },
    handlePatchStatus(row) {
      patchStatus({id: row.rule_id, rule_status: !row.rule_status?1:0}).then(() => {
        row.rule_status = !row.rule_status
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.transfer-class {
  text-align: left;
  display: inline-block;
}
.transfer-class .el-transfer-panel {
  width: 450px;
}
.transfer-class .el-transfer-panel__body {
  height: 450px;
}
.transfer-class .el-transfer-panel__list {
  height: 500px;
}

.transfer-footer.pagination-container {
  position: relative;
  bottom: 45px;
}
</style>
