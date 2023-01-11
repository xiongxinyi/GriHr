<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审批审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <p class="underline">待审核</p>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.userList" style="width: 100%">
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
            <el-button type="primary" @click="aduitUser(1)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, ->, total"
        v-model:currentPage="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :total="data.total"
        @current-change="pageChange" />
    </div>
    <!-- 提交申请提示框 -->
    <el-dialog v-model="data.submitDialog" width="30%">
      <span>请确认是否提交申请?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.submitDialog = false">否</el-button>
          <el-button type="primary" @click="submitUser">是</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 审核是否同意提示框 -->
    <el-dialog v-model="data.auditDialog" width="30%">
      <span>审核是否同意?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.aduitDialog = false">不同意</el-button>
          <el-button type="primary" @click="auditUser">同意</el-button>
        </span>
         <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            placeholder="备注" />
      </template>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog v-model="data.infoVisible" title="查看申请的信息">
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
import { userListApi,deleteUserApi,searchUserApi,addUserApi,updateUserApi,myApplicationApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  deleteId: null,
  aduitDialog: false,
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
  userList: [],
  userCheck:[],
  formData: {
    name: "",
    userCode: "",
    department: "",
    process: "",
    status: "",
    type: "",
    handle: "",
    //
    id: "",
    name: "",
    sex: "",
    idCard: "",
    userCode: "",
    nation: "",
    political: "",
    department: "",
    basicUnit: "",
    job: "",
    source: "",
    joinTime: "",
    state: "",
  },
});

onMounted(() => {
  applicationget();
});

const deleteUserDialog = (id) => {
  data.deleteDialog = true;
  data.deleteId = id;
};

const pageChange = (val) => {
  data.searchParams.pagenum = val;
  applicationget();
};

const applicationget = async () => { 
  const result = await myApplicationApi(data.searchParams);
 
  data.userList = result.data;
  data.total = result.total;
};

const searchUser = async () => {
  const result = await searchUserApi(data.searchParams);
  if (!data.searchParams.idCard) {
    userAllget();
  } else {
    if (result.code === 200) {
      data.userList = result.data;
      data.total = result.total;
      userAllget();
    } else {
      data.userList = [];
      data.total = 0;
    }
  }
};

const deleteUser = async () => {
  const result = await deleteUserApi({ id: data.deleteId });
  if (result.message === "OK") {
    ElMessage.success("删除成功");
    userAllget();
  } else {
    ElMessage.error("接口报错");
  }
  data.deleteDialog = false;
};

const aduitUser = (flag,userId,userInfo) => {
      data.aduitDialog = true
      if(flag === 1){
        data.id = null
        data.title = '新增员工基础信息'
        data.formData = {}
      }
    }

const infoCheck = (user) => {

  data.infoVisible = true;
  data.userCheck = user.data;
};

const submitForm = async () => {
  console.log(data.id);
  if (!data.id) {
    let res = await addUserApi(data.formData);
    if (res.message === "OK") {
      ElMessage.success("添加成功");
      userAllget();
    } else {
      ElMessage.error("请添加必填项");
    }
    data.dialogFormVisible = false;
  } else {
    let res = await updateUserApi({ ...data.formData, id: data.id });
    if (res.message === "OK") {
      ElMessage.success("修改成功");
      userAllget();
    } else {
      ElMessage.error("请添加必填项");
    }
    data.dialogFormVisible = false;
  }
};

const userForm = ref();
</script>

<style scoped>
.underline{
  text-decoration:underline
}
</style>