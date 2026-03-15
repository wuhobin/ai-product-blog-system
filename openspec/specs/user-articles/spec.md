## ADDED Requirements

### Requirement: 用户文章列表页

系统 SHALL 在 `/user/{id}/articles` 页面展示指定用户的文章列表。

#### Scenario: 访问用户文章页
- **WHEN** 用户访问 `/user/{id}/articles`
- **THEN** 系统展示该用户发布的所有文章列表

#### Scenario: 用户无文章
- **WHEN** 指定用户未发布任何文章
- **THEN** 系统展示"该用户暂无文章"提示

### Requirement: 用户信息展示

系统 SHALL 在用户文章列表页展示用户基本信息。

#### Scenario: 展示用户信息卡片
- **WHEN** 用户文章列表页加载完成
- **THEN** 系统展示用户头像、昵称、简介

### Requirement: 文章列表分页

系统 SHALL 对用户文章列表进行分页展示。

#### Scenario: 加载更多用户文章
- **WHEN** 用户滚动到底部
- **THEN** 系统加载该用户的下一页文章

### Requirement: 文章卡片样式

用户文章列表中的文章卡片 SHALL 与首页文章列表样式一致。

#### Scenario: 点击用户文章
- **WHEN** 用户点击某篇文章
- **THEN** 系统跳转到 `/article/{id}` 详情页

### Requirement: 从详情页跳转

系统 SHALL 在文章详情页的作者卡片提供跳转到该用户文章列表的入口。

#### Scenario: 点击作者头像或昵称
- **WHEN** 用户在文章详情页点击作者头像或昵称
- **THEN** 系统跳转到该作者的文章列表页 `/user/{authorId}/articles`
