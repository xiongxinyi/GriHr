<template>
  <div>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>基础信息列表</el-breadcrumb-item>
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
              <el-button @click="searchUser"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addUser(1)">新增</el-button>
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
        <el-table-column label="操作">
          <template #default="scope">
                    <el-button type="primary" @click="addUser(2,scope.row.id,scope.row)">修改</el-button>
                    <el-button type="danger"  @click="deleteUserDialog(scope.row.id)" >删除</el-button>         
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
    <!-- <div  v-for="(item,index) in arr" :key="item.index">
    {{item.name}}  {{item.sex}}  {{item.userCode}}
  </div> -->
    <!-- <div v-for="item in arr" :key="item">{{ item.name }} {{ item.nation }}</div>
  </div> -->
  <el-dialog
    v-model="data.deleteDialog" width="30%">
  <span>确认删除此信息吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="deleteUser">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 弹窗 -->
  <el-dialog v-model="data.dialogFormVisible" :title="data.title">
    <!-- 表单 -->
    <el-form :model="data.formData" ref="userForm" >
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="data.formData.sex" placeholder="请输入性别" />
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
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="data.formData.nation" placeholder="请输入民族" />
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
          <el-input v-model.number="data.formData.joinTime" placeholder="请输入时间" />
        </el-form-item>
        <el-form-item label="目前状态" prop="state">
          <el-input v-model="data.formData.state" placeholder="请输入目前状态" />
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="flex-float">
        <el-button @click="data.dialogFormVisible = false">取消</el-button>
        <el-button type=primary @click="submitForm(userForm)">确定</el-button>
      </div>
    </template>
  </el-dialog>

</div>  
</template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs ,onMounted} from "vue";
import { userListApi,deleteUserApi,searchUserApi,addUserApi,updateUserApi} from "@/util/request";
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
      title:"",
      searchParams:{
        dept:"",
        pagesize:5,
        pagenum:1
      },
      total:0,
      userList:[],
      formData:{
        name:"",
        sex:"",
        userCode:"",
        idCard:"",
        nation:"",
        political:"",
        department:"",
        basicUnit:"",
        job:"",
        source:"",
        joinTime:"",
        state:"",
      },
      // rules:{
      //   name:[{required:true,message:"此项为必填项",trigger:"blur"}],
      //   userCode:[{required:true,message:"此项为必填项",trigger:"blur"}],
        // idCard:[{
        //     requried:false,
        //     pattern:
        //       /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        //     message: "请填写正确的身份证号",
        //     trigger: "blur",
        //   },],
      // }
    });

    onMounted(() => {
      userAllget()
    })

    const deleteUserDialog = (id) =>{
        data.deleteDialog = true
        data.deleteId = id 
    }

    const pageChange = (val) =>{
        data.searchParams.pagenum = val
        userAllget()
    }

    const userAllget = async() => {
      const result = await userListApi(data.searchParams);
      data.userList = result.data
      data.total =  result.total
    }

    const searchUser = async() => {
      const result = await searchUserApi(data.searchParams);
      if(!data.searchParams.dept){
        userAllget()
      }else{
        if(result.code === 200){
          data.userList = result.data
          data.total = result.total
          userAllget()
        }else{
          data.userList = []
          data.total = 0
        }
      }
    }

    const deleteUser = async() =>{
      const result = await deleteUserApi({id:data.deleteId});
      if(result.message === 'OK'){
        ElMessage.success('删除成功')
        userAllget()
      }else{
        ElMessage.error('接口报错')
      }
      data.deleteDialog = false
    }

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
        let res = await addUserApi(data.formData)
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
.input_box {
  width: 200px;
  margin-right: 15px;
}
</style>