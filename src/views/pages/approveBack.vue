  <template>
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>已退回申请表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 白色内容区域 -->
      <div class="page_content">
      <!-- 表格 -->
        <!-- el-table的data:要展示的数据数组，el-table-column是一列，prop每条数据的对应属性，
        label：列标题 scope.row:相当于一条数据-->
        <el-table :data="data.approveBackList" style="width: 100%">
          <el-table-column prop="id" label="申请表id" width="80" />
          <el-table-column prop="userCode" label="员工号" width="100" />
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="department" label="部门" width="120" />
          <el-table-column prop="status" label="申请表审批状态" width="140" />
          <el-table-column prop="createtime" label="创建时间" width="180" />
          <el-table-column prop="updatetime" label="更新时间" width="180" />
          <el-table-column prop="type" label="审批类型" width="100" />
          <el-table-column prop="handle" label="操作" width="80" />
          <el-table-column label="申请信息&nbsp;&nbsp;&nbsp;&nbsp;审批进度">
            <template #default="scope">
              <el-button type="primary" @click="infoCheck(scope.row)">查看</el-button>
              <el-button type="primary" @click="logCheck(scope.row)">记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!-- 审批进度弹出框 -->
      <el-dialog v-model="data.logDialog" width="50%">
      <h4>申请表审批进度</h4>
        <div class="block" style="margin-top:20px">
          <el-timeline reverse=true >
            <el-timeline-item v-for="(item, index) in data.Record" :key="index" :timestamp="item.approvalTime" placement="top">
              <el-card>
                <h4>{{item.opinion}}</h4>
                <p>姓名：{{item.name}}&nbsp;&nbsp;部门：{{item.department}}</p>
                <p>审核意见：&nbsp;{{item.desc}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-dialog>
      <!-- 分页器 -->
        <el-pagination background
          layout="prev, pager, ->, total"
          v-model:currentPage="data.searchParams.pagenum"
          v-model:page-size="data.searchParams.pagesize"
          :total="data.total"
          @current-change="pageChange" />
      </div>
      <!-- 申请信息弹窗 -->
      <el-dialog v-model="data.infoVisible" title="我申请的信息">
      <!-- 查看申请信息 -->
        <el-table :data="data.userCheck" v-if="data.infotype==='基础信息'" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="sex" label="性别" width="60" />
          <el-table-column prop="userCode" label="员工号" width="100" />
          <el-table-column prop="idCard" label="身份证号" width="180" />
          <el-table-column prop="nation" label="民族" width="70" />
          <el-table-column prop="political" label="政治面貌" width="60" />
          <el-table-column prop="department" label="部门" width="120" />
          <el-table-column prop="basicUnit" label="基层单位" width="160" />
          <el-table-column prop="job" label="工作岗位" width="120" />
          <el-table-column prop="source" label="员工来源" width="100" />
          <el-table-column prop="joinTime" label="加入时间" width="100" />
          <el-table-column prop="state" label="目前状态" width="60" />
        </el-table>

        <el-table :data="data.educateCheck" v-if="data.infotype==='教育信息'" style="width: 100%">
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
        </el-table>
        
        <el-table :data="data.jobCheck" v-if="data.infotype==='岗级信息'" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="userCode" label="员工号" width="100" />
          <el-table-column prop="idCard" label="身份证号" width="180" />
          <el-table-column prop="department" label="部门" width="120" />
          <el-table-column prop="job" label="岗位名称" width="120" />
          <el-table-column prop="jobType" label="工作类型" width="100" />
          <el-table-column prop="level" label="岗级" width="80" />
          <el-table-column prop="grade" label="档次" width="80" />
          <el-table-column prop="executeTime" label="执行开始时间" width="110" />
          <el-table-column prop="note" label="备注" width="100" />
        </el-table>
        
        <el-table :data="data.performCheck" v-if="data.infotype==='绩效信息'" style="width: 100%">
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
        </el-table>

        <el-table :data="data.salaryCheck" v-if="data.infotype==='工资信息'" style="width: 100%">
          <el-table-column prop="wageDate" label="工资发放年月" width="80" />
          <el-table-column prop="name" label="姓名" width="80" />
          <el-table-column prop="idCard" label="身份证号" width="180" />
          <el-table-column prop="department" label="部门" width="120" />
          <el-table-column prop="unit" label="基层单位" width="160" />
          <el-table-column prop="issAgency" label="工资代发机构" width="110" />
          <el-table-column prop="insurance" label="社保是否缴纳" width="60" />
          <el-table-column prop="basicSalary" label="基本工资" width="100" />
          <el-table-column prop="bonus" label="奖金" width="100" />
          <el-table-column prop="other" label="其他" width="60" />
          <el-table-column prop="note" label="备注" width="100" />
          <el-table-column prop="shouldIssue" label="应发金额" width="100" />
          <el-table-column prop="realIssue" label="实发金额" width="100" />
        </el-table>
      </el-dialog>

    </div>
  </template>

<script setup>
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { approveBackApi, recordApi } from "@/util/request";
import { ElMessage } from "element-plus";
      /* 
      定义数据
      */
      const data = reactive({
      logDialog: false,
      infoVisible: false,
      infotype: "",
      id: "",
      total: 0,
      approveBackList: [],
      Record:[],
      userCheck: [],
      educateCheck: [],
      jobCheck: [],
      performCheck: [],
      salaryCheck: [],
      searchParams: {
        idCard: "",
        pagesize: 5,
        pagenum: 1,
      },
      })

      onMounted(() => {
      approveBackget()
      })

      const pageChange = (val) => {
      data.searchParams.pagenum = val
      approveBackget()
      }

      const approveBackget = async () => { 
      const result = await approveBackApi(data.searchParams)
      // console.log(result);
      data.approveBackList = result.data
      data.total = result.total
      }

      // 查看申请信息
      const infoCheck = (e) => {
      // console.log(e.data);
      data.infotype = e.type
      data.infoVisible = true
      switch (e.type) {
        case "基础信息":
          data.userCheck = e.data
          break
        case "教育信息":
          data.educateCheck = e.data
          // console.log(typeof(data.educateCheck),data.educateCheck);
          break
        case "岗级信息":
          data.jobCheck = e.data
          break
        case "绩效信息":
          data.performCheck = e.data
          break
        case "工资信息":
          data.salaryCheck = e.data
          break
      }
      }

      // 获取审核记录
      const logCheck = async(e) => {
      // console.log(e.id);
      data.logDialog = true
      const result = await recordApi(e.id)
      data.Record = result.data
      }

</script>

<style scoped>
</style>