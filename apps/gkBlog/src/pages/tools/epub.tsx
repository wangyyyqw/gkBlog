import Image from "next/image";
import { useRouter } from "next/router";

import Page from "@/contents-layouts/Page";

function EpubTool() {
  const router = useRouter();

  return (
    <Page
      frontMatter={{
        title: "EPUB 工具",
        description: "专业的 EPUB 电子书工具，支持格式转换、编辑和优化",
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
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
                专业的 EPUB 电子书工具，支持格式转换、编辑和优化
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
                    格式转换
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    支持 PDF、TXT、DOCX 等多种格式转换为 EPUB，保持内容结构和格式的完整性。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    电子书编辑
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    可视化编辑 EPUB 内容，包括章节、段落、图片等元素的添加、删除和修改。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    元数据管理
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    编辑电子书的元数据信息，包括书名、作者、出版社、ISBN 等。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    封面制作
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    为电子书生成专业的封面，支持自定义图片、文字和布局。
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    优化工具
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    优化 EPUB 文件结构，减少文件大小，提高阅读体验。
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">
                使用指南
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <p>1. 选择您需要的功能模块</p>
                <p>2. 上传或选择源文件</p>
                <p>3. 根据需要进行设置和编辑</p>
                <p>4. 点击生成或转换按钮</p>
                <p>5. 下载处理后的 EPUB 文件</p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                返回工具页
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default EpubTool;