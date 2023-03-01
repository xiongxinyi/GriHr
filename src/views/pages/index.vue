<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
<div class="common-layout">
  <h1>今天是{{ date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' }}，欢迎{{ name }}来到社招人员信息管理系统</h1>
  <!-- <time>{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time> -->
  <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} --> 
  <!-- 走马灯 -->
  <el-carousel :interval="4000" type="card" height="280px">
    <el-carousel-item v-for="item in data.carouselData" :key="item">

      <img style="object-fit: scale-down; width:100%; height:100%;" :src="item" alt="" />
    </el-carousel-item>
  </el-carousel>
  <!-- 首页展示 -->
  <el-row :gutter="20">

    <el-col :span="8">
      <!-- 登录者个人信息 -->
			<el-card shadow="hover" class="mgb20" style="height:252px">
				<div class="user-info">
          <img src="@/assets/baoshihua.jpg" class="user-avator"  />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
                <h3>东方地球物理公司</h3>
                  <h3>{{ dept }}</h3>
                </div>
              </div>
            <div class="user-info-list">
              <h4>上次登录时间：{{ logintime }}</h4>
            </div>
		  </el-card>
      <!-- 待办事项 -->
      <el-card shadow="hover" style="height: 252px">
        <template #header>
          <div class="clearfix">
            <span><b>快捷栏</b></span>
          </div>
        </template>

  <el-row :gutter="16">

  <el-col :span="8">
  
    <router-link to="/users">
    <el-card shadow="always">
      <i class="iconfont icon-jichuxinxi" style="font-size: 22px;color: #1296db;"></i>
      基础信息
    </el-card>
  </router-link>
  </el-col>

  <el-col :span="8">
    <router-link to="/education">
    <el-card shadow="always">
      <i class="iconfont icon-jiaoyuxinxi" style="font-size: 22px;color: #1296db;"></i>
      教育信息
    </el-card>
  </router-link>
  </el-col>
  <el-col :span="8">
    <router-link to="/job">
    <el-card shadow="always">
      <i class="iconfont icon-zhiwei" style="font-size: 22px;color: #1296db;"></i>
      岗级信息
    </el-card>
  </router-link>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8">
    <router-link to="performance">
    <el-card shadow="always">
      <i class="iconfont icon-jixiao" style="font-size: 22px;color: #1296db;"></i>
      绩效信息
    </el-card>
  </router-link>
  </el-col>
  <el-col :span="8">
    <router-link to="salary">
    <el-card shadow="always">
      <i class="iconfont icon-gongzi" style="font-size: 22px;color: #1296db;"></i>
      工资信息
    </el-card>
  </router-link>
  </el-col>

</el-row>

        <!-- <el-table :show-header="false" :data="todoList" style="width: 100%">
          <el-table-column width="40">
            <template #default="scope">
              <el-checkbox v-model="scope.row.status"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <div
                class="todo-item"
                :class="{'todo-item-del': scope.row.status}">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
        </el-table> -->
      </el-card>
      <!-- 语言详情 -->
      <!-- <el-card shadow="hover" class="mgb20" style="height:252px">
        <template #header>
          <div class="clearfix">
            <span>语言详情</span>
          </div>
        </template>
        Vue<el-progress :percentage="79.4" color="#42b983"></el-progress>
        TypeScript<el-progress :percentage="14" color="#f1e05a"></el-progress>
        CSS<el-progress :percentage="5.6"></el-progress>
        HTML<el-progress :percentage="1" color="#f56c6c"></el-progress>
      </el-card> -->
		</el-col>

    <el-col :span="16" > 
      <el-row :gutter="20" class="mgb20" v-if="role==='1'">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-1">
              <el-icon class="el-icon-user grid-con-icon"><User /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">{{ data.deptcount }}</div>
                  <div>人员总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-2">
              <el-icon class="el-icon-pass grid-con-icon"><DocumentChecked /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">{{ data.apps }}</div>
                  <div>已申请</div>
              </div>
            </div>
          </el-card>

        </el-col>
        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-3">
              <el-icon class="el-icon-reject grid-con-icon"><DocumentDelete /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">{{ data.return }}</div>
                  <div>已退回</div>
              </div>
            </div>
          </el-card>

        </el-col>
      </el-row>

      <el-row :gutter="20" class="mgb20" v-if="role==='2'||role==='3'">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-1">
              <el-icon class="el-icon-user grid-con-icon"><User /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">{{data.count}}</div>
                  <div>人员总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-2">
              <el-icon class="el-icon-pass grid-con-icon"><DocumentChecked /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">{{ data.approved }}</div>
                  <div>已审核</div>
              </div>
            </div>
          </el-card>

        </el-col>
        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-3">
              <el-icon class="el-icon-reject grid-con-icon"><DocumentDelete /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">{{ data.approve }}</div>
                  <div>待审核</div>
              </div>
            </div>
          </el-card>

        </el-col>
      </el-row>


      <!-- 日历 -->
      <el-card shadow="hover" style="height:403px;">
        <el-calendar v-model="value" />
          <!-- <template #header>
              <div>
                <span>日历</span>
              </div>
          </template> -->
      </el-card>

    </el-col>

  </el-row>
  <!-- 信息模块使用阿里图标 -->
  <!-- <el-row :gutter="20">

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/users' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-gerenxinxi-1" style="height:252px;">
          <div>
            <el-link href='http://localhost:8080/login#/users' :underline="false" class="cont-font">基础信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/users' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-education-1-copy" style="height:252px;">
          <div>
            <el-link href='http://localhost:8080/login#/education' :underline="false" class="cont-font">教育信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/job' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-gangwei" style="height:252px;">
          <div>  
            <el-link href='http://localhost:8080/login#/job' :underline="false" class="cont-font">岗级信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

  </el-row> -->

  <!-- <el-row :gutter="20">

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/performance' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-jixiaokaohe" style="height:252px;">

          <div>
            <el-link href='http://localhost:8080/login#/performance' :underline="false" class="cont-font">绩效信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/salary' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-gongziguanli" style="height:252px;">

          <div>
            <el-link href='http://localhost:8080/login#/salary' :underline="false" class="cont-font">工资信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/checkEveryone' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-xiaozu" style="height:252px;">
          <div>
            <el-link href='http://localhost:8080/login#/checkEveryone' :underline="false" class="cont-font">查看部门所有人</el-link>
          </div>
        </span> 
      </el-card>
      </el-link>
    </el-col>

  </el-row> -->
  
  <!-- 统计组件 -->
  <!-- <el-row>
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
  </el-row> -->

  <el-divider />
  <!-- 版权信息 -->
    <div class="copyright">
      <div class="my-1">Copyright © 2023 | 东方地球物理公司-研究院-计服中心-信息技术室</div>
      <div class="my-1">邮编：072750</div>
      <div class="my-1">电话：（0312）3829581</div>
      <div class="my-1">地址：河北省涿州市华阳东路东方地球物理科技园区</div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
// import "./../../assets/iconfont/iconfont.css"
import "@/assets/iconfont/iconfont.css"
    /* 
      定义数据
    */
    const {userListApi,myApplicationApi,approveBackApi,approveApi,approvedApi} = require('@/util/request')
    const role = localStorage.getItem("role")
    onMounted(async()=>{
       if (role==='1') {
          const res1 = await userListApi()
          data.deptcount = res1.total
          const res2 = await myApplicationApi()
          data.apps = res2.total
          const res3 = await approveBackApi()
          data.return = res3.total
          // console.log(res2);
          
       }else if(role==='2'||role==='3'){
        const res1 = await userListApi()
          data.count = res1.total
        const res2 = await approveApi()
        data.approve = res2.total
        const res3 = await approvedApi()
        data.approved = res3.total
        
       }
    })
    const data = reactive({
      deptcount:0,
      count:0,
      apps:0,
      return:0,
      approve:0,
      approved:0,
      carouselData:[
      require("@/assets/ketouji.jpg"),
      require("@/assets/zhenyuanche.jpg"),
      require("@/assets/249dui.jpg"),
      require("@/assets/kantanchuan.jpg"),
      ]
    })
    console.log(role);
    
    const logintime = localStorage.getItem("logintime")
    // console.log(logintime);
    
    const value = ref(new Date())
    // const data = reactive({
    //   name: "",
    //   dept: ""
    // })
    const date = ref(new Date())
    const name = localStorage.getItem("name")
    const dept = localStorage.getItem("dept")

    
     
    // const carouselData = [
    //   {url: 'assets/ketouji.jpg'},
    //   {url:require("@/assets/zhenyuanche.jpg")},
    //   {url: require("@/assets/249dui.jpg")},
    //   {url: require("@/assets/kantanchuan.jpg")},
    // ]
    
</script>

<style>
a{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.time {
  font-size: 12px;
  color: #999;
}
/* .el-carousel__item {
  background-color: #fff;
} */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
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
.card {
  background-color: #fff;
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
.cont-font {
  font-size: 20px;
  font-weight: bold;
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
  background: rgb(45, 140, 252);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 252);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
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
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
.el-calendar {
  --el-calendar-border: var(--el-table-border, 1px solid var(--el-border-color-lighter));
  --el-calendar-header-border-bottom: var(--el-calendar-border);
  --el-calendar-selected-bg-color: var(--el-color-primary-light-9);
  --el-calendar-cell-width: 50px;
  background-color: var(--el-fill-color-blank);
}
</style>