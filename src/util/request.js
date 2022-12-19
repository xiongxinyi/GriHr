import { post,get,deletex,put } from "./service"

//基础信息usersList-查询全部
export const userListApi=(params)=>{
    return get({
        url: "user/all",
        params
    })
}
//基础信息usersList-删除
export const deleteUserApi=(params)=>{
    return deletex({
        url: "user/delete",
        params
    })
}
//基础信息usersList-查询
export const searchUserApi=(params)=>{
    return get({
        url: "user/dept",
        params
    })
}
//基础信息usersList-新增
export const addUserApi=(data)=>{
    return post({
        url: "user/insert",
        data
    })
}
//基础信息usersList-修改
export const updateUserApi=(data)=>{
    return put({
        url: "user/update",
        data
    })
}
/**
 */
//教育信息educationList-查询全部
export const eduListApi=(params)=>{
    return get({
        url: "educate/all",
        params
    })
}
//教育信息educationList-删除
export const deleteEduApi=(params)=>{
    return deletex({
        url: "educate/delete",
        params
    })
}
//教育信息educationList-查询
export const searchEduApi=(params)=>{
    return get({
        url: "educate/get",
        params
    })
}
//教育信息educationList-新增
export const addEduApi=(data)=>{
    return post({
        url: "educate/insert",
        data
    })
}
//教育信息educationList-修改
export const updateEduApi=(data)=>{
    return put({
        url: "educate/update",
        data
    })
}
/**
 */
//岗级信息jobList-查询全部
export const jobListApi=(params)=>{
    return get({
        url: "joblevel/all",
        params
    })
}
//岗级信息jobList-删除
export const deleteJobApi=(params)=>{
    return deletex({
        url: "joblevel/delete",
        params
    })
}
//岗级信息jobList-新增
export const addJobApi=(data)=>{
    return post({
        url: "joblevel/insert",
        data
    })
}
//岗级信息jobList-修改
export const updateJobApi=(data)=>{
    return put({
        url: "joblevel/update",
        data
    })
}
/**
 */
//绩效信息performList-查询全部
export const performListApi=(params)=>{
    return get({
        url: "performance/all",
        params
    })
}
//绩效信息performList-删除
export const deletePerformApi=(params)=>{
    return deletex({
        url: "performance/delete",
        params
    })
}
//绩效信息performList-新增
export const addPerformApi=(data)=>{
    return post({
        url: "performance/insert",
        data
    })
}
//绩效信息performList-修改
export const updatePerformApi=(data)=>{
    return put({
        url: "performance/update",
        data
    })
}
/**
 */
//工资信息salaryList-查询全部
export const salaryListApi=(params)=>{
    return get({
        url: "salary/all",
        params
    })
}
//工资信息salaryList-删除
export const deleteSalaryApi=(params)=>{
    return deletex({
        url: "salary/delete",
        params
    })
}
//工资信息salaryList-新增
export const addSalaryApi=(data)=>{
    return post({
        url: "salary/insert",
        data
    })
}
//工资信息salaryList-修改
export const updateSalaryApi=(data)=>{
    return put({
        url: "salary/update",
        data
    })
}