<template>
  <div class="login_wrap">
    <div class="form_wrap">
      <el-form
        ref="formRef"
        :model="loginData"
        label-width="100px"
        class="demo-dynamic">

<!-- 员工编号 -->
        <el-form-item
          prop="username"
          label="员工编号"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="loginData.username" />
        </el-form-item>
<!-- 密码 -->
        <!-- <el-form-item
          prop="password"
          label="密码"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
          ><el-input type="password" v-model="loginData.password" />
        </el-form-item> -->
      </el-form>
      <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
      <!-- <p>{{num}}</p> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const login = async (id) => {
  const result = await axios.post("http://123.249.26.49:8082/api/user/login",{
    id:id,
  })
  console.log(result);
  localStorage.setItem("token",result.data.token)
  localStorage.setItem("name",result.data.username)
  localStorage.setItem("usercode",result.data.usercode) 
  // 获取用户权限和部门
  const res = await axios.get("http://123.249.26.49:8082/api/user/getrole",{
    params:{
      usercode:result.data.usercode,
    }
  })
  console.log(res)
  localStorage.setItem("role",res.data.data.role)
  localStorage.setItem("dept",res.data.data.department)
  // 页面刷新
  window.location.reload()
}

export default {
  name: "login",
  setup() {
    const store = useStore()
    const router = useRouter()
    const count = store.state.number.count
    const data = reactive({
      loginData: {
        username: "",
        password: "",
      },
      num:count,
    })
    const handleLogin=()=>{  
      //请求后台接口
      let id =parseInt(data.loginData.username)
      login(id)
      store.commit('setUserInfo',data.loginData)
      localStorage.setItem("loginData",JSON.stringify(data.loginData))
      //跳转
      router.push({
        path:"/index"
      })
    }

    //vuex更改语法
    //   console.log("修改前getters",store.getters["number/countStatus"])
    //   const handleLogin=()=>{
    //   //store.commit('number/setCount',100);
    //   store.dispatch('number/setCountPromise',10).then(res=>{
    //     alert("修改成功")
    //   }).catch(err=>{
    //     alert(err)
    //   });
    //   console.log(store.state.number.count)
    //   console.log("修改后getters",store.getters["number/countStatus"])
    // }
    return {
      ...toRefs(data),
      handleLogin
    };
  },
};
</script>
<style scoped>
.login_wrap {
  width: 100%;
  height: 100vh;
  background: rgb(56, 86, 139);
  position: relative;
}
.form_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 30px 50px;
  border-radius: 5px;
}
.login_btn {
  display: block;
  margin: 10px auto;
}
</style>