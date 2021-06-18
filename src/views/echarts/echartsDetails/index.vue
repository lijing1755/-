<template>
  <div class="wrapper">
    <div class="myChart">
      <div id="myChartTwo" :style="{width: '100%', height: '300px','margin-top':'20px'}" />
    </div>
    <div class="myChart">
      <div id="myChart" :style="{width: '100%', height: '300px'}" />
    </div>
    <div class="piev">
      <div id="pie" :style="{width: '100%', height: '400px' , 'margin-top':'20px',padding:'10px 0px',background:'#fff'}" />
      <div class="dateselect">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          @change="changeDate"
        />
      </div>
    </div>
    <div class="table">
      <div class="left">
        <div class="tab-title">
          <div class="title">
            用户发团统计
          </div>
          <el-date-picker
            v-model="value3"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="changeDateValue3"
          />
        </div>
        <el-table
          :data="userData.data"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="avater"
            label="头像"
            width="60"
          >
            <template slot-scope="scope">
              <img class="avatar" :src="scope.row.user_info.avatar_url" alt="" srcset="">
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="用户ID"
            width="180"
          >
            <template slot-scope="scope">
              {{ scope.row.user_info.id }}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
          >
            <template slot-scope="scope">
              {{ scope.row.user_info.nickname }}
            </template>
          </el-table-column>
          <el-table-column
            prop="sum_account"
            label="发团数量"
            width="180"
          />
        </el-table>
        <el-pagination
          small
          layout="prev, pager, next"
          :current-page="userData.current_page"
          :page-size="userData.per_page"
          :total="userData.total"
          @current-change="currentUserChange"
        />
      </div>
      <div class="right">
        <div class="tab-title">
          <div class="title">
            活动商品购买统计
          </div>
          <el-date-picker
            v-model="value4"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="changeDateValue4"
          />
        </div>
        <el-table
          :data="tableData.data"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="商品ID"
            width="180"
          />
          <el-table-column
            prop="goods_name"
            label="商品名称"
          >
            <template slot-scope="scope">
              {{ scope.row.goods_name }}
            </template>
          </el-table-column>

          <el-table-column
            prop="goods_num"
            label="购买次数"
            width="180"
          />
        </el-table>
        <el-pagination
          small
          layout="prev, pager, next"
          :current-page="tableData.current_page"
          :page-size="tableData.per_page"
          :total="tableData.total"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  activityPvDetail,
  activityPvList,
  userBuyPvNum,
  buyGoodsPvNum,
  userGroupPvNum
} from '@/api/system/activate'
export default {

  components: {},
  props: {},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      value2: new Date(),
      value3: new Date(),
      value4: new Date(),
      userData: {},
      tableData: {},
      color: ['#63b2ee', '#76da91', '#f8cb7f', '#f89588', '#7cd6cf', '#9192ab', '#7898e1', '#efa666', '#eddd86', '#9987ce',
        '#63b2ee', '#76da91', '#71ae46', '#96b744', '#c4cc38', '#ebe12a', '#eab026', '#e3852b', '#d85d2a', '#ce2626',
        '#ac2026', '#71ae46', '#96b744', '#c4cc38', '#00a8e1', '#99cc00', '#e30039', '#fcd300', '#800080', '#00994e',
        '#ff6600', '#808000', '#db00c2', '#008080', '#0000ff', '#c8cc00', '#0e72cc', '#6ca30f', '#f59311', '#fa4343',
        '#16afcc', '#85c021', '#d12a6a', '#0e72cc', '#6ca30f', '#f59311', '#fa4343', '#16afcc', '#5b9bd5', '#ed7d31'],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  computed: {
    formatterName() {
      return function(value) {
        if (value.length < 20) {
          return value
        } else {
          return value.slice(0, 20) + '...'
        }
      }
    }
  },
  watch: {},
  created() {

  },
  mounted() {
    this.drawLine()
    this.drawLineTwo()
    this.drawPie()
    this.userGroupPvNum()
    this.buyGoodsPvNum()
  },
  methods: {
    changeDate(e) {
      console.log('改变时间')
      console.log(e.getTime() / 1000)
      this.drawPie()
    },
    changeDateValue3() {
      this.userGroupPvNum()
    },
    changeDateValue4() {
      this.buyGoodsPvNum()
    },
    drawLine() { // 用户访问活动数据
      activityPvList().then(res => {
        const drawLineDate = res.data.activity_pv_list
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '活动页PV' },
          tooltip: {
            trigger: 'axis'
          },
          color: ['#FF7403'],
          // legend: {
          //   icon: 'rectangle',
          //   data: ['活动页PV', '点击活动商品进入详情PV']
          // },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false
            },
            data: drawLineDate.x_line
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          dataZoom: [{
            startValue: '周一'
          }, {
            type: 'inside'
          }],
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%'
          },
          series: {
            name: '当天人次',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: drawLineDate.y_line
          }

        })
      })
    },
    drawLineTwo() { // 用户访问活动数据
      userBuyPvNum().then(res => { // todo
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChartTwo'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '注册用户和转化用户'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['#FF7403', '#67C23A'],
          legend: {
            icon: 'rectangle',
            data: ['新增注册用户', '新增已下单用户']
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%'
          },
          dataZoom: [{
            startValue: '周一'
          }, {
            type: 'inside'
          }],
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            boundaryGap: false,
            data: res.data.time
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '新增注册用户',
              type: 'line',
              smooth: true,
              data: res.data.register_num
            },
            {
              name: '新增已下单用户',
              type: 'line',
              smooth: true,
              data: res.data.register_buy_num
            }
          ]
        })
      })
    },
    drawPie() {
      const date = Date.now()
      // console.log(this.value2.getTime()/1000)
      activityPvDetail({
        begin: this.value2 ? parseInt(this.value2.getTime() / 1000) : parseInt(date / 1000)
      }).then(res => {
        const resp = res.data.goods_list
        const tempdata = []
        for (let i = 0; i < resp.length; i++) {
          tempdata.push({
            value: resp[i].pv_num,
            name: resp[i].goods_name
          })
        }

        const myChart = this.$echarts.init(document.getElementById('pie'))
        myChart.setOption({
          title: {
            text: '活动商品详情pv',
            subtext: '',
            left: '0'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: '850',
            formatter: function(name) {
              if (!name) return ''
              // 超出几个字符隐藏，鼠标悬浮时显示
              if (name.length > 5) {
                name = name.slice(0, 5) + '...'
              }
              return name
            },
            tooltip: {
              show: true
            }

          },
          color: this.color,
          series: [
            {
              avoidLabelOverlap: true,
              name: '商品统计',
              type: 'pie',
              radius: '90%',
              center: ["20%", "53%"],
              top: '20',
              data: tempdata,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                align: 'left',
                normal: {
                  formatter(v) {
                    const text = '' + v.name
                    if (text.length <= 5) {
                      return text
                    } else if (text.length > 5) {
                      return text.slice(0, 5) + '...'
                    }
                  }

                }
              }
            }
          ]
        })
      })
    },
    userGroupPvNum(page) {
      const date = Date.now()
      userGroupPvNum({
        page: page || 1,
        begin: this.value3 ? parseInt(this.value3.getTime() / 1000) : parseInt(date / 1000)
      }).then(res => {
        console.log(res)
        this.userData = res.data
      })
    },
    buyGoodsPvNum(page) {
      const date = parseInt(Date.now() / 1000)
      buyGoodsPvNum({
        page: page || 1,
        begin: this.value4 ? parseInt(this.value4.getTime() / 1000) : date
      }).then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    currentUserChange(e) {
      this.userGroupPvNum(e)
    },
    currentChange(e) {
      this.buyGoodsPvNum(e)
    }
  }

}
</script>
<style lang="scss" scoped>
.table{
  width: 100%;
  display: flex;
  justify-content: space-between;

}
.avatar{
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
.tab-title{
  display: flex;
  justify-content: space-between;
  .title{
    padding:0px;
    margin: 0px;
    border-left: 0px;
    font-weight: 900;
    font-size: 18px;
    color: #4d4d4d;
  }
}
.right{
  width: 49%;
  padding: 20px;
  background: #fff;
}
.left{
  width: 49%;
  padding: 20px;
  background: #fff;
}
.wrapper{
  padding: 20px;
  background: #f2f2f2;
}
.myChart{
  width: 100%;
  height: 380px;
  background:#fff;
  margin: 20px 0;
  padding:40px
}
.schart{
  position: relative;
}
.select{
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 50px;
  z-index: 999;
}
.piev{
  position: relative;
   background:#fff;
  margin: 20px 0;
  padding:20px;
  .dateselect{
    position: absolute;
    right: 5%;
    top: 10px;
  }
}
</style>
