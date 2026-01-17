import Image from "next/image";

import Page from "@/contents-layouts/Page";

const RECOMMEND_ITEMS = Array(1).fill({
  title: "懒得翻书",
  desc: "我劝同志们读一点书，免得受知识分子的骗。",
  image: "/assets/images/recommend/wechat.jpg",
  link: "https://mp.weixin.qq.com/s/Ix7ttKNo2buOhE0RSBTEog",
});

interface RecommendCardProps {
  title: string;
  desc: string;
  image: string;
  link: string;
}

function RecommendCard({ title, desc, image, link }: RecommendCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
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
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {desc}
          </p>
        </div>
      </div>
    </a>
  );
}

function Recommend() {
  return (
    <Page
      frontMatter={{
        title: "推荐",
        description: "这里有一些我觉得不错的内容，推荐给你。",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="py-8">
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-slate-100">
              推荐公众号
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {RECOMMEND_ITEMS.map((item) => (
                <RecommendCard
                  key={item.title}
                  title={item.title}
                  desc={item.desc}
                  image={item.image}
                  link={item.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Recommend;
