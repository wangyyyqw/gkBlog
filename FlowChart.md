# gkBlog 软件结构图

本文档包含 gkBlog 现代化博客网站主题软件的各种结构图、逻辑图和流程图。

## 1. 系统架构图

```mermaid
flowchart TB
    subgraph "前端架构"
        UI["用户界面 Tailwind CSS"]
        Components["组件"]
        Pages["页面"]
        Hooks["自定义 Hooks"]
        Providers["状态管理"]
    end

    subgraph "内容管理"
        MDX["MDX 文件"]
        Assets["资源文件"]
    end

    subgraph "数据存储"
        MongoDB["MongoDB 文章元数据"]
        LocalFiles["本地文件 文章内容"]
    end

    subgraph "部署环境"
        Vercel["Vercel"]
        Docker["Docker"]
        Nodejs["Node.js 环境"]
    end

    UI --> Components
    Components --> Pages
    Hooks --> Components
    Providers --> Components
    MDX --> Pages
    Assets --> Pages
    Pages --> MongoDB
    Pages --> LocalFiles
    MongoDB --> Vercel
    LocalFiles --> Vercel
    MongoDB --> Docker
    LocalFiles --> Docker
    MongoDB --> Nodejs
    LocalFiles --> Nodejs
```

## 2. 项目结构图

```mermaid
flowchart TB
    Root["gkBlog 项目根目录"]

    Apps["apps/"]
    Packages["packages/"]

    GkBlog["apps/gkBlog/"]

    Src["src/"]
    Public["public/"]
    Prisma["prisma/"]
    Scripts["scripts/"]

    Components["components/"]
    Constants["constants/"]
    Contents["contents/"]
    ContentsLayouts["contents-layouts/"]
    Helpers["helpers/"]
    Hooks["hooks/"]
    Lib["lib/"]
    Pages["pages/"]
    Providers["providers/"]
    Styles["styles/"]
    Types["types/"]
    Utils["utils/"]

    Root --> Apps
    Root --> Packages

    Apps --> GkBlog

    GkBlog --> Src
    GkBlog --> Public
    GkBlog --> Prisma
    GkBlog --> Scripts

    Src --> Components
    Src --> Constants
    Src --> Contents
    Src --> ContentsLayouts
    Src --> Helpers
    Src --> Hooks
    Src --> Lib
    Src --> Pages
    Src --> Providers
    Src --> Styles
    Src --> Types
    Src --> Utils

    classDef highlight fill:#f96,stroke:#333,stroke-width:2px;
    class Components,Contents,Pages,Hooks highlight;
```

## 3. 模块划分图

```mermaid
flowchart TB
    gkBlog["gkBlog 系统"]

    ContentDisplay["内容展示模块"]
    UserInteraction["用户交互模块"]
    UtilityTools["实用工具模块"]

    Blog["博客文章"]
    Memoir["回忆录"]
    TIL["每日学习 TIL"]
    Media["书影音"]

    MultiSensory["多感官交互"]
    Comments["评论系统 Twikoo"]
    Feedback["文章反馈"]

    Shortcuts["快捷操作"]
    ThemeSwitch["主题切换"]
    Stats["内容统计"]

    gkBlog --> ContentDisplay
    gkBlog --> UserInteraction
    gkBlog --> UtilityTools

    ContentDisplay --> Blog
    ContentDisplay --> Memoir
    ContentDisplay --> TIL
    ContentDisplay --> Media

    UserInteraction --> MultiSensory
    UserInteraction --> Comments
    UserInteraction --> Feedback

    UtilityTools --> Shortcuts
    UtilityTools --> ThemeSwitch
    UtilityTools --> Stats

    classDef module fill:#bbf,stroke:#33f,stroke-width:2px;
    classDef submodule fill:#ddf,stroke:#33f,stroke-width:1px;

    class ContentDisplay,UserInteraction,UtilityTools module;
    class Blog,Memoir,TIL,Media,MultiSensory,Comments,Feedback,Shortcuts,ThemeSwitch,Stats submodule;
```

## 4. 数据库模型图

```mermaid
erDiagram
    ContentMeta {
        string id PK
        enum ContentType "PAGE, POST, PROJECT"
        string title
        string slug
        datetime createdAt
    }

    View {
        string id PK
        datetime createdAt
        string sessionId
        string contentId FK
    }

    Share {
        string id PK
        enum ShareType "CLIPBOARD, OTHERS"
        datetime createdAt
        string sessionId
        string contentId FK
    }

    Reaction {
        string id PK
        int count
        string section
        enum ReactionType "CLAPPING, THINKING, AMAZED"
        datetime createdAt
        string sessionId
        string contentId FK
    }

    ContentMeta ||--o{ View : "has"
    ContentMeta ||--o{ Share : "has"
    ContentMeta ||--o{ Reaction : "has"
```

## 5. 页面导航流程图

```mermaid
flowchart TB
    Home["首页"]
    Blog["博客页"]
    Post["文章页"]
    ControlCenter["控制中心页"]
    Stats["数据统计页"]
    Memoir["回忆录页"]
    Album["相册集页"]
    Media["书影音页"]
    Links["友情链接页"]
    Credits["致谢页"]

    Home --> Blog
    Home --> Memoir
    Home --> Album
    Home --> Media
    Home --> ControlCenter

    Blog --> Post
    Blog --> Stats

    ControlCenter --> Stats

    classDef mainPage fill:#f96,stroke:#333,stroke-width:2px;
    classDef subPage fill:#ff9,stroke:#333,stroke-width:1px;

    class Home mainPage;
    class Blog,Post,ControlCenter,Stats,Memoir,Album,Media,Links,Credits subPage;
```

## 6. 博客文章管理流程图

```mermaid
flowchart TB
    Start["开始"]
    CreateMDX["创建 MDX 文件"]
    AddFrontMatter["添加 FrontMatter 元数据"]
    WriteContent["编写文章内容"]
    SaveFile["保存文件"]
    BuildSite["构建网站"]
    PublishPost["发布文章"]
    End["结束"]

    Start --> CreateMDX
    CreateMDX --> AddFrontMatter
    AddFrontMatter --> WriteContent
    WriteContent --> SaveFile
    SaveFile --> BuildSite
    BuildSite --> PublishPost
    PublishPost --> End

    EditPost["编辑文章"]
    FindFile["找到对应 MDX 文件"]
    ModifyContent["修改内容"]

    Start --> FindFile
    FindFile --> ModifyContent
    ModifyContent --> SaveFile

    DeletePost["删除文章"]
    DeleteFile["删除对应文件"]

    Start --> DeleteFile
    DeleteFile --> BuildSite
```

## 7. 评论系统流程图

```mermaid
flowchart TB
    Start["开始"]
    ViewPost["查看文章"]
    ScrollToComment["滚动到评论区"]
    InputComment["输入评论内容"]
    SubmitComment["提交评论"]

    subgraph "服务器端处理"
        SpamFilter["垃圾评论过滤"]
        StoreComment["存储评论"]
        SendEmail["发送邮件通知"]
    end

    DisplayComment["显示评论"]
    End["结束"]

    Start --> ViewPost
    ViewPost --> ScrollToComment
    ScrollToComment --> InputComment
    InputComment --> SubmitComment
    SubmitComment --> SpamFilter
    SpamFilter --> StoreComment
    StoreComment --> SendEmail
    SendEmail --> DisplayComment
    DisplayComment --> End
```

## 8. 数据统计流程图

```mermaid
flowchart TB
    subgraph "数据收集"
        ReadMDX["读取 MDX 文件"]
        ParseFrontMatter["解析 FrontMatter"]
        CountWords["统计字数"]
        AnalyzeData["分析数据"]
    end

    subgraph "数据可视化"
        HeatMap["热力图 写作日历"]
        PieChart["扇形图 分类占比"]
        BarChart["柱状图 年度统计"]
        TagCloud["标签云 标签频率"]
    end

    ReadMDX --> ParseFrontMatter
    ParseFrontMatter --> CountWords
    CountWords --> AnalyzeData

    AnalyzeData --> HeatMap
    AnalyzeData --> PieChart
    AnalyzeData --> BarChart
    AnalyzeData --> TagCloud
```

## 9. 书影音标记流程图

```mermaid
flowchart TB
    Start["开始"]
    MarkOnNeoDB["在NeoDB上标记作品"]
    FetchAPI["使用API获取数据"]
    ProcessData["处理数据"]
    DisplayPoster["显示海报墙"]
    End["结束"]

    Start --> MarkOnNeoDB
    MarkOnNeoDB --> FetchAPI
    FetchAPI --> ProcessData
    ProcessData --> DisplayPoster
    DisplayPoster --> End
```

## 10. 主题切换逻辑图

```mermaid
flowchart TB
    Start["开始"]
    CheckPreference["检查用户偏好"]

    subgraph "主题选择"
        LightMode["亮色模式"]
        DarkMode["暗色模式"]
    end

    subgraph "阅读模式"
        NormalMode["普通模式"]
        FocusMode["专注模式"]
    end

    ApplyTheme["应用主题"]
    SavePreference["保存用户偏好"]
    End["结束"]

    Start --> CheckPreference
    CheckPreference --> LightMode
    CheckPreference --> DarkMode
    LightMode --> NormalMode
    LightMode --> FocusMode
    DarkMode --> NormalMode
    DarkMode --> FocusMode
    NormalMode --> ApplyTheme
    FocusMode --> ApplyTheme
    ApplyTheme --> SavePreference
    SavePreference --> End
```

## 11. 部署流程图

```mermaid
flowchart TB
    Start["开始"]

    subgraph "开发环境"
        InstallDep["安装依赖"]
        DevMode["开发模式"]
        BuildProject["构建项目"]
    end

    subgraph "部署选项"
        VercelDeploy["Vercel 部署"]
        DockerDeploy["Docker 部署"]
        NodejsDeploy["Node.js 环境部署"]
    end

    ConfigEnv["配置环境变量"]
    LaunchSite["启动网站"]
    End["结束"]

    Start --> InstallDep
    InstallDep --> DevMode
    DevMode --> BuildProject
    BuildProject --> VercelDeploy
    BuildProject --> DockerDeploy
    BuildProject --> NodejsDeploy
    VercelDeploy --> ConfigEnv
    DockerDeploy --> ConfigEnv
    NodejsDeploy --> ConfigEnv
    ConfigEnv --> LaunchSite
    LaunchSite --> End
```

## 12. API接口流程图

```mermaid
flowchart TB
    Client["客户端"]

    subgraph "API 接口"
        Categories["/api/categories"]
        Tags["/api/tags"]
        Activity["/api/activity"]
        OgPage["/api/og-page"]
        OgPost["/api/og-post"]
    end

    subgraph "处理逻辑"
        GetPosts["获取文章"]
        CountCategories["统计分类"]
        CountTags["统计标签"]
        GetActivity["获取活动数据"]
        GenerateOgImage["生成预览图"]
    end

    Response["响应"]

    Client --> Categories
    Client --> Tags
    Client --> Activity
    Client --> OgPage
    Client --> OgPost

    Categories --> GetPosts
    GetPosts --> CountCategories
    CountCategories --> Response

    Tags --> GetPosts
    GetPosts --> CountTags
    CountTags --> Response

    Activity --> GetActivity
    GetActivity --> Response

    OgPage --> GenerateOgImage
    OgPost --> GenerateOgImage
    GenerateOgImage --> Response

    Response --> Client
```

## 13. 组件交互图

```mermaid
flowchart TB
    subgraph "页面组件"
        HomePage["首页"]
        BlogPage["博客页"]
        PostPage["文章页"]
        ControlCenterPage["控制中心页"]
        StatsPage["数据统计页"]
    end

    subgraph "共享组件"
        Navbar["导航栏"]
        Footer["页脚"]
        Sidebar["侧边栏"]
        TwikooComments["评论组件"]
        ThemeSwitch["主题切换"]
    end

    subgraph "功能组件"
        MDXRenderer["MDX 渲染器"]
        TableOfContents["目录"]
        Reactions["反应按钮"]
        ShareButton["分享按钮"]
        StatsCharts["统计图表"]
    end

    HomePage --> Navbar
    BlogPage --> Navbar
    PostPage --> Navbar
    ControlCenterPage --> Navbar
    StatsPage --> Navbar

    HomePage --> Footer
    BlogPage --> Footer
    PostPage --> Footer
    ControlCenterPage --> Footer
    StatsPage --> Footer

    BlogPage --> Sidebar
    PostPage --> Sidebar

    PostPage --> MDXRenderer
    PostPage --> TableOfContents
    PostPage --> Reactions
    PostPage --> ShareButton
    PostPage --> TwikooComments

    StatsPage --> StatsCharts

    Navbar --> ThemeSwitch
```

## 14. 用户交互流程图

```mermaid
flowchart TB
    User["用户"]

    subgraph "浏览操作"
        VisitHome["访问首页"]
        BrowseBlog["浏览博客列表"]
        ReadPost["阅读文章"]
        ViewStats["查看统计"]
        ViewAlbum["浏览相册"]
        ViewMedia["浏览书影音"]
    end

    subgraph "交互操作"
        ToggleTheme["切换主题"]
        LeaveComment["发表评论"]
        ReactToPost["对文章反馈"]
        ShareContent["分享内容"]
        UseShortcuts["使用快捷键"]
    end

    User --> VisitHome
    VisitHome --> BrowseBlog
    BrowseBlog --> ReadPost
    VisitHome --> ViewStats
    VisitHome --> ViewAlbum
    VisitHome --> ViewMedia

    User --> ToggleTheme
    ReadPost --> LeaveComment
    ReadPost --> ReactToPost
    ReadPost --> ShareContent
    User --> UseShortcuts
```

## 15. 数据流图

```mermaid
flowchart TB
    subgraph "数据源"
        MDXFiles["MDX 文件"]
        MongoDB["MongoDB 数据库"]
        NeoDB["NeoDB API"]
        Essays["essays.json"]
        ExternalImages["ExternalImages.tsx"]
    end

    subgraph "数据处理"
        ParseMDX["解析 MDX"]
        FetchMetadata["获取元数据"]
        ProcessStats["处理统计数据"]
        FetchMedia["获取媒体数据"]
    end

    subgraph "数据展示"
        BlogList["博客列表"]
        PostContent["文章内容"]
        StatsVisual["统计可视化"]
        MediaWall["媒体墙"]
        MemoirList["回忆录列表"]
        AlbumGrid["相册网格"]
    end

    MDXFiles --> ParseMDX
    ParseMDX --> BlogList
    ParseMDX --> PostContent

    MongoDB --> FetchMetadata
    FetchMetadata --> BlogList
    FetchMetadata --> StatsVisual

    MDXFiles --> ProcessStats
    ProcessStats --> StatsVisual

    NeoDB --> FetchMedia
    FetchMedia --> MediaWall

    Essays --> MemoirList

    ExternalImages --> AlbumGrid
```

## 16. 前端组件层次结构图

```mermaid
flowchart TB
    App["App组件"]

    Layout["布局组件"]
    Pages["页面组件"]

    Navbar["导航栏"]
    Main["主内容区"]
    Footer["页脚"]

    HomePage["首页"]
    BlogPage["博客页"]
    PostPage["文章页"]
    StatsPage["统计页"]

    UIComponents["UI组件"]
    FunctionalComponents["功能组件"]

    Button["按钮"]
    Card["卡片"]
    Modal["模态框"]

    ThemeSwitch["主题切换"]
    Comments["评论系统"]
    ShareButton["分享按钮"]

    App --> Layout
    App --> Pages

    Layout --> Navbar
    Layout --> Main
    Layout --> Footer

    Pages --> HomePage
    Pages --> BlogPage
    Pages --> PostPage
    Pages --> StatsPage

    Main --> UIComponents
    Main --> FunctionalComponents

    UIComponents --> Button
    UIComponents --> Card
    UIComponents --> Modal

    FunctionalComponents --> ThemeSwitch
    FunctionalComponents --> Comments
    FunctionalComponents --> ShareButton

    classDef core fill:#f96,stroke:#333,stroke-width:2px;
    classDef layout fill:#bbf,stroke:#33f,stroke-width:2px;
    classDef page fill:#ddf,stroke:#33f,stroke-width:1px;
    classDef component fill:#dfd,stroke:#3f3,stroke-width:1px;

    class App core;
    class Layout,Pages layout;
    class Navbar,Main,Footer,HomePage,BlogPage,PostPage,StatsPage page;
    class UIComponents,FunctionalComponents,Button,Card,Modal,ThemeSwitch,Comments,ShareButton component;
```

## 17. MDX内容处理流程图

```mermaid
flowchart TB
    subgraph "MDX文件创建"
        CreateMDX["创建MDX文件"]
        AddFrontMatter["添加FrontMatter元数据"]
        WriteContent["编写内容"]
        AddComponents["添加自定义组件"]
    end

    subgraph "MDX处理流程"
        ReadMDX["读取MDX文件"]
        ParseFrontMatter["解析FrontMatter"]
        CompileMDX["编译MDX"]
        RenderComponents["渲染React组件"]
        ApplyLayout["应用布局"]
    end

    subgraph "内容展示"
        RenderHTML["渲染HTML"]
        ApplyStyles["应用样式"]
        InteractiveElements["交互元素激活"]
        FinalDisplay["最终展示"]
    end

    CreateMDX --> AddFrontMatter
    AddFrontMatter --> WriteContent
    WriteContent --> AddComponents

    AddComponents --> ReadMDX
    ReadMDX --> ParseFrontMatter
    ParseFrontMatter --> CompileMDX
    CompileMDX --> RenderComponents
    RenderComponents --> ApplyLayout

    ApplyLayout --> RenderHTML
    RenderHTML --> ApplyStyles
    ApplyStyles --> InteractiveElements
    InteractiveElements --> FinalDisplay

    classDef creation fill:#f96,stroke:#333,stroke-width:2px;
    classDef processing fill:#bbf,stroke:#33f,stroke-width:2px;
    classDef display fill:#dfd,stroke:#3f3,stroke-width:1px;

    class CreateMDX,AddFrontMatter,WriteContent,AddComponents creation;
    class ReadMDX,ParseFrontMatter,CompileMDX,RenderComponents,ApplyLayout processing;
    class RenderHTML,ApplyStyles,InteractiveElements,FinalDisplay display;
```

## 18. 用户数据库交互流程图

```mermaid
flowchart TB
    subgraph "用户行为"
        UserView["查看内容"]
        UserReact["内容反馈"]
        UserShare["分享内容"]
        UserComment["发表评论"]
    end

    subgraph "API接口层"
        ViewAPI["/api/view"]
        ReactAPI["/api/reaction"]
        ShareAPI["/api/share"]
        CommentAPI["/api/comment"]
    end

    subgraph "数据处理层"
        ProcessView["浏览记录处理"]
        ProcessReaction["反馈数据处理"]
        ProcessShare["分享数据处理"]
        ProcessComment["评论数据处理"]
    end

    subgraph "数据库操作"
        ViewDB["View 表"]
        ReactionDB["Reaction 表"]
        ShareDB["Share 表"]
        ContentDB["ContentMeta 表"]
    end

    UserView --> ViewAPI
    UserReact --> ReactAPI
    UserShare --> ShareAPI
    UserComment --> CommentAPI

    ViewAPI --> ProcessView
    ReactAPI --> ProcessReaction
    ShareAPI --> ProcessShare
    CommentAPI --> ProcessComment

    ProcessView --> ViewDB
    ProcessReaction --> ReactionDB
    ProcessShare --> ShareDB

    ViewDB --> ContentDB
    ReactionDB --> ContentDB
    ShareDB --> ContentDB

```
