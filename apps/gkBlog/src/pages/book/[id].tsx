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
  // 验证码状态
  const [userInput, setUserInput] = useState<string>("");
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [captchaError, setCaptchaError] = useState<string>("");
  // 固定验证码（实际应用中可以从后端获取或配置）
  const FIXED_CAPTCHA = "蠢卷栖萤";

  // 验证验证码
  const validateCaptcha = () => {
    if (userInput.toLowerCase() === FIXED_CAPTCHA.toLowerCase()) {
      setCaptchaError("");
      return true;
    }
    setCaptchaError("验证码错误，请重新输入");
    return false;
  };

  // 处理下载点击
  const handleDownload = () => {
    if (!showCaptcha) {
      // 第一次点击，显示验证码
      setShowCaptcha(true);
      return;
    }

    if (validateCaptcha()) {
      // 验证码正确，执行下载
      const link = document.createElement("a");
      link.href = book?.item.download_url || "";
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // 重置状态
      setShowCaptcha(false);
      setUserInput("");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchBookData = async () => {
      try {
        // 如果是我生成的样本数据（uuid格式为book-数字），直接创建图书对象
        if (typeof id === "string" && id.startsWith("book-")) {
          // 从id中提取数字部分，获取对应的豆瓣榜单书名
          const bookNumber = parseInt(id.replace("book-", ""), 10);
          // 创建样本图书对象
          const sampleBook: MediaData = {
            shelf_type: "read",
            visibility: 1,
            item: {
              title: bookTitles[bookNumber - 1] || `图书${bookNumber}`,
              cover_image_url:
                "https://laoshuan.dpdns.org/file/BQACAgIAAyEGAASYNuCMAANTaUv_Hd34kAbZLZyMpW4NiFI3TjMAAhOPAALxJ2BKYe2wYxrZrhE2BA.jpg",
              rating: 7.5,
              uuid: id,
              category: "book",
              download_url: `https://chunjuanqiying.us.kg/file/1768313652834_X-024《刺客后传3：弄臣命运》作者：罗苹·荷布V1.0_encode.epub`,
            },
          };
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
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{book.item.title}</h1>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  返回书架
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  {showCaptcha ? "验证并下载" : "下载图书"}
                </button>
              </div>

              {/* 验证码输入区域 */}
              {showCaptcha && (
                <div className="mt-4 w-full max-w-sm">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="请输入验证码"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {captchaError && (
                      <p className="text-red-500 text-sm">{captchaError}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default MediaDetail;
