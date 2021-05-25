
<template>
  <div class="app-container">
    <div class="app_content">
        <div class="topadd">
          <el-button size='small ' icon="el-icon-plus" type="primary" @click="topage(0)">新增</el-button>
      </div>
      <div class="tab">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="name"
            label="专区名称"
            align='center'
            >
            </el-table-column>
            <el-table-column
            
            label="创建时间"
            align='center'
            >
                <template slot-scope=scope>
                    <div>
                        <span>{{scope.row.create_time | formatTime}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            label="操作"
            width="200"
            align='center'>
            <template slot-scope="scope">
                <div class="but">
                    <el-button size='small ' icon='el-icon-edit' type="primary" @click="topage(scope.row.id)">编辑</el-button>
                    <el-button size='small ' icon='el-icon-delete' type="danger" @click='del(scope.$index)'>删除</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    moduleList,
    delModule
  } from '@/api/system/activity'
  import moment from 'moment'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    created (){
        this.getList()
    },
    filters:{
        formatTime (row){
            let date = new Date(row*1000)
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
    },
    methods:{
        analyse (){
            this.$notify.error({
                title: '错误',
                message: '功能开发中,敬请期待'
            });
        },
        getList (){
            moduleList().then(res => {
                console.log(res)
                this.tableData = res.data
            })
        },
        topage (id){
            this.$router.push({
                name:'template-details-index',
                query: {
                    id:id || 0
                }
            })
        },
        del (index){
            console.log(this.tableData[index])
            this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delModule({
                    id:this.tableData[index].id
                }).then(res => {
                    this.tableData.splice(index,1)
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        }
    }
  }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.activity{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.topadd{
    width: 80%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}

.but{
    display: flex;
    justify-content: space-around;
}
</style>