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
        <el-button type="primary" @click="addUser(1)" style="margin-left: auto">申请导入</el-button>
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
        <el-table-column prop="status" label="审批单所处状态" width="130" />
        <el-table-column prop="type" label="审批类型" width="100" />
        <el-table-column prop="handle" label="操作" width="100" />
        <el-table-column prop="createtime" label="创建时间" width="100" />
        <el-table-column label="查看申请表">
          <template #default="scope">
            <el-button type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  rules: {
    name: [{ required: true, message: "此项为必填项", trigger: "blur" }],
    userCode: [{ required: true, message: "此项为必填项", trigger: "blur" }],
  },
});

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