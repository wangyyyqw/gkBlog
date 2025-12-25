import RSS from "rss";

import { getSortedPosts } from "./posts";

const generateRSSFeed = () => {
  const feed = new RSS({
    title: "蠢卷栖萤", // 你的博客名称
    description: "一个热爱读书和分享的博主", // 你的博客描述
    feed_url: "https://hebieqingshan.us.kg/rss.xml", // 这里填写你站点的 RSS 链接
    site_url: "https://hebieqingshan.us.kg", // 你的站点首页 URL
    image_url: "https://hebieqingshan.us.kg/favicon.ico", // 你的站点 logo 图片 URL
    managingEditor: "editor@hebieqingshan.us.kg",
    webMaster: "webmaster@hebieqingshan.us.kg",
    pubDate: new Date(), // 可以使用文章中最新的日期
    language: "zh", // 中文
  });

  const posts = getSortedPosts();

  posts.forEach(({ slug, frontMatter }) => {
    feed.item({
      title: frontMatter.title, // 使用文章的标题
      description: frontMatter.description, // 使用文章的描述
      url: `https://hebieqingshan.us.kg/blog/${slug}`, // 每篇文章的 URL
      guid: `https://hebieqingshan.us.kg/blog/${slug}`, // 一般与 URL 相同，确保唯一
      date: new Date(frontMatter.date), // 使用文章的发布日期
      categories: frontMatter.tags, // 使用文章的标签作为分类
    });
  });

  return feed.xml(); // 返回生成的 RSS XML 字符串
};

export default generateRSSFeed;
