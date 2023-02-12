<template>
  <div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>岗级信息</el-breadcrumb-item>
  </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input
            v-model="data.searchParams.idCard"
            placeholder="请输入身份证号查询"
            clearable class="input-with-select">
            <template #append>
              <el-button @click="searchJob"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addJob(1)" style="margin-left:auto">新增</el-button>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.jobList" style="width: 100%">
        <el-table-column prop="id" label="" width="60" />
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
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="data.role==='2'" type="primary" @click="addJob(2,scope.row.id,scope.row)">修改</el-button>
            <!-- <el-button type="danger"  @click="deleteJobDialog(scope.row.id)" >删除</el-button> -->
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
    <!-- 删除弹出框 -->
    <el-dialog v-model="data.deleteDialog" width="30%">
    <span>确认删除此信息吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.deleteDialog=false">取消</el-button>
          <el-button type="primary" @click="deleteEdu">确定</el-button>
        </span>
      </template>
    </el-dialog>
  <!-- 弹窗 -->
  <el-dialog v-model="data.dialogFormVisible" :title="data.title">
    <!-- 表单 -->
    <el-form ref="jobForm" :model="data.formData" :rules="rules">
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard" :rules="[
            {
              required: false,
              message: '请填写正确的身份证号',
              pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="岗位名称" prop="job">
          <el-input v-model="data.formData.job" placeholder="请输入岗位名称" />
        </el-form-item>
        <el-form-item label="工作类型" prop="jobType">
          <el-select v-model="data.formData.jobType" placeholder="请选择工作类型">
            <el-option label="专业技术岗" value="专业技术岗" />
            <el-option label="管理岗" value="管理岗" />
            <el-option label="操作岗" value="操作岗" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗级" prop="level">
          <el-input v-model="data.formData.level" placeholder="请输入岗级" />
        </el-form-item>
        <el-form-item label="档次" prop="grade">
          <el-input v-model="data.formData.grade" placeholder="请输入档次" />
        </el-form-item>
        <el-form-item label="执行开始时间" prop="executeTime">
          <el-input v-model.number="data.formData.executeTime" placeholder="请输入执行开始时间（例如:20220821）" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.formData.note" placeholder="请输入备注" />
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex-float">
        <el-button @click="data.dialogFormVisible=false">取消</el-button>
        <el-button type=primary @click="submitForm(jobForm)">确定</el-button>
      </div>
    </template>
  </el-dialog>

</div>  
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { jobListApi, addJobApi, deleteJobApi, updateJobApi, searchJobApi } from "@/util/request";
import { ElMessage } from "element-plus";
    /* 
      定义数据
    */
    const data = reactive({
      deleteId: null,
      deleteDialog: false,
      dialogFormVisible: false,
      role: "",
      id: '',
      title: "",
      searchParams: {
        idCard: "",
        pagesize: 5,
        pagenum: 1
      },
      total: 0,
      jobList: [],
      formData: {
        name: "",
        userCode: "",
        idCard: "",
        department: "",
        job: "",
        jobType: "",
        level: "",
        grade: "",
        executeTime: "",
        note: "",
      },
      rules:{
        name:[{required:true,message:"此项为必填项",trigger:"blur"}],
        userCode:[{required:true,message:"此项为必填项",trigger:"blur"}],
      }
    })

    onMounted(() => {
      data.role = localStorage.getItem("role")
      console.log(data.role)
      jobAllget()
    })

    const deleteJobDialog = (id) => {
      data.deleteDialog = true
      data.deleteId = id 
    }

    const pageChange = (val) => {
      data.searchParams.pagenum = val
      if(data.searchParams.idCard===""){
        jobAllget()
      }
    }

    const jobAllget = async () => {
      const result = await jobListApi(data.searchParams)
      data.jobList = result.data
      data.total = result.total
    }

    const jobget = async (idCard) => {
      const result = await searchJobApi(idCard)
      data.jobList = result.data
      data.total = 1
      return result
    }

    const searchJob = async () => {
      // const result = await searchJobApi(data.searchParams.idCard)
      // console.log(result);
      if (!data.searchParams.idCard) {
        jobAllget()
      } else {
        const result = await jobget(data.searchParams.idCard)
        console.log(result);
        if (result.status === 200) {
          data.jobList = result.data
          data.total = result.total
        } else {
          data.jobList = []
          data.total = 0
        }
      }
    }

    const deleteJob = async () => {
      const result = await deleteJobApi({id:data.deleteId})
      if (result.status === 200) {
        ElMessage.success('删除成功')
        jobAllget()
      } else {
        ElMessage.error('接口报错')
      }
      data.deleteDialog = false
    }

    const addJob = (flag,userId,userInfo) => {
      data.dialogFormVisible = true
      if (flag === 1) {
        data.id = null
        data.title = '新增员工岗级信息'
        data.formData = {}
      } else {
        data.id = userId
        data.title = '修改员工岗级信息'
        Object.assign(data.formData,userInfo)
      }
    }

    const submitForm = async () => {
      console.log(data.id);
      if (!data.id) {
        let result = await addJobApi(data.formData)
        if (result.status === 200) {
          ElMessage.success('添加成功')
          jobAllget()
        } else {
          ElMessage.error('请添加必填项')
        }
        data.dialogFormVisible = false
      } else {
        let result = await updateJobApi({...data.formData,id:data.id})
        if (result.status === 200) {
          ElMessage.success('修改成功')
          jobAllget()
        } else {
          ElMessage.error('请添加必填项')
        }
        data.dialogFormVisible = false
      }
    }

    const jobForm = ref()

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