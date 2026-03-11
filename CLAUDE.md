# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 项目概述

Aurora Admin 是一个企业级后台管理系统，采用 Spring Boot + Vue 3 + TypeScript 前后端分离架构。包含用户管理、角色权限、系统监控、代码生成以及自定义业务流程引擎。

## 构建与运行命令

### 后端 (admin-app/)
```bash
# 清理并构建所有模块
cd admin-app
mvn clean install

# 运行开发服务器
cd aurora-server
mvn spring-boot:run

# 打包生产环境
mvn clean package
java -jar aurora-server/target/aurora-blog.jar
```

### 前端 (admin-ui/)
```bash
# 安装依赖
npm install

# 开发服务器（默认端口 3000）
npm run dev

# 生产环境构建
npm run build
```

### API 文档
- Knife4j UI: `http://localhost:8800/doc.html`
- Swagger 端点: `/swagger-ui/**`, `/v3/api-docs/**`

## 后端架构

### 模块结构
```
admin-app/
├── aurora-common/     # 公共实体类、工具类、配置、流程引擎、切面
├── aurora-auth/       # Sa-Token 认证、登录登出、StpInterfaceImpl
├── aurora-admin/      # 核心控制器和服务
├── aurora-quartz/     # 定时任务管理
├── aurora-file/       # 文件上传下载
└── aurora-server/      # 主入口: AuroraAdminApplication
```

### 认证与授权
- **Sa-Token** 用于会话管理和权限校验
- `StpInterfaceImpl` 从数据库解析用户角色和权限
- 路由在 `SaTokenConfigure.addInterceptors()` 中受保护
- 排除路径: `/auth/login`, `/auth/logout`, `/swagger-ui/**`, `/doc.html`, `/localFile/**`
- 管理员用户（`Constants.ADMIN`）自动拥有所有权限

### 自定义流程引擎
项目包含一个可配置的业务流程引擎，位于 `aurora-common/src/main/java/com/aurora/bizflow/`：

- **AbstractBizFlow**: 定义流程的基类。继承并实现 `flowType()` 和 `gatherActivities()`
- **AbstractActivity**: 流程活动/节点的基类
- **CoreBizTemplate**: 执行流程的模板方法。调用 `execute()` 并传入 `CoreBizCallBack`
- **CoreDomainContext**: 保存流程执行上下文数据
- 活动通过 `appendBizFlow(ActivityClass.class)` 在流程定义中注册

### 切面与注解
- `@OperationLogger`: 将管理员操作记录到 `sys_operate_log` 表。需要 `admin` 角色。
- `@AccessLimit`: 基于 IP + 请求 URI 的限流（通过 Redis）。需指定 `time`（秒）和 `count`。

### 配置
- 数据库: `aurora-server/src/main/resources/application.properties` - MySQL 和 Redis 配置
- 服务端口: 8800（见前端 `.env.development`）
- Mapper 扫描: `com.aurora.mapper`

### 代码生成
- 位于 `aurora-admin` - 从数据库表生成 Entity、Mapper、Service、Controller

## 前端架构

### 主要目录
- `src/api/`: 按模块组织的 HTTP 客户端方法（system, monitor, tool, file）
- `src/router/`: 静态路由 + 从后端加载的动态路由
- `src/store/modules/`: Pinia 状态管理（user, permission, settings, tagsView）
- `src/views/`: 页面组件，通过 glob 模式自动导入
- `src/layouts/`: 主布局组件
- `src/composables/`: 自动导入的 Vue 组合式函数

### 状态管理
- `useUserStore`: 管理登录、登出、用户信息、token
- `usePermissionStore`: 从后端 `getRouters()` API 生成动态路由
- 路由通过 `import.meta.glob("../../views/**/**.vue")` 懒加载

### 自动导入
- Vue 3 Composition API、Vue Router、Pinia 自动导入（见 `vite.config.ts`）
- `src/composables/` 中的组合式函数和 `src/stores/` 中的 store 自动导入

### 环境变量
- `.env.development`: `VITE_APP_PORT=3000`, `VITE_APP_API_URL=http://localhost:8800/`
- API 前缀: `/api`（代理到后端，重写时去除）

### 权限指令
- `v-permission` 指令用于检查元素上的用户权限

## 数据库表结构
主要表：
- `sys_user`, `sys_role`, `sys_menu` - RBAC 权限系统
- `sys_dict_type`, `sys_dict_data` - 字典管理
- `sys_operate_log` - 操作日志
- `sys_job`, `sys_job_log` - 定时任务

## 开发注意事项
- Maven 构建时跳过测试（`maven-surefire-plugin`）
- `WebMvcConfig` 中启用了所有来源的 CORS
- Sa-Token 会话存储和限流需要 Redis
- `application.properties` 中的邮箱凭证仅供演示/开发使用
