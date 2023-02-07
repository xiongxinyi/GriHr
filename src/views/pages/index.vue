<template>
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
        <img src="../../assets/baoshihua.jpg" class="image" />
    </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

const date = ref(new Date())
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
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
</style>