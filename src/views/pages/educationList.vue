<template>
  <div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>教育信息</el-breadcrumb-item>
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
              <!-- <el-button @click="searchEdu"><el-icon><Search /></el-icon></el-button> -->
              <el-button type="primary" @click="searchEdu">
                <el-icon style="vertical-align: middle"><Search /></el-icon>
                <span style="vertical-align: middle">搜索</span>
              </el-button>
            </template>
          </el-input>
        </div>
        <el-button v-if="data.role==='1'||data.role==='2'" type="primary" @click="addEdu(1)" style="margin-left:auto">新增</el-button>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.eduList" style="width: 100%">
        <el-table-column prop="id" label="" width="60" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="educateLevel" label="现文化程度" width="100" />
        <el-table-column prop="academicQua" label="学历性质" width="80" />
        <el-table-column prop="academicDegree" label="学位" width="100" />
        <el-table-column prop="joinTime" label="入学时间" width="110" />
        <el-table-column prop="leaveTime" label="毕业时间" width="110" />
        <el-table-column prop="graduateSchool" label="毕业院校" width="140" />
        <el-table-column prop="institute" label="院系" width="150" />
        <el-table-column prop="major" label="专业" width="130" />
        <el-table-column prop="languageLevel" label="外语水平" width="80" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="data.role==='2'" type="primary" @click="addEdu(2,scope.row.id,scope.row)">修改</el-button>
            <!-- <el-button type="danger" @click="deleteEduDialog(scope.row.id)">删除</el-button> -->
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
          <el-button type="primary" @click="deleteEdu">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog v-model="data.addDialog" title="提示" width="30%">
      <span>确认新增此信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.addDialog=false">取消</el-button>
          <el-button type=primary @click="submitForm(eduForm)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog v-model="data.updateDialog" title="提示" width="30%">
      <span>确认修改此信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.updateDialog=false">取消</el-button>
          <el-button type=primary @click="submitForm(eduForm)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  <!-- 弹窗 -->
  <el-dialog v-model="data.dialogFormVisible" :title="data.title">
    <!-- 表单 -->
    <el-form ref="eduForm" :model="data.formData" :rules="rules">
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
        <el-form-item label="现文化程度" prop="educateLevel">
          <el-select v-model="data.formData.educateLevel" placeholder="请选择现文化程度">
            <el-option label="大专" value="大专" />
            <el-option label="大学本科" value="大学本科" />
            <el-option label="硕士研究生" value="硕士研究生" />
            <el-option label="博士研究生" value="博士研究生" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历性质" prop="academicQua">
          <el-select v-model="data.formData.academicQua" placeholder="请选择学历性质">
            <el-option label="普通" value="普通" />
            <el-option label="国外性质" value="国外性质" />
            <el-option label="网络教育" value="网络教育" />
          </el-select>
        </el-form-item>
         <el-form-item label="学位" prop="academicDegree">
          <el-select v-model="data.formData.academicDegree" placeholder="请选择学位">
            <el-option label="无" value="无" />
            <el-option label="学士" value="学士" />
            <el-option label="硕士" value="硕士" />
            <el-option label="博士" value="博士" />
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间" prop="joinTime">
          <el-input v-model.number="data.formData.joinTime" placeholder="请输入入学时间（例如:20190910）" />
        </el-form-item>
        <el-form-item label="毕业时间" prop="leaveTime">
          <el-input v-model.number="data.formData.leaveTime" placeholder="请输入毕业时间（例如:20220610）" />
        </el-form-item>
        <el-form-item label="毕业院校" prop="graduateSchool">
          <el-input v-model="data.formData.graduateSchool" placeholder="请输入毕业院校" />
        </el-form-item>
        <el-form-item label="院系" prop="institute">
          <el-input v-model="data.formData.institute" placeholder="请输入院系" />
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="data.formData.major" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item label="外语水平" prop="languageLevel">
          <el-input v-model="data.formData.languageLevel" placeholder="请输入外语水平" />
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex-float">
        <el-button @click="data.dialogFormVisible=false">取消</el-button>
        <el-button v-if="data.title==='新增员工教育信息'" type=primary @click="data.addDialog=true">确定</el-button>
        <el-button v-if="data.title==='修改员工教育信息'" type=primary @click="data.updateDialog=true">确定</el-button>
        <!-- <el-button type=primary @click="submitForm(eduForm)">确定</el-button> -->
      </div>
    </template>
  </el-dialog>

</div>  
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted} from "vue";
import { eduListApi, addEduApi, deleteEduApi, updateEduApi, searchEduApi } from "@/util/request";
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
        pagenum: 1
      },
      total: 0,
      eduList: [],
      formData: {
        name: "",
        idCard: "",
        department: "",
        educateLevel: "",
        academicQua: "",
        academicDegree: "",
        joinTime: "",
        leaveTime: "",
        graduateSchool: "",
        institute: "",
        major: "",
        languageLevel: "",
      },
      rules:{
        name:[{required:true,message:"此项为必填项",trigger:"blur"}],
      }
    })

    onMounted(() => {
      data.role = localStorage.getItem("role")
      // console.log(data.role)
      eduAllget()
    })

    const deleteEduDialog = (id) => {
      data.deleteDialog = true
      data.deleteId = id 
    }

    const pageChange = (val) => {
      data.searchParams.pagenum = val
      if(data.searchParams.idCard===""){
        eduAllget()
      }
    }

    const eduAllget = async () => {
      const result = await eduListApi(data.searchParams)
      data.eduList = result.data
      data.total = result.total
    }

    const eduget = async (idCard) => {
      const result = await searchEduApi(idCard)
      data.eduList = result.data
      data.total = 1
      return result
    }

    const searchEdu = async () => {
      // const result = await searchEduApi(data.searchParams)
      // console.log(result);
      if (!data.searchParams.idCard) {
        eduAllget()
      } else {
        const result = await eduget(data.searchParams.idCard)
        if (result.status === 200) {
          data.eduList = result.data
          data.total = result.total
        } else {
          data.eduList = []
          data.total = 0
        }
      }
    }
    
    const deleteEdu = async () => {
      const result = await deleteEduApi({id:data.deleteId})
      if (result.status === 200) {
        ElMessage.success('删除成功')
        eduAllget()
      } else {
        ElMessage.error('接口报错')
      }
      data.deleteDialog = false
    }

    const addEdu = (flag,userId,userInfo) => {
      data.dialogFormVisible = true
      if (flag === 1) {
        data.id = null
        data.title = '新增员工教育信息'
        data.formData = {}
      } else {
        data.id = userId
        data.title = '修改员工教育信息'
        Object.assign(data.formData,userInfo)
      }
    }

    const submitForm = async () => {
      // console.log(data.id);
      if (!data.id) {
        let result = await addEduApi(data.formData)
        if (result.status === 200) {
          ElMessage.success('添加成功')
          eduAllget()
        } else {
          ElMessage.error('请添加必填项')
        }
        data.addDialog = false
        data.dialogFormVisible = false
      } else {
        let result = await updateEduApi({...data.formData,id:data.id})
        if (result.status === 200) {
          ElMessage.success('修改成功')
          eduAllget()
        } else {
          ElMessage.error('请添加必填项')
        }
        data.updateDialog = false
        data.dialogFormVisible = false
      }
    }
    
    const eduForm = ref()

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