<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>绩效信息</el-breadcrumb-item>
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
              <!-- <el-button @click="searchPerform"><el-icon><Search /></el-icon></el-button> -->
              <el-button type="primary" @click="searchPerform">
                <el-icon style="vertical-align: middle"><Search /></el-icon>
                <span style="vertical-align: middle">搜索</span>
              </el-button>
            </template>
          </el-input>
        </div>
        <el-button v-if="data.role==='1'||data.role==='2'||data.role==='3'" type="primary" @click="addPerform(1)" style="margin-left:auto">新增</el-button>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.performList" style="width: 100%">
        <el-table-column prop="id" label="" width="60" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="unit" label="基层单位" width="160" />
        <el-table-column prop="job" label="工作岗位" width="120" />
        <el-table-column prop="exeLevel" label="行政级别" width="80" />
        <el-table-column prop="evaPeriod" label="考核期" width="100" />
        <el-table-column prop="evaStaTime" label="考核开始时间" width="110" />
        <el-table-column prop="evaEndTime" label="考核结束时间" width="110" />
        <el-table-column prop="evaScore" label="考核得分" width="80" />
        <el-table-column prop="evaClass" label="考核档次" width="80" />
        <el-table-column prop="evaHead" label="考核负责人" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="data.role==='2'||data.role==='3'" type="primary" @click="addPerform(2, scope.row.id, scope.row)">修改</el-button>
            <!-- <el-button type="danger" @click="deletePerformDialog(scope.row.id)">删除</el-button> -->
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
    <!-- 删除对话框 -->
    <el-dialog v-model="data.deleteDialog" title="提示" width="30%">
      <span>确认删除此信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.deleteDialog=false">取消</el-button>
          <el-button type="primary" @click="deletePerform">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog v-model="data.addDialog" title="提示" width="30%">
      <span>确认新增此信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.addDialog=false">取消</el-button>
          <el-button type=primary @click="submitForm(performForm)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog v-model="data.updateDialog" title="提示" width="30%">
      <span>确认修改此信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.updateDialog=false">取消</el-button>
          <el-button type=primary @click="submitForm(performForm)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" :title="data.title">
      <!-- 表单 -->
      <el-form ref="performForm" :model="data.formData" :rules="rules">
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
         <el-form-item label="身份证号" prop="idCard" :rules="[
            {
              required: false,
              message: '请填写正确的身份证号',
              pattern:
                 /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="unit">
          <el-input v-model="data.formData.unit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工作岗位" prop="job">
          <el-input v-model="data.formData.job" placeholder="请输入工作岗位" />
        </el-form-item>
        <el-form-item label="行政级别" prop="exeLevel">
          <el-input v-model="data.formData.exeLevel" placeholder="请输入行政级别" />
        </el-form-item>
        <el-form-item label="考核期" prop="evaPeriod">
          <el-input v-model="data.formData.evaPeriod" placeholder="请输入考核期（例如:2022年度）" />
        </el-form-item>
        <el-form-item label="考核开始时间" prop="evaStaTime">
          <el-input v-model.number="data.formData.evaStaTime" placeholder="请输入考核开始时间（例如:20220821）" />
        </el-form-item>
        <el-form-item label="考核结束时间" prop="evaEndTime">
          <el-input v-model.number="data.formData.evaEndTime" placeholder="请输入考核结束时间（例如:20221201）" />
        </el-form-item>
        <el-form-item label="考核得分" prop="evaScore">
          <el-input v-model="data.formData.evaScore" placeholder="请输入考核得分" />
        </el-form-item>
        <el-form-item label="考核档次" prop="evaClass">
          <el-input v-model="data.formData.evaClass" placeholder="请输入考核档次" />
        </el-form-item>
        <el-form-item label="考核负责人" prop="evaHead">
          <el-input v-model="data.formData.evaHead" placeholder="请输入考核负责人" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex-float">
          <el-button @click="data.dialogFormVisible=false">取消</el-button>
          <el-button v-if="data.title==='新增员工绩效信息'" type=primary @click="data.addDialog=true">确定</el-button>
          <el-button v-if="data.title==='修改员工绩效信息'" type=primary @click="data.updateDialog=true">确定</el-button>
          <!-- <el-button type="primary" @click="submitForm(performForm)">确定</el-button> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { performListApi, addPerformApi, deletePerformApi, updatePerformApi, searchPerformApi } from "@/util/request";
import { ElMessage } from "element-plus";
    /* 
    定义数据
    */
    const data = reactive({
      deleteId: null,
      deleteDialog: false,
      addDialog: false,
      updateDialog: false,
      dialogFormVisible: false,
      role: "",
      id: '',
      title: "",
      searchParams: {
        idCard: "",
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      performList: [],
      formData: {
        name: "",
        idCard: "",
        department: "",
        unit: "",
        job: "",
        exeLevel: "",
        evaPeriod: "",
        evaStaTime: 0,
        evaEndTime: 0,
        evaScore: 0,
        evaClass: "",
        evaHead: "",
      },
      rules: {
        name: [{ required: true, message: "此项为必填项", trigger: "blur" }],
      },
    })

    onMounted(() => {
      data.role = localStorage.getItem("role")
      // console.log(data.role)
      performAllget()
    })

    const deletePerformDialog = (id) => {
      data.deleteDialog = true
      data.deleteId = id
    }

    const pageChange = (val) => {
      data.searchParams.pagenum = val
      if(data.searchParams.idCard===""){
        performAllget()
      }
    }

    const performAllget = async () => {
      const result = await performListApi(data.searchParams)
      data.performList = result.data
      data.total = result.total
    }

    const performget = async (idCard) => {
      const result = await searchPerformApi(idCard)
      data.performList = result.data
      data.total = 1
      return result
    }

    const searchPerform = async () => {
      // const result = await searchPerformApi(data.searchParams.idCard)
      // console.log(result);
      if (!data.searchParams.idCard) {
        performAllget()
      } else {
        const result = await performget(data.searchParams.idCard)
        // console.log(result);
        if (result.status === 200) {
          data.performList = result.data
          data.total = result.total
        } else {
          data.performList = []
          data.total = 0
        }
      }
    }

    const deletePerform = async () => {
      const result = await deletePerformApi({ id: data.deleteId })
      if (result.status === 200) {
        ElMessage.success("删除成功")
        performAllget()
      } else {
        ElMessage.error("接口报错")
      }
      data.deleteDialog = false
    }

    const addPerform = (flag, userId, userInfo) => {
      
      data.dialogFormVisible = true
      // console.log(userInfo);
      if (flag === 1) {
        data.id = null
        data.title = "新增员工绩效信息"
        data.formData = {}
      } else {
        data.id = userId
        data.title = "修改员工绩效信息"
        Object.assign(data.formData, userInfo)
      }
    }

    const submitForm = async () => {
      // console.log(data.id)
      if (!data.id) {
        data.formData.evaScore = parseFloat(data.formData.evaScore)
        let result = await addPerformApi(data.formData)
        if (result.status === 200) {
          ElMessage.success("添加成功")
          performAllget()
        } else {
          ElMessage.error("请添加必填项")
        }
        data.addDialog = false
        data.dialogFormVisible = false
      } else {
        let result = await updatePerformApi({ ...data.formData, id: data.id })
        // console.log(result)
        if (result.status === 200) {
          ElMessage.success("修改成功")
          performAllget()
        } else {
          ElMessage.error("请添加必填项")
        }
        data.updateDialog = false
        data.dialogFormVisible = false
      }
    }

    const performForm = ref()
    
</script>

<style scoped>
.input_box {
  width: 300px;
  margin-right: 15px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select {
  background-color: #fff;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>