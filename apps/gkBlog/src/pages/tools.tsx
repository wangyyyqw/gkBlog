import Page from "@/contents-layouts/Page";

function Tools() {
  return (
    <Page
      frontMatter={{
        title: "工具",
        description: "实用工具集合",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="flex flex-col items-center p-8">
          <h1 className="text-3xl font-bold mb-6">工具页面</h1>
          <p className="text-lg text-center">工具页面正在建设中，敬请期待！</p>
        </div>
      </div>
    </Page>
  );
}

export default Tools;