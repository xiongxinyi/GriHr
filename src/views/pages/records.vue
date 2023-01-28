<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审批进程</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <p>请输入申请单id号:</p>
          <el-input
            v-model="data.searchParams.applicationId"
            placeholder="请输入申请单id号"
            class="input-with-select">
            <template #append>
              <el-button @click="searchRecord"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </div>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.recordsList" style="width: 100%">
        <el-table-column prop="id" label="" width="60" />
        <el-table-column prop="applicationId" label="申请单id" width="80" />
        <el-table-column prop="userCode" label="员工号" width="100" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="approvalTime" label="审批时间" width="180" />
        <el-table-column prop="opinion" label="审批意见" width="60" />
        <el-table-column prop="desc" label="备注" width="100" />
      </el-table>
      <!-- 分页器 -->
      <el-pagination background
        layout="prev, pager, ->, total"
        v-model:currentPage="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :total="data.total"
        @current-change="pageChange" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { appCheckApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  // id: "",
  // applicationId: "",
  // userCode: "",
  // name: "",
  // department: "",
  // approvalTime: "",
  // opinion: "",
  // desc: "",
  KeyWord: "",
  total: 0,
  searchParams: {
    applicationId: "",
    pagesize: 5,
    pagenum: 1,
  },
  recordsList: [],
});

// const pageChange = (val) => {
//   data.searchParams.pagenum = val;
//   recordsAllget();
// };

// const recordsAllget = async () => {
//   const result = await appCheckApi(data.searchParams);
//   data.recordsList = result.data;
//   data.total = result.total;
// };

const searchRecord = async () => {
  const result = await appCheckApi(data.searchParams);
  if (!data.searchParams.applicationId) {
    recordsAllget();
  } else {
    if (result.status === 200) {
      data.recordsList = result.data;
      data.total = result.total;
      recordsAllget();
    } else {
      data.recordsList = [];
      data.total = 0;
    }
  }
};
</script>

<style scoped>
.input_box {
  width: 200px;
  margin-right: 15px;
}
</style>