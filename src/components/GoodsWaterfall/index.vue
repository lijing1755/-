<template>
    <div class="container-water-fall">

   <waterfall :col='col' :data="list">
        <template>
          <div
            class="prpbImgBox "
            v-for="(item,index) in list"
            :key="index"
             
          >
            <img class="goods-image" :src="URL+item.goods_img" alt="加载错误" />
            
            <div class="goods-title">
                <span class="goods-group" v-if="item.is_group==1">乐购</span><span class="goods-happy" v-if="item.is_happy">欢乐购</span><span class="textOver">{{item.goods_name}}</span>
            </div>
            <div class="goods-price">
                <span class="goods-new-price">￥200</span><span class="goods-old-price">￥300</span>
            </div>
          </div>
        </template>
      </waterfall>

  </div>
</template>

<script>

export default{
    name: 'goodsWaterfall',
    props: {
        list: {
            type: Array,
            default: []
        },
        
    },
    data(){
        return{
            URL:'https://jupinshop.oss-cn-shenzhen.aliyuncs.com',
            data:[
                {
                    image:require('@/assets/image/imagess.png'),
                    title:'夏日手机卡和纳税和纳税和纳税',
                    is_happy:1,
                    is_group:1
                },
                {
                    image:require('@/assets/image/imagess.png'),
                    title:'夏日手机卡和纳税和纳税和纳税和纳税和纳税',
                    is_happy:1,
                    is_group:1
                }
            ],
            col:2,
            image:require('@/assets/image/imagess.png')
        }
    },
    
    methods:{
        scroll(scrollData){
            console.log(scrollData)
        },
        switchCol(col){
            this.col = col
            console.log(this.col)
        },
        loadmore(index){
            this.data = this.data.concat(this.data)
        }
    }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.container-water-fall {
    padding:10px 0px 0px 15px;
    width: 375px;
    box-sizing: border-box;
    z-index: 999;
  }
  .goods-image{
      width: 162px;
      height: 162px;
      border-radius: 10px 10px 0 0;

  }
  .goods-title{
    margin-top: 10px;  
    padding: 0px 5px; 
  }
  .goods-price{
    padding: 0px 5px;   
  }
  .goods-group{
    padding: 3px 5px;
    background: linear-gradient(to right,#FF7403,#EF2C16);
    border-radius: 5px;
    color: #fff;
    margin-right: 5px;
  }
  .goods-happy{
    padding: 3px 5px;
    background: linear-gradient(to right,#FF265A,#8020FF);
    border-radius: 5px;
    color: #fff;
    margin-right: 5px;
  }
  .goods-new-price{
      font-size: 12px;
      color: #FF7403;
      font-weight: 600;
      margin-right: 10px;
  }
  .goods-old-price{
      font-size: 10px;
      color: #999999;
      text-decoration: line-through
  }
  span{
      line-height: 20px;
      font-size: 13px;
  }
  .prpbImgBox  {
      width: 162px;
      display: flex;
      flex-direction: column;
      box-shadow: 0px 10px 20px rgba(14, 66, 128, 0.06);
      margin-bottom: 10px;
      border-radius: 10px;
      background: #FFF;
  }
  .cell-item {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  margin:10% 0;}

  .cell-item img {
  width: 100%;
  height: auto;
  display: block;}

  .item-descA {
  font-size: 17px;
  color:rgba(46,44,42,1);
  line-height: 17px;
  font-weight: bold;
  margin:11.5px 0 13px 9px;}

  .item-descB {
  font-size:12px;
  font-weight:500;
  color:rgba(89,89,89,1);
  line-height:17px;
  margin:11.5px 0 13px 9px;}

  .item-footer {
  margin-top: 22px;
  position: relative;
  display: flex;
  align-items: center;}

  .name {
  max-width: 150px;
  margin-left: 10px;
  font-size: 14px;
  color: #999999;}

  .tech-list-ll .tab-bottom{
  padding:10px 0 !important;
  height: 0 !important;
  background: #fafafa !important;}
</style>