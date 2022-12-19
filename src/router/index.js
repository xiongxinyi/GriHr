import { createRouter, createWebHashHistory, createWebHistory,} from 'vue-router'
import LayOut from '../views/LayOut/LayOut.vue'
import store from '../store/index.js'
//路由配置
const routes = [
  //登录页面
  {
    path:"/login",
    name:"login",
    component:()=>import("../views/pages/login.vue")
  },
  {
    path: '/',
    name: 'layOut',
    component:LayOut,
    redirect:"/index",
    //子路由/嵌套路由
    children:[
      {
        path:"/index",
        name:"index",
        component:()=>import("../views/pages/index.vue")
      },
      {
        path:"/users",
        name:"users",
        component:()=>import("../views/pages/usersList.vue")
      },
      {
        path:"/education",
        name:"education",
        component:()=>import("../views/pages/educationList.vue")
      },
      {
        path:"/job",
        name:"job",
        component:()=>import("../views/pages/jobList.vue")
      },
      {
        path:"/performance",
        name:"performance",
        component:()=>import("../views/pages/performanceList.vue")
      },
      {
        path:"/salary",
        name:"salary",
        component:()=>import("../views/pages/salaryList.vue")
      },
      // {
      //   path:"/roles",
      //   name:"roles",
      //   component:()=>import("../views/pages/rolesList.vue")
      // },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  // to：到哪个页面，
  // from：从哪个页面，
  // next：只有执行next页面才会执行跳转
//判断用户是否登录
  console.log("store",store.state.uInfo)
  const uInfo = store.state.uInfo.userInfo
  if(!uInfo.username){
//未登录,跳转到login
    if(to.path==="/login"){
      next()
      return
    }
  next("/login")
  }else{
    next()
  }
})
// 暴露路由对象
export default router
