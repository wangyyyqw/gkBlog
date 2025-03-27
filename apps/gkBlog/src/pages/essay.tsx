import EssayContents from "@/contents/essay";
import Page from "@/contents-layouts/Page";

function Essay() {
  return (
    <Page
      frontMatter={{
        title: "回忆录",
        description: "QQ 空间以及朋友圈的回忆录",
        caption: "My",
      }}
    >
      <EssayContents />
    </Page>
  );
}

export default Essay;
