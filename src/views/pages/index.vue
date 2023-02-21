<template>
<div class="common-layout">
  <h1>今天是{{ date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' }}，欢迎{{ name }}来到社招人员信息管理系统</h1>
  <!-- <time>{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time> -->
  <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} --> 
  <!-- 走马灯 -->
  <el-carousel :interval="4000" type="card" height="280px">
    <el-carousel-item v-for="item in carouselData" :key="item">
      <img style="object-fit: scale-down; width:100%; height:100%;" :src="item.url" alt="" />
    </el-carousel-item>
  </el-carousel>
  <!-- 首页展示 -->
  <el-row :gutter="20">

    <el-col :span="8">
      <!-- 登录者个人信息 -->
			<el-card shadow="hover" class="mgb20" style="height:252px">
				<div class="user-info">
          <img src="../../assets/宝石花.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
                <div>东方地球物理公司</div>
                  <div>{{ dept }}</div>
                </div>
              </div>
            <div class="user-info-list">
              上次登录时间：<span>2022-11-01</span>
            </div>
            <div class="user-info-list">
              上次登录地点：<span>河北</span>
            </div>
		  </el-card>
      <!-- 待办事项 -->
      <el-card shadow="hover" style="height: 252px">
        <template #header>
          <div class="clearfix">
            <span>待办事项</span>
          </div>
        </template>

        <el-table :show-header="false" :data="todoList" style="width: 100%">
          <el-table-column width="40">
            <template #default="scope">
              <el-checkbox v-model="scope.row.status"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <div
                class="todo-item"
                :class="{'todo-item-del': scope.row.status}">
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 语言详情 -->
      <!-- <el-card shadow="hover" class="mgb20" style="height:252px">
        <template #header>
          <div class="clearfix">
            <span>语言详情</span>
          </div>
        </template>
        Vue<el-progress :percentage="79.4" color="#42b983"></el-progress>
        TypeScript<el-progress :percentage="14" color="#f1e05a"></el-progress>
        CSS<el-progress :percentage="5.6"></el-progress>
        HTML<el-progress :percentage="1" color="#f56c6c"></el-progress>
      </el-card> -->
		</el-col>

    <el-col :span="16">
      <el-row :gutter="20" class="mgb20">

        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-1">
              <el-icon class="el-icon-user grid-con-icon"><User /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">20</div>
                  <div>人员总数</div>
              </div>
            </div>
          </el-card>

        </el-col>
        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-2">
              <el-icon class="el-icon-pass grid-con-icon"><DocumentChecked /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">19</div>
                  <div>申请通过</div>
              </div>
            </div>
          </el-card>

        </el-col>
        <el-col :span="8">

          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-3">
              <el-icon class="el-icon-reject grid-con-icon"><DocumentDelete /></el-icon>
              <div class="grid-cont-right">
                  <div class="grid-num">1</div>
                  <div>申请退回</div>
              </div>
            </div>
          </el-card>

        </el-col>
      </el-row>
      <!-- 日历 -->
      <el-card shadow="hover" style="height:403px;">
        <el-calendar v-model="value" />
          <!-- <template #header>
              <div>
                <span>日历</span>
              </div>
          </template> -->
      </el-card>

    </el-col>

  </el-row>
  <!-- 信息模块使用阿里图标 -->
  <el-row :gutter="20">

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/users' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-gerenxinxi-1" style="height:252px;">
        <!-- <svg t="1676853056399" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12355" width="200" height="200"><path d="M371.81 533.74c-107.44 0-194.85-87.41-194.85-194.84 0-107.45 87.41-194.86 194.85-194.86s194.84 87.41 194.84 194.86c0 107.43-87.4 194.84-194.84 194.84z m0-316.56c-67.11 0-121.71 54.61-121.71 121.71s54.6 121.7 121.71 121.7 121.7-54.59 121.7-121.7-54.59-121.71-121.7-121.71z" fill="#000000" p-id="12356"></path><path d="M635.24 879.93H114.68c-20.2 0-36.57-16.38-36.57-36.57v-60.39c0-163.7 133.17-296.86 296.85-296.86 163.69 0 296.86 133.16 296.86 296.86v60.39c-0.01 20.2-16.39 36.57-36.58 36.57z m-483.99-73.14h447.42v-23.82c0-123.36-100.36-223.71-223.71-223.71-123.35 0-223.71 100.36-223.71 223.71v23.82zM909.31 765.52H770.12c-20.2 0-36.57-16.38-36.57-36.57 0-20.2 16.38-36.57 36.57-36.57h139.19c20.2 0 36.57 16.38 36.57 36.57 0 20.2-16.37 36.57-36.57 36.57zM909.31 550.31H706.36c-20.2 0-36.57-16.38-36.57-36.57 0-20.2 16.38-36.57 36.57-36.57h202.95c20.2 0 36.57 16.38 36.57 36.57s-16.37 36.57-36.57 36.57zM909.31 335.09H658.53c-20.2 0-36.57-16.38-36.57-36.57 0-20.2 16.38-36.57 36.57-36.57h250.78c20.2 0 36.57 16.38 36.57 36.57 0 20.2-16.37 36.57-36.57 36.57z" fill="#000000" p-id="12357"></path></svg> -->
          <div>
            <el-link href='http://localhost:8080/login#/users' :underline="false" class="cont-font">基础信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/users' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-education-1-copy" style="height:252px;">
        <!-- <svg t="1676853198647" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15823" width="200" height="200"><path d="M955.615 423.074c21.082-11.811 33.181-30.697 33.194-51.829 0.012-21.138-12.074-40.049-33.168-51.886l-392.14-219.998c-28.802-16.165-74.293-16.146-102.971-0.006l-392.14 219.993c-21.107 11.823-33.205 30.735-33.2 51.879s12.112 40.044 33.181 51.829l109.597 61.492c-0.069 0.943-0.283 1.843-0.283 2.805v292.278c0 2.164 0.181 4.278 0.531 6.343 7.357 99.042 171.885 150.815 333.898 150.815 163.814 0 330.207-52.937 334.073-154.156 0.076-0.989 0.112-1.989 0.112-3.003v-292.278c0-0.955-0.212-1.852-0.281-2.79l109.595-61.49zM498.165 166.38c1.764-0.994 6.668-2.671 13.838-2.671 6.269 0 11.473 1.345 13.862 2.684l365.076 204.821-365.089 204.839c-1.764 0.989-6.668 2.671-13.851 2.671-6.281 0-11.486-1.345-13.862-2.677l-365.076-204.839 365.102-204.828zM769.429 777.654c-0.026 0.525-0.037 1.038-0.050 1.564-0.3 28.451-98.204 80.7-257.264 80.7s-256.976-52.249-257.282-80.7c-0.018-1.413-0.112-2.803-0.275-4.178v-247.521l205.973 115.567c14.375 8.069 32.655 12.511 51.473 12.511 18.83 0 37.109-4.448 51.473-12.511l205.954-115.551v250.121z" fill="#1A1A1A" p-id="15824"></path><path d="M944.842 454.823c-21.232 0-38.436 17.21-38.436 38.436v305.139c0 21.232 17.203 38.436 38.436 38.436s38.436-17.203 38.436-38.436v-305.14c0-21.226-17.203-38.435-38.436-38.435z" fill="#1A1A1A" p-id="15825"></path></svg> -->
          <div>
            <el-link href='http://localhost:8080/login#/education' :underline="false" class="cont-font">教育信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/job' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-gangwei" style="height:252px;">
        <!-- <svg t="1676614711803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36234" width="200" height="200"><path d="M141.730909 369.989818a34.909091 34.909091 0 0 1 34.909091 34.909091v220.020364a34.909091 34.909091 0 0 1-69.818182 0V404.898909a34.909091 34.909091 0 0 1 34.909091-34.909091zM847.825455 46.545455H233.565091a126.929455 126.929455 0 0 0-126.743273 126.743272v66.978909a34.909091 34.909091 0 0 0 69.818182 0V173.288727c0-31.371636 25.553455-56.925091 56.925091-56.925091h614.260364c31.371636 0 56.925091 25.553455 56.92509 56.925091v677.422546c0 31.371636-25.553455 56.925091-56.92509 56.925091H233.565091a57.018182 57.018182 0 0 1-56.925091-56.925091v-72.750546a34.443636 34.443636 0 0 0-30.394182-33.978182h83.502546a34.909091 34.909091 0 0 0 0-69.818181H84.340364a34.909091 34.909091 0 0 0 0 69.818181h52.922181a34.536727 34.536727 0 0 0-30.394181 33.978182v72.750546A126.836364 126.836364 0 0 0 233.565091 977.454545h614.260364a126.929455 126.929455 0 0 0 126.743272-126.743272V173.288727A126.929455 126.929455 0 0 0 847.825455 46.545455zM382.324364 655.685818l87.831272-256.139636-41.611636-112.733091a34.909091 34.909091 0 0 1 32.721455-46.964364h177.943272a34.862545 34.862545 0 0 1 32.721455 46.964364l-41.658182 112.733091 87.831273 256.139636a34.909091 34.909091 0 0 1-13.824 40.494546l-139.636364 91.927272a35.002182 35.002182 0 0 1-39.330909-0.698181L395.170909 695.482182a34.909091 34.909091 0 0 1-12.846545-39.796364z m129.070545-346.065454l20.154182 54.551272h37.422545l20.200728-54.551272h-77.777455z m-54.551273 343.970909l89.320728 63.069091 97.140363-63.953455-74.984727-218.670545h-36.165818l-75.310546 219.554909zM84.340364 363.240727h145.454545a34.909091 34.909091 0 0 0 0-69.818182H84.340364a34.909091 34.909091 0 0 0 0 69.818182z" fill="#231815" p-id="36235"></path></svg> -->
          <div>  
            <el-link href='http://localhost:8080/login#/job' :underline="false" class="cont-font">岗级信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

  </el-row>

  <el-row :gutter="20">

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/performance' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-jixiaokaohe" style="height:252px;">
        <!-- <svg t="1676853314381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19094" width="200" height="200"><path d="M888.86 855.14H135.15c-21.06 0-38.14 16.08-38.14 35.92 0 19.84 17.08 35.93 38.14 35.93h753.71c13.62 0 26.22-6.85 33.03-17.96 6.81-11.12 6.81-24.82 0-35.93-6.82-11.11-19.41-17.96-33.03-17.96z m36.42-731.2c-0.31-1.9-0.92-3.73-1.78-5.46-0.85-1.94-2.02-3.75-3.46-5.36-2.37-3.6-3.53-4.94-3.87-4.97l-1.68-1.65c-1.58-1.35-3.33-2.5-5.22-3.43-1.49-0.92-3.79-2.41-6.96-3.57-2.73-1.03-5.22-1.33-7.04-1.58-2.13-0.57-4.33-0.87-6.56-0.9H662.62c-20.61 0.6-36.99 16.52-36.99 35.94s16.38 35.34 36.99 35.94h140.52L547.11 436.82 321.07 239.57 106.75 463.84c-6.78 7.08-10.27 16.41-9.7 25.93 1.06 19.11 17.79 34.09 38.1 34.11 10.8 0 21.11-4.36 28.33-11.98l162.5-170.01 226.05 197.2L850.56 226.6v142.98c0 19.84 17.07 35.92 38.14 35.92 21.06 0 38.14-16.08 38.14-35.92l-0.11-237.53c-0.02-3.03-0.8-5.53-1.45-8.11z m0 0" fill="#383838" p-id="19095"></path></svg> -->
          <div>
            <el-link href='http://localhost:8080/login#/performance' :underline="false" class="cont-font">绩效信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/salary' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-gongziguanli" style="height:252px;">
        <!-- <svg t="1676853405349" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21994" width="200" height="200"><path d="M516.554 56c28.653 0 55.089 8.213 79.183 21.842l2.03 1.164a191.48 191.48 0 0 1 13.245 8.448l1.763 1.238 0.694-0.185c72.979-19.067 133.322 15.681 147.881 99.147 8.702 49.886-12.302 96.646-59.896 140.114 68.147 21.644 125.618 70.874 156.836 137.653l1.278 2.778 72.19 159.257A238.097 238.097 0 0 1 953 725.758c0 130.261-104.617 236.106-234.471 238.21l-3.943 0.032H321.414l-3.943-0.032C187.617 961.864 83 856.02 83 725.758c0-33.905 7.242-67.419 21.241-98.302l72.19-159.257 1.28-2.778c30.834-65.96 87.283-114.799 154.333-136.845-48.224-43.695-69.545-90.726-60.789-140.922 14.56-83.466 74.903-118.214 147.882-99.147l0.694 0.185 1.762-1.238a191.48 191.48 0 0 1 13.245-8.448l2.03-1.164C460.963 64.213 487.398 56 516.052 56l0.25 0.001z m106.165 319.362H413.28l-2.355 0.014c-77.665 0.908-147.892 46.662-179.998 117.49l-72.19 159.257-0.818 1.83a178.35 178.35 0 0 0-15.093 71.805c0 98.56 79.956 178.458 178.587 178.458h393.172c98.631 0 178.587-79.898 178.587-178.458a178.35 178.35 0 0 0-15.093-71.804l-0.818-1.83-72.19-159.258c-32.106-70.828-102.333-116.582-179.998-117.49l-2.355-0.014z m-179.56 99.635l0.013 0.014 74.124 74.18 73.459-73.514 0.014-0.014c9.896-9.888 25.934-9.882 35.823 0.014 9.799 9.807 9.897 25.638 0.294 35.566l-0.294 0.299-72.33 72.385h64.894c13.97 0 25.293 11.324 25.293 25.293 0 13.97-11.324 25.293-25.293 25.293h-74.801v39.09h102.414c13.969 0 25.293 11.324 25.293 25.293s-11.324 25.293-25.293 25.293H544.355v63.214c0 13.84-11.107 25.084-24.893 25.308l-0.418 0.003c-13.84 0-25.085-11.106-25.308-24.892l-0.004-0.419V724.19H391.319c-13.97 0-25.293-11.324-25.293-25.293 0-13.97 11.324-25.293 25.293-25.293h102.413v-39.09H418.93c-13.969 0-25.293-11.324-25.293-25.293s11.324-25.293 25.293-25.293h61.399l-72.995-73.051c-9.898-9.906-9.898-25.959 0-35.865 9.889-9.896 25.927-9.902 35.824-0.014z m73.144-359.213l-0.421 0.002c-22.15 0.171-44.784 8.842-68.46 28.852a29.787 29.787 0 0 1-13.622 6.528c-5.338 2.115-10.252 2.091-18.518-1.253l-0.613-0.253-0.576-0.205c-21.867-7.729-40.497-8.109-53.777-1.982l-0.746 0.353c-14.21 6.924-24.594 22.676-29.377 50.094-6.358 36.45 19.063 75.55 83.048 117.659l206.125-0.001c63.984-42.108 89.405-81.207 83.047-117.658-4.783-27.418-15.167-43.17-29.378-50.094l-0.746-0.353c-13.28-6.127-31.91-5.747-53.777 1.982l-0.576 0.205-0.613 0.253c-8.266 3.344-13.18 3.368-18.518 1.253a29.793 29.793 0 0 1-13.621-6.528c-23.827-20.137-46.598-28.79-68.881-28.854z" fill="#333333" p-id="21995"></path></svg> -->
          <div>
            <el-link href='http://localhost:8080/login#/salary' :underline="false" class="cont-font">工资信息</el-link>
          </div>
        </span>
      </el-card>
      </el-link>
    </el-col>

    <el-col :span="8">
      <el-link href='http://localhost:8080/login#/checkEveryone' :underline="false">
      <el-card shadow="hover" style="height:252px;" class="card">
        <span class="iconfont icon-xiaozu" style="height:252px;">
        <!-- <svg t="1676853537957" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28777" width="200" height="200"><path d="M531.903 493.674c45.511-34.224 74.881-88.716 74.881-149.883 0-103.402-84.105-187.506-187.506-187.506S231.772 240.39 231.772 343.791c0 61.167 29.491 115.659 74.881 149.883-41.142 15.655-78.885 40.05-111.047 72.09-59.833 59.833-92.721 139.203-92.721 223.673 0 17.718 0 36.409 0.122 53.763 0.122 16.02 13.107 29.006 29.127 29.006h574.169c16.02 0 29.127-12.986 29.127-29.006v-53.643c0-84.468-32.89-163.962-92.601-223.673-32.039-32.161-69.783-56.556-110.926-72.211zM289.906 343.913c0-71.239 58.012-129.251 129.251-129.251s129.251 58.012 129.251 129.251-58.012 129.251-129.251 129.251-129.251-58.012-129.251-129.251z m387.39 446.13v23.908H161.139v-24.394c0-142.237 115.78-258.017 258.017-258.017s258.017 115.78 258.017 258.017v0.485z" fill="#333333" p-id="28778"></path><path d="M850.845 583.361c-30.098-40.414-70.027-73.182-115.052-95.269 12.865-11.53 24.03-24.88 33.253-39.564 18.447-29.37 28.157-63.351 28.157-98.062 0-41.021-13.107-79.857-37.987-112.261-24.03-31.434-58.012-54.735-95.877-65.536-12.865-3.762-26.336 3.762-29.977 16.626-3.762 12.865 3.762 26.336 16.626 29.977 58.132 16.748 98.668 70.634 98.668 131.194 0 51.7-28.641 98.304-74.759 121.727-8.738 4.491-13.957 13.836-13.229 23.666 0.85 9.83 7.524 18.205 16.869 21.117 111.897 35.074 187.141 137.626 187.141 254.983v54.25c0 13.349 10.801 24.272 24.151 24.394h0.122c13.349 0 24.272-10.801 24.272-24.151V771.96c0.122-68.571-21.482-133.742-62.381-188.598z" fill="#333333" p-id="28779"></path></svg> -->
          <div>
            <el-link href='http://localhost:8080/login#/checkEveryone' :underline="false" class="cont-font">查看部门所有人</el-link>
          </div>
        </span> 
      </el-card>
      </el-link>
    </el-col>

  </el-row>
  
  <!-- 统计组件 -->
  <!-- <el-row>
    <el-col :span="6">
      <el-statistic title="Daily active users" :value="268500" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
            <el-icon style="margin-left: 4px" :size="12">
              <Male />
            </el-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Transactions" :value="172000" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Feedback number" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row> -->

  <el-divider />
  <!-- 版权信息 -->
    <div class="copyright">
      <div class="my-1">Copyright © 2023 | 东方地球物理公司-研究院-计服中心-信息技术室</div>
      <div class="my-1">邮编：072750</div>
      <div class="my-1">电话：（0312）3829581</div>
      <div class="my-1">地址：河北省涿州市华阳东路东方地球物理科技园区</div>
    </div>
</div>

</template>

<script lang="ts" setup>
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
    /* 
      定义数据
    */
    const value = ref(new Date())
    const data = reactive({
      name: "",
      dept: ""
    })
    const date = ref(new Date())
    const name = localStorage.getItem("name")
    const dept = localStorage.getItem("dept")
    // onMounted(()=>{
  	// 	// 获取日期-星期
  	// 	this.getdataTime()
  	// 	// 读秒
  	// 	setInterval(() => {
    //     	this.getnewTime()
    //   	},1000)
  	// }),
  	// 	// 获取当前系统日期
		// getdataTime(()=>{
	  //     let wk = new Date().getDay()  
	  //     let yy = new Date().getFullYear();
	  //     let mm = new Date().getMonth() + 1;
	  //     let dd = new Date().getDate();
	  //     let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	  //     this.week = weeks[wk]
	  //     this.date_show = yy + "年" + mm + "月" + dd + "日"
	  //   }),
	  //   // 获取当前系统的时间
	  //   getnewTime(()=>{
	  //     let hh = new Date().getHours();
	  //     let mf =
	  //       new Date().getMinutes() < 10
	  //         ? "0" + new Date().getMinutes()
	  //         : new Date().getMinutes();
	  //     let ss =
	  //       new Date().getSeconds() < 10
	  //         ? "0" + new Date().getSeconds()
	  //         : new Date().getSeconds();
	  //     this.time_show = hh + ":" + mf + ":" + ss;
	  //   })
    declare var require: any
    const carouselData = [
      {url: require("@/assets/磕头机.jpg")},
      {url: require("@/assets/震源车.jpg")},
      {url: require("@/assets/物探249队勘探在群山之巅.jpg")},
      {url: require("@/assets/勘探船“东方物探创新者”号.jpg")},
    ]
    const todoList = reactive([
	{
		title: '完成汇报材料',
		status: false
	},
	{
		title: 'ppt汇报',
		status: false
	},
	{
		title: '开会',
		status: false
	},
]);
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}
/* .el-carousel__item {
  background-color: #fff;
} */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-col {
  text-align: center;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  padding: 0;
  min-height: auto;
}
.image {
  width: 100%;
  display: block;
}
.card {
  background-color: #fff;
}
.my-1 {
  margin-bottom: 0.25rem;
  margin-top: 0.25rem;
}
.copyright {
  margin: 5px 0px;
  text-align: center;
  box-sizing: border-box;
  flex: 0 0 auto;
}
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.cont-font {
  font-size: 20px;
  font-weight: bold;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 252);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 252);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 70px;
}
.mgb20 {
  margin-bottom: 20px;
}
.todo-item {
  font-size: 14px;
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
.el-calendar {
    --el-calendar-border: var(--el-table-border, 1px solid var(--el-border-color-lighter));
    --el-calendar-header-border-bottom: var(--el-calendar-border);
    --el-calendar-selected-bg-color: var(--el-color-primary-light-9);
    --el-calendar-cell-width: 50px;
    background-color: var(--el-fill-color-blank);
}
</style>