<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>查询个人申请表</el-breadcrumb-item>  
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div style="float:right">
        <el-button type="primary" @click="downlolad()" style="margin-right:20px">模板下载</el-button>
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
        <el-table-column prop="status" label="审批单所处状态" width="140" />
        <el-table-column prop="type" label="审批类型"  width="100" />
        <el-table-column prop="handle" label="操作" width="80" />
        <el-table-column prop="updatetime" label="更新时间" width="180" />
        <el-table-column prop="data" label="查看申请信息&nbsp;申请单记录">
          <template #default="scope">
            <el-button type="primary" @click="infoCheck(scope.row)">查看</el-button>
            <el-button type="primary" @click="logCheck(scope.row)">记录</el-button>
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
        <el-table-column prop="basicUnit" label="基层单位" width="140" />
        <el-table-column prop="job" label="工作岗位" width="100" />
        <el-table-column prop="source" label="员工来源" width="100" />
        <el-table-column prop="joinTime" label="加入时间" width="100" />
        <el-table-column prop="state" label="目前状态" width="60" />
      </el-table>

      <el-table :data="data.educateCheck" v-if="data.infotype==='教育信息'" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="educateLevel" label="现文化程度" width="100" />
        <el-table-column prop="academicQua" label="学历性质" width="180" />
        <el-table-column prop="academicDegree" label="学位" width="70" />
        <el-table-column prop="joinTime" label="入学时间" width="60" />
        <el-table-column prop="leaveTime" label="毕业时间" width="120" />
        <el-table-column prop="graduateSchool" label="毕业院校" width="140" />
        <el-table-column prop="institute" label="院系" width="100" />
        <el-table-column prop="major" label="专业" width="100" />
        <el-table-column prop="languageLevel" label="外语水平" width="100" />
      </el-table>
      
      <el-table :data="data.jobCheck" v-if="data.infotype==='岗级信息'" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="userCode" label="员工号" width="100" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="job" label="岗位名称" width="100" />
        <el-table-column prop="jobType" label="工作类型" width="100" />
        <el-table-column prop="level" label="岗级" width="80" />
        <el-table-column prop="grade" label="档次" width="80" />
        <el-table-column prop="executeTime" label="执行开始时间" width="140" />
        <el-table-column prop="note" label="备注" width="100" />
      </el-table>
      
      <el-table :data="data.performCheck" v-if="data.infotype==='绩效信息'" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="unit" label="基层单位" width="120" />
        <el-table-column prop="job" label="工作岗位" width="100" />
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
        <el-table-column prop="unit" label="基层单位" width="120" />
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

    <!-- 流转记录弹出框 -->
    <el-dialog v-model="data.logDialog" width="50%">
    <h4>申请表流转记录</h4>
      <div class="block" style="margin-top:20px">
        <el-timeline :reverse="reverse" >
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

    <!-- 下载内容弹框 -->
    <el-dialog v-model="data.downloadVisble" width="50%">
      <h4>申请单模板下载</h4>
      <el-select v-model="data.downloadtype" placeholder="模板选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
      </el-select>
      <template #footer>
        <div class="flex-float">
          <el-button @click="data.downloadVisble=false">取消</el-button>
          <el-button type="primary" @click="down()">下载</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 申请表弹窗 -->
    <el-dialog v-model="data.dialogFormVisible" title="申请表">
      <!-- 流程 -->
      <el-steps>
        <el-step title="部门人力" />
        <el-step title="院人力" />
        <el-step title="院人力副主任" />
      </el-steps>
      <!-- 申请表 -->
      <el-form :model="data.formData" :rules="rules">
       <h4>填写人信息</h4>
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
        <el-select v-model="data.formData.type" placeholder="请选择审批类型">
            <el-option label="基础信息" value="基础信息" />
            <el-option label="教育信息" value="教育信息" />
            <el-option label="岗级信息" value="岗级信息" />
            <el-option label="绩效信息" value="绩效信息" />
            <el-option label="工资信息" value="工资信息" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作" prop="handle">
          <el-select v-model="data.formData.handle" placeholder="请选择操作">
            <el-option label="新增" value="新增" />
            <el-option label="修改" value="修改" />
          </el-select>
        </el-form-item>
      </el-form>

     <el-form v-if="data.formData.type==='基础信息'">
      <h4>导入员工基础信息</h4>
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.userdata.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="data.userdata.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
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
          <el-input v-model="data.userdata.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.userdata.userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="data.userdata.nation" placeholder="请输入民族" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-select v-model="data.userdata.political" placeholder="请选择政治面貌">
            <el-option label="党员" value="党员" />
            <el-option label="团员" value="团员" />
            <el-option label="群众" value="群众" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.userdata.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="basicUnit">
          <el-input v-model="data.userdata.basicUnit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工作岗位" prop="job">
          <el-input v-model="data.userdata.job" placeholder="请输入工作岗位" />
        </el-form-item>
        <el-form-item label="员工来源" prop="source">
          <el-input v-model="data.userdata.source" placeholder="请输入员工来源" />
        </el-form-item>
        <el-form-item label="加入时间" prop="joinTime">
          <el-input v-model.number="data.userdata.joinTime" placeholder="请输入加入时间（例如:20220821）" />
        </el-form-item>
        <el-form-item label="目前状态" prop="state">
          <el-input v-model="data.userdata.state" placeholder="请输入目前状态" />
        </el-form-item>
      </el-form>

      <el-form v-if="data.formData.type==='教育信息'">
      <h4>导入员工教育信息</h4>
      <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.educatedata.name" placeholder="请输入姓名" />
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
          <el-input v-model="data.educatedata.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="现文化程度" prop="educateLevel">
          <el-select v-model="data.educatedata.educateLevel" placeholder="请选择现文化程度">
            <el-option label="大专" value="大专" />
            <el-option label="大学本科" value="大学本科" />
            <el-option label="硕士研究生" value="硕士研究生" />
            <el-option label="博士研究生" value="博士研究生" />
          </el-select>
        </el-form-item>
        <el-form-item label="学历性质" prop="academicQua">
          <el-select v-model="data.educatedata.academicQua" placeholder="请选择学历性质">
            <el-option label="普通" value="普通" />
            <el-option label="国外性质" value="国外性质" />
            <el-option label="网络教育" value="网络教育" />
          </el-select>
        </el-form-item>
         <el-form-item label="学位" prop="academicDegree">
          <el-select v-model="data.educatedata.academicDegree" placeholder="请选择学位">
            <el-option label="无" value="无" />
            <el-option label="学士" value="学士" />
            <el-option label="硕士" value="硕士" />
            <el-option label="博士" value="博士" />
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间" prop="joinTime">
          <el-input v-model.number="data.educatedata.joinTime" placeholder="请输入入学时间（例如:20190910）" />
        </el-form-item>
        <el-form-item label="毕业时间" prop="leaveTime">
          <el-input v-model.number="data.educatedata.leaveTime" placeholder="请输入毕业时间（例如:20220610）" />
        </el-form-item>
        <el-form-item label="毕业院校" prop="graduateSchool">
          <el-input v-model="data.educatedata.graduateSchool" placeholder="请输入毕业院校" />
        </el-form-item>
        <el-form-item label="院系" prop="institute">
          <el-input v-model="data.educatedata.institute" placeholder="请输入院系" />
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="data.educatedata.major" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item label="外语水平" prop="languageLevel">
          <el-input v-model="data.educatedata.languageLevel" placeholder="请输入外语水平" />
        </el-form-item>
      </el-form>

      <el-form v-if="data.formData.type==='岗级信息'">
      <h4>导入员工岗级信息</h4>
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.jobdata.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="员工号" prop="userCode" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.jobdata.userCode" placeholder="请输入员工号" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard" :rules="[
            {
              required: false,
              message: '请填写正确的身份证号',
              pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.jobdata.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="岗位名称" prop="job">
          <el-input v-model="data.jobdata.job" placeholder="请输入岗位名称" />
        </el-form-item>
        <el-form-item label="工作类型" prop="jobType">
          <el-select v-model="data.jobdata.jobType" placeholder="请选择工作类型">
            <el-option label="专业技术岗" value="专业技术岗" />
            <el-option label="管理岗" value="管理岗" />
            <el-option label="操作岗" value="操作岗" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗级" prop="level">
          <el-input v-model="data.jobdata.level" placeholder="请输入岗级" />
        </el-form-item>
        <el-form-item label="档次" prop="grade">
          <el-input v-model="data.jobdata.grade" placeholder="请输入档次" />
        </el-form-item>
        <el-form-item label="执行开始时间" prop="executeTime">
          <el-input v-model.number="data.jobdata.executeTime" placeholder="请输入执行开始时间（例如:20220821）" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.jobdata.note" placeholder="请输入备注" />
        </el-form-item>
      </el-form>

      <el-form v-if="data.formData.type==='绩效信息'">
      <h4>导入员工绩效信息</h4>
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.performdata.name" placeholder="请输入姓名" />
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
          <el-input v-model="data.performdata.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.performdata.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="unit">
          <el-input v-model="data.performdata.unit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工作岗位" prop="job">
          <el-input v-model="data.performdata.job" placeholder="请输入工作岗位" />
        </el-form-item>
        <el-form-item label="行政级别" prop="exeLevel">
          <el-input v-model="data.performdata.exeLevel" placeholder="请输入行政级别" />
        </el-form-item>
        <el-form-item label="考核期" prop="evaPeriod">
          <el-input v-model="data.performdata.evaPeriod" placeholder="请输入考核期（例如:2022年度）" />
        </el-form-item>
        <el-form-item label="考核开始时间" prop="evaStaTime">
          <el-input v-model.number="data.performdata.evaStaTime" placeholder="请输入考核开始时间（例如:20220821）" />
        </el-form-item>
        <el-form-item label="考核结束时间" prop="evaEndTime">
          <el-input v-model.number="data.performdata.evaEndTime" placeholder="请输入考核结束时间（例如:20221201）" />
        </el-form-item>
        <el-form-item label="考核得分" prop="evaScore">
          <el-input v-model.number="data.performdata.evaScore" placeholder="请输入考核得分" />
        </el-form-item>
        <el-form-item label="考核档次" prop="evaClass">
          <el-input v-model="data.performdata.evaClass" placeholder="请输入考核档次" />
        </el-form-item>
        <el-form-item label="考核负责人" prop="evaHead">
          <el-input v-model="data.performdata.evaHead" placeholder="请输入考核负责人" />
        </el-form-item>
      </el-form>

      <el-form v-if="data.formData.type==='工资信息'">
      <h4>导入员工工资信息</h4>
      <el-form-item label="工资发放年月" prop="wageDate">
          <el-input v-model.number="data.salarydata.wageDate" placeholder="请输入工资发放年月（例如:202203）" />
        </el-form-item>
        <el-form-item label="姓名" prop="name" :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="data.salarydata.name" placeholder="请输入姓名" />
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
          <el-input v-model="data.salarydata.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="data.salarydata.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="基层单位" prop="unit">
          <el-input v-model="data.salarydata.unit" placeholder="请输入基层单位" />
        </el-form-item>
        <el-form-item label="工资代发机构" prop="issAgency">
          <el-input v-model="data.salarydata.issAgency" placeholder="请输入工资代发机构" />
        </el-form-item>
        <el-form-item label="社保是否缴纳" prop="insurance">
          <el-select v-model="data.salarydata.insurance" placeholder="请选择社保是否缴纳">
            <el-option label="是" value="是" />
            <el-option label="否" value="否" />
          </el-select>
        </el-form-item>
        <el-form-item label="基本工资" prop="basicSalary">
          <el-input v-model.number="data.salarydata.basicSalary" placeholder="请输入基本工资" />
        </el-form-item>
        <el-form-item label="奖金" prop="bonus">
          <el-input v-model.number="data.salarydata.bonus" placeholder="请输入奖金" />
        </el-form-item>
        <el-form-item label="其他" prop="other">
          <el-input v-model.number="data.salarydata.other" placeholder="请输入其他" />
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="data.salarydata.note" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="应发金额" prop="shouldIssue">
          <el-input v-model.number="data.salarydata.shouldIssue" placeholder="请输入应发金额" />
        </el-form-item>
        <el-form-item label="实发金额" prop="realIssue">
          <el-input v-model.number="data.salarydata.realIssue" placeholder="请输入实发金额" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex-float">
          <el-button @click="data.dialogFormVisible=false">取消</el-button>
          <el-button type="primary" @click="submitForm()">提交申请</el-button>
        </div>
      </template>
      <!-- 申请表弹窗结束 -->
    </el-dialog>
  </div>
</template>
 
<script setup>
import axios, { Axios } from "axios";
import { reactive, ref, toRefs, onMounted } from "vue";
import { updateUserApi, myApplicationApi, createApplicationApi, recordApi, downloadApi } from "@/util/request";
import { ElMessage } from "element-plus";
    /* 
      定义数据
    */
    const options = [
      {
        value: '基础信息',
        label: '基础信息',
      },
      {
        value: '教育信息',
        label: '教育信息',
      },
      {
        value: '岗级信息',
        label: '岗级信息',
      },
      {
        value: '绩效信息',
        label: '绩效信息',
      },
      {
        value: '工资信息',
        label: '工资信息',
      },
    ]

    const data = reactive({
      downloadVisble: false,
      downloadtype: "",
      dialogFormVisible: false,
      logDialog: false,
      infoVisible: false,
      infotype: "",
      id: "",
      searchParams: {
        idCard: "",
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      applicationList: [],
      Record: [],
      userCheck: [],
      educateCheck: [],
      jobCheck: [],
      performCheck: [],
      salaryCheck: [],
      formData: {
        name: localStorage.getItem("name"),
        userCode: localStorage.getItem("usercode"),
        department: localStorage.getItem("dept"),
        process: "",
        status: "",
        type: "",
        handle: "",
      },
      userdata:{
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
      },
      educatedata:{
        name: "",
        idCard: "",
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
      jobdata:{
        name: "",
        userCode: "",
        idCard: "",
        job: "",
        jobType: "",
        level: "",
        grade: "",
        executeTime: "",
        note: "",
      },
      performdata:{
        name: "",
        idCard: "",
        department: "",
        unit: "",
        job: "",
        exeLevel: "",
        evaPeriod: "",
        evaStaTime: "",
        evaEndTime: "",
        evaScore: "",
        evaClass: "",
        evaHead: "",
      },
      salarydata:{
        wageDate: "",
        name: "",
        idCard: "",
        department: "",
        unit: "",
        issAgency: "",
        insurance: "",
        basicSalary: "",
        bonus: "",
        other: "",
        note: "",
        shouldIssue: "",
        realIssue: "",
      },
      rules:{
            name:[{required:true,message:"此项为必填项",trigger:"blur"}],
            userCode:[{required:true,message:"此项为必填项",trigger:"blur"}],
          }
    })

    onMounted(() => {
      applicationget()
    })

    const pageChange = (val) => {
      data.searchParams.pagenum = val
      applicationget()
    }

    const applicationget = async () => { 
      const result = await myApplicationApi(data.searchParams)
      data.applicationList = result.data
      data.total = result.total
    }

    // 查看申请信息
    const infoCheck = (e) => {
      console.log(e.data);
      data.infotype = e.type
      // console.log();
      data.infoVisible = true
      switch(e.type){
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
      console.log(e.id);
      data.logDialog = true
      const result = await recordApi(e.id)
      data.Record = result.data
      console.log(result);
    }

    const downlolad = () => {
      data.downloadVisble = true
    }

    const addApp = () => {
      data.dialogFormVisible = true
    }

    // 下载模板
    const down = async () => {
      // console.log(data.downloadtype);
      const result = await downloadApi(data.downloadtype)
      console.log(result);

      const binaryData = []
        binaryData.push(result)
        let url = window.URL.createObjectURL(new Blob(binaryData ,{type: 'application/vnd.ms-excel'}))//二进制转换
        var anchor = document.createElement("a")
        anchor.href = url
        anchor.download = decodeURI(`${data.downloadtype}.xlsx`)
        anchor.click()
    }

    // 创建申请
    const submitForm = async () => {
      data.formData.process = parseInt(data.formData.process) 
      let data1
      let result
      switch(data.formData.type){
        case "基础信息":
          // 提交基础信息申请
          data.userdata.joinTime = parseInt(data.userdata.joinTime)
          data1 = {
            ...data.formData,
            "data":[data.userdata], 
          }
          result = await createApplicationApi(data1)
          console.log(result);
          ElMessage.success('提交成功')
          data.dialogFormVisible = false
          data.userdata = {}
          break;
        case "教育信息":
          // 提交教育信息申请
          data.educatedata.joinTime = parseInt(data.educatedata.joinTime)
          data.educatedata.leaveTime = parseInt(data.educatedata.leaveTime)
          data1 = {
            ...data.formData,
            "data":[data.educatedata]
          }
          result = await createApplicationApi(data1)
          console.log(result);
          ElMessage.success('提交成功')
          data.dialogFormVisible = false
          data.educatedata = {}
          break;
        case "岗级信息":
          // 提交岗级信息申请
          data.jobdata.executeTime = parseInt(data.jobdata.executeTime)
          data1 = {
            ...data.formData,
            "data":[data.jobdata], 
          }
          result = await createApplicationApi(data1)
          console.log(result);
          ElMessage.success('提交成功')
          data.dialogFormVisible = false
          data.jobdata = {}
          break;
        case "绩效信息":
          // 提交绩效信息申请
          data.performdata.evaStaTime = parseInt(data.performdata.evaStaTime)
          data.performdata.evaEndTime = parseInt(data.performdata.evaEndTime)
          data.performdata.evaScore = parseFloat(data.performdata.evaScore)
          data1 = {
            ...data.formData,
            "data":[data.performdata], 
          }
          result = await createApplicationApi(data1)
          console.log(result);
          ElMessage.success('提交成功')
          data.dialogFormVisible = false
          data.performdata = {}
          break;
        case "工资信息":
          // 提交工资信息申请
          data.salarydata.wageDate = parseInt(data.salarydata.wageDate)
          data.salarydata.basicSalary = parseFloat(data.salarydata.basicSalary)
          data.salarydata.bonus = parseFloat(data.salarydata.bonus)
          data.salarydata.other = parseFloat(data.salarydata.other)
          data.salarydata.shouldIssue = parseFloat(data.salarydata.shouldIssue)
          data.salarydata.realIssue = parseFloat(data.salarydata.realIssue)
          data1 = {
            ...data.formData,
            "data":[data.salarydata], 
          }
          result = await createApplicationApi(data1)
          console.log(result);
          ElMessage.success('提交成功')
          data.dialogFormVisible = false
          data.salarydata = {}
          break;
      }

      // console.log(data1);
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