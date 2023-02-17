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
      <el-card shadow="hover" class="mgb20" style="height: 252px">
        <template #header>
          <div class="clearfix">
            <span>语言详情</span>
          </div>
        </template>
        Vue<el-progress :percentage="79.4" color="#42b983"></el-progress>
        TypeScript<el-progress :percentage="14" color="#f1e05a"></el-progress>
        CSS<el-progress :percentage="5.6"></el-progress>
        HTML<el-progress :percentage="1" color="#f56c6c"></el-progress>
      </el-card>
		</el-col>

    <el-col :span="16">
        <el-row :gutter="20" class="mgb20">

            <el-col :span="8">

                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-user-solid grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">1234</div>
                            <div>用户访问量</div>
                        </div>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="8">

                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-message-solid grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">321</div>
                            <div>系统消息</div>
                        </div>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="8">

                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-s-goods grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div class="grid-num">5000</div>
                            <div>数量</div>
                        </div>
                    </div>
                </el-card>

            </el-col>
        </el-row>

        <el-card shadow="hover" style="height:580px;">
            <el-calendar v-model="value" />
            <!-- <template #header>
                <div>
                    <span>日历</span>
                </div>
            </template> -->

            <!-- <el-table :show-header="false" :data="todoList" style="width:100%;">
                <el-table-column width="40">
                    <template #default="scope">
                        <el-checkbox v-model="scope.row.status"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="scope">
                        <div class="todo-item" :class="{'todo-item-del': scope.row.status,}">{{ scope.row.title }}</div>
                    </template>
                </el-table-column>
                <el-table-column width="60">
                    <template>
                        <i class="el-icon-edit"></i>
                        <i class="el-icon-delete"></i>
                    </template>
                </el-table-column>
            </el-table> -->
        </el-card>

        </el-col>

    </el-row>
    <!-- 信息模块 -->
    <el-row :gutter="20">

      <el-col :span="8">
        <el-link href='http://localhost:8080/login#/users' :underline="false">
        <el-card shadow="hover" style="height:252px;" class="card">
          <svg t="1676604735162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8644" width="200" height="200"><path d="M618.666667 405.333333h170.666666v85.333334h-170.666666v-85.333334zM618.666667 554.666667h170.666666v85.333333h-170.666666v-85.333333z" fill="#000000" p-id="8645"></path><path d="M85.333333 192a42.666667 42.666667 0 0 1 42.666667-42.666667h768a42.666667 42.666667 0 0 1 42.666667 42.666667v640a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V192z m85.333334 42.666667v554.666666h682.666666V234.666667H170.666667z" fill="#000000" p-id="8646"></path><path d="M405.333333 405.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-128 42.666667a128 128 0 1 1 256 0 128 128 0 0 1-256 0z" fill="#000000" p-id="8647"></path><path d="M405.333333 618.666667a85.333333 85.333333 0 0 0-85.333333 85.333333h-85.333333a170.666667 170.666667 0 1 1 341.333333 0h-85.333333a85.333333 85.333333 0 0 0-85.333334-85.333333z" fill="#000000" p-id="8648"></path></svg>
            <div>
              <el-link href='http://localhost:8080/login#/users' :underline="false">基础信息</el-link>
            </div>
        </el-card>
        </el-link>
      </el-col>

      <el-col :span="8">
        <el-link href='http://localhost:8080/login#/users' :underline="false">
        <el-card shadow="hover" style="height:252px;" class="card">
          <svg t="1676614416586" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33551" width="200" height="200"><path d="M1000.960773 607.194082c-28.287253 22.605857-55.975872 44.780903-84.074837 67.280336-27.878954-22.283516-55.546084-44.458561-83.83129-67.064418 1.750877-1.562589 3.149736-2.907213 4.682649-4.146437 13.912871-11.19497 27.937283-22.228257 41.741683-33.585933 1.828648-1.50733 3.713578-4.251837 3.713578-6.458085 0.2415-40.099277 0.159636-80.142272 0.1361-120.296807 0-0.753153-0.245593-1.561565-0.511653-3.175319-3.149736 1.291412-5.974062 2.367931-8.748245 3.552919-99.520621 43.326784-200.467731 82.887802-303.970036 115.773793-17.545608 5.544273-35.580357 9.79611-53.637618 13.350053-6.969739 1.292436-14.881942-0.430812-22.013363-2.100848-44.512796-10.495028-87.383186-26.211988-130.253576-41.768289-90.693582-32.939203-180.579775-67.923996-267.533173-109.85499-20.721951-10.009981-40.420595-22.01234-60.443627-33.368992-3.875261-2.261507-7.104815-5.705955-10.388605-8.829086-3.63376-3.496637-3.821025-7.642051 0.054235-10.871605 6.377244-5.221932 12.675694-10.980076 19.968797-14.640442 33.559327-16.792455 66.849524-34.341133 101.297081-49.142234 108.428501-46.664809 218.605833-88.917122 331.126536-124.817774 6.700609-2.153036 13.563924-3.875261 20.318768-5.812379 9.658987-2.852978 19.212574-2.583848 28.714995 0.591471 46.396703 15.556301 93.089142 30.195719 139.081639 46.88175 87.385233 31.594579 174.041872 65.233724 258.277368 104.634082 21.201881 9.903557 41.469484 21.797445 62.027705 32.993438 3.445472 1.88493 6.515391 4.520967 9.391904 7.15905 6.192026 5.703909 6.541997 9.741875 0.058328 14.909571-8.262174 6.565533-17.304108 12.109806-26.02677 18.139126-0.159636 0.106424-0.3776 0.160659-0.537236 0.268106-6.242168 3.607154-14.881942 5.866614-18.031679 11.30344-3.176342 5.489014-0.967024 14.155395-0.967024 21.366633-0.027629 43.653219 0.023536 87.304392-0.107447 130.902352-0.027629 4.573155 1.103124 7.534604 4.868891 10.440793C970.441689 582.543659 985.241766 594.600253 1000.960773 607.194082zM225.274208 543.466666c2.717901 1.022283 4.817726 1.775436 6.862291 2.581802 70.079078 28.097942 140.534733 55.224766 212.551954 78.047564 19.322068 6.133697 39.021735 11.301394 58.855456 15.662725 7.372921 1.613754 15.985066 1.076518 23.252587-1.130753 40.692794-12.164041 81.545224-24.112164 121.589242-38.214347 48.279586-17.062608 95.804996-36.278251 143.680377-54.469566 1.88493-0.754177 3.795443-1.399883 6.515391-2.367931 0 3.013637 0 5.490038 0 7.857968 0 77.506235-0.107447 155.01247 0.186242 232.465492 0.027629 7.104815-2.420119 11.357675-7.586792 15.610536-43.464931 35.84437-92.875271 60.012815-146.672524 75.729775-58.72038 17.117866-118.599142 21.422915-179.421392 16.57756-49.760311-3.981684-98.094132-13.994736-144.840806-31.53932-31.594579-11.841699-61.521169-27.021423-89.321328-46.237067-4.172019-2.90619-5.786797-5.975085-5.786797-11.141758 0.188288-83.965343 0.135076-167.929664 0.135076-251.841795C225.274208 548.849256 225.274208 546.588773 225.274208 543.466666z" fill="#272636" p-id="33552"></path></svg>
            <div>
              <el-link href='http://localhost:8080/login#/education' :underline="false">教育信息</el-link>
            </div>
        </el-card>
        </el-link>
      </el-col>

      <el-col :span="8">
        <el-link href='http://localhost:8080/login#/job' :underline="false">
        <el-card shadow="hover" style="height:252px;" class="card">
          <svg t="1676614711803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36234" width="200" height="200"><path d="M141.730909 369.989818a34.909091 34.909091 0 0 1 34.909091 34.909091v220.020364a34.909091 34.909091 0 0 1-69.818182 0V404.898909a34.909091 34.909091 0 0 1 34.909091-34.909091zM847.825455 46.545455H233.565091a126.929455 126.929455 0 0 0-126.743273 126.743272v66.978909a34.909091 34.909091 0 0 0 69.818182 0V173.288727c0-31.371636 25.553455-56.925091 56.925091-56.925091h614.260364c31.371636 0 56.925091 25.553455 56.92509 56.925091v677.422546c0 31.371636-25.553455 56.925091-56.92509 56.925091H233.565091a57.018182 57.018182 0 0 1-56.925091-56.925091v-72.750546a34.443636 34.443636 0 0 0-30.394182-33.978182h83.502546a34.909091 34.909091 0 0 0 0-69.818181H84.340364a34.909091 34.909091 0 0 0 0 69.818181h52.922181a34.536727 34.536727 0 0 0-30.394181 33.978182v72.750546A126.836364 126.836364 0 0 0 233.565091 977.454545h614.260364a126.929455 126.929455 0 0 0 126.743272-126.743272V173.288727A126.929455 126.929455 0 0 0 847.825455 46.545455zM382.324364 655.685818l87.831272-256.139636-41.611636-112.733091a34.909091 34.909091 0 0 1 32.721455-46.964364h177.943272a34.862545 34.862545 0 0 1 32.721455 46.964364l-41.658182 112.733091 87.831273 256.139636a34.909091 34.909091 0 0 1-13.824 40.494546l-139.636364 91.927272a35.002182 35.002182 0 0 1-39.330909-0.698181L395.170909 695.482182a34.909091 34.909091 0 0 1-12.846545-39.796364z m129.070545-346.065454l20.154182 54.551272h37.422545l20.200728-54.551272h-77.777455z m-54.551273 343.970909l89.320728 63.069091 97.140363-63.953455-74.984727-218.670545h-36.165818l-75.310546 219.554909zM84.340364 363.240727h145.454545a34.909091 34.909091 0 0 0 0-69.818182H84.340364a34.909091 34.909091 0 0 0 0 69.818182z" fill="#231815" p-id="36235"></path></svg>
            <div>  
              <el-link href='http://localhost:8080/login#/job' :underline="false">岗级信息</el-link>
            </div>
        </el-card>
        </el-link>
      </el-col>

    </el-row>

    <el-row :gutter="20">

      <el-col :span="8">
        <el-link href='http://localhost:8080/login#/performance' :underline="false">
        <el-card shadow="hover" style="height:252px;" class="card">
          <svg t="1676603623765" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1585" width="200" height="200"><path d="M731.428571 438.857143m73.142858 0l73.142857 0q73.142857 0 73.142857 73.142857l0 438.857143q0 73.142857-73.142857 73.142857l-73.142857 0q-73.142857 0-73.142858-73.142857l0-438.857143q0-73.142857 73.142858-73.142857Z" fill="#333333" p-id="1586"></path><path d="M402.285714 548.571429m73.142857 0l73.142858 0q73.142857 0 73.142857 73.142857l0 329.142857q0 73.142857-73.142857 73.142857l-73.142858 0q-73.142857 0-73.142857-73.142857l0-329.142857q0-73.142857 73.142857-73.142857Z" fill="#333333" p-id="1587"></path><path d="M73.142857 694.857143m73.142857 0l73.142857 0q73.142857 0 73.142858 73.142857l0 182.857143q0 73.142857-73.142858 73.142857l-73.142857 0q-73.142857 0-73.142857-73.142857l0-182.857143q0-73.142857 73.142857-73.142857Z" fill="#333333" p-id="1588"></path><path d="M922.148571 298.788571a54.857143 54.857143 0 0 1-54.857142-54.857142V109.714286h-134.217143a54.857143 54.857143 0 0 1 0-109.714286h189.074285a54.857143 54.857143 0 0 1 54.857143 54.857143v189.074286a54.857143 54.857143 0 0 1-54.857143 54.857142z" fill="#333333" p-id="1589"></path><path d="M103.68 463.542857a54.857143 54.857143 0 0 1-37.851429-94.354286L184.32 256a219.428571 219.428571 0 0 1 297.508571-9.874286 111.725714 111.725714 0 0 0 146.285715-1.28L832 73.142857a54.857143 54.857143 0 1 1 70.582857 83.931429l-203.337143 170.422857a222.171429 222.171429 0 0 1-288.548571 1.645714 110.994286 110.994286 0 0 0-150.125714 5.302857l-118.857143 113.92a54.857143 54.857143 0 0 1-38.034286 15.177143z" fill="#333333" p-id="1590"></path></svg>
            <div>
              <el-link href='http://localhost:8080/login#/performance' :underline="false">绩效信息</el-link>
            </div>
        </el-card>
        </el-link>
      </el-col>

      <el-col :span="8">
        <el-link href='http://localhost:8080/login#/salary' :underline="false">
        <el-card shadow="hover" style="height:252px;" class="card">
          <svg t="1676604030567" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3976" width="200" height="200"><path d="M387.017 261.155h242.129c74.925 0 132.079-162.482 132.079-162.482 0-48.66-4.872-85.474-88.07-88.068-83.172-2.62-103.098 58.158-162.872 58.158-61.266 0-91.91-47.78-167.301-58.158-75.365-10.427-88.044 39.408-88.044 88.068 0 0.001 57.129 162.482 132.079 162.482z m255.346 50.227H387.017c-282.762 0-352.204 555.51-352.204 555.51 0 72.967 59.138 146.253 132.08 146.253h695.57c72.942 0 132.078-73.286 132.078-146.253 0 0-69.465-555.51-352.178-555.51z m28.982 426.93c17.036 0 30.842 13.83 30.842 30.867 0 17.035-13.805 30.865-30.842 30.865H546.143v80.971c0 17.035-13.805 30.867-30.817 30.867-17.036 0-30.84-13.832-30.84-30.867v-80.97h-126.01c-17.035 0-30.84-13.83-30.84-30.866 0-17.037 13.805-30.867 30.84-30.867h126.01V699.15h-126.01c-17.035 0-30.84-13.806-30.84-30.842s13.805-30.89 30.84-30.89h85.181l-87.212-154.99c-8.518-14.785-3.452-33.633 11.284-42.15 14.759-8.519 33.607-3.476 42.125 11.259l105.008 185.88h5.31l105.008-185.88c8.517-14.735 27.365-19.779 42.101-11.258 14.76 8.516 19.828 27.364 11.309 42.148l-87.213 154.99h79.968c17.036 0 30.842 13.854 30.842 30.891 0 17.035-13.805 30.842-30.842 30.842H546.143v39.162h125.202z" fill="#333333" p-id="3977"></path></svg>
            <div>
              <el-link href='http://localhost:8080/login#/salary' :underline="false">工资信息</el-link>
            </div>
        </el-card>
        </el-link>
      </el-col>

      <el-col :span="8">
        <el-link href='http://localhost:8080/login#/checkEveryone' :underline="false">
        <el-card shadow="hover" style="height:252px;" class="card">
          <svg t="1676615019403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="46112" width="200" height="200"><path d="M833.828571 526.628571c36.571429-36.571429 58.514286-87.771429 58.514286-138.971428 0-109.714286-87.771429-197.485714-197.485714-197.485714-21.942857 0-43.885714 21.942857-43.885714 43.885714s21.942857 43.885714 43.885714 43.885714c58.514286 0 109.714286 51.2 109.714286 109.714286s-51.2 109.714286-109.714286 109.714286c-21.942857 0-43.885714 14.628571-43.885714 43.885714s21.942857 43.885714 43.885714 43.885714c124.342857 0 226.742857 102.4 226.742857 226.742857 0 21.942857 21.942857 43.885714 43.885714 43.885715s43.885714-21.942857 43.885715-43.885715c7.314286-124.342857-65.828571-234.057143-175.542858-285.257143z" fill="#333333" p-id="46113"></path><path d="M541.257143 548.571429c73.142857-51.2 117.028571-131.657143 117.028571-219.428572C658.285714 182.857143 541.257143 65.828571 394.971429 65.828571S131.657143 182.857143 131.657143 329.142857c0 87.771429 43.885714 168.228571 117.028571 219.428572-146.285714 58.514286-241.371429 197.485714-241.371428 351.085714 0 21.942857 21.942857 43.885714 43.885714 43.885714s43.885714-21.942857 43.885714-43.885714c0-160.914286 131.657143-292.571429 299.885715-292.571429s299.885714 131.657143 299.885714 292.571429c0 21.942857 21.942857 43.885714 43.885714 43.885714s43.885714-21.942857 43.885714-43.885714c0-153.6-95.085714-292.571429-241.371428-351.085714z m-146.285714-394.971429c95.085714 0 175.542857 80.457143 175.542857 175.542857s-73.142857 175.542857-175.542857 175.542857S219.428571 424.228571 219.428571 329.142857s80.457143-175.542857 175.542858-175.542857z" fill="#333333" p-id="46114"></path></svg>
            <div>
              <el-link href='http://localhost:8080/login#/checkEveryone' :underline="false">查看部门所有人</el-link>
            </div> 
        </el-card>
        </el-link>
      </el-col>

    </el-row>
  
  <!-- 统计组件 -->
  <el-row>
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
  </el-row>

    <el-divider />
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
    color: rgb(45, 140, 252);
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
.schart {
    width: 100%;
    height: 300px;
}
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>