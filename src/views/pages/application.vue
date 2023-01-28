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
        <el-button type="primary" @click="addApp()" style="margin-left:auto">创建申请</el-button>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.applicationList" style="width: 100%">
        <el-table-column prop="id" label="申请表id" width="80" />
        <el-table-column prop="userCode" label="员工号" width="100" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="process" label="流程数" width="80" />
        <el-table-column prop="status" label="审批单所处状态" width="140" />
        <el-table-column prop="type" label="审批类型"  width="100" />
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
        @current-change="pageChange" />
    </div>
    <!-- 提交申请提示框 -->
    <el-dialog v-model="data.admitDialog" width="30%">
      <span>请确认是否提交申请?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.admitDialog = false">否</el-button>
          <el-button type="primary" @click="admitUser">是</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 申请信息弹窗 -->
    <el-dialog v-model="data.infoVisible" title="我申请的信息">
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


    <!-- 弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" title="申请表">
      <!-- 申请表 -->
      <el-form  :model="data.formData" :rules="rules">
       填写人信息
        <el-form-item label="姓名" prop="name">
          <el-input v-model="data.formData.name" disabled placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode">
          <el-input v-model="data.formData.userCode" disabled placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.department" disabled placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="流程数" prop="process">
          <el-select v-model="data.formData.process" placeholder="流程数">
            <el-option label="3" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批单所处状态" prop="status">
          <el-select v-model="data.formData.status" placeholder="审批单状态">
            <el-option label="创建申请" value="创建申请" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批类型" prop="type">
          <el-input v-model="data.formData.type" disabled placeholder="请输入审批类型" />
        </el-form-item>
        <el-form-item label="操作" prop="handle">
          <el-select v-model="data.formData.handle" placeholder="请选择操作">
            <el-option label="新增" value="新增" />
            <el-option label="修改" value="修改" />
          </el-select>
        </el-form-item>
      导入员工信息

        <el-form-item label="姓名" prop="name">
          <el-input v-model="data.formData.data[0].name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="data.formData.data[0].sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="data.formData.data[0].idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode">
          <el-input v-model="data.formData.data[0].userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model.number="data.formData.data[0].nation" placeholder="请输入民族" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-select v-model="data.formData.data[0].political" placeholder="请选择政治面貌">
            <el-option label="党员" value="党员" />
            <el-option label="团员" value="团员" />
            <el-option label="群众" value="群众" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.data[0].department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="basicUnit">
          <el-input v-model="data.formData.data[0].basicUnit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工作岗位" prop="job">
          <el-input v-model="data.formData.data[0].job" placeholder="请输入工作岗位" />
        </el-form-item>
        <el-form-item label="员工来源" prop="source">
          <el-input v-model="data.formData.data[0].source" placeholder="请输入员工来源" />
        </el-form-item>
        <el-form-item label="加入时间" prop="joinTime">
          <el-input v-model="data.formData.data[0].joinTime" placeholder="请输入加入时间" />
        </el-form-item>
        <el-form-item label="目前状态" prop="state">
          <el-input v-model="data.formData.data[0].state" placeholder="请输入目前状态" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex-float">
          <el-button @click="data.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm()">提交申请</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
 
<script setup>
import axios, { Axios } from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { updateUserApi, myApplicationApi, createApplicationApi } from "@/util/request";
import { ElMessage } from "element-plus";
/* 
  定义数据
*/
const data = reactive({
  deleteId: null,
  deleteDialog: false,
  dialogFormVisible: false,
  infoVisible: false,
  id: "",
  KeyWord: "",
  title: "申请表",  
  searchParams: {
    idCard: "",
    pagesize: 5,
    pagenum: 1,
  },
  total: 0,
  applicationList: [],
  userCheck: [],
  formData: {
    name: localStorage.getItem("name"),
    userCode: localStorage.getItem("usercode"),
    department: localStorage.getItem("dept"),
    process: "",
    status: "",
    type: "用户操作",
    handle: "",
    data:[
      {
        name:"",
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
      }
    ]

  },
});

onMounted(() => {
  applicationget();
});

const pageChange = (val) => {
  data.searchParams.pagenum = val;
  applicationget();
};

const applicationget = async () => { 
  const result = await myApplicationApi(data.searchParams);

  data.applicationList = result.data;
  data.total = result.total;
};

const infoCheck = (e) => {

  data.infoVisible = true;
  data.userCheck = e.data;
};

const addApp = () => {
  data.dialogFormVisible = true;
};

const submitForm = async() => {
  data.formData.process = parseInt(data.formData.process) 
  data.formData.data[0].joinTime = parseInt(data.formData.data[0].joinTime)
  const data1 = {
    ...data.formData
  }
  // console.log(data1);
  const result = await createApplicationApi(data1)
  console.log(result);
  ElMessage.success('提交成功')

  data.dialogFormVisible =false
  // if(!data.id){
  //   let res = await createApplicationApi(data.formData)
  //   if(res.message === 'OK'){
      // ElMessage.success('添加成功')
  //     applicationget()
  //   }else{
  //     ElMessage.error('请添加必填项')
  //   }
  //   data.dialogFormVisible =false

  // }else{
  //   let res = await updateUserApi({...data.formData,id:data.id})
  //   if(res.message === 'OK'){
  //     ElMessage.success('修改成功')
  //     applicationget();
  //   }else{
  //     ElMessage.error('请添加必填项')
  //   }
  //   data.dialogFormVisible =false
  // }
}

   
</script>

<style scoped>
</style>