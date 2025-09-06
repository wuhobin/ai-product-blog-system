# Aurora Admin 管理系统

Aurora Admin 是一个基于 Spring Boot 和 Sa-Token 的后台管理系统，提供用户管理、角色权限、菜单管理、系统监控、定时任务等功能。

## 功能特性

- **用户管理**：用户列表、新增用户、修改用户、删除用户、修改密码、个人信息
- **角色权限**：角色列表、新增角色、修改角色、删除角色、分配权限
- **菜单管理**：菜单列表、新增菜单、修改菜单、删除菜单
- **系统监控**：服务器监控、缓存监控、在线用户
- **操作日志**：记录所有操作日志，支持删除
- **定时任务**：管理定时任务，支持立即执行和状态修改
- **代码生成**：支持数据库表的代码自动生成
- **文件管理**：文件上传和删除
- **多模块架构**：采用模块化设计，便于扩展和维护

## 技术栈

- 后端：Spring Boot, MyBatis Plus, Sa-Token, Redis, Quartz
- 前端：Vue3, Element Plus, TypeScript
- 数据库：MySQL
- 其他：Swagger, Redis, WebSocket

## 安装指南

1. 克隆项目：
   ```bash
   git clone https://gitee.com/wuhobin/aurora-admin.git
   ```

2. 导入数据库：
   使用 `aurora-admin.sql` 文件导入数据库

3. 修改配置：
   修改 `admin-app/aurora-server/src/main/resources/application.properties` 中的数据库连接信息

4. 启动项目：
   ```bash
   cd aurora-admin
   mvn spring-boot:run
   ```

## 使用说明

### 用户管理
```java
// 获取用户列表
GET /sys/user

// 新增用户
POST /sys/user

// 修改用户
PUT /sys/user

// 删除用户
DELETE /sys/user/delete/{ids}
```

### 角色权限
```java
// 获取角色列表
GET /sys/role

// 新增角色
POST /sys/role/add

// 修改角色
PUT /sys/role/update

// 删除角色
DELETE /sys/role/delete/{ids}
```

### 菜单管理
```java
// 获取菜单树
GET /sys/menu/tree

// 新增菜单
POST /sys/menu

// 修改菜单
PUT /sys/menu

// 删除菜单
DELETE /sys/menu/{id}
```

### 系统监控
```java
// 获取服务器信息
GET /monitor/server

// 获取缓存信息
GET /monitor/cache/info

// 获取在线用户列表
GET /monitor/online/list
```

### 定时任务
```java
// 获取定时任务列表
GET /monitor/job/list

// 新增定时任务
POST /monitor/job

// 修改定时任务
PUT /monitor/job

// 删除定时任务
DELETE /monitor/job/delete/{ids}
```

## 贡献指南

1. Fork 项目
2. 创建新分支
3. 提交代码
4. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。详情请查看项目根目录下的 LICENSE 文件。