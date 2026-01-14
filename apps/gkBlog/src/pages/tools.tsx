import Image from "next/image";

import Page from "@/contents-layouts/Page";

function Tools() {
  // 阅读软件推荐数据
  const readingApps = [
    {
      name: "阅微",
      description: "阅书之细微，观书之毫末。文以载道，儒者无不能言之。",
      icon: "/assets/images/app-icons/yuwei.png",
      isImage: true,
      link: "https://sj.qq.com/appdetail/app.zhendong.reamicro?supply_id=2702800336&ocpc=0&platform=bing&account_id=300000000&landing_type=pcyyb&keyword_id=1726113027077&plan_id=1726113027077&group_id=1726113027077&creative_id=1726113027077&use_previous_query=1",
    },
    {
      name: "多看阅读",
      description: "小米旗下阅读应用，支持多种格式和自定义排版",
      icon: "🌟",
      isImage: false,
      link: "https://www.duokan.com/",
    },
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
                <div
                  key={index}
                  className="border-divider-light rounded-xl border bg-white p-5 hover:shadow-lg transition-all duration-300 dark:border-divider-dark dark:bg-[#161e31]"
                >
                  <div className="flex items-center gap-4">
                    {app.isImage ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={app.icon}
                          alt={`${app.name} 图标`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-4xl">{app.icon}</div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">
                        {app.name}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 其他工具区域 */}
          <div className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl">
            <p className="text-lg text-center text-slate-600 dark:text-slate-400">
              更多工具正在建设中，敬请期待！
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Tools;
