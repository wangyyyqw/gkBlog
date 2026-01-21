import Image from "next/image";

import Page from "@/contents-layouts/Page";

// 1. Extract Data
const READING_APPS = [
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
    icon: "/assets/images/app-icons/duokan.png",
    isImage: true,
    link: "https://sj.qq.com/appdetail/com.duokan.reader?supply_id=2702800336&ocpc=0&platform=bing&account_id=300000000&landing_type=pcyyb&keyword_id=1726113027077&plan_id=1726113027077&group_id=1726113027077&creative_id=1726113027077&use_previous_query=1",
  },
];

const TOOLS = [
  {
    name: "EPUB 工具",
    description:
      "包含一些可用的epub工具，用于epub文件的重构、解密、加密、字体混淆、WEBP图片转换。",
    icon: "📚",
    isImage: false,
    link: "/tools/epub",
  },
];

function Tools() {
  return (
    <Page
      frontMatter={{
        title: "工具",
        description: "精选实用工具与应用推荐，提升效率与体验。",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="py-8">
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              阅读软件推荐
            </h2>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {READING_APPS.map((app) => (
                <a
                  key={app.name}
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Card Design
                  className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-accent-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-400"
                >
                  {/* External Link Icon */}
                  <div className="absolute right-4 top-4 text-slate-300 transition-colors group-hover:text-accent-500 dark:text-slate-600 dark:group-hover:text-accent-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Image Handling */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                      {app.isImage ? (
                        <Image
                          src={app.icon}
                          alt={`${app.name} 图标`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl">
                          {app.icon}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {app.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              实用工具
            </h2>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.link}
                  // Card Design
                  className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-accent-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-400"
                >
                  <div className="flex items-start gap-4">
                    {/* Image Handling */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                      {tool.isImage ? (
                        <Image
                          src={tool.icon}
                          alt={`${tool.name} 图标`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl">
                          {tool.icon}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Coming Soon Section */}
          <div className="rounded-3xl bg-slate-50 py-16 text-center dark:bg-slate-800/50 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              更多精彩即将上线
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              更多工具正在建设中，敬请期待！
            </p>
          </div>
        </div>
      </div>{" "}
    </Page>
  );
}

export default Tools;
