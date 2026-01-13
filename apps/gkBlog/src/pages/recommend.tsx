import Page from "@/contents-layouts/Page";

function Recommend() {
  return (
    <Page
      frontMatter={{
        title: "推荐",
        description: "推荐内容集合",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="flex flex-col items-center p-8">
          <h1 className="text-3xl font-bold mb-6">推荐页面</h1>
          <p className="text-lg text-center">推荐页面正在建设中，敬请期待！</p>
        </div>
      </div>
    </Page>
  );
}

export default Recommend;