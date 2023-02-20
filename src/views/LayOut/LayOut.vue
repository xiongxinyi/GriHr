<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header flex-float">
        <div class="flex">
          <img class="logo" src="../../assets/宝石花.jpg" alt="" />
          <h1 class="title">社招人员信息管理系统</h1>
        </div>
        <!-- 头像 -->
        <el-avatar style="position: relative; left: 560px" shape="square" :size="50">{{ name }}</el-avatar>
        <!-- 退出按钮 -->
        <el-button type="danger" style="float: right; padding: 3px 0" @click="loginOut">退出登录</el-button>
      </el-header>

      <el-container>
        <el-aside class="common-aside" width="160px">
          <el-menu background-color="none" text-color="#fff" :router="true">

            <el-menu-item index="/audit" v-if="role==='2'||role==='3'">
             <el-icon size="20px" color="#409EFC"><Checked /></el-icon>
                <span style="font-size: 15px">审批审核</span>
            </el-menu-item>
        
            <el-menu-item index="/application" v-if="role==='1'">
              <el-icon size="20px" color="#409EFC"><List /></el-icon>
                <span style="font-size: 15px">查询个人申请表</span>
            </el-menu-item>

            <el-menu-item index="/approveBack" v-if="role==='1'">
              <el-icon size="20px" color="#409EFC"><Failed /></el-icon>
                <span style="font-size: 15px">已退回申请表</span>
            </el-menu-item>

            <el-menu-item index="/checkEveryone" v-if="role==='1'||role==='2'||role==='3'">
              <el-icon size="20px" color="#409EFC"><Avatar /></el-icon>
                <span style="font-size: 15px">查看部门所有人</span>
            </el-menu-item>
            
            <!-- 信息模块 -->
            <el-menu-item index="/users">
              <el-icon size="20px" color="#409EFC"><Box /></el-icon>
                <span style="font-size: 15px">基础信息</span>
            </el-menu-item>

            <el-menu-item index="/education">
              <el-icon size="20px" color="#409EFC"><Box /></el-icon>
                <span style="font-size: 15px">教育信息</span>
            </el-menu-item>

            <el-menu-item index="/job">
              <el-icon size="20px" color="#409EFC"><Box /></el-icon>
                <span style="font-size: 15px">岗级信息</span>
            </el-menu-item>

            <el-menu-item index="/performance">
              <el-icon size="20px" color="#409EFC"><Box /></el-icon>
                <span style="font-size: 15px">绩效信息</span>
            </el-menu-item>

            <el-menu-item index="/salary">
              <el-icon size="20px" color="#409EFC"><Box /></el-icon>
                <span style="font-size: 15px">工资信息</span>
            </el-menu-item>

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
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "layOut",
  setup() {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role")
    // console.log(role);
    const store = useStore();
    const router = useRouter();
    const loginOut = () => {
      localStorage.removeItem(
        "dept",
        "loginData",
        "usercode",
        "role",
        "name",
        "token"
      );
      localStorage.removeItem("loginData");
      localStorage.removeItem("usercode");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      store.commit("setUserInfo", {});
      router.push({
        path: "./login",
      });
    };
    return {
      loginOut,
      name,
      role,
    };
  },
};
</script>
<style>
.el-container {
  height: 100vh;
  overflow: hidden;
}
.avatar-container {
  position: relative;
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
.time {
  font-size: 12px;
  color: #999;
}
</style>