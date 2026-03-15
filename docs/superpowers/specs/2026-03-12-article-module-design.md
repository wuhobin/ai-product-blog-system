# 文章模块设计文档

## 概述

为 CodeHub 技术博客社区设计文章模块，支持文章发布、分类标签、评论、点赞、收藏等核心功能。

## 需求确认

| 功能 | 选择 |
|------|------|
| 功能范围 | 标准版（基础 + 评论、收藏、草稿/发布、置顶、推荐） |
| 分类标签 | 多分类 + 多标签 |
| 评论系统 | 楼中楼评论（无限层级嵌套） |
| 收藏功能 | 简单收藏 |

## 数据库设计

### ER 图

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    article      │     │  article_tag    │     │      tag        │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │────<│ article_id      │>────│ id              │
│ title           │     │ tag_id          │     │ name            │
│ content         │     └─────────────────┘     │ color           │
│ summary         │                             │ create_time     │
│ cover_image     │     ┌─────────────────┐     └─────────────────┘
│ author_id       │     │ article_category│
│ status          │────<│ article_id      │     ┌─────────────────┐
│ is_top          │     │ category_id     │>────│    category     │
│ is_recommend    │     └─────────────────┘     ├─────────────────┤
│ view_count      │                             │ id              │
│ like_count      │                             │ name            │
│ comment_count   │                             │ icon            │
│ favorite_count  │                             │ sort            │
│ create_time     │                             │ create_time     │
│ update_time     │                             └─────────────────┘
└─────────────────┘
         │
         │              ┌─────────────────┐
         │              │    comment      │
         │              ├─────────────────┤
         └─────────────>│ id              │
                        │ article_id      │
         ┌──────────────│ user_id         │
         │              │ parent_id       │
         │              │ reply_to_id     │
         │              │ reply_to_user_id│
         │              │ content         │
         │              │ like_count      │
         │              │ status          │
         │              │ create_time     │
         │              └─────────────────┘
         │
         │              ┌─────────────────┐     ┌─────────────────┐
         │              │   article_like  │     │ article_favorite│
         │              ├─────────────────┤     ├─────────────────┤
         └─────────────>│ id              │     │ id              │
                        │ user_id         │     │ user_id         │
                        │ article_id      │     │ article_id      │
                        │ create_time     │     │ create_time     │
                        └─────────────────┘     └─────────────────┘
```

### 表结构详细设计

#### 1. 文章表 (article)

```sql
CREATE TABLE `article` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(200) NOT NULL COMMENT '文章标题',
  `content` longtext COMMENT '文章内容（Markdown）',
  `summary` varchar(500) DEFAULT NULL COMMENT '文章摘要',
  `cover_image` varchar(500) DEFAULT NULL COMMENT '封面图URL',
  `author_id` bigint NOT NULL COMMENT '作者ID',
  `status` tinyint DEFAULT 0 COMMENT '状态：0草稿 1已发布 2已下架',
  `is_top` tinyint DEFAULT 0 COMMENT '是否置顶：0否 1是',
  `is_recommend` tinyint DEFAULT 0 COMMENT '是否推荐：0否 1是',
  `view_count` int DEFAULT 0 COMMENT '浏览量',
  `like_count` int DEFAULT 0 COMMENT '点赞数',
  `comment_count` int DEFAULT 0 COMMENT '评论数',
  `favorite_count` int DEFAULT 0 COMMENT '收藏数',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_author_id` (`author_id`),
  KEY `idx_status` (`status`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';
```

#### 2. 分类表 (category)

```sql
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `icon` varchar(200) DEFAULT NULL COMMENT '分类图标',
  `sort` int DEFAULT 0 COMMENT '排序（越小越靠前）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分类表';
```

#### 3. 标签表 (tag)

```sql
CREATE TABLE `tag` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '标签名称',
  `color` varchar(20) DEFAULT NULL COMMENT '标签颜色',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签表';
```

#### 4. 文章-分类关联表 (article_category)

```sql
CREATE TABLE `article_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `category_id` bigint NOT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_article_category` (`article_id`, `category_id`),
  KEY `idx_category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章-分类关联表';
```

#### 5. 文章-标签关联表 (article_tag)

```sql
CREATE TABLE `article_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `tag_id` bigint NOT NULL COMMENT '标签ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_article_tag` (`article_id`, `tag_id`),
  KEY `idx_tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章-标签关联表';
```

#### 6. 评论表 (comment)

```sql
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `user_id` bigint NOT NULL COMMENT '评论用户ID',
  `parent_id` bigint DEFAULT 0 COMMENT '父评论ID（0表示一级评论）',
  `reply_to_id` bigint DEFAULT NULL COMMENT '回复的目标评论ID',
  `reply_to_user_id` bigint DEFAULT NULL COMMENT '回复的目标用户ID',
  `content` varchar(1000) NOT NULL COMMENT '评论内容',
  `like_count` int DEFAULT 0 COMMENT '点赞数',
  `status` tinyint DEFAULT 0 COMMENT '状态：0正常 1已删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';
```

#### 7. 文章点赞表 (article_like)

```sql
CREATE TABLE `article_like` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_article` (`user_id`, `article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章点赞表';
```

#### 8. 文章收藏表 (article_favorite)

```sql
CREATE TABLE `article_favorite` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_article` (`user_id`, `article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章收藏表';
```

## 模块架构设计

### 模块职责划分

| 模块 | 职责 | 接口前缀 |
|------|------|----------|
| aurora-common | 公共实体、Mapper、DTO、VO、工具类、配置 | - |
| aurora-admin | 后台管理系统接口 | /sys, /admin |
| aurora-api | 前台用户接口（博客社区） | /api |
| aurora-auth | 认证授权 | /auth |
| aurora-file | 文件服务 | /file |
| aurora-quartz | 定时任务 | - |
| aurora-server | 启动入口 | - |

### 模块结构

```
admin-app/
├── aurora-common/src/main/java/com/aurora/
│   ├── entity/
│   │   ├── Article.java
│   │   ├── Category.java
│   │   ├── Tag.java
│   │   ├── ArticleCategory.java
│   │   ├── ArticleTag.java
│   │   ├── Comment.java
│   │   ├── ArticleLike.java
│   │   └── ArticleFavorite.java
│   ├── mapper/
│   │   ├── ArticleMapper.java
│   │   ├── CategoryMapper.java
│   │   ├── TagMapper.java
│   │   ├── ArticleCategoryMapper.java
│   │   ├── ArticleTagMapper.java
│   │   ├── CommentMapper.java
│   │   ├── ArticleLikeMapper.java
│   │   └── ArticleFavoriteMapper.java
│   ├── dto/
│   │   └── article/
│   │       ├── ArticleSaveDTO.java
│   │       ├── ArticleUpdateDTO.java
│   │       ├── ArticleQueryDTO.java
│   │       └── CommentSaveDTO.java
│   └── vo/
│       └── article/
│           ├── ArticleVO.java
│           ├── ArticleDetailVO.java
│           ├── ArticleListVO.java
│           ├── CategoryVO.java
│           ├── TagVO.java
│           └── CommentVO.java
│
├── aurora-admin/src/main/java/com/aurora/
│   ├── controller/
│   │   └── article/
│   │       ├── AdminArticleController.java      # 后台文章管理
│   │       ├── AdminCategoryController.java     # 后台分类管理
│   │       └── AdminTagController.java          # 后台标签管理
│   └── service/
│       ├── AdminArticleService.java
│       ├── AdminCategoryService.java
│       ├── AdminTagService.java
│       └── impl/
│           ├── AdminArticleServiceImpl.java
│           ├── AdminCategoryServiceImpl.java
│           └── AdminTagServiceImpl.java
│
└── aurora-api/src/main/java/com/aurora/
    ├── controller/
    │   ├── ArticleController.java       # /api/article
    │   ├── CategoryController.java      # /api/category
    │   ├── TagController.java           # /api/tag
    │   └── CommentController.java       # /api/comment
    └── service/
        ├── ArticleService.java
        ├── CategoryService.java
        ├── TagService.java
        ├── CommentService.java
        └── impl/
            ├── ArticleServiceImpl.java
            ├── CategoryServiceImpl.java
            ├── TagServiceImpl.java
            └── CommentServiceImpl.java
```

### 新模块 aurora-api 配置

#### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.aurora</groupId>
        <artifactId>admin-app</artifactId>
        <version>1.0.0</version>
    </parent>

    <artifactId>aurora-api</artifactId>
    <description>前台API接口模块</description>

    <dependencies>
        <dependency>
            <groupId>com.aurora</groupId>
            <artifactId>aurora-common</artifactId>
        </dependency>
    </dependencies>
</project>
```

### 核心接口设计

#### 前台接口（aurora-api，前缀 /api）

##### ArticleController (/api/article)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /api/article | 文章列表（分页） | 无 |
| GET | /api/article/{id} | 文章详情 | 无 |
| GET | /api/article/hot | 热门文章 | 无 |
| GET | /api/article/recommend | 推荐文章 | 无 |
| POST | /api/article | 创建文章 | 登录 |
| PUT | /api/article | 更新文章 | 登录+作者 |
| DELETE | /api/article/{id} | 删除文章 | 登录+作者 |
| POST | /api/article/{id}/like | 点赞文章 | 登录 |
| DELETE | /api/article/{id}/like | 取消点赞 | 登录 |
| POST | /api/article/{id}/favorite | 收藏文章 | 登录 |
| DELETE | /api/article/{id}/favorite | 取消收藏 | 登录 |
| GET | /api/article/user/{userId} | 用户文章列表 | 无 |

##### CommentController (/api/comment)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /api/comment/article/{articleId} | 获取文章评论 | 无 |
| POST | /api/comment | 发表评论 | 登录 |
| DELETE | /api/comment/{id} | 删除评论 | 登录+作者 |

##### CategoryController (/api/category)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /api/category | 分类列表 | 无 |
| GET | /api/category/{id}/articles | 分类下文章 | 无 |

##### TagController (/api/tag)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /api/tag | 标签列表 | 无 |
| GET | /api/tag/{id}/articles | 标签下文章 | 无 |

#### 后台接口（aurora-admin，前缀 /sys）

##### AdminArticleController (/sys/article)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /sys/article | 文章列表（分页） | sys:article:list |
| GET | /sys/article/{id} | 文章详情 | sys:article:list |
| PUT | /sys/article/status | 上下架文章 | sys:article:update |
| PUT | /sys/article/top | 设置置顶 | sys:article:update |
| PUT | /sys/article/recommend | 设置推荐 | sys:article:update |
| DELETE | /sys/article/{ids} | 批量删除 | sys:article:delete |

##### AdminCategoryController (/sys/category)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /sys/category | 分类列表 | sys:category:list |
| POST | /sys/category | 创建分类 | sys:category:add |
| PUT | /sys/category | 更新分类 | sys:category:update |
| DELETE | /sys/category/{id} | 删除分类 | sys:category:delete |

##### AdminTagController (/sys/tag)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /sys/tag | 标签列表 | sys:tag:list |
| POST | /sys/tag | 创建标签 | sys:tag:add |
| PUT | /sys/tag | 更新标签 | sys:tag:update |
| DELETE | /sys/tag/{id} | 删除标签 | sys:tag:delete |

## 评论楼中楼设计

使用 `parent_id` + `reply_to_id` 实现无限层级嵌套：

```
评论A (parent_id=0)
├── 评论B (parent_id=A的id, reply_to_id=A的id, reply_to_user_id=A的作者)
│   └── 评论C (parent_id=A的id, reply_to_id=B的id, reply_to_user_id=B的作者)
└── 评论D (parent_id=A的id, reply_to_id=A的id, reply_to_user_id=A的作者)
```

- `parent_id`: 指向根评论，用于按楼分组
- `reply_to_id`: 指向被回复的评论，用于显示"回复@xxx"
- `reply_to_user_id`: 被回复用户的ID

查询时先按 `parent_id=0` 获取一级评论，再递归获取子评论。
