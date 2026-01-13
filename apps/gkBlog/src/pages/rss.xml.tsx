import { GetStaticProps } from "next";

import generateRSSFeed from "@/lib/rss";

interface RSSProps {
  rss: string;
}

function RSSPage({ rss }: RSSProps) {
  // 在静态导出模式下，我返回一个包含 XML 内容的页面
  // 但实际的 RSS 文件将在构建时生成
  return (
    <div>
      <pre>{rss}</pre>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // 生成 RSS Feed
  const rss = generateRSSFeed();

  return {
    props: {
      rss,
    },
    // 在静态导出模式下，我不能设置动态头部
    // 头部将在部署配置中处理
  };
};

export default RSSPage;
