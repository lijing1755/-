<template>
  <div class="app-container" style="padding: 24px">
    <div class="app_content">
    <el-tabs v-model="ele_group" @tab-click="changeGroups">
      <el-tab-pane v-for="item in sys_groups" :key="item.id" :label="item.group_name_zn" :name="item.group_name">
      </el-tab-pane>
    </el-tabs>
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
    <el-button type="primary" style="margin: 10px 10px 10px 0;" @click="handleInsertNode">插入菜单</el-button>
    <el-tree
      ref="tree"
      :data="list"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      node-ele_key="id"
      default-expand-all
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="primary" size="mini" @click="handleEditNode(data)">
            编辑
          </el-button>
          <!-- <el-button
            type="text"
            size="mini"
            @click="handleInsertNode(node, data)"
          >
            插入
          </el-button> -->
          <el-button
            type="warning"
            size="mini"
            @click="handleAppendNode(node, data)"
          >
            追加
          </el-button>
          <el-popover
            v-model="data.removePopoverVisble"
            placement="top"
            width="160"
          >
            <p>确定删除该节点吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="data.removePopoverVisble = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="handleRemoveNode(data)"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              style="margin-left: 10px"
              >删除</el-button
            >
          </el-popover>
        </span>
      </span>
    </el-tree>

      <el-dialog center :visible.sync="addForm.visible" title="新增节点">
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="rules"
          status-icon
          label-width="80px"
        >
          <el-form-item label="名称" prop="ele_name">
            <el-input v-model="addForm.ele_name" clearable />
          </el-form-item>
          <el-form-item label="标识" prop="ele_key">
            <el-input v-model="addForm.ele_key" clearable />
          </el-form-item>
          <el-form-item label="类别" prop="ele_type">
            <el-select v-model="addForm.ele_type" placeholder="请选元素类别">
              <el-option label="菜单" value="MENU" />
              <el-option label="页面" value="PAGE" />
              <el-option label="按钮" value="BUTTON" />
            </el-select>
          </el-form-item>
          <el-form-item label="关联接口" prop="api_endpoints">
            <el-input v-model="addForm.api_endpoints" clearable />
            <div style="color: #888888; font-size: 13px; margin: -4px 0 -10px;">关联接口端点，多个端点通过逗号分隔</div>
          </el-form-item>
          <el-form-item label="排序">
            <el-input
              v-model="editForm.ele_sort"
              min="1"
              step="1"
              type="number"
              clearable
            />
          </el-form-item>
          <el-form-item v-if="addForm.ele_type!=='BUTTON'" label="icon" prop="ele_icon">
             <e-icon-picker :icon-name="addForm.ele_icon" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addForm.visible = false"> 取 消 </el-button>
          <el-button @click="resetForm('addForm')"> 重置 </el-button>
          <el-button
            type="primary"
            @click="submitForm('addForm', submitAddForm)"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>

      <el-dialog
        center
        :visible.sync="editForm.visible"
        :title="$t('table.edit')"
      >
        <el-form
          ref="editForm"
          :model="editForm"
          :rules="rules"
          status-icon
          label-width="80px"
        >
          <el-form-item label="名称" prop="ele_name">
            <el-input v-model="editForm.ele_name" clearable />
          </el-form-item>
          <el-form-item label="标识" prop="ele_key">
            <el-input v-model="editForm.ele_key" clearable />
          </el-form-item>
          <el-form-item label="类别" prop="ele_type">
            <el-select v-model="editForm.ele_type" placeholder="请选元素类别">
              <el-option label="菜单" value="MENU" />
              <el-option label="页面" value="PAGE" />
              <el-option label="按钮" value="BUTTON" />
            </el-select>
          </el-form-item>
          <el-form-item label="关联接口" prop="api_endpoints">
            <el-input v-model="editForm.api_endpoints" clearable />
            <div style="color: #888888; font-size: 13px; margin: -4px 0 -10px;">关联接口端点，多个端点通过逗号分隔</div>
          </el-form-item>
          <el-form-item label="排序" prop="ele_sort">
            <el-input
              v-model="editForm.ele_sort"
              min="1"
              step="1"
              type="number"
              clearable
            />
          </el-form-item>
          <el-form-item v-if="editForm.ele_type!=='BUTTON'" label="icon" prop="ele_icon">
             <e-icon-picker v-model="editForm.ele_icon"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editForm.visible = false"> 取 消 </el-button>
          <el-button @click="resetForm('editForm')"> 重置 </el-button>
          <el-button
            type="primary"
            @click="submitForm('editForm', submitEditForm)"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  listTree,
  addElement,
  editElement,
  removeElement,
} from "@/api/system/element";
import { mapGetters } from "vuex";
import SysGroups from '@/components/SysGroups/index'


export default {
  components: { SysGroups },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        "-1": "gray",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      icon:"",
      list: null,
      listLoading: true,
      listQuery: {
        paging: 0,
        only_menu: 0,
      },
      filterText: "",
      defaultProps: {
        children: "children",
        label: (data, node) => `${data.ele_name} - ${data.ele_key}`,
      },
      addMode: "append",
      editForm: {
        ele_group: "",
        ele_icon: '',
        ele_id: 0,
        ele_name: "",
        ele_key: "",
        ele_type: "MENU",
        ele_sort: 0,
        api_endpoints: '',
        visible: false,
      },
      addForm: {
        ele_group: "",
        ele_icon: '',
        ele_name: "",
        ele_key: "",
        ele_type: "MENU",
        ele_sort: 0,
        mode: "append",
        api_endpoints: '',
        visible: false,
      },
      rules: {
        ele_name: [
          { required: true, message: "请输入元素名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        ele_key: [
          { required: true, message: "请输入元素标识", trigger: "blur" },
        ],
        ele_type: [
          { required: true, message: "请选择元素类型", trigger: "change" },
        ],
        ele_sort: [
          { required: true, message: "请输入元素排序", trigger: "blur" },
        ],
      },
      removePopoverVisble: false,
      ele_group: ''
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.$store.dispatch('GetSysGroups').then(res=>{
      this.ele_group = res[0].group_name
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
      console.log(this.groups)
      listTree({ele_group: this.ele_group}).then((response) => {
        this.list = response.data;
        this.listLoading = false;
        console.log(this.list)
      });
    },
    handleEditNode(data) {
      this.editForm.visible = true;
      this.editForm.ele_id = data.ele_id;
      this.editForm.ele_name = data.ele_name;
      this.editForm.api_endpoints = data.api_endpoints;
      this.editForm.ele_key = data.ele_key;
      this.editForm.ele_icon = data.ele_icon
      this.editForm.ele_type = data.ele_type;
      this.editForm.ele_parent_id = data.ele_parent_id;
      this.editForm.ele_sort = data.ele_sort;

    },
    handleInsertNode(node, data) {
      this.addForm.visible = true;
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
      this.addForm.addMode = "insert";
      this.addForm.ele_type = 'MENU';
      // this.addForm.ele_parent_id = data.ele_parent_id;
      // this.addForm.ele_sort = data.ele_sort;
      // console.log(this.addForm.ele_type)
    },
    handleAppendNode(node, data) {
      this.addForm.visible = true;
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
      this.addForm.mode = "append";
      this.addForm.ele_type = 'PAGE';
      this.addForm.ele_parent_id = data.ele_id;
      this.addForm.ele_sort = node.childNodes.length + 1;
      console.log(this.addForm.ele_type)
    },
    submitAddForm() {
      const { visible, ...addForm } = this.addForm
      addForm.ele_group = this.ele_group
      addElement(addForm)
        .then((res) => {
          this.fetchData();
        })
        .finally(() => {
          this.addForm.visible = false;
        });
    },
    submitEditForm() {
      const { visible, ...editForm } = this.editForm
      console.log(editForm.ele_icon)
      editForm.id = editForm.ele_id
      editForm.ele_group = this.ele_group
      editElement(editForm)
        .then((res) => {
          this.fetchData();
        })
        .finally(() => {
          this.editForm.visible = false;
        });
    },
    handleRemoveNode(data) {
      removeElement({id: data.ele_id})
        .then((res) => {
          this.fetchData();
        })
        .finally(() => {
          data.removePopoverVisble = false;
        });
    },
    filterNode(value, data, node) {
      if (!value) return true;
      return node.label.indexOf(value) !== -1;
    },
    submitForm(formele_name, callback) {
      this.$refs[formele_name].validate((valid) => {
        if (!valid) {
          return false;
        }
        callback();
      });
    },
    resetForm(formele_name) {
      this.$refs[formele_name].resetFields();
    },
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

</style>
