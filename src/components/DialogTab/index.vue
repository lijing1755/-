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
             <el-button @click='refresh'>刷新</el-button>

          </div>
      </div>
      <el-table
    ref="multipleTable"
    :data="list"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    :row-key="getRowKey">
    <el-table-column
      type="selection"
      :reserve-selection="true"
      width="55">
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
      width="220">
    </el-table-column>
    <el-table-column
      prop="goods_remark"
      label="创建时间"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.current_page"
      :page-sizes="[15, 20, 50, 100]"
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
export default{
    name: 'dialogTab',
    props: {
       
        
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
                per_page:15,
                last_page:0
            },
            searchValue:''
        }
    },
    created(){
        this.getModuleList()
    },
    methods:{
        getRowKey (row){
            return row.id
        },
        close (){
            this.$emit('close')
        },
        submit(){
            // console.log(this.multipleSelection)
            this.$emit('selectGoods',this.multipleSelection)
        },
        handleCurrentChange (val){
            this.page.current_page = val
            this.getGoodsList()
            console.log(val)
        },
        getModuleList (){
             this.page.current_page = this.page.current_page++
            shopList({
                page:this.page.current_page
            }).then(res => {
                console.log(res)
                let tempdata = res.data.data
                this.shopList = tempdata
                this.business_name = tempdata[0].business_name
                this.store_id = tempdata[0].id
                this.getGoodsList()  
            })
        },
        handleSelect (val){
            this.page.current_page=1
            this.getGoodsList()
            console.log(val)
        },
        getGoodsList (){
            goodsList({
                keyword:this.searchValue,
                page:this.page.current_page,
                store_id:this.store_id,
                list_rows:this.page.per_page
            }).then(res => {
                console.log(res)
                this.list = res.data.data
                this.page={
                    current_page: res.data.current_page,
                    total: res.data.total,
                    per_page: res.data.per_page,
                    last_page:res.data.last_page,
                }
            })
        },
        check(value){
         
            this.business_name = this.shopList[value].business_name
            // this.list = this.shopList[value].goodsList
            this.page.current_page = 1
            this.store_id = this.shopList[value].id
            this.getGoodsList()
            console.log(value)
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
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
          console.log(val)
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