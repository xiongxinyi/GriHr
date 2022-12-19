
<template>
  <div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>工资信息列表</el-breadcrumb-item>
  </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input
            v-model="data.searchParams.dept"
            placeholder="搜索关键字"
            class="input-with-select">
            <template #append>
              <el-button @click="searchSalary"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addSalary(1)">新增</el-button>
      </div>
      <!-- 表格 -->
      <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
      label：列标题 scope.row:相当于一条数据-->
      <el-table :data="data.salaryList" style="width: 100%">
        <el-table-column prop="id" label="" width="60" />
        <el-table-column prop="wageDate" label="工资发放年月" width="80" />
        <el-table-column prop="name" label="姓名" width="60" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="unit" label="基层单位" width="120" />
        <el-table-column prop="issAgency" label="工资代发机构" width="110" />
        <el-table-column prop="insurance" label="社保是否缴纳" width="60" />
        <el-table-column prop="basicSalary" label="基本工资" width="100" />
        <el-table-column prop="bonus" label="奖金" width="100" />
        <el-table-column prop="other" label="其他" width="60" />
        <el-table-column prop="note" label="备注" width="60" />
        <el-table-column prop="shouldIssue" label="应发金额" width="100" />
        <el-table-column prop="realIssue" label="实发金额" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
                    <el-button type="primary" @click="addSalary(2,scope.row.id,scope.row)">修改</el-button>
                    <el-button type="danger"  @click="deleteSalaryDialog(scope.row.id)" >删除</el-button>         
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
     <el-pagination background
     layout="prev, pager, ->, total" 
     v-model:currentPage="data.searchParams.pagenum"
     v-model:page-size="data.searchParams.pagesize"
     :total="data.total"
     @current-change="pageChange"
     />
    </div>

  <el-dialog
    v-model="data.deleteDialog"
    width="30%">
  <span>确认删除此信息吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="deleteSalary">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 弹窗 -->
  <el-dialog v-model="data.dialogFormVisible" :title="data.title">
    <!-- 表单 -->
    <el-form ref="salaryForm" :model="data.formData"
      :rules="rules"
    >
        <el-form-item label="工资发放年月" prop="wageDate">
          <el-input v-model.number="data.formData.wageDate" placeholder="请输入工资发放年月" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="data.formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.formData.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="unit">
          <el-input v-model="data.formData.unit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工资代发机构" prop="issAgency">
          <el-input v-model="data.formData.issAgency" placeholder="请输入工资代发机构" />
        </el-form-item>
        <el-form-item label="社保是否缴纳" prop="insurance">
          <el-input v-model="data.formData.insurance" placeholder="请输入社保是否缴纳" />
        </el-form-item>
        <el-form-item label="基本工资" prop="basicSalary">
          <el-input v-model.number="data.formData.basicSalary" placeholder="请输入基本工资" />
        </el-form-item>
        <el-form-item label="奖金" prop="bonus">
          <el-input v-model.number="data.formData.bonus" placeholder="请输入奖金" />
        </el-form-item>
        <el-form-item label="其他" prop="other">
          <el-input v-model.number="data.formData.other" placeholder="请输入其他" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.formData.note" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="应发金额" prop="shouldIssue">
          <el-input v-model.number="data.formData.shouldIssue" placeholder="请输入应发金额" />
        </el-form-item>
        <el-form-item label="实发金额" prop="realIssue">
          <el-input v-model.number="data.formData.realIssue" placeholder="请输入实发金额" />
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="flex-float">
        <el-button @click="data.dialogFormVisible = false">取消</el-button>
        <el-button type=primary @click="submitForm(salaryForm)">确定</el-button>
      </div>
    </template>
  </el-dialog>

</div>  
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs ,onMounted} from "vue";
import { salaryListApi,deleteSalaryApi,addSalaryApi,updateSalaryApi} from "@/util/request";
import { ElMessage } from "element-plus";
    /* 
      定义数据
    */
    const data = reactive({
      deleteId:null,
      deleteDialog:false,
      dialogFormVisible:false,
      id:'',
      KeyWord:"",
      title:"新增员工工资信息",
      searchParams:{
        dept:"",
        pagesize:5,
        pagenum:1
      },
      total:0,
      salaryList:[],
      formData:{
        wageDate:"",
        name:"",
        idCard:"",
        department:"",
        unit:"",
        issAgency:"",
        insurance:"",
        basicSalary:"",
        bonus:"",
        other:"",
        note:"",
        shouldIssue:"",
        realIssue:"",
      },
      rules:{
        name:[{required:true,message:"此项为必填项",trigger:"blur"}],
        userCode:[{required:true,message:"此项为必填项",trigger:"blur"}],
        idCard: [{
            requried:false,
            pattern:
              /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },],
      }
    });

    onMounted(() => {
     salaryAllget()
    })

    const deleteSalaryDialog = (id) =>{
        data.deleteDialog = true
        data.deleteId = id 
    }

    const pageChange = (val) =>{
        data.searchParams.pagenum = val
       salaryAllget()
    }

    const salaryAllget = async() => {
      const result = await salaryListApi(data.searchParams);
      data.salaryList = result.data
      data.total = result.total
    }

    const searchSalary = async() => {
      const result = await searchSalaryApi(data.searchParams);
      if(!data.searchParams.dept){
       salaryAllget()
      }else{
        if(result.code === 200){
          data.salaryList = result.data
          data.total = result.total
         salaryAllget()
        }else{
          data.salaryList = []
          data.total = 0
        }
      }
    }

    const deleteSalary = async() =>{
      const result = await deleteSalaryApi({id:data.deleteId});
      if(result.message === 'OK'){
        ElMessage.success('删除成功')
       salaryAllget()
      }else{
        ElMessage.error('接口报错')
      }
      data.deleteDialog = false
    }

    const addSalary = (flag,userId,userInfo) => {
      data.dialogFormVisible=true
      if(flag === 1){
        data.id = null
        data.title = '新增员工工资信息'
        data.formData = {}
      }else{
        data.id = userId
        data.title = '修改员工工资信息'
        Object.assign(data.formData,userInfo)
      }
    }

    const submitForm = async() => {
      console.log(data.id);
      if(!data.id){
        let res = await addSalaryApi(data.formData)
        if(res.message === 'OK'){
          ElMessage.success('添加成功')
         salaryAllget()
        }else{
          ElMessage.error('请添加必填项')
        }
        data.dialogFormVisible =false

      }else{
        let res = await updateSalaryApi({...data.formData,id:data.id})
        if(res.message === 'OK'){
          ElMessage.success('修改成功')
         salaryAllget()
        }else{
          ElMessage.error('请添加必填项')
        }
        data.dialogFormVisible =false
      }
    }

    const salaryForm =ref()

</script>

<style scoped>
.input_box {
  width: 200px;
  margin-right: 15px;
}
</style>