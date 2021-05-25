<template>
  <div class="app-container">
    <div class="app_content">
      <el-tabs v-model="listQuery.role_group" @tab-click="changeGroups">
        <el-tab-pane v-for="item in sys_groups" :key="item.id" :label="item.group_name_zn" :name="item.group_name">
        </el-tab-pane>
      </el-tabs>
      <div class="filter-container">
        <el-input
          v-model="listQuery.role_name"
          :placeholder="$t('table.name')"
          style="width: 200px;margin-right:20px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          v-waves
          class="filter-item"
          @click="handleFilter"
        >
          {{ $t("table.search") }}
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          @click="handleAdd"
        >
          {{ $t("table.add") }}
        </el-button>
      </div>

      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column prop="role_id" label="ID" width="100" align="center" />
        <el-table-column
          prop="role_create_time"
          label="创建时间"
          width="200"
          align="center"
        />

        <el-table-column
          :label="$t('table.name')"
          prop="role_name"
          min-width="350"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input
                v-model="scope.row.role_name"
                class="edit-input"
                size="mini"
              />
              <el-button
                class="cancel-btn"
                size="mini"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(scope.row)"
              >
                取消
              </el-button>
            </template>
            <span v-else>{{ scope.row.role_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="350"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.edit"
              type="success"
              size="mini"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(scope.row)"
            >
              {{ $t("table.confirm") }}
            </el-button>
            <el-button
              v-else
              type="primary"
              size="mini"
              @click="scope.row.edit = !scope.row.edit"
            >
              {{ $t("table.edit") }}
            </el-button>
            <el-button
              v-if="scope.row.role_status"
              type="info"
              size="mini"
              @click="handlePatchStatus(scope.row)"
            >
              {{ $t("table.disable") }}
            </el-button>
            <el-button
              v-else
              size="mini"
              type="success"
              @click="handlePatchStatus(scope.row)"
            >
              {{ $t("table.enable") }}
            </el-button>
            <el-button
              type="warning"
              size="mini"
              @click="handleBindClick(scope.row)"
            >
              {{ $t("action.rule") }}
            </el-button>
            <el-popover
              v-model="scope.row.removePopoverVisble"
              placement="top"
              width="160"
              style="margin-left: 10px"
            >
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope.row.removePopoverVisble = false"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleDelete(scope.row)"
                >
                  确定
                </el-button>
              </div>
              <el-button slot="reference" size="mini" type="danger">
                {{ $t("table.delete") }}
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        center
        :visible.sync="addForm.visible"
        :title="$t('table.add')"
      >
        <el-form ref="addForm" :model="addForm" status-icon label-width="100px">
          <!-- <el-form-item label="管理员类型" prop="role_type" :rules="[
                { required: true, message: '请选择所属机构', trigger: 'change' }
              ]">
            <el-select v-model="addForm.role_type" placeholder="请选择管理员类型">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in role_type_list"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('table.name')" prop="role_name" clearable :rules="[
                {
                  required: true,
                  message: '请输入名称',
                  trigger: ['blur', 'change']
                }
              ]">
            <el-input v-model="addForm.role_name" />
          </el-form-item>
          <el-form-item :label="$t('table.status')" prop="role_status">
            <el-switch v-model="addForm.role_status" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addForm.visible = false">
            取 消
          </el-button>
          <el-button @click="resetForm('addForm')">
            重置
          </el-button>
          <el-button
            type="primary"
            @click="submitForm('addForm', handleAddFormSubmit)"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>

      <el-dialog
        center
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
          <span slot-scope="{ option }"
            >{{ option.rule_id }} - {{ option.rule_name }}</span
          >
          <pagination
            v-show="transfer.total > 0"
            slot="left-footer"
            :total="transfer.total"
            :page.sync="transfer.listQuery.page"
            :limit.sync="transfer.listQuery.list_rows"
            class="transfer-footer"
            @pagination="fetchRuleData"
          />
        </el-transfer>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { lists as listRule } from "@/api/system/rule";
import {
  lists,
  get,
  post,
  editRole,
  remove,
  patchStatus,
  putRules
} from "@/api/system/role";
import { mapGetters } from "vuex";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      return status ? "success" : "danger";
    },
    typeFilter(value) {
      return { "1": "平台管理员", "2": "机构管理员", "3": "校区管理员" }[value];
    }
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        list_rows: 20,
        // role_name: "",
        role_group: ''
      },
      role_type_list: [
        { name: "平台管理员", value: "1" },
        { name: "机构管理员", value: "2" },
        { name: "校区管理员", value: "3" }
      ],
      addForm: {
        role_name: "",
        role_status: true,
        visible: false
        // role_type: ""
      },
      dialog: {
        textMap: {
          bind: this.$t("action.rule")
        },
        bind: {
          visible: false
        },
        status: "",
        loading: false
      },
      transfer: {
        total: 0,
        listQuery: {
          page: 1,
          list_rows: 20,
          role_group: ''
        },
        row: {},
        data: [],
        value: [],
        props: {
          key: "rule_id",
          label: "rule_name"
        }
      }
    };
  },
  watch: {},
  created() {
    this.$store.dispatch('GetSysGroups').then(res=>{
      this.listQuery.role_group = res[0].group_name
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
    fetchData() {
      this.listLoading = true;
      lists(this.listQuery).then(res => {
        // 处理inlieEdit，保存原始值
        this.list = res.data.data.map(v => {
          this.$set(v, "edit", false);
          v.originalName = v.role_name;
          v.role_status = v.role_status==1?true:false
          return v;
        });
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    handleAdd() {
      this.addForm.visible = true;
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
    },
    handleAddFormSubmit() {
      this.addForm.role_status = this.addForm.role_status?1:0
      this.addForm.role_group = this.listQuery.role_group
      post(this.addForm)
        .then(() => {
          this.listQuery.page = 1;
          return this.fetchData();
        })
        .then(res => {
          this.addForm.visible = false;
          this.$message({
            message: this.$t("action.success"),
            type: "success"
          });
        });
    },
    handleDelete(row) {
      remove({id: row.role_id})
        .then(() => {
          return this.fetchData();
        })
        .then(() => {
          row.removePopoverVisble = false;
          this.$message({
            message: this.$t("action.success"),
            type: "success"
          });
        });
    },
    cancelEdit(row) {
      row.role_name = row.originalName;
      row.edit = false;
    },
    confirmEdit(row) {
      row.edit = false;
      const role_name = row.role_name;
      editRole({id: row.role_id, role_name:role_name}).then(() => {
        row.originalName = role_name;
      });
      this.$message({
        message: this.$t("action.success"),
        type: "success"
      });
    },
    handleBindDialogClose() {
      // 取消已选中
      this.transfer.value = [];
    },
    handleBindClick(row) {
      this.dialog.bind.visible = true;
      this.transfer.row = row;
      this.dialog.status = "bind";
      this.bindRule(row.role_id);
    },
    bindRule(role_id) {
      this.dialog.loading = true;
      return this.fetchRuleData().finally(() => {
        this.dialog.loading = false;
      });
    },
    fetchRuleData() {
      this.transfer.listQuery.rule_group = this.listQuery.role_group
      return listRule(this.transfer.listQuery)
        .then(res => {
          console.log(res)
          this.transfer.total = res.data.total;
          return res.data.data;
        })
        .then(ruleList => {
          get({id: this.transfer.row.role_id}).then(res => {
            const map = new Map();
            ruleList = res.data.role_rules
              .concat(ruleList)
              .filter(r => !map.has(r.rule_id) && map.set(r.rule_id, 1));
            this.transfer.data = ruleList;
            this.transfer.value = res.data.role_rules.map(v => {
              return v.rule_id;
            });
          });
        });
    },
    handlePatchStatus(row) {
      patchStatus({id: row.role_id, role_status: !row.role_status}).then(() => {
        row.role_status = !row.role_status;
        this.$message({
          message: this.$t("action.success"),
          type: "success"
        });
      });
    },
    handleTransferChange(resource_ids) {
      this.dialog.loading = true;
      putRules({id: this.transfer.row.role_id, rule_ids: resource_ids})
        .then(() => {
          this.$message({
            message: this.$t("action.success"),
            type: "success"
          });
        })
        .finally(() => {
          this.dialog.loading = false;
        });
    },
    submitForm(formName, callback) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        callback();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
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
