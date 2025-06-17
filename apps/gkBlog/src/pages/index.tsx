import Head from "@/components/meta/Head";
import { getBaseUrl } from "@/helpers/url";
import IndexContents from "@/contents/index";

function Index() {
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "鹤别青山的读书分享笔记",
    description:
      "记录阅读感悟与知识积累，分享优质书籍与读书笔记。探索文学、技术、哲学等多元领域，与志同道合的读者共同成长。",
    url: baseUrl,
    publisher: {
      "@type": "Person",
      name: "鹤别青山",
      url: `${baseUrl}/about-me`,
    },
    author: {
      "@type": "Person",
      name: "鹤别青山",
      url: `${baseUrl}/about-me`,
    },
    sameAs: ["https://github.com/你的GitHub用户名"], // 替换为你的GitHub
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Head
        title="鹤别青山的读书分享笔记"
        description="记录阅读感悟与知识积累，分享优质书籍与读书笔记。探索文学、技术、哲学等多元领域，与志同道合的读者共同成长。"
        ogImage={`${baseUrl}/assets/images/og-image.png`} // 替换为读书相关的图片
        overrideTitle
      />
      <IndexContents 
        // 传递自定义数据到内容组件
        pageTitle="鹤别青山的读书分享笔记"
        subtitle="以书为镜，照见天地人心"
        intro="你好，我是鹤别青山，一个热爱阅读与分享的电子书制作爱好者。这里记录了我的读书心得、技术探索与生活感悟。"
        categories={[
          { name: "文学艺术", count: 24 },
          { name: "技术编程", count: 18 },
          { name: "哲学思考", count: 12 },
          { name: "生活随笔", count: 9 },
        ]}
      />
    </>
  );
}

export default Index;
