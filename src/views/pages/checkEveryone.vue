<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查看部门所有人</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input placeholder="请选择查询条件" v-model="data.searchParams.content" clearable class="input-with-select" >
            <template #prepend>
            <el-select v-model="data.searchParams.select" placeholder="请选择" style="width: 100px;">
              <el-option label="身份证号" value="1"></el-option>
              <el-option label="姓名姓氏" value="2"></el-option>
            </el-select>
            </template>
            <template #append>
             <el-button @click="onSearch(data.searchParams.select,data.searchParams.content)"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
          <!-- <el-input
            v-model="data.searchParams.idCard"
            placeholder="按身份证号搜索"
            class="input-with-select">
            <template #append>
              <el-button @click="searchUser"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
          <el-input
            v-model="data.searchParams.name"
            placeholder="按姓名姓氏搜索"
            class="input-with-select">
            <template #append>
              <el-button @click="searchUser1"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input> -->
        </div>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.userList" style="width: 100%">
        <el-table-column prop="id" label="" width="60" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="sex" label="性别" width="60" />
        <el-table-column prop="userCode" label="员工号" width="100" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="nation" label="民族" width="70" />
        <el-table-column prop="political" label="政治面貌" width="60" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="basicUnit" label="基层单位" width="140" />
        <el-table-column prop="job" label="工作岗位" width="100" />
        <el-table-column prop="source" label="员工来源" width="100" />
        <el-table-column prop="joinTime" label="加入时间" width="100" />
        <el-table-column prop="state" label="目前状态" width="60" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="infoCheck(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination background
        layout="prev, pager, ->, total"
        v-model:currentPage="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :total="data.total"
        @current-change="pageChange" />
    </div>
    <!-- 弹窗 -->
    <el-dialog v-model="data.infoVisible" title="查看此员工信息">
      <!-- 查看员工基础、教育、岗级、绩效、工资五个模块的信息 -->
      <el-tabs v-model="data.tabselect" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="基础信息">
          <el-table :data="data.user" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column prop="userCode" label="员工号" width="100" />
            <el-table-column prop="idCard" label="身份证号" width="180" />
            <el-table-column prop="nation" label="民族" width="70" />
            <el-table-column prop="political" label="政治面貌" width="60" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="basicUnit" label="基层单位" width="140" />
            <el-table-column prop="job" label="工作岗位" width="100" />
            <el-table-column prop="source" label="员工来源" width="100" />
            <el-table-column prop="joinTime" label="加入时间" width="100" />
            <el-table-column prop="state" label="目前状态" width="60" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教育信息" name="教育信息">
          <el-table :data="data.edu" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="idCard" label="身份证号" width="180" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="educateLevel" label="现文化程度" width="100" />
            <el-table-column prop="academicQua" label="学历性质" width="80" />
            <el-table-column prop="academicDegree" label="学位" width="100" />
            <el-table-column prop="joinTime" label="入学时间" width="110" />
            <el-table-column prop="leaveTime" label="毕业时间" width="110" />
            <el-table-column prop="graduateSchool" label="毕业院校" width="140" />
            <el-table-column prop="institute" label="院系" width="150" />
            <el-table-column prop="major" label="专业" width="130" />
            <el-table-column prop="languageLevel" label="外语水平" width="80" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="岗级信息" name="岗级信息">
          <el-table :data="data.job" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="userCode" label="员工号" width="100" />
            <el-table-column prop="idCard" label="身份证号" width="180" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="job" label="岗位名称" width="100" />
            <el-table-column prop="jobType" label="工作类型" width="100" />
            <el-table-column prop="level" label="岗级" width="80" />
            <el-table-column prop="grade" label="档次" width="80" />
            <el-table-column prop="executeTime" label="执行开始时间" width="110" />
            <el-table-column prop="note" label="备注" width="100" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="绩效信息" name="绩效信息">
          <el-table :data="data.performance" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="idCard" label="身份证号" width="180" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="unit" label="基层单位" width="120" />
            <el-table-column prop="job" label="工作岗位" width="100" />
            <el-table-column prop="exeLevel" label="行政级别" width="80" />
            <el-table-column prop="evaPeriod" label="考核期" width="100" />
            <el-table-column prop="evaStaTime" label="考核开始时间" width="110" />
            <el-table-column prop="evaEndTime" label="考核结束时间" width="110" />
            <el-table-column prop="evaScore" label="考核得分" width="80" />
            <el-table-column prop="evaClass" label="考核档次" width="80" />
            <el-table-column prop="evaHead" label="考核负责人" width="100" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="工资信息" name="工资信息">
          <el-table :data="data.salary" style="width: 100%">
            <el-table-column prop="wageDate" label="工资发放年月" width="80" />
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="idCard" label="身份证号" width="180" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="unit" label="基层单位" width="120" />
            <el-table-column prop="issAgency" label="工资代发机构" width="110" />
            <el-table-column prop="insurance" label="社保是否缴纳" width="60" />
            <el-table-column prop="basicSalary" label="基本工资" width="100" />
            <el-table-column prop="bonus" label="奖金" width="100" />
            <el-table-column prop="other" label="其他" width="60" />
            <el-table-column prop="note" label="备注" width="100" />
            <el-table-column prop="shouldIssue" label="应发金额" width="100" />
            <el-table-column prop="realIssue" label="实发金额" width="100" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>


<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { userListApi, searchUserApi, searchUserApi1, searchEduApi, searchJobApi, searchPerformApi, searchSalaryApi } from "@/util/request";
import { ElMessage } from "element-plus";
    /* 
      定义数据
    */
    const data = reactive({
      tabselect:"基础信息",
      infoVisible: false,
      id: "",
      idCard: "",
      searchParams: {
        content: "",
        select: "",
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      userList: [],
      user: [],
      edu: [],
      job: [],
      performance: [],
      salary: [],
    })

    const userAllget = async () => {
      const result = await userListApi(data.searchParams)
      console.log(result);
      data.userList = result.data
      data.total = result.total
    }

    onMounted(() => {
      userAllget()
    })

    const onSearch = (id,content) => {
      switch (id){
        case "1":
          searchUser(content)
          break
        // console.log(content)
        case "2":
          searchUser1(content)
          break
      }
    }

    const infoCheck = (e) => {
      data.tabselect = "基础信息"
      data.user = []
      data.edu = []
      data.job = []
      data.performance = []
      data.salary = []
      data.idCard = e.idCard
      userget(e.idCard)
      // eduget(e.idCard)
      // jobget(e.idCard)
      // performget(e.idCard)
      // salaryget(e.idCard)
      data.infoVisible = true
    }

    const handleClick = (tab) => {
      console.log(tab);
      const label = tab.props?.label
      const idCard = data.idCard
      console.log(label);
      switch (label) {
        case "基础信息":
          userget(idCard)
          break
        case "教育信息":
          eduget(idCard)
          break
        case "岗级信息":
          jobget(idCard)
          break
        case "绩效信息":
          performget(idCard)
          break
        case "工资信息":
          salaryget(idCard)
          break
      }
    }

    const pageChange = (val) => {
      console.log(val);
      data.searchParams.pagenum = val
      if(data.searchParams.content===""){
        userAllget()
      }

    }
    
    const userget = async (idCard) => {
      const result = await searchUserApi(idCard)
      data.user = result.data
      if(data.infoVisible===false){
        data.total = 1
      }
      return result
    }

    const userget1 = async (name) => {
      const result = await searchUserApi1(name)
      console.log(result);
      data.user = result.data
      if(data.infoVisible===false){
        data.total = result.total
      }
      return result
    }

    const eduget = async (idCard) => {
      const result = await searchEduApi(idCard)
      data.edu = result.data
    }

    const jobget = async (idCard) => {
      const result = await searchJobApi(idCard)
      data.job = result.data
    }

    const performget = async (idCard) => {
      const result = await searchPerformApi(idCard)
      data.performance = result.data
    }

    const salaryget = async (idCard) => {
      const result = await searchSalaryApi(idCard)
      data.salary = result.data
    }

    const searchUser = async (content) => {
      // const result = await searchUserApi(content)
      if (!content) {
        userAllget()
      } else {
        const result = await userget(content)
        console.log(result)
        if (result.status === 200) {
          data.userList = result.data
        } else {
          console.log(123)
          data.userList = []
          data.total = 0
        }
      }
    }

    const searchUser1 = async (content) => {
      // const result = await searchUserApi1(content)
      if (!content) {
        userAllget()
      } else {
        const result = await userget1(content)
        if (result.status === 200) {
          data.userList = result.data
          // userget1()
        } else {
          data.userList = []
          data.total = 0
        }
      }
    }
</script>

<style scoped>
.input_box {
  width: 340px;
  margin-right: 15px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select {
  background-color: #fff;
}
</style>