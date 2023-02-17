<template>
<div class="common-layout">
  <h1>今天是{{ date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' }}，欢迎{{ name }}来到社招人员信息管理系统</h1>
  <!-- <time>{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time> -->
  <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} --> 
  <!-- 走马灯 -->
  <el-carousel :interval="4000" type="card" height="280px">
    <el-carousel-item v-for="item in carouselData" :key="item">
      <img style="object-fit: scale-down; width:100%; height:100%;" :src="item.url" alt="" />
    </el-carousel-item>
  </el-carousel>
  <!-- 数据统计 -->
  <el-row>
    <el-col :span="6">
      <el-statistic title="Daily active users" :value="268500" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
            <el-icon style="margin-left: 4px" :size="12">
              <Male />
            </el-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Transactions" :value="172000" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Feedback number" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
  <!-- 首页展示 -->
  <el-row :gutter="20">

    <el-col :span="8">
            
        <el-row :gutter="4">

            <el-card shadow="hover" class="mgb20" style="height:240px;width:490px;">
                <div class="user-info">
                    <img src="../../assets/宝石花.jpg" class="user-avator" alt />
                    <div class="user-info-cont">
                        <div class="user-info-name">{{ name }}</div>
                        <div>东方地球物理公司</div>
                        <div>{{ dept }}</div>
                    </div>
                </div>
                <div class="user-info-list">
                    上次登录时间：<span>2022-11-01</span>
                </div>
                <div class="user-info-list">
                    上次登录地点：<span>河北</span>
                </div>
            </el-card>

        </el-row>

        <el-row :gutter="4">

            <el-card shadow="hover" class="mgb20" style="height:240px;width:490px;">
                <template #header>
                    <div>
                        <span>语言详情</span>
                    </div>
                </template>
                Vue<el-progress :percentage="71.3" color="#42b983"></el-progress>
                JavaScript<el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                CSS<el-progress :percentage="13.7"></el-progress>
                HTML<el-progress :percentage="5.9" color="#f56c6c"></el-progress>
            </el-card>
        
        </el-row>

        <el-row :gutter="4">
            <el-card shadow="hover" class="mgb20" style="height:240px;width:490px;">
                <template #header>
                    <div>
                        <span>语言详情</span>
                    </div>
                </template>
                Vue<el-progress :percentage="71.3" color="#42b983"></el-progress>
                JavaScript<el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                CSS<el-progress :percentage="13.7"></el-progress>
                HTML<el-progress :percentage="5.9" color="#f56c6c"></el-progress>
            </el-card>
        </el-row>
    </el-col>

    <el-col :span="16">
        <el-row :gutter="20" class="mgb20">

            <el-col :span="8">

                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-user-solid grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">1234</div>
                            <div>用户访问量</div>
                        </div>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="8">

                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-message-solid grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">321</div>
                            <div>系统消息</div>
                        </div>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="8">

                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-s-goods grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">5000</div>
                            <div>数量</div>
                        </div>
                    </div>
                </el-card>

            </el-col>
        </el-row>

        <el-card shadow="hover" style="height:660px;">
            <el-calendar v-model="value" />
            <template #header>
                <div>
                    <span>日历</span>
                </div>
            </template>

            <el-table :show-header="false" :data="todoList" style="width:100%;">
                <el-table-column width="40">
                    <template #default="scope">
                        <el-checkbox v-model="scope.row.status"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="scope">
                        <div class="todo-item" :class="{'todo-item-del': scope.row.status,}">{{ scope.row.title }}</div>
                    </template>
                </el-table-column>
                <el-table-column width="60">
                    <template>
                        <i class="el-icon-edit"></i>
                        <i class="el-icon-delete"></i>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        </el-col>

    </el-row>

    <el-row :gutter="20">

        <el-col :span="8">
            <el-card shadow="hover" style="height:252px;" class="card-1">
                <div style="padding: 14px">
                    <span><el-link href='http://localhost:8080/login#/users' :underline="false">基础信息</el-link></span>
                </div>
            </el-card>
        </el-col>

        <el-col :span="8">
            <el-card shadow="hover" style="height:252px;" class="card-2">
                <div style="padding: 14px">
                    <span><el-link href='http://localhost:8080/login#/education' :underline="false">教育信息</el-link></span>
                </div>
            </el-card>
        </el-col>

        <el-col :span="8">
            <el-card shadow="hover" style="height:252px;" class="card-3">
                <div style="padding: 14px">
                    <span><el-link href='http://localhost:8080/login#/job' :underline="false">岗级信息</el-link></span>
                </div>
            </el-card>
        </el-col>

    </el-row>

    <el-row :gutter="20">

        <el-col :span="8">
          <el-card shadow="hover" style="height:400px;" class="card-4">
            <img src="../../assets/震源车.jpg" class="image" />
            <div class="cont">
            <span><el-link href='http://localhost:8080/login#/performance' :underline="false">绩效信息</el-link></span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
            <el-card shadow="hover" style="height:252px;" class="card-5">
                <div style="padding: 14px">
                    <span><el-link href='http://localhost:8080/login#/salary' :underline="false">工资信息</el-link></span>
                </div>
            </el-card>
        </el-col>

        <el-col :span="8">
            <el-card shadow="hover" style="height:252px;" class="card-6">
                <div style="padding: 14px">
                    <span><el-link href='http://localhost:8080/login#/checkEveryone' :underline="false">查看部门所有人</el-link></span>
                </div>
            </el-card>
        </el-col>

    </el-row>
  <!-- 卡片 -->
  <el-row>
    <el-col
      v-for="(o, index) in 2"
      :key="o"
      :span="8"
      :offset="index > 0 ? 2 : 0">
      <el-card shadow="hover" :body-style="{ padding: '0px' }"> 
          <div style="padding: 14px">
              <span>夕阳下的磕头机</span>        
          </div>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img src="../../assets/震源车.jpg" class="image" />
          <div style="padding: 14px">
              <span>野外作业的震源车</span>
              <div class="bottom">
              <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time>
              <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
              <el-button text class="button">Operating</el-button>
              </div>
          </div>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img src="../../assets/物探249队勘探在群山之巅.jpg" class="image" />
          <div style="padding: 14px">
              <span>物探249队勘探在群山之巅</span>
              <div class="bottom">
              <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time>
              <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
              <el-button text class="button">Operating</el-button>
              </div>
          </div>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img src="../../assets/勘探船“东方物探创新者”号.jpg" class="image" />
          <div style="padding: 14px">
              <span>勘探船“东方物探创新者”号</span>
              <div class="bottom">
              <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time>
              <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
              <el-button text class="button">Operating</el-button>
              </div>
          </div>
        </el-card>
    </el-col>
  </el-row>
  <!-- 统计组件 -->
  <el-row>
    <el-col :span="6">
      <el-statistic title="Daily active users" :value="268500" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
            <el-icon style="margin-left: 4px" :size="12">
              <Male />
            </el-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Transactions" :value="172000" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Feedback number" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>

    <el-divider />
      <div class="copyright">
          <div class="my-1">Copyright © 2023 | 东方地球物理公司-研究院-计服中心-信息技术室</div>
          <div class="my-1">邮编：072750</div>
          <div class="my-1">电话：（0312）3829581</div>
          <div class="my-1">地址：河北省涿州市华阳东路东方地球物理科技园区</div>
      </div>
</div>

</template>

<script lang="ts" setup>
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
    /* 
      定义数据
    */
    const value = ref(new Date())
    const data = reactive({
      name: "",
      dept: ""
    })
    const date = ref(new Date())
    const name = localStorage.getItem("name")
    const dept = localStorage.getItem("dept")
    // onMounted(()=>{
  	// 	// 获取日期-星期
  	// 	this.getdataTime()
  	// 	// 读秒
  	// 	setInterval(() => {
    //     	this.getnewTime()
    //   	},1000)
  	// }),
  	// 	// 获取当前系统日期
		// getdataTime(()=>{
	  //     let wk = new Date().getDay()  
	  //     let yy = new Date().getFullYear();
	  //     let mm = new Date().getMonth() + 1;
	  //     let dd = new Date().getDate();
	  //     let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	  //     this.week = weeks[wk]
	  //     this.date_show = yy + "年" + mm + "月" + dd + "日"
	  //   }),
	  //   // 获取当前系统的时间
	  //   getnewTime(()=>{
	  //     let hh = new Date().getHours();
	  //     let mf =
	  //       new Date().getMinutes() < 10
	  //         ? "0" + new Date().getMinutes()
	  //         : new Date().getMinutes();
	  //     let ss =
	  //       new Date().getSeconds() < 10
	  //         ? "0" + new Date().getSeconds()
	  //         : new Date().getSeconds();
	  //     this.time_show = hh + ":" + mf + ":" + ss;
	  //   })
    declare var require: any
    const carouselData = [
      {url: require("@/assets/磕头机.jpg")},
      {url: require("@/assets/震源车.jpg")},
      {url: require("@/assets/物探249队勘探在群山之巅.jpg")},
      {url: require("@/assets/勘探船“东方物探创新者”号.jpg")},
    ]
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}
.el-carousel__item {
  background-color: #fff;
}
.cont {
   font-size: 120px;
   color: #999;
}
.card-1 {
    background-color: #d3dce6;
}
.card-2 {
    background-color: #d3dce6;
}
.card-3 {
    background-color: #d3dce6;
}
.card-4 {
    background-color: #d3dce6;
}
.card-5 {
    background-color: #d3dce6;
}
.card-6 {
    background-color: #d3dce6;
}
/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.el-col {
  text-align: center;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  padding: 0;
  min-height: auto;
}
.image {
  width: 100%;
  display: block;
}
.my-1 {
  margin-bottom: 0.25rem;
  margin-top: 0.25rem;
}
.copyright {
  margin: 5px 0px;
  text-align: center;
  box-sizing: border-box;
  flex: 0 0 auto;
}
.el-row {
    margin-bottom: 20px;
}
.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}
.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}
.grid-num {
    font-size: 30px;
    font-weight: bold;
}
.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}
.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}
.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}
.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}
.user-info-list span {
    margin-left: 70px;
}
.mgb20 {
    margin-bottom: 20px;
}
.todo-item {
    font-size: 14px;
}
.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
.schart {
    width: 100%;
    height: 300px;
}
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>