<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查询个人申请表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <el-button type="primary" @click="addUser(1)" style="margin-left:auto">导入申请</el-button>
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
        <el-table-column prop="data" label="查看申请信息">
          <template #default="scope">
            <el-button type="primary" @click="infoCheck(scope.row)">查看</el-button>
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
        @current-change="pageChange"
      />
    </div>
    <!-- 提交申请提示框 -->
    <el-dialog v-model="data.deleteDialog" width="30%">
      <span>请确认是否提交申请?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.deleteDialog = false">否</el-button>
          <el-button type="primary" @click="deleteUser">是</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog v-model="data.infoVisible" title="我申请的信息">
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
    <!-- 弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" title="申请表">
      <!-- 申请表 -->
      <el-form ref="userForm" :model="data.formData" :rules="rules">
       填写人信息
        <el-form-item label="姓名" prop="name">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode">
          <el-input v-model="data.formData.userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="流程数" prop="process">
          <el-input v-model="data.formData.process" placeholder="请输入流程数" />
        </el-form-item>
        <el-form-item label="审批单所处状态" prop="status">
          <el-select v-model="data.formData.status" placeholder="审批单状态">
            <el-option label="创建申请" value="创建申请" />
        <!-- <el-option label="Zone two" value="beijing" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="审批类型" prop="type">
          <el-input v-model="data.formData.type" placeholder="请输入审批类型" />
        </el-form-item>
        <el-form-item label="操作" prop="handle">
          <el-input v-model="data.formData.handle" placeholder="请输入操作" />
        </el-form-item>
      导入员工信息
        <el-form-item label="申请表id" prop="id">
          <el-input v-model="data.formData.id" placeholder="请输入申请表id" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="data.formData.sex" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="data.formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode">
          <el-input v-model="data.formData.userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model.number="data.formData.nation" placeholder="请输入民族" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-input v-model="data.formData.political" placeholder="请输入政治面貌" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="basicUnit">
          <el-input v-model="data.formData.basicUnit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工作岗位" prop="job">
          <el-input v-model="data.formData.job" placeholder="请输入工作岗位" />
        </el-form-item>
        <el-form-item label="员工来源" prop="source">
          <el-input v-model="data.formData.source" placeholder="请输入员工来源" />
        </el-form-item>
        <el-form-item label="加入时间" prop="joinTime">
          <el-input v-model="data.formData.joinTime" placeholder="请输入加入时间" />
        </el-form-item>
        <el-form-item label="目前状态" prop="state">
          <el-input v-model="data.formData.state" placeholder="请输入目前状态" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex-float">
          <el-button @click="data.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(userForm)">提交申请</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
 
<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { userListApi,deleteUserApi,searchUserApi,addUserApi,updateUserApi,myApplicationApi,createApplicationApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  deleteId: null,
  deleteDialog: false,
  dialogFormVisible: false,
  infoVisible:false,
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

const infoCheck = (user) => {

  data.infoVisible = true;
  data.userCheck = user.data;
};

const addUser = (flag,userId,userInfo) => {
      data.dialogFormVisible=true
      if(flag === 1){
        data.id = null
        data.title = '新增员工基础信息'
        data.formData = {}
      }else{
        data.id = userId
        data.title = '修改员工基础信息'
        Object.assign(data.formData,userInfo)
      }
    }

    const submitForm = async() => {
      console.log(data.id);
      if(!data.id){
        let res = await createApplicationApi(data.formData)
        if(res.message === 'OK'){
          ElMessage.success('添加成功')
          userAllget()
        }else{
          ElMessage.error('请添加必填项')
        }
        data.dialogFormVisible =false

      }else{
        let res = await updateUserApi({...data.formData,id:data.id})
        if(res.message === 'OK'){
          ElMessage.success('修改成功')
          userAllget()
        }else{
          ElMessage.error('请添加必填项')
        }
        data.dialogFormVisible =false
      }
    }

    const userForm =ref()
</script>

<style scoped>
</style>