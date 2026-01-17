import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

function MediaDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBookData = async () => {
      try {
        // 如果是我生成的样本数据（uuid格式为book-数字），直接创建图书对象
        if (typeof id === "string" && id.startsWith("book-")) {
          // 从id中提取数字部分，获取对应的图书书名
          const bookNumber = parseInt(id.replace("book-", ""), 10);
          // 创建样本图书对象
          const sampleBook: MediaData = {
            shelf_type: "read",
            visibility: 1,
            item: {
              title: bookTitles[bookNumber - 1] || `图书${bookNumber}`,
              cover_image_url:
                "/assets/images/neodb/cover/dongwu-100-years.jpg",
              rating: 7.5,
              uuid: id,
              category: "book",
              download_url: `https://wwbes.lanzoue.com/iKG3R3d2v10b`,
            },
          };

          // 为不同图书设置特殊配置
          if (bookNumber === 1) {
            // 《基督山伯爵 - 大仲马》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/jidushanbojue-dazhongma.png";
            sampleBook.item.download_url = `https://115cdn.com/s/swfqr173h6e?password=b7c3&#`;
            sampleBook.item.tablet_download_url = `https://115cdn.com/s/swfqr133h6e?password=r011&#`;
            sampleBook.item.kindle_download_url = `https://115cdn.com/s/swfqrx73h6e?password=of40&#`;
          } else if (bookNumber === 2) {
            // 《咸的玩笑-刘震云》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/xiandewanxiao-liuzhenyun.png";
            sampleBook.item.download_url = `https://wwbes.lanzoue.com/ig25P3fmlhsh`;
            sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iR7Kb3fmlhyd`;
          } else if (bookNumber === 3) {
            // 《伦敦魔法师·暗黑魔法-维多利亚·舒瓦》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/lundunmofashi-anheimofa-weiduoliyashuwa.jpg";
            sampleBook.item.download_url = `https://wwbes.lanzoue.com/iXYUz3e6hm8b`;
            sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iW7NZ3e6hlpc`;
          } else if (bookNumber === 4) {
            // 《她的山，她的海-扶华》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/tashan-tahai-fuhua.jpg";
            sampleBook.item.download_url = `https://wwbes.lanzoue.com/ihduM3elfdyb`;
            sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/izrgk3elfcyf`;
          } else if (bookNumber === 5) {
            // 《谢家的短命鬼长命百岁了-怡然》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/xiejia-duanminggui-changmingbaisui-yi.jpg";
            sampleBook.item.download_url = `https://wwbes.lanzoue.com/iJu463dmclzc`;
            sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iHpH43dmclsf`;
          } else if (bookNumber === 6) {
            // 《史记-司马迁 张大可》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/shiji-simaqian-zhangdake.png";
            sampleBook.item.download_url = `https://wwbes.lanzoue.com/iID003d2qf5a`;
            sampleBook.item.password = "hgaz";
          } else if (bookNumber === 7) {
            // 《东吴100年-握中悬璧》
            sampleBook.item.cover_image_url =
              "/assets/images/neodb/cover/dongwu-100-years.jpg";
            sampleBook.item.download_url = `https://wwbes.lanzoue.com/iKG3R3d2v10b`;
          }

          setBook(sampleBook);
        } else {
          // 否则从真实数据文件中获取
          const response = await fetch("/assets/data/neodb/book.json");
          if (!response.ok) {
            throw new Error("网络错误");
          }
          const data = await response.json();
          // 查找匹配的图书
          const foundBook = data.data.find(
            (item: MediaData) => item.item.uuid === id
          );
          if (foundBook) {
            setBook(foundBook);
          } else {
            setError("未找到图书");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  if (loading) {
    return <div className="content-wrapper">加载中...</div>;
  }

  if (error || !book) {
    return <div className="content-wrapper">{error || "图书不存在"}</div>;
  }

  return (
    <Page
      frontMatter={{
        title: book.item.title,
        caption: "图书详情",
        description: "图书详情页面",
      }}
    >
      <div className="content-wrapper mdx-contents">
        <div className="flex flex-col items-center p-8">
          <div className="mb-6">
            <Image
              src={book.item.cover_image_url}
              alt={book.item.title}
              width={200}
              height={300}
              style={{
                objectFit: "cover",
                borderRadius: "4px",
                border: "3px solid #d1d5db",
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{book.item.title}</h1>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  返回书架
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = book?.item.download_url || "";
                      link.download = "";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    下载手机版
                  </button>
                  {book?.item.tablet_download_url && (
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
                  {book?.item.kindle_download_url && (
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
                  {book?.item.password && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(book.item.password);
                        // 可以添加一个提示，但用户要求移除toast，所以直接复制
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
      </div>
    </Page>
  );
}

export default MediaDetail;
