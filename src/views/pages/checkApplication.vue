<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查询个人申请表</el-breadcrumb-item>
      <el-breadcrumb-item>查看申请表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <el-button type="primary" style="margin-left: auto" @click="isReturn">返回</el-button>
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
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, ->, total"
        v-model:currentPage="data.searchParams.pagenum"
        v-model:page-size="data.searchParams.pagesize"
        :total="data.total"
        @current-change="pageChange"/>
    </div>
    <!-- <div  v-for="(item,index) in arr" :key="item.index">
    {{item.name}}  {{item.sex}}  {{item.userCode}}
  </div> -->
    <!-- <div v-for="item in arr" :key="item">{{ item.name }} {{ item.nation }}</div>
  </div> -->
    <el-dialog v-model="data.deleteDialog" width="30%">
      <span>请确认是否提交申请?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.deleteDialog = false">否</el-button>
          <el-button type="primary" @click="deleteUser">是</el-button>
        </span>
      </template>
    </el-dialog>
    
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { userListApi,deleteUserApi,searchUserApi,addUserApi,updateUserApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  deleteId: null,
  deleteDialog: false,
  dialogFormVisible: false,
  id: "",
  KeyWord: "",
  title: "申请表",
  searchParams: {
    dept: "",
    pagesize: 5,
    pagenum: 1,
  },
  total: 0,
  userList: [],
  rules: {
    name: [{ required: true, message: "此项为必填项", trigger: "blur" }],
    userCode: [{ required: true, message: "此项为必填项", trigger: "blur" }],
  },
});
const isReturn=() => {
 router.push({
        path: "./role1application",
      });};

onMounted(() => {
  userAllget();
});

const deleteUserDialog = (id) => {
  data.deleteDialog = true;
  data.deleteId = id;
};

const pageChange = (val) => {
  data.searchParams.pagenum = val;
  userAllget();
};

const userAllget = async () => {
  const result = await userListApi(data.searchParams);
  data.userList = result.data;
  data.total = result.total;
};

const searchUser = async () => {
  const result = await searchUserApi(data.searchParams);
  if (!data.searchParams.dept) {
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

const addUser = (flag, userId, userInfo) => {
  data.dialogFormVisible = true;
  if (flag === 1) {
    data.id = null;
    data.title = "申请表";
    data.formData = {};
  } else {
    data.id = userId;
    data.title = "修改员工基础信息";
    Object.assign(data.formData, userInfo);
  }
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
</style>