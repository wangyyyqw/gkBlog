import { getSortedPosts } from "@/lib/posts";

import BlogContents from "@/contents/blog";
import Page from "@/contents-layouts/Page";

import type { BlogContentsProps } from "@/contents/blog";
import type { GetStaticProps } from "next";

type BlogProps = {
  posts: BlogContentsProps["posts"];
};

function Blog({ posts }: BlogProps) {
  return (
    <Page
      frontMatter={{
        title: "个人博客",
        description: "读书、笔记、生活",
      }}
    >
      <BlogContents posts={posts} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const allPostsData = getSortedPosts();

  return {
    props: {
      posts: allPostsData,
    },
  };
};

export default Blog;
