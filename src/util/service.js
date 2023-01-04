import axios from "axios"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
// import { config } from "webpack"
//使用create创建axios实例
let loadingObj = null
const Service = axios.create({
    timeout:8000,
    baseURL:"/api/",
    headers:{
        "Content-type":"application/json;chartset=utf-8"
    }
})
//请求拦截-增加loading,对请求做统一处理
Service.interceptors.request.use(config=>{
    loadingObj=ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      return config
})
//响应拦截-对返回值做统一处理
Service.interceptors.response.use(response=>{
        loadingObj.close()
        const data = response.data
        // if(!data.data){
        //     //请求出错
        //     ElMessage.error(data.meta.msg||"服务器错误")   
        //     return data
        // }
        return data
},error=>{
        loadingObj.close()
        ElMessage({
            message:"服务器错误",
            type:"error",
            duration:2000
        })
})
//post请求
export const post = config =>{
    return Service({
        ...config,
        method:"post",

    })
}
//get请求
export const get = config =>{
    return Service({
        ...config,
        method:"get",

    })
}
//delete请求
export const deletex = config =>{
    return Service({
        ...config,
        method:"delete",

    })
}
//put请求
export const put = config =>{
    return Service({
        ...config,
        method:"put",

    })
}