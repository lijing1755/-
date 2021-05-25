<template>
  <div class="container-water-fall" v-if='shopList'>
      <div style='display:flex'>
        <div>
            店铺
        <el-dropdown size="small" split-button type="primary" @command='check'>
          {{business_name}}
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item v-for="(item,index) in shopList" :key='index' :command="index">{{item.business_name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
        <div style="margin-left:20px">
          <el-input v-model="searchValue" @change="handleSelect" placeholder="请输入内容"></el-input>
        </div>
        <div style="margin-left:20px">
          <el-button type="success" @click='handleSelect'>搜索</el-button>
          <el-button @click='refresh'>刷新</el-button>
        </div>
      </div>
      <el-table
    ref="multipleTable"
    :data="list"
     height="500"
    tooltip-effect="dark"
    style="width: 100%"
    @select='selectones'
    @select-all='selectAll'
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="85"
      >
    </el-table-column>
    <el-table-column
      label="封面图"
      width="120"
      align='center'>
      <template slot-scope="scope">
        <img class="goods_image" :src="URL+scope.row.goods_img" alt="" srcset="">
      </template>
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      show-overflow-tooltip>
      <template slot-scope=scope>
        <div>
          <span>{{scope.row.create_time | formatTime}}</span>
        </div>
    </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.current_page"
      :page-sizes="['15', '20', '50', '100']"
      :page-size="page.per_page"
      layout="sizes,total, prev, pager, next"
      :total="page.total">
    </el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click='close'>取 消</el-button>
      <el-button type="primary" @click='submit'>确 定</el-button>
    </span>
  </div>
</template>

<script>
import {
  shopList,
  goodsList

} from '@/api/system/activity'
import moment from 'moment'
export default{
    name: 'dialogTab',
    props: {
       checkList:{
           type: Array,
           default: []
       } 
    },
    filters:{
        formatTime (row){
            let date = new Date(row*1000)
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
    },
    data(){
        return{
            shopList:[],
            store_id:0,
            list: [
            ],
            multipleSelection: [],
            business_name:0,
            URL:'https://jupinshop.oss-cn-shenzhen.aliyuncs.com',
            page:{
                current_page:'1',
                total:null,
                per_page:'15',
                last_page:0
            },
            searchValue:''
        }
    },
    created(){
        this.getModuleList()
    },
    methods:{
        selectones(selection, row){
            this.$emit('selectOnes',row)
        },
        selectAll (selection){

            let data={
                type:1,
                arr:this.list
            }
            if(selection.length==0){
                data.type=2
            }
            this.$emit('selectAll',data)
        },
        getRowKey (row){
            return row.id
        },
        close (){
            this.$emit('close')
        },
        submit(){
            // this.checkList= []
            this.$emit('selectGoods')
        },
        handleCurrentChange (val){
            this.page.current_page = val
            this.getGoodsList()
        },
        getModuleList (){
             this.page.current_page = this.page.current_page++
            shopList({
                page:this.page.current_page
            }).then(res => {

                let tempdata = res.data.data
                this.shopList = tempdata
                this.business_name = '选择店铺'
                // this.store_id = tempdata[0].id
                this.getGoodsList()  
            })
        },
        handleSelect (val){
            this.page.current_page=1
            this.getGoodsList()
        },
        getGoodsList (){
          goodsList({
            keyword:this.searchValue,
            page:this.page.current_page,
            store_id:this.store_id,
            list_rows:this.page.per_page
          }).then(res => {

            this.list = res.data.data
            this.page={
                current_page: res.data.current_page,
                total: res.data.total,
                per_page: res.data.per_page+'',
                last_page:res.data.last_page,
            }
            this.$nextTick(function(res){
            for(let i = 0;i<this.list.length;i++){
                let flag = -1
                for(let j = 0;j<this.checkList.length;j++){
                if(this.checkList[j].id == this.list[i].id){
                    flag = i
                    break
                }
                }
                if(flag != -1){
                this.toggleSelection(this.list[flag])
                }
            }
            })
                
                
            
          })
        },
      check(value){
        this.business_name = this.shopList[value].business_name
        // this.list = this.shopList[value].goodsList
        this.page.current_page = 1
        this.store_id = this.shopList[value].id
        this.getGoodsList()
      },
      toggleSelection(rows) {
        this.$refs.multipleTable.toggleRowSelection(rows);
      },
      refresh (){
        this.page.current_page='1'
        this.getGoodsList()
      },
      handleSizeChange(val){

        this.page.per_page = val
        this.getGoodsList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
    .goods_image{
        width: 100px;
        height: 100px;
    }
</style>