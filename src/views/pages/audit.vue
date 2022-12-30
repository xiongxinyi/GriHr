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
        <el-button type="primary">待审核</el-button>
        <el-button type="primary">已审核</el-button>
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
        <el-table-column label="查看申请表 审核">
          <template #default="scope">
            <el-button type="primary">查看</el-button>
            <el-button type="primary">审核</el-button>
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
    <!-- <div  v-for="(item,index) in arr" :key="item.index">
    {{item.name}}  {{item.sex}}  {{item.userCode}}
  </div> -->
    <!-- <div v-for="item in arr" :key="item">{{ item.name }} {{ item.nation }}</div>
  </div> -->
    <el-dialog v-model="data.deleteDialog" width="30%">
      <span>审核是否同意?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.deleteDialog = false">不同意</el-button>
          <el-button type="primary" @click="deleteUser">同意</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" :title="data.title">
      <!-- 表单 -->
      <el-form ref="userForm" :model="data.formData" :rules="rules">
        /** 填写人信息 */
        <el-form-item label="姓名" prop="name">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode">
          <el-input
            v-model="data.formData.userCode"
            placeholder="请输入员工号"
          />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input
            v-model="data.formData.department"
            placeholder="请输入部门"
          />
        </el-form-item>
        <el-form-item label="流程数" prop="process">
          <el-input
            v-model="data.formData.process"
            placeholder="请输入流程数"
          />
        </el-form-item>
        <el-form-item label="审批单所处状态" prop="status">
          <el-input
            v-model="data.formData.status"
            placeholder="请输入审批单所处状态"
          />
        </el-form-item>
        <el-form-item label="审批类型" prop="type">
          <el-input v-model="data.formData.type" placeholder="请输入审批类型" />
        </el-form-item>
        <el-form-item label="操作" prop="handle">
          <el-input v-model="data.formData.handle" placeholder="请输入操作" />
        </el-form-item>
        /** 导入员工信息 */
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
          <el-input
            v-model="data.formData.idCard"
            placeholder="请输入身份证号"
          />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode">
          <el-input
            v-model="data.formData.userCode"
            placeholder="请输入员工号"
          />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input
            v-model.number="data.formData.nation"
            placeholder="请输入民族"
          />
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-input
            v-model="data.formData.political"
            placeholder="请输入政治面貌"
          />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input
            v-model="data.formData.department"
            placeholder="请输入部门"
          />
        </el-form-item>
        <el-form-item label="基层单位" prop="basicUnit">
          <el-input
            v-model="data.formData.basicUnit"
            placeholder="请输入基层单位"
          />
        </el-form-item>
        <el-form-item label="工作岗位" prop="job">
          <el-input v-model="data.formData.job" placeholder="请输入工作岗位" />
        </el-form-item>
        <el-form-item label="员工来源" prop="source">
          <el-input
            v-model="data.formData.source"
            placeholder="请输入员工来源"
          />
        </el-form-item>
        <el-form-item label="加入时间" prop="joinTime">
          <el-input
            v-model="data.formData.joinTime"
            placeholder="请输入加入时间"
          />
        </el-form-item>
        <el-form-item label="目前状态" prop="state">
          <el-input
            v-model="data.formData.state"
            placeholder="请输入目前状态"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex-float">
          <el-button @click="data.dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(userForm)"
            >提交申请</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { approveApi,userListApi,deleteUserApi,searchUserApi,addUserApi,updateUserApi } from "@/util/request";
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
    idCard: [
      {
        requried: false,
        pattern:
          /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: "请填写正确的身份证号",
        trigger: "blur",
      },
    ],
  },
});

onMounted(() => {
  userAllget();
});
const getapplication = async() => {
      let token = localStorage.getItem("token");
      const result = await approveApi(data.searchParams);
      data.userList = result.data
      data.total = result.total
    }

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


<script>
/**
 * axios.post('path', {}, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
此处为使用axios携带token进行post请求
 */

// import axios from "axios";
// const getapplication = async () => {
//   // 获取当前用户审批表
//   let token = localStorage.getItem("token");
//   const result = await axios.get(
//     "http://123.249.26.49:8082/api/application/approvalget",
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   console.log(result);
// };
// export default {
//   name: "audit",
//   setup() {
//     getapplication();
//   },
// };
// </script>