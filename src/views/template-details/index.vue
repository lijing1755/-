<template>
  <div>
    
    <div class="dndList">
        <div class="dndList-list">
          <div class="head">
            <div class="head-cont">
                <div class="inputname">
                <el-input v-model="modelName" placeholder="活动名称"></el-input>
                </div>
                <!-- <div class="select">
                    <el-dropdown size="small" split-button type="primary" @command='checkmodel'>
                        {{modelIndex==-1?'模板选择':modelList[modelIndex].name}}
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for='(item,index) in modelList' :key='index' :command="index">{{item.name}}</el-dropdown-item>
                            
                        </el-dropdown-menu>
                    </el-dropdown>
                </div> -->
                <!-- <div class="submit">
                    <el-button type="primary" @click="submodel">保存</el-button>
                </div> -->
            </div>
        </div>
        <!-- <h3>基础组件</h3> -->
          <div class="compents">
            <span>基础组件</span>
            <draggable :list="list2" :options="{group:{name: falgs,pull:'clone'},filter: '.undraggable', sort: false}"
                        @end="end"
                        class="dragArea">
                <div v-for="element in list2" :key="element.id"
                    class="list-complete-item">
                <div class="list-complete-item-handle2"> 
                    <img class="list-image" :src="element.image" alt="" srcset="" >

                </div>
                <div class="name" >
                    {{element.type==1?'图片':'商品'}}
                </div>
                </div>
            </draggable>
          </div>
        </div>
        <div class="dndList-list-content">
          <div class="box_phone">
            <img :src="iphone" class="phone" alt="" srcset="">
            <div class="box_view">
              <div class="box">
                <draggable :list="list1" :options="{group:'article', disabled: disabled}"
                        @start="start22"
                        @end="end22"
                        class="dragArea11"
                        style="height: 100px">
                <div v-for="(element,index) in list1" :key="element.id" class="list-complete-iteme" @click="check(index)">
                <div class="list-complete-item-handle" v-if="element.type==1">
                    <div class="image-box">
                        <img v-if="element.url_pic==''" class="list-image-item" :src="image" alt="" srcset="">
                        <img v-else class="list-image-checkImage" :src="element.url_pic" alt="" srcset="">
                    </div>
                </div>
                <div class='list-complete-item-handle' v-else>
                
                    <div class="image-box-goods">
                        <goods-waterfall :list='element.goods_list'></goods-waterfall>
                        <img class="goods-list-image-checkImage" :src="element.good_bg_pic" alt="" srcset="">
                    </div>
                </div>
                </div>
                </draggable>
              </div>
            </div>
          </div>
       
        
        </div>
        <div class="dndList-list-select">
        <div v-if="checkIndex!=-1">
            <div class="list-select">
               <div class="btnall">
                <button  @click="delitem">删除当前</button>
                <button  @click="delall">清空所有</button>
                <button style="background:#FFC53D" @click="submodel">保存</button>
               </div>
            </div>
            <!-- <div class="box-title">
                {{list1[checkIndex].type==1?'图片':'商品'}}
            </div> -->
            <div class="list-select" v-if='list1[checkIndex].type==2'>
                <div class="select-title">
                    添加商品
                    <div class="goods-num" >
                      <span> 商品数目:</span>
                      <div>
                          <span>{{goodsNum}}</span>款商品
                          <!-- <el-input  v-model="goodsNum" @input='changeGoodsList' type="Number" placeholder="请输入内容"></el-input> -->
                      </div>
                    </div>
                </div>
               
                <div class="goods-list">
                    <div class="goods-li" v-for="(item,index) in list1[checkIndex].goods_list" :key='index'>
                        <img class="goods-li_img" :src="URL+item.goods_img" alt="">
                        <div class="goods-del" @click="del(index)">
                             <img :src="delgoods" class="del_img" alt="" srcset="">
                        </div>
                        <!-- <span>{{item.title}}</span> -->
                    </div>
                    <!-- @click="addGoods"/ -->
                    <div class='goods-add'  @click="dialogVisible = true">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
            </div>
            <div class="list-select" v-if='list1[checkIndex].type==2'>
                <div class="select-title">
                列表样式
                </div>
                <el-radio-group v-model="list1[checkIndex].radio" @change='checklist'>
                <el-radio :label="'1'">瀑布流</el-radio>
                <!-- <el-radio :label="2">单列</el-radio>
                <el-radio :label="3">三列</el-radio> -->
                </el-radio-group>
            </div>
            <div class="list-select">
                <div class="select-title-imag">
                  {{list1[checkIndex].type==1?'更换图片':'组件背景图'}}
                  <img :src="delimage" @click='delteImage' class="delimage" alt="" srcset="">
                </div>
                <div class="chek-image-box" v-if="list1[checkIndex].type=='1'">
                    <img class="icon-image"  v-if="list1[checkIndex].url_pic==''" :src="require('@/assets/image/images.png')" alt="">
                    <img class="check-image" v-else :src="list1[checkIndex].url_pic" alt="">
                </div>
                <div class="chek-image-box" v-if="list1[checkIndex].type=='2'">
                    <img class="icon-image"  v-if="list1[checkIndex].good_bg_pic==''" :src="require('@/assets/image/images.png')" alt="">
                    <img class="check-image" v-else :src="list1[checkIndex].good_bg_pic" alt="">
                </div>
                <el-upload
                    class="avatar-uploader"
                    action="http://dev.operation.lekebaba.cn/system/uploadImage"
                    name='uploadImageName'
                    accept="image/jpeg,image/png"
                    :show-file-list='false'
                    :before-upload="beforeAvatarUpload"
                    :on-success='success'
                    :on-error='errorr'
                    v-model="coverFile"
                    >
                    <el-button type="primary" class="checkiamge">更换图片</el-button>
                </el-upload>

            </div>
            <div class="list-select" v-if='list1[checkIndex].type==1'>
                <div class="select-title">
                链接
                </div>
                <el-radio-group style="margin:20px 0px" v-model="list1[checkIndex].url_type">
                <el-radio :label="'1'">URL</el-radio>
                <el-radio :label="'2'">商品ID</el-radio>
                </el-radio-group>
                <el-input v-model="list1[checkIndex].url_name" placeholder="请输入"></el-input>
            </div>
            
        </div>  
        
        </div>
    </div>
<!-- <div>删除控件
            <i class="el-icon-delete" @click="handleDel(index, element.id)"></i>
          </div> -->
    <el-dialog
        title="添加商品"
        :visible.sync="dialogVisible"
        width="60%"
        
        >
        <dialog-tab :checkList='goodsList' @selectOnes='selectOnes' @selectAll='selectAll' @selectGoods='selectGoods' @close='dialogVisible=false'></dialog-tab>
        
    </el-dialog>
  </div>        
</template>
<script>
import draggable from 'vuedraggable'
import goodsWaterfall from '@/components/GoodsWaterfall'
import dialogTab from '@/components/DialogTab'
import {
  moduleInfo,
  editModule
} from '@/api/system/activity'
export default {
  name: 'DndList',
  components: { draggable,goodsWaterfall ,dialogTab},
  watch: {
  },
  data () {
    return {
      delgoods:require('@/assets/image/delgoods.png'),
      delimage:require('@/assets/image/del.png'),
      URL:'https://jupinshop.oss-cn-shenzhen.aliyuncs.com/',
      goodsNum:0,
      imageUrl: '',
      image:require('@/assets/image/images.png'),
      falgs: 'article',
      disabled: false,
      iphone:require('@/assets/image/iphone.png'),
      list1: [],
      dialogVisible: false,
      list2: [
        {
          tid: 1,
          name: 1,
          image:require('@/assets/image/images.png'),
          type:1,
          radio:1,
          url_pic:'',
          url_type:'1'
        },
        {
          tid: 2,
          name: 2,
          image:require('@/assets/image/goods.png'),
          type:2,
          radio:1,
          good_bg_pic:'',
          goods_list:[]
        }
　　　],
      goodsList:[ ],
      checkIndex:-1,
      input:'',
      coverFile:'',
      modelList:[],
      modelIndex:-1,
      modelId:null,
      modelName:''
    }
  },
  computed: {
  },
  created (){
    this.modelId = this.$route.query.id
    if(this.modelId>0){
      this.getModuleList()
    }
  },
  methods: {
    delteImage (){
      console.log(this.list1)
      if(this.list1[this.checkIndex].type=='1'){
        this.list1[this.checkIndex].url_pic=''
      }else{
        this.list1[this.checkIndex].good_bg_pic=''
      }
      
    },
    delall (){
      this.list1=[]
      this.checkIndex = -1
    },
    delitem (){
        console.log(this.checkIndex)
        this.list1.splice(this.checkIndex,1)
        this.checkIndex = -1
    }, 
    submodel (){
        console.log(this.list1)
      editModule({
          'id':this.modelId?this.modelId:'',
          'name':this.modelName,
          'assembly':this.list1
      }).then(res => {
          console.log('返回的参数')
          console.log(res)
          this.$message.success(this.modelId?'修改成功':'添加成功')
      }).catch(err => {
          this.$message.error(err.msg)
          console.log('错误'+err)
      })
    },
    success(response, file, fileList){
        if(this.list1[this.checkIndex].type==1){
          this.list1[this.checkIndex].url_pic = this.URL+response.imgPath;
        }else{
          this.list1[this.checkIndex].good_bg_pic = this.URL+response.imgPath;
        }
      },
    errorr(err, file, fileList){
        console.log(err)
    },
    checkmodel (val){//选择模板
        this.modelIndex = val
        this.list1 = this.modelList[val].assembly
        this.modelId = this.modelList[val].id
        this.modelName = this.modelList[val].name
    },
    selectGoods (data){
      // this.list1[this.checkIndex].goods_list = this.deweight([...this.list1[this.checkIndex].goods_list,...data],'id')
      this.goodsNum=this.list1[this.checkIndex].goods_list.length
      this.dialogVisible = false
    },  
    deweight (arr, key) {
      let res = []
      arr.forEach((item) => {
          let list = []
          res.forEach((resitem) => {
            list.push(resitem[key])
          })
          if (list.indexOf(item[key]) === -1) {
            res.push(item)
          }
      })
      console.log(res)
      return res
    },
    del (index){
        this.goodsNum--
        this.list1[this.checkIndex].goods_list.splice(index,1)
    },
    getModuleList (){
         moduleInfo({
           id:this.modelId
         }).then(res => {
           this.list1 = res.data.assembly
           this.modelName = res.data.name
        })
    },
 
    addGoods (){
        this.goodsList.push({
            image:require('@/assets/image/imagess.png'),
            title:'夏日手机卡和纳税和纳税和纳税',
            is_happy:1,
            is_group:1
          })
    },

    selectOnes (data){
      let flag =  -1
      console.log(this.list1[this.checkIndex].goods_list)
      this.list1[this.checkIndex].goods_list.forEach((item,index) => {
        if(item.id == data.id){
          flag = index
        }
      })
      if(flag==-1){
        this.list1[this.checkIndex].goods_list.push(data)
      }else{
        this.list1[this.checkIndex].goods_list.splice(flag,1)
      }
      this.goodsNum=this.list1[this.checkIndex].goods_list.length
    },
    selectAll (data){
      let temparr = this.list1[this.checkIndex].goods_list
      let newarr = JSON.parse(JSON.stringify(data.arr))
      for(let i = 0;i<temparr.length;i++){
        for(let j = 0;j<newarr.length;j++){
          // console.log(temparr[i].id+'======'+data.arr[j].id)
          if(temparr[i].id == newarr[j].id){
            if(data.type ==1){
              newarr.splice(j,1)
            }else{
              temparr.splice(i,1)
              i--
            }
            break;
          }
        }
      }
      if(data.type ==1){
        this.list1[this.checkIndex].goods_list = [...this.list1[this.checkIndex].goods_list,...newarr]
      }else if(data.type==2){
        this.list1[this.checkIndex].goods_list = temparr
      }
      this.goodsNum=this.list1[this.checkIndex].goods_list.length
     

    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      } 
    },
    imagePreview (file) {
      var that = this;
      //定义一个文件阅读器
      var reader = new FileReader();
      //文件装载后将其显示在图片预览里
      reader.onload = function(e) {
        //将bade64位图片保存至数组里供上面图片显示
        if(that.list1[that.checkIndex].type==1){
            that.list1[that.checkIndex].url_pic = e.target.result;
        }else{
            that.list1[that.checkIndex].good_bg_pic = e.target.result;
        }  
      };
      reader.readAsDataURL(file); 
    },
    end (ev) {
      this.list1 = JSON.parse(JSON.stringify(this.list1))
      
    },
    checklist (value){
      this.list1[this.checkIndex].radio = value
    },
    check (item){
      this.checkIndex = item
      if(this.list1[item].type==2){
        this.goodsNum = this.list1[item].goods_list.length
     }
    },
    start22 (event) {
      this.falgs = '222222'
    },
    end22 (ev) {
      this.falgs = 'article'
    },
    handleDel (index, id) {
      this.list1.splice(index, 1)
      let q = this.list2.find((value, index, arr) => {
        return value.id === id
      })
      this.$set(q, 'flag', false)
    }
  }
}
</script>
 
<style rel="stylesheet/scss" lang="scss" scoped>
    .del_img{
      width: 10px;
      height: 10px;
    }
   .compents{
      background: #FFF;
      margin-top: 20px;
      padding: 10px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
    }
  .select-title-imag{
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-content: center;
  }
  .delimage{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .head{
      display: flex;
      justify-content: center;
      background: #fff;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
      border-radius: 5px;
  }
  .head-cont{
      width: 100%;
      padding:10px 10px;
      // border: 1px solid #ccc;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      height: 300px;
  }
  .select{
    width: 50%;
  }
  .inputname{
    // margin-right: 20px;
    width: 50%;
  }
  .submit{
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .dndList{
    height: calc(100vh - 60px);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #FBFCFF;
  }
  .checkiamge{
    margin-top: 20px;
  }
  .select-title{
      font-size: 16px;
      display: flex;
    }
  .avatar-uploader {
    display: flex;
    justify-content: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: div;
  }

  .dndList-list-select{
    width: 400px;
    display: flex;
    flex-direction: column;
  }
  .list-select{
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }
  .btnall{
    display: flex;
    justify-content: space-between;
  }
  .btnall button{
    width: 30%;
    border: 0px;
    background: #FF5D5D;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
  }
  .goods-num{
    margin-left: 20px;
    display: flex;
    align-items: center;
    color: #999999;
  }
  .chek-image-box{
    margin-top: 20px;
    height: 140px;
    border: 1px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .check-image{
    width: auto;
    max-height: 140px;
  }
  .icon-image{
    width: 50px;
    height: 50px;
     
  }
  .box_view{
    padding: 50px 20px 20px 22px;
    width: 420px;
    height: 840px;
  }
  .box-title{
    padding: 20px;
    border: 1px solid #ccc;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .dndList-list{
    width: 330px; 
    // border: 1px solid #ccc;
  }
  .dndList-list-content{
    position: relative;
    display: flex;
    align-items: center;
    flex:1;
    justify-content: center;
  }
  .list-complete-item-handle{
    position: relative;
  }
  .list-complete-item-handle2{
    padding: 10px;
  }
  .list-image{
    width: 50px;
    height: 50px;
    display:div
  }
  .image-box{
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: coral;
  }
  .image-box-goods{
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: relative;
  }
  .list-image-item{
    width: 30px;
    height: auto;
    display:div
  }
  .list-image-checkImage{
    background: rgba($color: coral, $alpha: 0.5);
    width: 100%;
    height: auto;
  }
  .goods-list-image-checkImage{
    background:#f2f2f2;
    width: 100%;
    height: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    //   z-index: 999;
  }
  .phone{
    // z-index: 999;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 415px;
  }
  .box{
    width: 371px;
    height: 750px;
    border-radius: 7px 7px 25px 26px;
    // border: 1px solid #ccc;
    overflow-y: auto;
  }
  .box::-webkit-scrollbar{
    display: none;
  }
  .box_phone{
    width: 420px;
    height: 840px;
    // border: 1px solid #ccc;
    overflow-y: auto;
    position: relative;
  }
  .box_phone::-webkit-scrollbar{
    display: none;
  }

  .dragArea{
    padding:0px;
    display: flex;
    flex-flow: wrap-reverse;
    justify-content: flex-start;
  }
  .list-complete-item {
    cursor: pointer;
    font-size: 14px;
    // border: 1px solid #FFF;
    width: 70px;
    height: 90px;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .list-complete-iteme{
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    height: auto;
    transition: all 1s;
  }
  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
    border: 1px solid #4AB7BD;
  }
 
  .list-complete-item.sortable-ghost {
    background: #30B08F;
    border: 1px solid #30B08F;
  }
  .undraggable {
    background-color: red;
  }
 
  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }

  .goods-list{
    display: flex;
    flex-wrap: wrap;
    height: 200px;
    padding: 20px 0;
    overflow-y: auto;
  }
  .goods-list::-webkit-scrollbar{
    display: none;
  }
  .goods-li{
    width: 50px;
    height: 50px;
    border-radius: 5px;
    position: relative;
    margin:0 10px 10px 0px;
    background: #f2f2f2;
  }
  .goods-li_img{
    width: 50px;
    height: 50px;
    border-radius: 5px;
      
  }
  .goods-del{
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  
  .goods-add{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #CCC;
  }
</style>