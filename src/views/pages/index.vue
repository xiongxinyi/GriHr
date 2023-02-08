<template>
<div class="common-layout">
    <el-container>
      <el-header>
        <h1>今天是{{ date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' }}，欢迎来到社招人员信息管理系统</h1>
        <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' }}</time>
                     <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
      </el-header>
      <el-main>
        <el-row>
            <el-col
                v-for="(o, index) in 2"
                :key="o"
                :span="8"
                :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/磕头机.jpg" class="image" />
                    <div style="padding: 14px">
                        <span>夕阳下的磕头机</span>
                        <div class="bottom">
                        <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time>
                        <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
                        <el-button text class="button">Operating</el-button>
                        </div>
                    </div>
                </el-card>
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/震源车.jpg" class="image" />
                    <div style="padding: 14px">
                        <span>野外作业的震源车</span>
                        <div class="bottom">
                        <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time>
                        <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
                        <el-button text class="button">Operating</el-button>
                        </div>
                    </div>
                </el-card>
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/baoshihua.jpg" class="image" />
                    <div style="padding: 14px">
                        <span>夕阳下的磕头机</span>
                        <div class="bottom">
                        <time class="time">{{ date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() }}</time>
                        <!-- {{date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}} -->
                        <el-button text class="button">Operating</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div><br></div>
            <div class="copyright">
                <div class="my-1">Copyright © 2023 | 东方地球物理公司-研究院-计服中心-信息技术室</div>
                <div class="my-1">地址：河北省保定市涿州市华阳东路东方地球物理科技园区</div>
            </div>
      </el-main>
    </el-container>
</div>
<el-backtop :right="100" :bottom="100" />
</template>

<script setup>
import { ref } from 'vue'

const date = ref(new Date())
</script>

<style>
.time {
  font-size: 12px;
  color: rgb(9, 9, 9);
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
</style>