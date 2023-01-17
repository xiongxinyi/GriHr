### GriHr（研究院社招人员信息管理系统）前端，基于HTML+CSS+JavaScript+Vue框架
### 未实现功能：
1. 查询个人申请表：
   - 导入申请（导入和查看申请信息应包含5个模块的信息）
2. 审批审核：
   - 对于部门人力和院人力，待审批-审核-不同意
3. 查看部门所有人：
   - 查询用户：
     - 精确查询idCard
     - 模糊查询name
   - 整个审批流程成功后，新增的用户并没有在查看所有人列表里
4. 审批进程（未实现查询、分页功能）
### 优化：
1. 分页：
   - 所有有列表的页面分页
2. 审批审核：
   - 列表按创建时间由近及远排列
   - 对于院人力和院人力副主任，待审批-审核-同意之后页面自动刷新，提示框没有了
   - 对于部门人力，个人已退回申请单，增加审批意见更好一些
3. 标签页：
   - 所有的tabs（标签页）绑定第一页更好一些

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
