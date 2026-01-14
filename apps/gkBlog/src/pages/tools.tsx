import Page from "@/contents-layouts/Page";

function Tools() {
  // 阅读软件推荐数据
  const readingApps = [
    {
      name: "微信读书",
      description: "拥有海量图书资源，支持多种阅读格式",
      icon: "📚",
      link: "https://weread.qq.com/"
    },
    {
      name: "Kindle",
      description: "亚马逊电子书阅读器官方应用，适合深度阅读",
      icon: "🔥",
      link: "https://www.amazon.cn/kindle-dbs/fd/kcp"
    },
    {
      name: "掌阅iReader",
      description: "国内知名阅读平台，提供丰富的正版图书",
      icon: "📖",
      link: "https://www.ireader.com/"
    },
    {
      name: "多看阅读",
      description: "小米旗下阅读应用，支持多种格式和自定义排版",
      icon: "🌟",
      link: "https://www.duokan.com/"
    }
  ];

  return (
    <Page
      frontMatter={{
        title: "工具",
        description: "实用工具集合",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">工具页面</h1>
          
          {/* 阅读软件推荐卡片 */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">阅读软件推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {readingApps.map((app, index) => (
                <a
                  key={index}
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-divider-light rounded-xl border bg-white p-5 hover:shadow-lg transition-all duration-300 dark:border-divider-dark dark:bg-[#161e31]"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{app.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">{app.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">{app.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* 其他工具区域 */}
          <div className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <p className="text-lg text-center text-slate-600 dark:text-slate-400">更多工具正在建设中，敬请期待！</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Tools;