<template>
  <div class="app-container">
    <div class="app_content">
      <div class="filter-container">
      <el-input v-model="listQuery.user_name" :placeholder="$t('table.name')" style="width: 200px;margin-right:20px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item"   @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
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
      <el-table-column prop="user_id" label="ID" width="100" align="center" />
      <el-table-column prop="user_create_time" label="创建时间" width="160" align="center" />
      <el-table-column :label="$t('user.name')" prop="user_name" min-width="200" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.user_name" class="edit-input" size="mini" />
            <el-button class="cancel-btn" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">
              cancel
            </el-button>
          </template>
          <span v-else>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_nickname" label="昵称" width="160" align="center" />
      <el-table-column prop="user_phone" label="手机号码" width="160" align="center" />
      <el-table-column :label="$t('table.actions')" align="center" width="450" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEditPassword(scope.row)">
            {{ $t('user.editPassword') }}
          </el-button>
          <el-button v-if="scope.row.user_status" type="info" size="mini" @click="handleputStatus(scope.row)">
            {{ $t('table.disable') }}
          </el-button>
          <el-button v-else size="mini" type="success" @click="handleputStatus(scope.row)">
            {{ $t('table.enable') }}
          </el-button>
          <el-button type="warning" size="mini" @click="handleBindClick(scope.row)">
            {{ $t('action.role') }}
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
    <!-- 分页器 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.list_rows"
      @pagination="fetchData"
    />

    <el-dialog center :visible.sync="addForm.visible" :title="$t('table.add')">
      <el-form ref="addForm" :model="addForm" status-icon label-width="80px">
        <el-form-item :label="$t('user.name')" prop="user_name" clearable>
          <el-input v-model="addForm.user_name" />
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password" clearable>
          <el-input v-model="addForm.password" show-password />
        </el-form-item>
        <el-form-item :label="$t('user.nickname')" prop="user_nickname">
          <el-input v-model="addForm.user_nickname" />
        </el-form-item>
        <el-form-item :label="$t('user.phone')" prop="user_phone">
          <el-input v-model="addForm.user_phone" />
        </el-form-item>
        <el-form-item :label="$t('table.status')" prop="user_status">
          <el-switch v-model="addForm.user_status" />
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

    <el-dialog center :visible.sync="editForm.visible" :title="$t('table.edit')">
      <el-form ref="editForm" :model="editForm" status-icon label-width="80px">
        <el-form-item :label="$t('user.name')" prop="user_name">
          <el-input v-model="editForm.user_name" readonly />
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password">
          <el-input v-model="editForm.password" type="password" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm.visible = false">
          取 消
        </el-button>
        <el-button @click="resetForm('editForm')">
          重置
        </el-button>
        <el-button type="primary" @click="submitForm('editForm', handleEditFormSubmit)">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog center
      v-loading="dialog.loading"
      :title="dialog.textMap[dialog.status]"
      :visible.sync="dialog.bind.visible"
      height="800px"
      width="1200px"
      @close="handleBindDialogClose"
    >
      <el-transfer
        v-show="!dialog.loading"
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
        <span slot-scope="{ option }">{{ option.role_id }} - {{ option.role_name }}</span>
        <pagination
          v-show="transfer.total > 0"
          slot="left-footer"
          :total="transfer.total"
          :page.sync="transfer.listQuery.page"
          :limit.sync="transfer.listQuery.list_rows"
          class="transfer-footer"
          @pagination="fetchRoleData"
        />
      </el-transfer>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { lists as listRole } from '@/api/system/role'
import { lists, get, post, patch, remove, putStatus, putRoles, putPassword } from '@/api/system/user'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from "vuex";

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'danger'
    }
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        list_rows: 20
      },
      addForm: {
        user_name: '',
        password: '',
        user_nickname: '',
        user_phone: '',
        user_status: true,
        visible: false
      },
      editForm: {
        user_id: 0,
        user_name: '',
        password: '',
        visible: false
      },
      dialog: {
        textMap: {
          bind: this.$t('action.role')
        },
        bind: {
          visible: false
        },
        status: '',
        loading: false
      },
      transfer: {
        total: 0,
        listQuery: {
          page: 1,
          list_rows: 1000
        },
        row: {},
        data: [],
        value: [],
        props: {
          key: 'role_id',
          label: 'role_name'
        }
      }
    }
  },
  watch: {},
  created() {
    this.$store.dispatch('GetSysGroups')
    this.fetchData()
  },
  computed: {
    ...mapGetters(["sys_groups"])
  },
  methods: {
    fetchData() {
      this.listLoading = true
      lists(this.listQuery).then(res => {
        // 处理inlieEdit，保存原始值
        this.list = res.data.data.map(v => {
          this.$set(v, 'edit', false)
          v.originalName = v.user_name
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
      remove({id: row.user_id}).then(() => {
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
      row.user_name = row.originalName
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      const user_name = row.user_name
      patch(row.user_id, {
        user_name
      }).then(() => {
        row.originalName = user_name
      })
      this.$message({
        message: this.$t('action.success'),
        type: 'success'
      })
    },
    handleBindDialogClose() {
      // 取消已选中
      this.transfer.value = []
    },
    handleBindClick(row) {
      this.dialog.bind.visible = true
      this.transfer.row = row
      this.dialog.status = 'bind'
      this.bindRole(row.user_id)
    },
    bindRole(user_id) {
      this.dialog.loading = true
      return this.fetchRoleData().finally(() => {
        this.dialog.loading = false
      })
    },
    fetchRoleData() {
      this.transfer.listQuery.role_group = this.sys_groups[0].group_name
      return listRole(this.transfer.listQuery).then(res => {
        this.transfer.total = res.data.total
        return res.data.data
      }).then((roleList) => {
        get({id: this.transfer.row.user_id}).then((res) => {
          const map = new Map()
          roleList = res.data.user_roles.concat(roleList).filter((r) => !map.has(r.role_id) && map.set(r.role_id, 1))
          this.transfer.data = roleList
          this.transfer.value = res.data.user_roles.map((v) => {
            return v.role_id
          })
        })
      })
    },
    handleputStatus(row) {
      putStatus({id: row.user_id, user_status: !row.user_status}).then(() => {
        row.user_status = !row.user_status
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      })
    },
    handleTransferChange(role_ids) {
      this.dialog.loading = true
      putRoles({id: this.transfer.row.user_id, role_ids: role_ids}).then(() => {
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      }).finally(() => {
        this.dialog.loading = false
      })
    },
    handleEditPassword(row) {
      this.editForm.user_id = row.user_id
      this.editForm.user_name = row.user_name
      this.editForm.visible = true
    },
    handleEditFormSubmit() {
      putPassword({id: this.editForm.user_id, password: this.editForm.password}).then(res => {
        this.editForm.visible = false
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
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
.transfer-footer {
  position: relative;
  bottom: 45px;
}
</style>
