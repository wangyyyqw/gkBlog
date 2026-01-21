import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import path from "path";
import { useState } from "react";

import { bookTitles } from "@/constants/books";
import Page from "@/contents-layouts/Page";

interface Item {
  title: string;
  cover_image_url: string;
  rating: number;
  uuid: string;
  category: string;
  download_url: string;
  tablet_download_url?: string;
  kindle_download_url?: string;
  password?: string;
}

interface MediaData {
  shelf_type: string;
  visibility: number;
  item: Item;
}

interface MediaDetailProps {
  book: MediaData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { id: string } }[] = [];

  // 1. Generate paths for book-1 to book-7 (using bookTitles length)
  bookTitles.forEach((_, index) => {
    paths.push({ params: { id: `book-${index + 1}` } });
  });

  // 2. Read public/assets/data/neodb/book.json to get UUIDs
  // Try both relative paths to be safe with CWD
  let filePath = path.join(process.cwd(), "public/assets/data/neodb/book.json");
  if (!fs.existsSync(filePath)) {
    filePath = path.join(
      process.cwd(),
      "apps/gkBlog/public/assets/data/neodb/book.json",
    );
  }

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      if (jsonData.data && Array.isArray(jsonData.data)) {
        jsonData.data.forEach((entry: MediaData) => {
          if (entry.item && entry.item.uuid) {
            paths.push({ params: { id: entry.item.uuid } });
          }
        });
      }
    }
  } catch (error) {
    // console.error("Error reading book.json for getStaticPaths:", error);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  let book: MediaData | null = null;

  if (id.startsWith("book-")) {
    // 从id中提取数字部分，获取对应的图书书名
    const bookNumber = parseInt(id.replace("book-", ""), 10);
    // 创建样本图书对象
    const sampleBook: MediaData = {
      shelf_type: "read",
      visibility: 1,
      item: {
        title: bookTitles[bookNumber - 1] || `图书${bookNumber}`,
        cover_image_url: "/assets/images/neodb/cover/dongwu-100-years.jpg",
        rating: 7.5,
        uuid: id,
        category: "book",
        download_url: `https://wwbes.lanzoue.com/iKG3R3d2v10b`,
      },
    };

    // 为不同图书设置特殊配置
    if (bookNumber === 1) {
      // 《没有宽恕就没有未来》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/no-forgiveness-no-future.png";
      sampleBook.item.download_url = `https://115cdn.com/s/swfbkgi3h6e?password=0121&#`;
    } else if (bookNumber === 2) {
      // 《基督山伯爵 - 大仲马》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/jidushanbojue-dazhongma.png";
      sampleBook.item.download_url = `https://115cdn.com/s/swfqr173h6e?password=b7c3&#`;
      sampleBook.item.tablet_download_url = `https://115cdn.com/s/swfqr133h6e?password=r011&#`;
      sampleBook.item.kindle_download_url = `https://115cdn.com/s/swfqrx73h6e?password=of40&#`;
    } else if (bookNumber === 3) {
      // 《咸的玩笑-刘震云》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/xiandewanxiao-liuzhenyun.png";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/ig25P3fmlhsh`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iR7Kb3fmlhyd`;
    } else if (bookNumber === 4) {
      // 《伦敦魔法师·暗黑魔法-维多利亚·舒瓦》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/lundunmofashi-anheimofa-weiduoliyashuwa.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iXYUz3e6hm8b`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iW7NZ3e6hlpc`;
    } else if (bookNumber === 5) {
      // 《她的山，她的海-扶华》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/tashan-tahai-fuhua.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/ihduM3elfdyb`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/izrgk3elfcyf`;
    } else if (bookNumber === 6) {
      // 《谢家的短命鬼长命百岁了-怡然》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/xiejia-duanminggui-changmingbaisui-yi.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iJu463dmclzc`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iHpH43dmclsf`;
    } else if (bookNumber === 7) {
      // 《史记-司马迁 张大可》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/shiji-simaqian-zhangdake.png";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iID003d2qf5a`;
      sampleBook.item.password = "hgaz";
    } else if (bookNumber === 8) {
      // 《东吴100年-握中悬璧》
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/dongwu-100-years.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iKG3R3d2v10b`;
    }

    book = sampleBook;
  } else {
    // 否则从真实数据文件中获取
    let filePath = path.join(
      process.cwd(),
      "public/assets/data/neodb/book.json",
    );
    if (!fs.existsSync(filePath)) {
      filePath = path.join(
        process.cwd(),
        "apps/gkBlog/public/assets/data/neodb/book.json",
      );
    }

    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        const foundBook = jsonData.data.find(
          (item: MediaData) => item.item.uuid === id,
        );
        if (foundBook) {
          book = foundBook;
        }
      }
    } catch (error) {
      // console.error("Error reading book.json for getStaticProps:", error);
    }
  }

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

function MediaDetail({ book }: MediaDetailProps) {
  const router = useRouter();
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <Page
      frontMatter={{
        title: book.item.title,
        caption: "图书详情",
        description: "图书详情页面",
      }}
    >
      <div className="flex flex-col items-center p-8">
        <div className="mb-6">
          <Image
            src={book.item.cover_image_url}
            alt={book.item.title}
            width={200}
            height={300}
            className="shadow-[0_0_2px_rgba(0,0,0,0.5)]"
            style={{
              objectFit: "cover",
              borderRadius: "4px",
              border: "3px solid #d1d5db",
            }}
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{book.item.title}</h1>
          <button
            type="button"
            onClick={() => setShowQRCode((prev) => !prev)}
            className="mb-6 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
          >
            {showQRCode ? "下次一定" : "支持一下"}
          </button>

          {showQRCode && (
            <div className="mt-4 mb-6 flex justify-center space-x-4">
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/images/qrcode/wechat.jpg"
                  alt="收款码"
                  width={200}
                  height={200}
                />
                <span className="mt-2 text-sm">微信</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/images/qrcode/alipay.jpg"
                  alt="收款码"
                  width={200}
                  height={200}
                />
                <span className="mt-2 text-sm">支付宝</span>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                返回
              </button>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = book.item.download_url || "";
                    link.download = "";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  下载
                </button>
                {book.item.tablet_download_url && (
                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = book.item.tablet_download_url || "";
                      link.download = "";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    下载平板版
                  </button>
                )}
                {book.item.kindle_download_url && (
                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = book.item.kindle_download_url || "";
                      link.download = "";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-300"
                  >
                    下载Kindle版
                  </button>
                )}
                {book.item.password && (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        book.item.password as string,
                      );
                    }}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 whitespace-nowrap"
                    title="复制提取码"
                  >
                    复制提取码: {book.item.password}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default MediaDetail;
