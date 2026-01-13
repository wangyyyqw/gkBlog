import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { bookTitles } from "@/constants/books";

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

function MediaContents() {
  const [mediaData, setMediaData] = useState<MediaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<MediaData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("book");
  // 分页状态
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage, setBooksPerPage] = useState<number>(12);
  const movieContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 处理图书点击事件，跳转到详情页面
  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  useEffect(() => {
    // 从URL参数获取默认分类
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get("category") || "book";
    setActiveCategory(categoryFromUrl);
  }, []);

  useEffect(() => {
    try {
      // 创建样本图书数据
      const sampleBook: MediaData = {
        shelf_type: "read",
        visibility: 1,
        item: {
          title: "卢克明的偷偷一笑",
          cover_image_url:
            "https://laoshuan.dpdns.org/file/BQACAgIAAyEGAASYNuCMAANTaUv_Hd34kAbZLZyMpW4NiFI3TjMAAhOPAALxJ2BKYe2wYxrZrhE2BA.jpg",
          rating: 7.5,
          uuid: "book-1",
          category: "book",
          download_url:
            "https://chunjuanqiying.us.kg/file/1768313652834_X-024《刺客后传3：弄臣命运》作者：罗苹·荷布V1.0_encode.epub",
        },
      };

      // 生成25本图书，每本都有唯一的uuid和书名
      const books: MediaData[] = Array.from({ length: 25 }, (_, index) => ({
        ...sampleBook,
        item: {
          ...sampleBook.item,
          title: bookTitles[index],
          uuid: `book-${index + 1}`,
          download_url: `https://chunjuanqiying.us.kg/file/1768313652834_X-024《刺客后传3：弄臣命运》作者：罗苹·荷布V1.0_encode.epub`,
        },
      }));

      setMediaData(books);
      setFilteredData(books); // 设置为当前类别数据
      setCurrentPage(1); // 切换类别时重置到第一页
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  // 根据搜索查询过滤图书
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(mediaData);
    } else {
      const filtered = mediaData.filter((book) =>
        book.item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // 搜索时重置到第一页
  }, [searchQuery, mediaData]);

  // 计算当前页显示的图书
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredData.length / booksPerPage);

  // 处理页码变化
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [{ label: "图书", value: "book" }];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // 切换类别时会重新获取对应的数据
  };

  const getResourceName = (url: string) => {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace("www.", "");
    return hostname.charAt(0).toUpperCase() + hostname.slice(1);
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>发生错误: {error}</div>;
  }

  return (
    <div className={clsx("content-wrapper mdx-contents")}>
      {/* 搜索框 */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="搜索图书..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // 回车键按下时滚动到搜索结果顶部
              window.scrollTo({ top: 0, behavior: "smooth" });
              // 聚焦到搜索结果容器，提高可访问性
              if (movieContainerRef.current) {
                movieContainerRef.current.focus();
              }
            }
          }}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-blue-400"
        />
      </div>
      <div className="movie" ref={movieContainerRef} tabIndex={-1}>
        {currentBooks.length > 0 ? (
          currentBooks.map((media) => (
            <button
              key={media.item.uuid}
              type="button"
              className="card cursor-pointer"
              onClick={() => handleBookClick(media.item.uuid)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleBookClick(media.item.uuid);
                }
              }}
              tabIndex={0}
            >
              <div className="poster">
                <Image
                  src={
                    media.item.cover_image_url.includes("http")
                      ? media.item.cover_image_url
                      : `/assets/images/neodb/cover/${media.item.cover_image_url.split("/").pop()}`
                  }
                  alt={media.item.title}
                  width={200}
                  height={300}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <div className="movie_details">
                  <h2>{media.item.title}</h2>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>没有找到匹配的内容</p>
        )}
      </div>

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-12 mb-2 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-sm">
          {/* 上一页按钮 */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 dark:bg-slate-800 dark:text-gray-500 dark:border-slate-700" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-blue-400 dark:hover:border-blue-600"}`}
          >
            上一页
          </button>

          {/* 页码按钮 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-lg transition-all duration-200 font-medium flex items-center justify-center ${currentPage === page ? "bg-blue-600 text-white shadow-md transform scale-105 dark:bg-blue-500" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-blue-400 dark:hover:border-blue-600"}`}
            >
              {page}
            </button>
          ))}

          {/* 下一页按钮 */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 dark:bg-slate-800 dark:text-gray-500 dark:border-slate-700" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-blue-400 dark:hover:border-blue-600"}`}
          >
            下一页
          </button>

          {/* 页码信息 */}
          <span className="ml-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            第 {currentPage} / {totalPages} 页
          </span>
        </div>
      )}
    </div>
  );
}

export default MediaContents;
