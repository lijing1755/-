<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.role_name" :placeholder="$t('table.name')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAdd">
        {{ $t('table.add') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-refresh" @click="handleReload">
        刷新
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.api_id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.name')" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.api_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.api.endpoint')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.api_endpoint }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.api.httpMethod')" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.api_http_method }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.tag')" min-width="130px" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(api_tag, index) in scope.row.api_tags" :key="index">
            {{ api_tag.api_tag_name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            {{ $t('table.edit') }}
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

    <el-dialog center :visible.sync="addForm.visible" :title="$t('table.add')">
      <el-form ref="addForm" :model="addForm" status-icon label-width="80px">
        <el-form-item :label="$t('table.name')" prop="api_name">
          <el-input v-model="addForm.api_name" clearable />
        </el-form-item>
        <el-form-item :label="$t('table.api.endpoint')" prop="api_endpoint">
          <el-input v-model="addForm.api_endpoint" clearable />
        </el-form-item>
        <el-form-item :label="$t('table.api.httpMethod')" prop="api_http_method">
          <el-select v-model="addForm.api_http_method" placeholder="请选元素类别">
            <el-option :label="$t('enum.api.get')" value="GET" />
            <el-option :label="$t('enum.api.put')" value="put" />
            <el-option :label="$t('enum.api.put')" value="PUT" />
            <el-option :label="$t('enum.api.patch')" value="PATCH" />
            <el-option :label="$t('enum.api.delete')" value="DELETE" />
          </el-select>
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
        <el-form-item :label="$t('table.name')" prop="api_name">
          <el-input v-model="editForm.api_name" clearable />
        </el-form-item>
        <el-form-item :label="$t('table.api.endpoint')" prop="api_endpoint">
          <el-input v-model="editForm.api_endpoint" clearable />
        </el-form-item>
        <el-form-item :label="$t('table.api.httpMethod')" prop="api_http_method">
          <el-select v-model="editForm.api_http_method" placeholder="请选元素类别">
            <el-option :label="$t('enum.api.get')" value="GET" />
            <el-option :label="$t('enum.api.put')" value="put" />
            <el-option :label="$t('enum.api.put')" value="PUT" />
            <el-option :label="$t('enum.api.patch')" value="PATCH" />
            <el-option :label="$t('enum.api.delete')" value="DELETE" />
          </el-select>
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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.list_rows"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { lists, post, put, remove, reload } from '@/api/system/api'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        list_rows: 20,
        with_tag: true
      },
      rules: {
        api_name: [
          { required: true, message: '请输入api名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        api_endpoint: [
          { required: true, message: '请输入api端点', trigger: 'blur' }
        ],
        api_http_method: [
          { required: true, message: '请选择api方法', trigger: 'change' }
        ]
      },
      editForm: {
        api_id: 0,
        api_name: '',
        api_endpoint: '',
        api_http_method: 'GET',
        visible: false
      },
      addForm: {
        api_name: '',
        api_endpoint: '',
        api_http_method: 'GET',
        visible: false
      },
      visible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      lists(this.listQuery).then(res => {
        this.total = res.data.total
        this.list = res.data.data
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
    handleEdit(row) {
      console.log(row)
      this.editForm.visible = true
      this.editForm.api_id = row.api_id
      this.editForm.api_name = row.api_name
      this.editForm.api_endpoint = row.api_endpoint
      this.editForm.api_http_method = row.api_http_method
    },
    handleEditFormSubmit() {
      put(this.editForm.api_id, this.editForm).then(() => {
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
        this.editForm.visible = false
        this.fetchData()
      })
    },
    handleDelete(row) {
      remove(row.api_id).then(() => {
        return this.fetchData()
      }).then(() => {
        row.removePopoverVisble = false
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
      })
    },
    handleReload() {
      reload().then(() => {
        this.$message({
          message: this.$t('action.success'),
          type: 'success'
        })
        this.fetchData()
      })
    },
    submitForm(formapi_name, callback) {
      this.$refs[formapi_name].validate((valid) => {
        if (!valid) {
          return false
        }
        callback()
      })
    },
    resetForm(formapi_name) {
      this.$refs[formapi_name].resetFields()
    }
  }
}
</script>

