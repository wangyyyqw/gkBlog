# gkBlog 应用结构

以下是 `apps/gkBlog` 目录的结构概览：

```
apps/gkBlog/
├── .env.example // 环境变量示例
├── .eslintrc.js // ESLint配置
├── .gitignore // Git忽略文件
├── Dockerfile // Docker配置
├── next-env.d.ts // Next.js环境变量声明
├── next-sitemap.config.js // 网站地图配置
├── next.config.mjs // Next.js配置
├── package.json // 项目依赖
├── postcss.config.js // PostCSS配置
├── README.md // 项目说明
├── tailwind.config.js // Tailwind配置
├── tsconfig.json // TypeScript配置
├── prisma/
│   └── schema.prisma // Prisma数据库模式
├── public/ // 静态资源
│   ├── assets/ // 资源文件
│   ├── *.html // 验证文件
│   ├── *.txt // 验证文件
│   └── favicon.ico // 网站图标
├── scripts/ // 脚本
│   ├── movie_details.py // 电影详情脚本
│   └── submit_urls.sh // URL提交脚本
└── src/ // 源码
    ├── assets/ // 资源
    ├── components/ // 组件
    ├── constants/ // 常量
    ├── contents/ // 内容
    ├── contents-layouts/ // 内容布局
    ├── helpers/ // 工具函数
    ├── hooks/ // 自定义Hook
    ├── lib/ // 库
    ├── pages/ // 页面
    ├── providers/ // 状态管理
    ├── styles/ // 样式
    ├── types/ // 类型定义
    └── utils/ // 工具
```

# 数据库设计文档

## 数据源配置

我们使用 MongoDB 作为数据库，通过以下连接字符串连接：

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

## 数据模型

### ContentMeta 模型

ContentMeta 模型表示内容的元数据，包括类型、标题、slug、浏览次数、分享次数和反应次数。

| 字段名    | 类型        | 描述       |
| --------- | ----------- | ---------- |
| id        | String      | 唯一标识符 |
| type      | ContentType | 内容类型   |
| title     | String      | 内容标题   |
| slug      | String      | 内容的slug |
| views     | View[]      | 浏览记录   |
| shares    | Share[]     | 分享记录   |
| reactions | Reaction[]  | 反应记录   |
| createdAt | DateTime    | 创建时间   |

### ContentType 枚举

ContentType 枚举定义了内容的类型：

- PAGE
- POST
- PROJECT

### View 模型

View 模型表示内容的浏览记录。

| 字段名    | 类型        | 描述             |
| --------- | ----------- | ---------------- |
| id        | String      | 唯一标识符       |
| createdAt | DateTime    | 浏览时间         |
| sessionId | String      | 会话ID           |
| contentId | String      | 关联的内容ID     |
| content   | ContentMeta | 关联的内容元数据 |

### Share 模型

Share 模型表示内容的分享记录。

| 字段名    | 类型        | 描述             |
| --------- | ----------- | ---------------- |
| id        | String      | 唯一标识符       |
| type      | ShareType?  | 分享类型         |
| createdAt | DateTime    | 分享时间         |
| sessionId | String      | 会话ID           |
| contentId | String      | 关联的内容ID     |
| content   | ContentMeta | 关联的内容元数据 |

### ShareType 枚举

ShareType 枚举定义了分享的类型：

- TWITTER
- CLIPBOARD
- OTHERS

### Reaction 模型

Reaction 模型表示内容的反应记录。

| 字段名    | 类型          | 描述             |
| --------- | ------------- | ---------------- |
| id        | String        | 唯一标识符       |
| count     | Int?          | 反应次数         |
| section   | String?       | 反应部分         |
| type      | ReactionType? | 反应类型         |
| createdAt | DateTime      | 反应时间         |
| sessionId | String        | 会话ID           |
| contentId | String        | 关联的内容ID     |
| content   | ContentMeta   | 关联的内容元数据 |

### ReactionType 枚举

ReactionType 枚举定义了反应的类型：

- CLAPPING
- THINKING
- AMAZED
