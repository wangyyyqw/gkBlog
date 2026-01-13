import MediaContents from "@/contents/media";
import Page from "@/contents-layouts/Page";

function Media() {
  return (
    <Page
      frontMatter={{
        title: "书架",
        description: "我的图书收藏",
        caption: "My",
      }}
    >
      <MediaContents />
    </Page>
  );
}

export default Media;
