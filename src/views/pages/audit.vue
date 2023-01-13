<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审批审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
    <!-- 表格 -->
      <el-tabs v-model="待审批" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="待审批" name="待审批">
          <el-table :data="data.pendingApproveList" style="width: 100%">
            <el-table-column prop="id" label="申请表id" width="80" />
            <el-table-column prop="userCode" label="员工号" width="100" />
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="process" label="流程数" width="80" />
            <el-table-column prop="status" label="审批单所处状态" width="140" />
            <el-table-column prop="type" label="审批类型" width="100" />
            <el-table-column prop="handle" label="操作" width="100" />
            <el-table-column prop="createtime" label="创建时间" width="180" />
            <el-table-column prop="data" label="查看申请信息 审核">
              <template #default="scope">
                <el-button type="primary" @click="infoCheck(scope.row)">查看</el-button>
                <el-button type="primary" @click="auditCheck(scope.row)">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
         <el-tab-pane label="已审批" name="已审批">
          <el-table :data="data.approvedList" style="width: 100%">
            <el-table-column prop="id" label="申请表id" width="80" />
            <el-table-column prop="userCode" label="员工号" width="100" />
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="process" label="流程数" width="80" />
            <el-table-column prop="status" label="审批单所处状态" width="140" />
            <el-table-column prop="statusCode" label="状态码" width="140" />
            <el-table-column prop="createtime" label="创建时间" width="180" />
            <el-table-column prop="updatetime" label="更新时间" width="180" />
            <el-table-column prop="type" label="审批类型" width="100" />
            <el-table-column prop="handle" label="操作" width="100" />  
            <el-table-column prop="data" label="查看申请信息">
              <template #default="scope">
                <el-button type="primary" @click="infoCheck(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, ->, total"
        v-model:currentPage="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :total="data.total"
        @current-change="pageChange" />
    </div>
    <!-- 审核是否同意提示框 -->
    <el-dialog v-model="data.auditDialog" width="30%">
      <span>审核是否同意?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="auditReject">不同意</el-button>
          <el-button type="primary" @click="auditPass">同意</el-button>
        </span>
         <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            placeholder="备注" />
      </template>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog v-model="data.infoVisible" title="申请信息">
    <!-- 查看申请信息 -->
      <el-table :data="data.userCheck" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
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
import { approveApi,approvedApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  deleteId: null,
  opinion:"",
  textarea:"",
  deleteDialog: false,
  infoVisible:false,
  id: "",
  KeyWord: "",
  title: "申请表",
  searchParams: {
    idCard: "",
    pagesize: 5,
    pagenum: 1,
  },
  total: 0,
  pendingApproveList: [],
  approvedList: [],
  userCheck: [],
});

// const auditPass =() =>{
//   data.textarea = 
  
// }
// onMounted(() => {
//   approveget();
// });

const deleteUserDialog = (id) => {
  data.deleteDialog = true;
  data.deleteId = id;
};

const pageChange = (val) => {
  data.searchParams.pagenum = val;
  approveget();
};

const approveget = async () => { 
  const result = await approveApi(data.searchParams);
  // console.log(result);
  data.pendingApproveList = result.data;
  data.total = result.total;
};

const approvedget = async () => { 
  const result = await approvedApi(data.searchParams);
  console.log(result);
  data.approvedList = result.data;
  data.total = result.total;
};

const infoCheck = (e) => {

  data.infoVisible = true;
  data.userCheck = e.data;
};

const handleClick = (tab) => {
  console.log(tab);
  const label = tab.props?.label;
  console.log(label);
  switch (label) {
    case "待审批":
      approveget()
      break;
    case "已审批":
      approvedget()
      break;
  }
};

const auditCheck = () => {

  data.auditDialog = true;

};

// const textarea = ref('')

</script>

<style scoped>
</style>