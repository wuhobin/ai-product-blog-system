## ADDED Requirements

### Requirement: 文章详情展示

系统 SHALL 在 `/article/{id}` 页面展示文章完整内容，包括标题、Markdown 渲染内容、作者信息、统计数据、分类、标签。

#### Scenario: 访问文章详情页
- **WHEN** 用户访问 `/article/{id}`
- **THEN** 系统展示文章标题、内容（Markdown 渲染）、摘要、封面图、作者头像/昵称/简介、分类列表、标签列表

#### Scenario: 文章不存在
- **WHEN** 访问的文章 ID 不存在
- **THEN** 系统展示"文章不存在"提示，提供返回列表的链接

### Requirement: Markdown 渲染

系统 SHALL 使用 react-markdown 渲染文章内容，支持 GFM 语法（表格、任务列表、代码高亮）。

#### Scenario: 渲染代码块
- **WHEN** 文章内容包含代码块
- **THEN** 系统正确渲染代码块并应用语法高亮

#### Scenario: 渲染表格
- **WHEN** 文章内容包含 GFM 表格
- **THEN** 系统正确渲染表格样式

### Requirement: 代码块复制功能

系统 SHALL 在代码块上提供一键复制功能。

#### Scenario: 显示复制按钮
- **WHEN** 用户鼠标悬停在代码块上
- **THEN** 系统在代码块右上角显示复制按钮

#### Scenario: 复制代码成功
- **WHEN** 用户点击复制按钮
- **THEN** 系统将代码内容复制到剪贴板，按钮图标变为绿色对勾，2秒后恢复

#### Scenario: 代码块样式
- **WHEN** 代码块渲染完成
- **THEN** 系统应用黑色背景 (`#1e1e1e`) 和语法高亮样式

### Requirement: 作者信息展示

系统 SHALL 在文章详情页展示作者信息卡片。

#### Scenario: 展示作者卡片
- **WHEN** 文章详情页加载完成
- **THEN** 系统展示作者头像、昵称、简介

### Requirement: 统计数据展示

系统 SHALL 展示文章的浏览量、点赞数、评论数、收藏数。

#### Scenario: 展示统计数据
- **WHEN** 文章详情页加载完成
- **THEN** 系统展示浏览量、点赞数、评论数、收藏数图标及数值

### Requirement: 返回列表导航

系统 SHALL 在详情页提供返回文章列表的导航。

#### Scenario: 点击返回按钮
- **WHEN** 用户点击"返回列表"按钮
- **THEN** 系统跳转到 `/articles` 页面
