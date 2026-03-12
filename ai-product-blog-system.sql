/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : 127.0.0.1:3306
 Source Schema         : aurora-admin

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 12/03/2026 23:38:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容（Markdown）',
  `summary` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文章摘要',
  `cover_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '封面图URL',
  `author_id` bigint NOT NULL COMMENT '作者ID',
  `status` tinyint NULL DEFAULT 0 COMMENT '状态：0草稿 1已发布 2已下架',
  `is_top` tinyint NULL DEFAULT 0 COMMENT '是否置顶：0否 1是',
  `is_recommend` tinyint NULL DEFAULT 0 COMMENT '是否推荐：0否 1是',
  `view_count` int NULL DEFAULT 0 COMMENT '浏览量',
  `like_count` int NULL DEFAULT 0 COMMENT '点赞数',
  `comment_count` int NULL DEFAULT 0 COMMENT '评论数',
  `favorite_count` int NULL DEFAULT 0 COMMENT '收藏数',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_author_id`(`author_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_create_time`(`create_time` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for article_category
-- ----------------------------
DROP TABLE IF EXISTS `article_category`;
CREATE TABLE `article_category`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `category_id` bigint NOT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_article_category`(`article_id` ASC, `category_id` ASC) USING BTREE,
  INDEX `idx_category_id`(`category_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章-分类关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_category
-- ----------------------------

-- ----------------------------
-- Table structure for article_favorite
-- ----------------------------
DROP TABLE IF EXISTS `article_favorite`;
CREATE TABLE `article_favorite`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_article`(`user_id` ASC, `article_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章收藏表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_favorite
-- ----------------------------

-- ----------------------------
-- Table structure for article_like
-- ----------------------------
DROP TABLE IF EXISTS `article_like`;
CREATE TABLE `article_like`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_article`(`user_id` ASC, `article_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章点赞表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_like
-- ----------------------------

-- ----------------------------
-- Table structure for article_tag
-- ----------------------------
DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE `article_tag`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `tag_id` bigint NOT NULL COMMENT '标签ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_article_tag`(`article_id` ASC, `tag_id` ASC) USING BTREE,
  INDEX `idx_tag_id`(`tag_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章-标签关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_tag
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分类图标',
  `sort` int NULL DEFAULT 0 COMMENT '排序（越小越靠前）',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '后端开发', 'Server', 1, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (2, '前端开发', 'Monitor', 2, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (3, '移动开发', 'iPhone', 3, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (4, '人工智能', 'Brain', 4, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (5, '数据库', 'Database', 5, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (6, '运维部署', 'Cloud', 6, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (7, '架构设计', 'Grid3x3', 7, '2026-03-12 23:18:32');
INSERT INTO `category` VALUES (8, '开源项目', 'Github', 8, '2026-03-12 23:18:32');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `user_id` bigint NOT NULL COMMENT '评论用户ID',
  `parent_id` bigint NULL DEFAULT 0 COMMENT '父评论ID（0表示一级评论）',
  `reply_to_id` bigint NULL DEFAULT NULL COMMENT '回复的目标评论ID',
  `reply_to_user_id` bigint NULL DEFAULT NULL COMMENT '回复的目标用户ID',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  `like_count` int NULL DEFAULT 0 COMMENT '点赞数',
  `status` tinyint NULL DEFAULT 0 COMMENT '状态：0正常 1已删除',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_article_id`(`article_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for gen_table
-- ----------------------------
DROP TABLE IF EXISTS `gen_table`;
CREATE TABLE `gen_table`  (
  `table_id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `table_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '表名称',
  `table_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '表描述',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`table_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '代码生成业务表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of gen_table
-- ----------------------------
INSERT INTO `gen_table` VALUES (16, 'sys_tag', '标签表', '2024-12-22 10:38:49', NULL);
INSERT INTO `gen_table` VALUES (17, 'sys_web_config', '网站配置表', '2024-12-22 11:55:59', NULL);
INSERT INTO `gen_table` VALUES (18, 'sys_article', '文章标签关联表', '2024-12-22 12:20:29', '2024-12-25 14:32:51');
INSERT INTO `gen_table` VALUES (19, 'sys_category', '分类表', '2024-12-22 13:22:38', NULL);
INSERT INTO `gen_table` VALUES (20, 'sys_friend', '友情链接', '2024-12-22 13:57:02', NULL);

-- ----------------------------
-- Table structure for gen_table_column
-- ----------------------------
DROP TABLE IF EXISTS `gen_table_column`;
CREATE TABLE `gen_table_column`  (
  `column_id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `table_id` bigint NOT NULL COMMENT '归属表编号',
  `column_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '列名称',
  `column_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '列描述',
  `column_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '列类型',
  `java_type` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'JAVA类型',
  `java_field` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'JAVA字段名',
  `is_pk` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否主键（1是）',
  `is_required` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否必填（1是）',
  `is_insert` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否为插入字段（1是）',
  `is_edit` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否编辑字段（1是）',
  `is_list` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否列表字段（1是）',
  `is_query` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否查询字段（1是）',
  `query_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'EQ' COMMENT '查询方式（等于、不等于、大于、小于、范围）',
  `html_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '显示类型（文本框、文本域、下拉框、复选框、单选框、日期控件）',
  `sort` int NULL DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`column_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 263 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '代码生成业务表字段' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of gen_table_column
-- ----------------------------
INSERT INTO `gen_table_column` VALUES (178, 16, 'id', '主键', 'int', 'Integer', 'id', '1', '1', '1', '1', '1', '1', 'EQ', 'input', 1);
INSERT INTO `gen_table_column` VALUES (179, 16, 'name', '名称', 'varchar', 'String', 'name', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 2);
INSERT INTO `gen_table_column` VALUES (180, 16, 'sort', '排序', 'int', 'Integer', 'sort', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 3);
INSERT INTO `gen_table_column` VALUES (181, 16, 'create_time', '创建时间', 'datetime', 'Date', 'createTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 4);
INSERT INTO `gen_table_column` VALUES (182, 16, 'update_time', '更新时间', 'datetime', 'Date', 'updateTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 5);
INSERT INTO `gen_table_column` VALUES (183, 17, 'id', '主键', 'bigint', 'Long', 'id', '1', '1', '1', '1', '1', '1', 'EQ', 'input', 1);
INSERT INTO `gen_table_column` VALUES (184, 17, 'logo', 'logo(文件UID)', 'varchar', 'String', 'logo', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 2);
INSERT INTO `gen_table_column` VALUES (185, 17, 'name', '网站名称', 'varchar', 'String', 'name', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 3);
INSERT INTO `gen_table_column` VALUES (186, 17, 'summary', '介绍', 'varchar', 'String', 'summary', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 4);
INSERT INTO `gen_table_column` VALUES (187, 17, 'record_num', '备案号', 'varchar', 'String', 'recordNum', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 5);
INSERT INTO `gen_table_column` VALUES (188, 17, 'web_url', '网站地址', 'varchar', 'String', 'webUrl', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 6);
INSERT INTO `gen_table_column` VALUES (189, 17, 'author', '作者', 'varchar', 'String', 'author', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 7);
INSERT INTO `gen_table_column` VALUES (190, 17, 'author_info', '个性签名', 'varchar', 'String', 'authorInfo', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 8);
INSERT INTO `gen_table_column` VALUES (191, 17, 'author_avatar', '作者头像', 'varchar', 'String', 'authorAvatar', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 9);
INSERT INTO `gen_table_column` VALUES (192, 17, 'ali_pay', '支付宝收款码', 'varchar', 'String', 'aliPay', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 10);
INSERT INTO `gen_table_column` VALUES (193, 17, 'weixin_pay', '微信收款码', 'varchar', 'String', 'weixinPay', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 11);
INSERT INTO `gen_table_column` VALUES (194, 17, 'github', 'github地址', 'varchar', 'String', 'github', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 12);
INSERT INTO `gen_table_column` VALUES (195, 17, 'gitee', 'gitee地址', 'varchar', 'String', 'gitee', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 13);
INSERT INTO `gen_table_column` VALUES (196, 17, 'qq_number', 'QQ号', 'varchar', 'String', 'qqNumber', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 14);
INSERT INTO `gen_table_column` VALUES (197, 17, 'qq_group', 'QQ群', 'varchar', 'String', 'qqGroup', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 15);
INSERT INTO `gen_table_column` VALUES (198, 17, 'email', '邮箱', 'varchar', 'String', 'email', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 16);
INSERT INTO `gen_table_column` VALUES (199, 17, 'wechat', '微信', 'varchar', 'String', 'wechat', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 17);
INSERT INTO `gen_table_column` VALUES (200, 17, 'show_list', '显示的列表（用于控制邮箱、QQ、QQ群、Github、Gitee、微信是否显示在前端）', 'varchar', 'String', 'showList', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 18);
INSERT INTO `gen_table_column` VALUES (201, 17, 'login_type_list', '登录方式列表（用于控制前端登录方式，如账号密码,码云,Github,QQ,微信）', 'varchar', 'String', 'loginTypeList', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 19);
INSERT INTO `gen_table_column` VALUES (202, 17, 'open_comment', '是否开启评论(0:否 1:是)', 'tinyint', 'Integer', 'openComment', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 20);
INSERT INTO `gen_table_column` VALUES (203, 17, 'open_admiration', '是否开启赞赏(0:否， 1:是)', 'tinyint', 'Integer', 'openAdmiration', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 21);
INSERT INTO `gen_table_column` VALUES (204, 17, 'tourist_avatar', '游客头像', 'varchar', 'String', 'touristAvatar', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 22);
INSERT INTO `gen_table_column` VALUES (205, 17, 'bulletin', '公告', 'varchar', 'String', 'bulletin', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 23);
INSERT INTO `gen_table_column` VALUES (206, 17, 'about_me', '关于我', 'mediumtext', 'String', 'aboutMe', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 24);
INSERT INTO `gen_table_column` VALUES (207, 17, 'create_time', '创建时间', 'datetime', 'Date', 'createTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 25);
INSERT INTO `gen_table_column` VALUES (208, 17, 'update_time', '更新时间', 'datetime', 'Date', 'updateTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 26);
INSERT INTO `gen_table_column` VALUES (209, 18, 'id', '主键id', 'bigint', 'Long', 'id', NULL, '1', '1', '1', '1', '1', 'EQ', 'input', 1);
INSERT INTO `gen_table_column` VALUES (210, 18, 'user_id', '用户id', 'int', 'Integer', 'userId', NULL, '1', '1', '1', '1', '1', 'EQ', 'input', 2);
INSERT INTO `gen_table_column` VALUES (211, 18, 'category_id', '分类id', 'bigint', 'Long', 'categoryId', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 3);
INSERT INTO `gen_table_column` VALUES (212, 18, 'title', '文章标题', 'varchar', 'String', 'title', NULL, '1', '1', '1', '1', '1', 'EQ', 'input', 4);
INSERT INTO `gen_table_column` VALUES (213, 18, 'cover', '文章封面地址', 'varchar', 'String', 'cover', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 5);
INSERT INTO `gen_table_column` VALUES (214, 18, 'summary', '文章简介', 'varchar', 'String', 'summary', NULL, '1', '1', '1', '1', '1', 'EQ', 'input', 6);
INSERT INTO `gen_table_column` VALUES (215, 18, 'content', '文章内容', 'mediumtext', 'String', 'content', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 7);
INSERT INTO `gen_table_column` VALUES (216, 18, 'content_md', '文章内容md格式', 'mediumtext', 'String', 'contentMd', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 8);
INSERT INTO `gen_table_column` VALUES (217, 18, 'read_type', '阅读方式 0无需验证 1：评论阅读 2：点赞阅读 3：扫码阅读', 'int', 'Integer', 'readType', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 9);
INSERT INTO `gen_table_column` VALUES (218, 18, 'is_stick', '是否置顶 0否 1是', 'int', 'Integer', 'isStick', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 10);
INSERT INTO `gen_table_column` VALUES (219, 18, 'is_publish', '是否发布 0：下架 1：发布', 'int', 'Integer', 'isPublish', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 11);
INSERT INTO `gen_table_column` VALUES (220, 18, 'is_original', '是否原创  0：转载 1:原创', 'int', 'Integer', 'isOriginal', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 12);
INSERT INTO `gen_table_column` VALUES (221, 18, 'is_carousel', '是否首页轮播', 'int', 'Integer', 'isCarousel', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 13);
INSERT INTO `gen_table_column` VALUES (222, 18, 'is_recommend', '是否推荐', 'int', 'Integer', 'isRecommend', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 14);
INSERT INTO `gen_table_column` VALUES (223, 18, 'original_url', '转载地址', 'varchar', 'String', 'originalUrl', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 15);
INSERT INTO `gen_table_column` VALUES (224, 18, 'quantity', '文章阅读量', 'bigint', 'Long', 'quantity', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 16);
INSERT INTO `gen_table_column` VALUES (225, 18, 'keywords', '关键词', 'varchar', 'String', 'keywords', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 17);
INSERT INTO `gen_table_column` VALUES (226, 18, 'create_time', '创建时间', 'datetime', 'Date', 'createTime', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 18);
INSERT INTO `gen_table_column` VALUES (227, 18, 'update_time', '修改时间', 'datetime', 'Date', 'updateTime', NULL, '0', '1', '1', '1', '1', 'EQ', 'input', 19);
INSERT INTO `gen_table_column` VALUES (228, 19, 'id', '主键', 'int', 'Integer', 'id', '1', '1', '1', '1', '1', '1', 'EQ', 'input', 1);
INSERT INTO `gen_table_column` VALUES (229, 19, 'name', '名称', 'varchar', 'String', 'name', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 2);
INSERT INTO `gen_table_column` VALUES (230, 19, 'sort', '排序', 'int', 'Integer', 'sort', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 3);
INSERT INTO `gen_table_column` VALUES (231, 19, 'create_time', '创建时间', 'datetime', 'Date', 'createTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 4);
INSERT INTO `gen_table_column` VALUES (232, 19, 'update_time', '更新时间', 'datetime', 'Date', 'updateTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 5);
INSERT INTO `gen_table_column` VALUES (233, 20, 'id', '主键ID', 'int', 'Integer', 'id', '1', '1', '1', '1', '1', '1', 'EQ', 'input', 1);
INSERT INTO `gen_table_column` VALUES (234, 20, 'name', '网站名称', 'varchar', 'String', 'name', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 2);
INSERT INTO `gen_table_column` VALUES (235, 20, 'url', '网站地址', 'varchar', 'String', 'url', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 3);
INSERT INTO `gen_table_column` VALUES (236, 20, 'avatar', '网站头像地址', 'varchar', 'String', 'avatar', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 4);
INSERT INTO `gen_table_column` VALUES (237, 20, 'info', '网站描述', 'varchar', 'String', 'info', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 5);
INSERT INTO `gen_table_column` VALUES (238, 20, 'email', '邮箱', 'varchar', 'String', 'email', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 6);
INSERT INTO `gen_table_column` VALUES (239, 20, 'sort', '排序', 'int', 'Integer', 'sort', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 7);
INSERT INTO `gen_table_column` VALUES (240, 20, 'reason', '下架原因', 'varchar', 'String', 'reason', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 8);
INSERT INTO `gen_table_column` VALUES (241, 20, 'status', 'ENUM-状态:\"0,下架;1,申请;2:上架\"', 'int', 'Integer', 'status', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 9);
INSERT INTO `gen_table_column` VALUES (242, 20, 'create_time', '创建时间', 'datetime', 'Date', 'createTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 10);
INSERT INTO `gen_table_column` VALUES (243, 20, 'update_time', '修改时间', 'datetime', 'Date', 'updateTime', '0', '0', '1', '1', '1', '1', 'EQ', 'input', 11);

-- ----------------------------
-- Table structure for qrtz_job_details
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_job_details`;
CREATE TABLE `qrtz_job_details`  (
  `SCHED_NAME` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `JOB_NAME` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `JOB_GROUP` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DESCRIPTION` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `JOB_CLASS_NAME` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IS_DURABLE` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IS_NONCONCURRENT` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IS_UPDATE_DATA` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `REQUESTS_RECOVERY` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `JOB_DATA` blob NULL,
  PRIMARY KEY (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of qrtz_job_details
-- ----------------------------

-- ----------------------------
-- Table structure for qrtz_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qrtz_triggers`;
CREATE TABLE `qrtz_triggers`  (
  `SCHED_NAME` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TRIGGER_NAME` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TRIGGER_GROUP` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `JOB_NAME` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `JOB_GROUP` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DESCRIPTION` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `NEXT_FIRE_TIME` bigint NULL DEFAULT NULL,
  `PREV_FIRE_TIME` bigint NULL DEFAULT NULL,
  `PRIORITY` int NULL DEFAULT NULL,
  `TRIGGER_STATE` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TRIGGER_TYPE` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `START_TIME` bigint NOT NULL,
  `END_TIME` bigint NULL DEFAULT NULL,
  `CALENDAR_NAME` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `MISFIRE_INSTR` smallint NULL DEFAULT NULL,
  `JOB_DATA` blob NULL,
  PRIMARY KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) USING BTREE,
  INDEX `SCHED_NAME`(`SCHED_NAME` ASC, `JOB_NAME` ASC, `JOB_GROUP` ASC) USING BTREE,
  CONSTRAINT `qrtz_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) REFERENCES `qrtz_job_details` (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of qrtz_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典名称',
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型',
  `status` int NOT NULL DEFAULT 1 COMMENT '是否发布(1:是，0:否)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dict_id` bigint NOT NULL COMMENT '字典类型id',
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典标签',
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典键值',
  `style` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '回显样式',
  `is_default` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否默认（1是 0否）',
  `sort` int NULL DEFAULT NULL COMMENT '排序',
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` int NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典数据表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES (31, 11, 'aa', 'aa', NULL, NULL, 1, 'a', 1);

-- ----------------------------
-- Table structure for sys_job
-- ----------------------------
DROP TABLE IF EXISTS `sys_job`;
CREATE TABLE `sys_job`  (
  `job_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '调用目标字符串',
  `cron_expression` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'cron执行表达式',
  `misfire_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '3' COMMENT '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
  `concurrent` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '是否并发执行（0允许 1禁止）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '状态（0正常 1暂停）',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`job_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '定时任务调度表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_job
-- ----------------------------
INSERT INTO `sys_job` VALUES (1, '系统默认（无参）', 'DEFAULT', 'task.neatNoParams', '* * * * * ? *', '3', '1', '1', '2024-11-17 12:39:45', '2024-11-18 17:26:59', '');
INSERT INTO `sys_job` VALUES (2, '系统默认（有参）', 'DEFAULT', 'demoTask.ryParams(\'ry\')', '0/15 * * * * ?', '3', '1', '1', '2024-11-17 12:39:45', '2024-11-17 12:39:45', '');
INSERT INTO `sys_job` VALUES (3, '系统默认（多参）', 'DEFAULT', 'demoTask.ryMultipleParams(\'ry\', true, 2000L, 316.50D, 100)', '0/20 * * * * ?', '3', '1', '1', '2024-11-17 12:39:45', '2024-11-18 09:27:22', '');

-- ----------------------------
-- Table structure for sys_job_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_job_log`;
CREATE TABLE `sys_job_log`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务日志ID',
  `job_id` bigint NOT NULL COMMENT '任务ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '日志信息',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '执行状态（0正常 1失败）',
  `exception_info` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '异常信息',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `stop_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 78 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '定时任务调度日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_job_log
-- ----------------------------
INSERT INTO `sys_job_log` VALUES (1, 3, '系统默认（多参）', 'DEFAULT', 'demoTask.ryMultipleParams(\'ry\', true, 2000L, 316.50D, 100)', '系统默认（多参） 总共耗时：13毫秒', '1', 'org.springframework.beans.factory.NoSuchBeanDefinitionException: No bean named \'demoTask\' available\r\n	at org.springframework.beans.factory.support.DefaultListableBeanFactory.getBeanDefinition(DefaultListableBeanFactory.java:872)\r\n	at org.springframework.beans.factory.support.AbstractBeanFactory.getMergedLocalBeanDefinition(AbstractBeanFactory.java:1344)\r\n	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:309)\r\n	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208)\r\n	at org.springframework.context.support.AbstractApplicationContext.getBean(AbstractApplicationContext.java:1154)\r\n	at com.neat.demo.utils.SpringUtils.getBean(SpringUtils.java:49)\r\n	at com.neat.demo.quartz.utils.JobInvokeUtils.invokeMethod(JobInvokeUtils.java:32)\r\n	at com.neat.demo.quartz.QuartzDisallowConcurrentExecution.doExecute(QuartzDisallowConcurrentExecution.java:15)\r\n	at com.neat.demo.quartz.AbstractQuartzJob.execute(AbstractQuartzJob.java:38)\r\n	at org.quartz.core.JobRunShell.run(JobRunShell.java:202)\r\n	at org.quartz.simpl.SimpleThreadPool$WorkerThread.run(SimpleThreadPool.java:573)\r\n', '2024-11-17 20:07:14', '2024-11-17 20:07:14', '2024-11-17 20:07:14');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `parent_id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '上级资源ID',
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '路由路径',
  `component` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '菜单名称',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `icon` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '资源图标',
  `type` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型 menu、button',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `redirect` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '重定向地址',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '跳转地址',
  `hidden` int NULL DEFAULT NULL COMMENT '是否隐藏',
  `perm` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `is_external` int NULL DEFAULT 0 COMMENT '是否外链 0:否  1:是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '权限资源表 ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '0', '/system', 'Layout', '系统管理', 4, 'Setting', 'CATALOG', '2019-03-28 18:51:08', '2021-12-17 15:26:06', '/system/user', '', 0, NULL, 0);
INSERT INTO `sys_menu` VALUES (2, '1', 'role', '/system/role/index', '角色管理', 2, 'Avatar', 'MENU', '2019-03-30 14:00:03', '2021-11-16 15:40:42', '', '', 0, NULL, 0);
INSERT INTO `sys_menu` VALUES (3, '2', NULL, NULL, '列表', 1, '', 'BUTTON', NULL, '2024-11-18 17:56:16', '', NULL, 1, 'system:role', 0);
INSERT INTO `sys_menu` VALUES (4, '0', '/monitor', 'Layout', '监控中心', 5, 'Monitor', 'CATALOG', NULL, '2024-11-17 21:38:25', '/monitor/server', '', 0, NULL, 0);
INSERT INTO `sys_menu` VALUES (7, '6', '', '', '新增', 1, '', 'BUTTON', NULL, '2024-11-16 14:18:24', NULL, '', 1, 'a:b:add', 0);
INSERT INTO `sys_menu` VALUES (8, '2', '', '', '新增', 1, '', 'BUTTON', NULL, '2024-11-21 22:16:56', NULL, '', 1, 'sys:role:add', 0);
INSERT INTO `sys_menu` VALUES (9, '1', 'dict', '/system/dict/index', '字典管理', 3, 'Memo', 'MENU', '2024-11-17 21:29:51', '2024-11-17 21:39:06', NULL, '', 0, NULL, 0);
INSERT INTO `sys_menu` VALUES (10, '9', '', '', '新增', 2, '', 'BUTTON', '2024-11-17 21:30:23', '2025-01-04 11:19:01', NULL, '', 1, 'sys:dict:add', 0);
INSERT INTO `sys_menu` VALUES (11, '9', '', '', '修改', 2, '', 'BUTTON', '2024-11-17 21:32:34', '2024-11-18 18:01:35', NULL, '', 1, 'sys:dict:update', 0);
INSERT INTO `sys_menu` VALUES (12, '9', '', '', '删除', 3, '', 'BUTTON', '2024-11-17 21:34:33', '2024-11-17 21:39:11', NULL, '', 1, 'sys:dict:delete', 0);
INSERT INTO `sys_menu` VALUES (13, '1', 'menu', '/system/menu/index', '菜单管理', 5, 'Menu', 'MENU', NULL, '2021-11-18 11:26:00', '', 'menu', 0, NULL, 0);
INSERT INTO `sys_menu` VALUES (14, '1', 'user', '/system/user/index', '用户管理', 1, 'User', 'MENU', '2024-11-18 01:10:52', '2024-11-18 01:11:13', NULL, '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (16, '4', 'server', '/monitor/server/index', '服务监控', 1, 'Crop', 'MENU', '2024-11-18 01:18:12', '2024-11-18 01:20:27', NULL, '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (17, '4', 'cache', '/monitor/cache/index', '缓存监控', 2, 'Coin', 'MENU', '2024-11-18 06:56:49', NULL, NULL, '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (18, '4', 'job', '/monitor/job/index', '定时任务', 3, 'AlarmClock', 'MENU', '2024-11-18 06:57:38', NULL, NULL, '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (19, '4', 'job-log', '/monitor/job/log', '调度日志', 4, 'Document', 'MENU', '2024-11-18 06:58:43', '2024-11-18 06:58:55', NULL, '', 1, '', 0);
INSERT INTO `sys_menu` VALUES (27, '14', '', '', '新增', 2, '', 'BUTTON', '2024-11-18 09:18:14', '2024-11-21 22:15:30', NULL, '', 1, 'sys:user:add', 0);
INSERT INTO `sys_menu` VALUES (28, '14', '', '', '编辑', 2, '', 'BUTTON', '2024-11-18 09:18:38', '2024-11-21 14:38:56', NULL, '', 1, 'sys:user:update', 0);
INSERT INTO `sys_menu` VALUES (29, '14', '', '', '删除', 3, '', 'BUTTON', '2024-11-18 09:18:53', '2024-11-21 22:15:43', NULL, '', 1, 'sys:user:delete', 0);
INSERT INTO `sys_menu` VALUES (30, '0', '/tool', 'Layout', '系统工具', 6, 'Suitcase', 'CATALOG', '2024-11-18 09:21:10', '2024-11-18 12:23:55', '/tool/gen', '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (31, '30', 'gen', '/tool/gen/index', '代码生成', 1, 'Compass', 'MENU', '2024-11-18 09:21:52', NULL, NULL, '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (32, '1', 'log', '', '日志管理', 5, 'DocumentCopy', 'MENU', '2024-11-18 10:52:47', '2024-11-18 10:58:00', '/system/log/operation', '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (33, '32', 'operation', '/system/log/operation/index', '操作日志', 1, 'CircleCheckFilled', 'MENU', '2024-11-18 10:53:10', '2024-11-18 11:05:22', NULL, '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (34, '0', 'https://www.shiyit.com/', 'Layout', '墨笺博客', 99, 'Position', 'CATALOG', '2024-11-18 11:25:10', '2024-11-18 11:43:25', NULL, '', 0, '', 1);
INSERT INTO `sys_menu` VALUES (39, '14', '', '', '列表', 1, '', 'BUTTON', '2024-11-18 17:54:15', '2024-11-21 22:07:33', '', '', 1, 'sys:user', 0);
INSERT INTO `sys_menu` VALUES (40, '2', '', '', '修改', 2, '', 'BUTTON', '2024-11-18 17:56:10', '2024-11-21 22:04:52', '', '', 1, 'sys:role:update', 0);
INSERT INTO `sys_menu` VALUES (41, '2', '', '', '删除', 3, '', 'BUTTON', '2024-11-18 17:56:34', '2024-11-21 22:17:17', '', NULL, 1, 'sys:role:delete', 0);
INSERT INTO `sys_menu` VALUES (43, '2', '', '', '分配权限', 5, '', 'BUTTON', '2024-11-18 17:57:28', NULL, '', NULL, 1, 'sys:role:menus', 0);
INSERT INTO `sys_menu` VALUES (48, '13', '', '', '添加', 1, '', 'BUTTON', '2024-11-18 17:56:58', NULL, '', NULL, 1, 'sys:menu:add', 0);
INSERT INTO `sys_menu` VALUES (49, '13', '', '', '修改', 2, '', 'BUTTON', '2024-11-18 17:56:58', NULL, '', NULL, 1, 'sys:menu:update', 0);
INSERT INTO `sys_menu` VALUES (50, '13', '', '', '删除', 3, '', 'BUTTON', '2024-11-21 21:55:49', NULL, '', '', 1, 'sys:menu:delete', 0);
INSERT INTO `sys_menu` VALUES (51, '13', '', '', '列表', 1, '', 'BUTTON', '2024-11-21 21:58:29', NULL, '', '', 1, 'sys:menu', 0);
INSERT INTO `sys_menu` VALUES (52, '14', '', '', '重置密码', 5, '', 'BUTTON', '2024-11-21 22:00:30', NULL, '', '', 1, 'sys:user:reset', 0);
INSERT INTO `sys_menu` VALUES (53, '9', '', '', '列表', 1, '', 'BUTTON', '2024-11-18 17:58:16', NULL, '', '', 1, 'sys:dict', 0);
INSERT INTO `sys_menu` VALUES (54, '1', 'profile', '/system/user/profile/index', '个人中心', 99, 'Avatar', 'MENU', '2024-11-21 22:12:18', '2024-11-21 22:12:46', '', '', 1, '', 0);
INSERT INTO `sys_menu` VALUES (55, '33', '', '', '列表', 1, '', 'BUTTON', '2024-11-18 10:53:10', '2024-11-18 11:05:22', '', '', 1, 'sys:operateLog', 0);
INSERT INTO `sys_menu` VALUES (56, '33', '', '', '删除', 2, '', 'BUTTON', '2024-11-18 10:53:10', '2024-11-18 11:05:22', '', '', 1, 'sys:operateLog:delete', 0);
INSERT INTO `sys_menu` VALUES (58, '18', '', '', '列表', 1, '', 'BUTTON', '2024-11-18 17:56:58', '2024-11-21 22:04:42', '', NULL, 1, 'sys:job', 0);
INSERT INTO `sys_menu` VALUES (59, '18', '', '', '添加', 2, '', 'BUTTON', '2024-11-18 17:56:58', '2024-11-21 22:04:42', '', NULL, 1, 'sys:job:add', 0);
INSERT INTO `sys_menu` VALUES (60, '18', '', '', '修改', 3, '', 'BUTTON', '2024-11-18 17:56:58', '2024-11-21 22:04:42', '', NULL, 1, 'sys:job:update', 0);
INSERT INTO `sys_menu` VALUES (61, '18', '', '', '删除', 4, '', 'BUTTON', '2024-11-18 17:56:58', '2024-11-21 22:04:42', '', NULL, 1, 'sys:job:delete', 0);
INSERT INTO `sys_menu` VALUES (62, '18', '', '', '修改状态', 5, '', 'BUTTON', '2024-11-18 17:56:58', '2024-11-21 22:04:42', '', NULL, 0, 'sys:job:changeStatus', 0);
INSERT INTO `sys_menu` VALUES (63, '19', '', '', '删除', 1, '', 'BUTTON', '2024-11-21 22:26:56', NULL, '', '', 1, 'sys:jobLog:delete', 0);
INSERT INTO `sys_menu` VALUES (64, '19', '', '', '清空', 2, '', 'BUTTON', '2024-11-21 22:27:09', NULL, '', '', 1, 'sys:jobLog:clean', 0);
INSERT INTO `sys_menu` VALUES (66, '19', '', '', '列表', 1, '', 'BUTTON', '2024-11-21 23:09:47', NULL, '', '', 1, 'sys:jobLog', 0);
INSERT INTO `sys_menu` VALUES (67, '4', 'online', '/monitor/online/index', '在线用户', 4, 'Avatar', 'MENU', '2024-12-03 12:40:41', NULL, '', '', 0, '', 0);
INSERT INTO `sys_menu` VALUES (94, '17', '', '', '清空', 2, '', 'BUTTON', '2024-12-28 22:22:54', NULL, '', '', 1, 'monitor:cache', 0);
INSERT INTO `sys_menu` VALUES (95, '17', '', '', '列表', 1, '', 'BUTTON', '2024-12-28 22:23:36', NULL, '', '', 1, 'monitor:cache:info', 0);
INSERT INTO `sys_menu` VALUES (104, '67', '', '', '列表', 1, '', 'BUTTON', '2025-01-03 15:53:46', NULL, '', '', 1, 'monitor:online:list', 0);
INSERT INTO `sys_menu` VALUES (105, '67', '', '', '强退', 2, '', 'BUTTON', '2025-01-03 15:54:03', NULL, '', '', 1, 'monitor:online:forceLogout', 0);
INSERT INTO `sys_menu` VALUES (106, '0', '/file', 'Layout', '文件管理', 10, '', 'CATALOG', '2025-01-04 12:08:03', NULL, '', '', 1, '', 0);
INSERT INTO `sys_menu` VALUES (107, '106', '', '', '上传文件', 1, '', 'BUTTON', '2025-01-04 12:08:25', NULL, '', '', 1, 'sys:file:upload', 0);
INSERT INTO `sys_menu` VALUES (108, '106', '', '', '删除文件', 2, '', 'BUTTON', '2025-01-04 12:08:36', NULL, '', '', 1, 'sys:file:delete', 0);

-- ----------------------------
-- Table structure for sys_operate_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_operate_log`;
CREATE TABLE `sys_operate_log`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作用户',
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求接口',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求方式',
  `operation_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作名称',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ip',
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `spend_time` bigint NULL DEFAULT NULL COMMENT '请求接口耗时',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `params_json` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '请求参数',
  `class_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类地址',
  `method_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '方法名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2286 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_operate_log
-- ----------------------------
INSERT INTO `sys_operate_log` VALUES (2285, 'admin', '/sys/role/', 'POST', '新增角色', '127.0.0.1', '内网IP|内网IP', 20, '2026-03-11 22:44:49', '{\"role\":{\"id\":21,\"code\":\"user\",\"name\":\"普通用户\",\"remarks\":\"\",\"createTime\":1773240289673}}', 'com.aurora.controller.system.SysRoleController', 'addRole');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '角色编码',
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `remarks` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '角色表 ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, 'admin', '超级管理员', '拥有一切权限\n', '2024-11-16 12:29:00', '2024-11-16 12:29:00');
INSERT INTO `sys_role` VALUES (2, 'demo', '演示账号', '仅提供演示用，所有按钮权限可看到但不能操作', '2024-11-21 22:59:30', '2024-11-21 22:59:29');
INSERT INTO `sys_role` VALUES (21, 'user', '普通用户', '', '2026-03-11 22:44:50', '2026-03-11 22:44:49');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int NULL DEFAULT NULL COMMENT '角色ID',
  `menu_id` int NULL DEFAULT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_id`(`role_id` ASC, `menu_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 458 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '角色-权限资源关联表 ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (445, 2, 1);
INSERT INTO `sys_role_menu` VALUES (448, 2, 2);
INSERT INTO `sys_role_menu` VALUES (449, 2, 3);
INSERT INTO `sys_role_menu` VALUES (450, 2, 9);
INSERT INTO `sys_role_menu` VALUES (446, 2, 14);
INSERT INTO `sys_role_menu` VALUES (456, 2, 30);
INSERT INTO `sys_role_menu` VALUES (457, 2, 31);
INSERT INTO `sys_role_menu` VALUES (452, 2, 32);
INSERT INTO `sys_role_menu` VALUES (453, 2, 33);
INSERT INTO `sys_role_menu` VALUES (447, 2, 39);
INSERT INTO `sys_role_menu` VALUES (451, 2, 53);
INSERT INTO `sys_role_menu` VALUES (455, 2, 54);
INSERT INTO `sys_role_menu` VALUES (454, 2, 55);
INSERT INTO `sys_role_menu` VALUES (370, 14, 1);
INSERT INTO `sys_role_menu` VALUES (373, 14, 2);
INSERT INTO `sys_role_menu` VALUES (374, 14, 3);
INSERT INTO `sys_role_menu` VALUES (383, 14, 4);
INSERT INTO `sys_role_menu` VALUES (375, 14, 9);
INSERT INTO `sys_role_menu` VALUES (380, 14, 13);
INSERT INTO `sys_role_menu` VALUES (371, 14, 14);
INSERT INTO `sys_role_menu` VALUES (384, 14, 16);
INSERT INTO `sys_role_menu` VALUES (385, 14, 17);
INSERT INTO `sys_role_menu` VALUES (387, 14, 18);
INSERT INTO `sys_role_menu` VALUES (389, 14, 19);
INSERT INTO `sys_role_menu` VALUES (391, 14, 30);
INSERT INTO `sys_role_menu` VALUES (392, 14, 31);
INSERT INTO `sys_role_menu` VALUES (377, 14, 32);
INSERT INTO `sys_role_menu` VALUES (378, 14, 33);
INSERT INTO `sys_role_menu` VALUES (393, 14, 34);
INSERT INTO `sys_role_menu` VALUES (372, 14, 39);
INSERT INTO `sys_role_menu` VALUES (381, 14, 51);
INSERT INTO `sys_role_menu` VALUES (376, 14, 53);
INSERT INTO `sys_role_menu` VALUES (382, 14, 54);
INSERT INTO `sys_role_menu` VALUES (379, 14, 55);
INSERT INTO `sys_role_menu` VALUES (388, 14, 58);
INSERT INTO `sys_role_menu` VALUES (390, 14, 66);
INSERT INTO `sys_role_menu` VALUES (353, 14, 68);
INSERT INTO `sys_role_menu` VALUES (358, 14, 69);
INSERT INTO `sys_role_menu` VALUES (356, 14, 70);
INSERT INTO `sys_role_menu` VALUES (354, 14, 71);
INSERT INTO `sys_role_menu` VALUES (360, 14, 72);
INSERT INTO `sys_role_menu` VALUES (363, 14, 73);
INSERT INTO `sys_role_menu` VALUES (361, 14, 74);
INSERT INTO `sys_role_menu` VALUES (355, 14, 75);
INSERT INTO `sys_role_menu` VALUES (359, 14, 80);
INSERT INTO `sys_role_menu` VALUES (357, 14, 84);
INSERT INTO `sys_role_menu` VALUES (362, 14, 88);
INSERT INTO `sys_role_menu` VALUES (364, 14, 90);
INSERT INTO `sys_role_menu` VALUES (386, 14, 95);
INSERT INTO `sys_role_menu` VALUES (365, 14, 96);
INSERT INTO `sys_role_menu` VALUES (366, 14, 97);
INSERT INTO `sys_role_menu` VALUES (367, 14, 98);
INSERT INTO `sys_role_menu` VALUES (368, 14, 100);
INSERT INTO `sys_role_menu` VALUES (369, 14, 101);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '账号',
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '登录密码',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` int NULL DEFAULT 1 COMMENT '状态 0:禁用 1:正常',
  `ip` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `ip_location` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `os` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '登录系统',
  `last_login_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后登录时间',
  `browser` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `nickname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '头像',
  `mobile` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `sex` int NULL DEFAULT NULL COMMENT '性别',
  `login_type` int NULL DEFAULT NULL COMMENT '登录方式',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1814 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '用户信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '$2a$10$GAq40QgbKm/K5YEKGGPeZ.y50tQEPbTnTqZ1BccAWh5XqGyQgR7bS', '2024-12-27 14:16:17', '2025-01-04 12:09:43', 1, '127.0.0.1', '内网IP|内网IP', 'Windows', '2026-03-11 22:35:09', 'Chrome', '墨笺', 'http://127.0.0.1:8800/localFile/local-plus/20250104/logo2.jpg', '17608485482', NULL, 2, NULL);
INSERT INTO `sys_user` VALUES (2, 'test', '$2a$10$mWS51L0ReDs6RgaPEYpMYuySLZFKXgSrwK3bnVmvd15hXgv804hnG', '2025-01-04 11:41:31', '2025-01-04 11:41:30', 1, '127.0.0.1', '内网IP|内网IP', 'Windows', '2026-03-11 22:34:49', 'Chrome', '演示账号', NULL, '', '', 0, 1);
INSERT INTO `sys_user` VALUES (1813, 'oiJZq23cremZXPrGa6gdGDnchn-E', '$2a$10$a.W6LBuPqRpxkOV7PK.3w.IHORoQincrzDFf21bUGhqovvxhDOd0q', '2026-03-11 22:46:45', '2026-03-11 22:46:45', 1, '192.168.5.51', '内网IP|内网IP', 'Windows', '2026-03-11 22:46:59', 'Chrome', 'WECHAT-Jxmgxy', 'https://api.dicebear.com/6.x/pixel-art/svg?seed=Kitty', NULL, NULL, NULL, 5);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int NULL DEFAULT NULL COMMENT '角色ID',
  `user_id` int NULL DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '系统管理 - 用户角色关联表 ' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, 1);
INSERT INTO `sys_user_role` VALUES (47, 2, 2);
INSERT INTO `sys_user_role` VALUES (48, 21, 1813);

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签名称',
  `color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标签颜色',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '标签表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'Java', '#f89820', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (2, 'Python', '#3776ab', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (3, 'JavaScript', '#f7df1e', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (4, 'TypeScript', '#3178c6', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (5, 'Go', '#00add8', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (6, 'Rust', '#dea584', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (7, 'Spring Boot', '#6db33f', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (8, 'Vue.js', '#42b883', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (9, 'React', '#61dafb', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (10, 'MySQL', '#4479a1', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (11, 'Redis', '#dc382d', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (12, 'Docker', '#2496ed', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (13, 'Kubernetes', '#326ce5', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (14, '微服务', '#ff6b6b', '2026-03-12 23:18:32');
INSERT INTO `tag` VALUES (15, '算法', '#9b59b6', '2026-03-12 23:18:32');

SET FOREIGN_KEY_CHECKS = 1;
