<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>已退回申请单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
    <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.approveBackList" style="width: 100%">
        <el-table-column prop="id" label="申请表id" width="80" />
        <el-table-column prop="userCode" label="员工号" width="100" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="process" label="流程数" width="80" />
        <el-table-column prop="status" label="审批单所处状态" width="140" />
        <el-table-column prop="createtime" label="创建时间" width="180" />
        <el-table-column prop="updatetime" label="更新时间" width="180" />
        <el-table-column prop="type" label="审批类型" width="100" />
        <el-table-column prop="handle" label="操作" width="100" />
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
    <el-dialog v-model="data.infoVisible" title="申请信息">
    <!-- 查看申请信息 -->
      <el-table :data="data.userCheck" style="width: 100%">
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
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { approveBackApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  infoVisible: false,
  id: "",
  KeyWord: "",
  idCard: "",
  total: 0,
  approveBackList: [],
  userCheck: [],
  searchParams: {
    idCard: "",
    pagesize: 5,
    pagenum: 1,
  },
});

onMounted(() => {
  approveBackget();
});

const pageChange = (val) => {
  data.searchParams.pagenum = val;
  approveBackget()
};

const approveBackget = async () => { 
  const result = await approveBackApi(data.searchParams);
  console.log(result);
  data.approveBackList = result.data;
  data.total = result.total;
};

const infoCheck = (e) => {

  data.infoVisible = true;
  data.userCheck = e.data;
};

</script>

<style scoped>

</style>