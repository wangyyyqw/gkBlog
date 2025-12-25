import { Head, Html, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <link rel="icon" href="/assets/images/cover.jpg" type="image/jpg" />
        <link rel="apple-touch-icon" href="/assets/images/cover.jpg" />
      </Head>
      <body>
        <div id="skip-navigation" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
