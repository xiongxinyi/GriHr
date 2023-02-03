import { post, get, deletex, put } from "./service"

//基础信息usersList-查询全部
export const userListApi = (params) => {
    return get({
        url: "user/all",
        params
    })
}
//基础信息usersList-按身份证号idcard精确查询
export const searchUserApi = (idCard) => {
    const token = localStorage.getItem("token")
    return get({
        url: "user/get",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params:{
            idcard:idCard
        }
    })
}
//基础信息usersList-按姓名name模糊查询
export const searchUserApi1 = (name) => {
    const token = localStorage.getItem("token")
    return get({
        url: "user/get",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params:{
            name:name
        }
    })
}
//基础信息usersList-查询用户列表（权限查询）
export const userListCheckApi = (params) => {
    const token = localStorage.getItem("token")
    return get({
        url: "userlist",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params
    })
}
//基础信息usersList-删除
export const deleteUserApi = (params) => {
    return deletex({
        url: "user/delete",
        params
    })
}
//基础信息usersList-新增
export const addUserApi = (data) => {
    return post({
        url: "user/insert",
        data
    })
}
//基础信息usersList-修改
export const updateUserApi = (data) => {
    return put({
        url: "user/update",
        data
    })
}
/**
 */
//教育信息educationList-查询全部
export const eduListApi = (params) => {
    return get({
        url: "educate/all",
        params
    })
}
//教育信息educationList-按身份证号查询
export const searchEduApi = (idCard) => {
    return get({
        url: "educate/get",
        params:{
            idcard:idCard
        }
    })
}
//教育信息educationList-删除
export const deleteEduApi = (params) => {
    return deletex({
        url: "educate/delete",
        params
    })
}

//教育信息educationList-新增
export const addEduApi = (data) => {
    return post({
        url: "educate/insert",
        data
    })
}
//教育信息educationList-修改
export const updateEduApi = (data) => {
    return put({
        url: "educate/update",
        data
    })
}
/**
 */
//岗级信息jobList-查询全部
export const jobListApi = (params) => {
    return get({
        url: "joblevel/all",
        params
    })
}
//岗级信息jobList-按身份证号查询
export const searchJobApi = (idCard) => {
    return get({
        url: "joblevel/get",
        params:{
            idcard:idCard
        }
    })
}
//岗级信息jobList-删除
export const deleteJobApi = (params) => {
    return deletex({
        url: "joblevel/delete",
        params
    })
}
//岗级信息jobList-新增
export const addJobApi = (data) => {
    return post({
        url: "joblevel/insert",
        data
    })
}
//岗级信息jobList-修改
export const updateJobApi = (data) => {
    return put({
        url: "joblevel/update",
        data
    })
}
/**
 */
//绩效信息performList-查询全部
export const performListApi = (params) => {
    return get({
        url: "performance/all",
        params
    })
}
//绩效信息performList-按身份证号查询
export const searchPerformApi = (idCard) => {
    return get({
        url: "performance/get",
        params:{
            idcard:idCard
        }
    })
}
//绩效信息performList-删除
export const deletePerformApi = (params) => {
    return deletex({
        url: "performance/delete",
        params
    })
}
//绩效信息performList-新增
export const addPerformApi = (data) => {
    return post({
        url: "performance/insert",
        data
    })
}
//绩效信息performList-修改
export const updatePerformApi = (data) => {
    return put({
        url: "performance/update",
        data
    })
}
/**
 */
//工资信息salaryList-查询全部
export const salaryListApi = (params) => {
    return get({
        url: "salary/all",
        params
    })
}
//工资信息salaryList-按身份证号查询
export const searchSalaryApi = (idCard) => {
    return get({
        url: "salary/get",
        params:{
            idcard:idCard
        }
    })
}
//工资信息salaryList-删除
export const deleteSalaryApi = (params) => {
    return deletex({
        url: "salary/delete",
        params
    })
}
//工资信息salaryList-新增
export const addSalaryApi = (data) => {
    return post({
        url: "salary/insert",
        data
    })
}
//工资信息salaryList-修改
export const updateSalaryApi = (data) => {
    return put({
        url: "salary/update",
        data
    })
}
/**
 * 申请表
 */
//创建新申请表
export const createApplicationApi = (data) => {
    const token = localStorage.getItem("token")
    return post({
        url: "application/insert",
        headers: {
            authorization: `Bearer ${token}`,
        },
        data
    })
}
//查询个人申请表
export const myApplicationApi = (pageParams) => {
    const token = localStorage.getItem("token")
    return get({
        url: "application/get",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params:pageParams
    })
}
//查询待审批申请单
export const approveApi = (pageParams) => {
    const token = localStorage.getItem("token")
    return get({
        url: "application/approvalget",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params:pageParams
    })
}
//查询已审批申请单
export const approvedApi = (pageParams) => {
    const token = localStorage.getItem("token")
    return get({
        url: "application/auditcheck",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params:pageParams
    })
}
//查询个人已退回申请单
export const approveBackApi = (pageParams) => {
    const token = localStorage.getItem("token")
    return get({
        url: "application/auditback",
        headers: {
            authorization: `Bearer ${token}`,
        },
        params:pageParams
    })
}
/*
*   审批
*/
//人力审批
export const auditApi = (data) => {
    const token = localStorage.getItem("token")
    return post({
        url: "audit",
        headers: {
            authorization: `Bearer ${token}`,
        },
        data
    })
}
/*
*   申请记录
*/
//查询审批操作记录
export const recordApi = (id) =>{
    return get({
        url:"application/appcheck",
        params:{
            id:id
        }
    })
}