<template>
  <div class="common-layout">

    <el-container>

      <el-header class="common-header flex-float">

        <div class="flex">
          <img class="logo" src="../../assets/logo1.jpg" alt="" />
          <h1 class="title">社招人员信息管理系统</h1>
        </div>

        <el-button type="danger" @click="loginOut">退出</el-button>
      </el-header>

      <el-container>

        <el-aside class="common-aside" width="140px">
          <el-menu background-color="none" text-color="#fff" :router="true">

            <el-sub-menu index="1">
              <template #title>
                <el-icon><Avatar /></el-icon>
                <span>基础信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/users">基础信息列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><Box /></el-icon>
                <span>教育信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/education">教育信息列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon><Grid /></el-icon>
                <span>岗级信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/job">岗级信息列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon><DataLine /></el-icon>
                <span>绩效信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/performance">绩效信息列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title>
                <el-icon><Wallet /></el-icon>
                <span>工资信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/salary">工资信息列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          
          </el-menu>
        </el-aside>

        <el-main>
          <!--router-view-->
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>

  </div>
</template>
<script>
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name:"layOut",
  setup(){
    const store = useStore()
    const router = useRouter()
    const loginOut=()=>{
      localStorage.removeItem("loginData")
      store.commit('setUserInfo',{})
      router.push({
        path:"./login"
      })
    }
    return{
      loginOut
    }
  }
};
</script>
<style>
.el-container {
  height: 100vh;
  overflow: hidden;
}
.common-header {
  background: rgb(39, 45, 53);
  display: flex;
}
.common-aside {
  background: rgb(48, 55, 65);
}
.logo {
  width: 40px;
}
.title {
  color: #fff;
}
.el-main {
  background: #efefef;
}
</style>