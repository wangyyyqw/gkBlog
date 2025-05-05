import ExamplesContents from "@/contents/example";
import Page from "@/contents-layouts/Page";

function Examples() {
  return (
    <Page
      frontMatter={{
        title: "组件示例",
        description: "博客内容是 MDX 形式，以下是组件库用于作为我的备忘录",
        caption: "More",
      }}
    >
      <ExamplesContents />
    </Page>
  );
}

export default Examples;
