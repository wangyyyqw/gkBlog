import { useRouter } from "next/router";

import Page from "@/contents-layouts/Page";

function EpubTool() {
  const router = useRouter();

  return (
    <Page
      frontMatter={{
        title: "EPUB 工具",
        description:
          "根据 github.com/cnwxi/epub_tool 项目二改，因为重写了前端，故没有提交合并",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-16 text-center">
              <div className="flex h-32 w-32 mb-8 items-center justify-center rounded-2xl bg-slate-100 text-6xl dark:bg-slate-800">
                📚
              </div>
              <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                EPUB 工具
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-8">
                根据
                <a
                  href="https://github.com/cnwxi/epub_tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-1 mr-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                >
                  <span className="text-2xl mr-1">📦</span>
                  <span className="hidden sm:inline">cnwxi/epub_tool</span>
                </a>
                项目二改，因为重写了前端，故没有提交合并
              </p>
            </div>

            {/* Features Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">
                主要功能
              </h2>
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    1. EPUB 加密/解密
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    对 EPUB 文件进行加密或解密处理，保护版权内容或解除加密限制。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    2. EPUB 格式重整
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    重构 EPUB 文件为标准格式，修复格式问题，优化文件结构。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    3. 生僻字注音
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    为 EPUB
                    中的生僻字添加拼音标注，辅助阅读古籍或生僻内容。支持多音字识别，使用完整拼音字典。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    4. 阅微转多看
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    将阅微格式脚注转换为多看格式，使阅微格式的 EPUB
                    兼容多看阅读器。保持原有格式，添加多看专用脚注。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    5. 简繁转换
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    在简体中文和繁体中文之间转换，适应不同地区用户的阅读习惯。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    6. 字体子集化
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    提取字体中实际使用的字符子集，减小 EPUB
                    文件大小，优化加载速度。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    7. 图片格式转换
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    在 WebP、JPEG、PNG 格式间转换，优化图片大小和兼容性。
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                返回工具页
              </button>
              <a
                href="https://115cdn.com/s/swfbyvb3h6e?password=p8f3#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                下载工具
              </a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default EpubTool;
