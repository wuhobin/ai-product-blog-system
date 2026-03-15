## ADDED Requirements

### Requirement: 文章列表展示

系统 SHALL 在首页和 `/articles` 页面展示文章列表，采用单列横向布局（文字在左，封面图在右）。

#### Scenario: 访问文章列表页
- **WHEN** 用户访问 `/articles` 或首页
- **THEN** 系统展示文章列表，每篇卡片包含：
  - 顶部：置顶/推荐标签（如有）、单个分类
  - 中部：标题（单行省略）、摘要（两行省略）
  - 底部：作者名、发布日期、浏览量、点赞数
  - 右侧：封面缩略图（120×80px）

#### Scenario: 无文章时展示空状态
- **WHEN** 文章列表为空
- **THEN** 系统展示"暂无文章"提示

### Requirement: 分页功能

系统 SHALL 支持文章列表分页，默认每页 10 条。

#### Scenario: 加载更多文章
- **WHEN** 用户滚动到底部或点击"加载更多"
- **THEN** 系统加载下一页文章并追加到列表

#### Scenario: 分页加载失败
- **WHEN** 分页请求失败
- **THEN** 系统展示错误提示，允许重试

### Requirement: 分类筛选

系统 SHALL 支持按分类筛选文章列表。

#### Scenario: 点击分类筛选
- **WHEN** 用户点击某个分类
- **THEN** 系统仅展示该分类下的文章

#### Scenario: 清除分类筛选
- **WHEN** 用户点击"全部"或关闭分类筛选
- **THEN** 系统展示所有分类的文章

### Requirement: 标签筛选

系统 SHALL 支持按标签筛选文章列表。

#### Scenario: 点击标签筛选
- **WHEN** 用户点击某个标签
- **THEN** 系统仅展示包含该标签的文章

### Requirement: 文章卡片交互

系统 SHALL 在文章卡片上提供跳转详情页的交互。

#### Scenario: 点击文章标题
- **WHEN** 用户点击文章标题
- **THEN** 系统跳转到 `/article/{id}` 详情页

#### Scenario: 点击封面图
- **WHEN** 用户点击封面图
- **THEN** 系统跳转到 `/article/{id}` 详情页

### Requirement: 文章卡片样式

系统 SHALL 为文章卡片应用横向布局样式。

#### Scenario: 卡片布局
- **WHEN** 文章卡片渲染
- **THEN** 系统采用 flex 横向布局（文字在左，封面图在右）

#### Scenario: 封面图尺寸
- **WHEN** 文章有封面图
- **THEN** 封面图固定为 120×80px，右对齐，圆角 4px

#### Scenario: 标题交互
- **WHEN** 用户悬停在标题上
- **THEN** 标题颜色变为蓝色（#1890FF），cursor 变为 pointer

#### Scenario: 移动端适配
- **WHEN** 屏幕宽度小于 768px
- **THEN** 封面图尺寸缩小或保持，布局保持横向
