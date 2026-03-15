## ADDED Requirements

### Requirement: 热门文章侧边栏

系统 SHALL 在文章列表页和详情页展示热门文章侧边栏组件。

#### Scenario: 展示热门文章
- **WHEN** 侧边栏加载完成
- **THEN** 系统展示按浏览量排序的前 5 篇热门文章（标题、浏览量）

#### Scenario: 点击热门文章
- **WHEN** 用户点击热门文章标题
- **THEN** 系统跳转到对应的文章详情页

### Requirement: 推荐文章侧边栏

系统 SHALL 在文章详情页展示推荐文章侧边栏组件。

#### Scenario: 展示推荐文章
- **WHEN** 文章详情页侧边栏加载完成
- **THEN** 系统展示推荐文章列表（标题、封面缩略图）

#### Scenario: 点击推荐文章
- **WHEN** 用户点击推荐文章
- **THEN** 系统跳转到对应的文章详情页

### Requirement: 侧边栏响应式布局

系统 SHALL 在移动端隐藏侧边栏或调整为底部布局。

#### Scenario: 移动端访问
- **WHEN** 用户在移动设备访问页面
- **THEN** 侧边栏隐藏或移至页面底部

### Requirement: 侧边栏加载状态

系统 SHALL 在侧边栏加载时展示骨架屏。

#### Scenario: 侧边栏加载中
- **WHEN** 侧边栏数据正在加载
- **THEN** 系统展示骨架屏占位

#### Scenario: 侧边栏加载失败
- **WHEN** 侧边栏数据加载失败
- **THEN** 系统展示错误提示或隐藏侧边栏
