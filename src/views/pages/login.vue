<template>
  <div>
    正在处理中...
  </div>
</template>
<script>
import { getroleApi } from "@/util/request";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getAuthorizeUri, getQueryVariable } from '@/util/sso'
import { post } from '@/util/service'

export default {
  name: "login",
  setup() {
    const store = useStore()
    const router = useRouter()

    onBeforeMount(() => {
      let token = localStorage.getItem('token')
      if (token) {
        router.push({
          path: '/users'
        })
        return;
      }
      let code = getQueryVariable("code")
      if (code) {
        // 已通过统一认证平台的认证
        // 验证 state 是否一致，防止CSRF攻击
        let state = getQueryVariable("state");
        let localState = localStorage.getItem("state")
        if (localState !== state) {
          alert('非法请求！')
          window.location = getAuthorizeUri()
        }
        post('user/login?code=' + code).then(response => {
          if (response.status != 200) {
            alert('登陆失败！')
          } else {

            localStorage.setItem("token", response.token)
            localStorage.setItem("name", response.username)
            localStorage.setItem("usercode", response.usercode)
            localStorage.setItem("logintime", response.logintime)
            // 获取用户权限和部门
            const res = getroleApi(response.usercode)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("dept", res.data.department)
            //跳转
            router.push({
              path: "/index"
            })
          }
        }).catch(err => {
          if (err.response.status == 404) {
            return alert('用户不存在')
          }
        })
      } else {
        // 未认证，跳转统一认证平台
        window.location = getAuthorizeUri()
      }
    })
  },
};
</script>