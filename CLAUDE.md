# CLAUDE.md

## 项目概述

Aurora 技术博客社区（CodeHub），采用 Spring Boot + Next.js 前后端分离架构。包含后台管理、前台展示、文章模块、评论系统。

## 构建与运行

### 后端 (admin-app/)
```bash
cd admin-app
mvn clean install
cd aurora-server
mvn spring-boot:run
```

### 前端  

#### 前台社区(aurora-frontend/)
```bash
cd aurora-frontend
npm install
npm run dev
```

#### 后台管理系统(admin-ui/)
```bash
cd admin-ui
npm install
npm run dev
```

### API 文档
- Knife4j UI: `http://localhost:8800/doc.html`

## 后端架构

### 模块结构
```
admin-app/
├── aurora-common/     # 公共实体、工具类、配置、流程引擎
├── aurora-auth/       # Sa-Token 认证、SaTokenConfigure
├── aurora-admin/      # 后台管理控制器和服务
├── aurora-api/        # 前台API接口（文章、评论、标签、分类）
├── aurora-quartz/     # 定时任务
├── aurora-file/       # 文件上传
└── aurora-server/     # 启动入口，聚合所有模块
```

### 依赖关系
`aurora-server` 聚合所有模块，启动时加载 `aurora-auth` 的 `SaTokenConfigure` 拦截器。

### 认证配置
- `SaTokenConfigure` 在 `aurora-auth` 模块
- 拦截 `/**`，排除 `/auth/login`、`/swagger-ui/**`、`/doc.html`、`/localFile/**` 等
- 后台写操作通过 `@SaCheckLogin` 注解控制
- 前台写操作通过 `@SaUserCheckLogin` 注解控制

## 数据库

### SQL 文件
所有表结构变更统一更新：`ai-product-blog-system/ai-product-blog-system.sql`

### 主要表
- **RBAC**: `sys_user`, `sys_role`, `sys_menu`
- **文章模块**: `article`, `category`, `tag`, `article_category`, `article_tag`
- **互动模块**: `comment`, `article_like`, `article_favorite`

### 文章模块表设计
| 表名 | 用途 |
|------|------|
| `article` | 文章（标题、内容、状态、统计） |
| `category` | 分类（多对多） |
| `tag` | 标签（多对多） |
| `comment` | 评论（支持楼中楼：parent_id, reply_to_id） |
| `article_like` | 点赞记录 |
| `article_favorite` | 收藏记录 |

## 前端架构 (aurora-frontend/)

Next.js 15 + shadcn/ui + TypeScript

### 主要目录
- `src/app/`: 页面路由
- `src/components/`: 组件
- `src/hooks/`: 自定义 hooks
- `src/lib/`: 工具函数

### 微信登录
- 扫码登录弹窗组件：`src/app/wechat-login/`
- 认证逻辑：`src/lib/wechat-auth.ts`

## 开发规范

- Java 17
- Mapper 扫描：`com.aurora.mapper`
- 端口：后端 8800，前端 3000
- Redis 必需（Sa-Token 会话存储）
