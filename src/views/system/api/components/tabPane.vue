<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="data.data"
      :header-cell-style="{
        'background-color': '#f2f2f2',
        'border-color': '#ebeef5'
      }"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.api_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.api_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端点" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.api_endpoint }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HTTP方法" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.api_http_method }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="130px" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(tag, index) in scope.row.api_tags" :key="index">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="data.total"
      :current-page="listQuery.page"
      :page-sizes="[15, 30, 50, 100, 500, 1000]"
      :page-size="15"
      style="margin-top: 15px"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { list } from '@/api/system/api'

export default {
  props: {
    groupId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      data: {
        total: 0,
        data: []
      },
      listLoading: true,
      listQuery: {
        page: 1,
        list_rows: 10,
        group_id: this.group_id
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      list(this.listQuery).then(res => {
        this.data = res.data
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.list_rows = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    }
  }
}
</script>

