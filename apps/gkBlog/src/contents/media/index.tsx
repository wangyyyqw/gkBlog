import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Item {
  title: string;
  cover_image_url: string;
  rating: number;
  uuid: string;
  category: string;
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
  const [activeCategory, setActiveCategory] = useState<string>("movie");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 根据活动类别加载相应的数据
        let response;
        if (activeCategory === "movie") {
          response = await fetch("/assets/data/neodb/movie.json");
        } else if (activeCategory === "book") {
          response = await fetch("/assets/data/neodb/book.json");
        } else if (activeCategory === "game") {
          response = await fetch("/assets/data/neodb/game.json");
        } else {
          response = await fetch("/assets/data/neodb/movie.json"); // 默认
        }

        if (!response.ok) {
          throw new Error("网络错误");
        }

        const data = await response.json();
        setMediaData(data.data);
        setFilteredData(data.data); // 设置为当前类别数据
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const categories = [
    { label: "电影", value: "movie" },
    { label: "图书", value: "book" },
    { label: "游戏", value: "game" },
  ];

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
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-2.5 py-2 rounded-lg transition-colors duration-300 ${activeCategory === cat.value ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="movie">
        {filteredData.length > 0 ? (
          filteredData.map((media) => (
            <div
              key={media.item.uuid}
              className="card"
              onMouseEnter={(e) => {
                const info = e.currentTarget.querySelector(
                  ".movie_details"
                ) as HTMLElement;
                if (info) info.style.bottom = "0";
              }}
              onMouseLeave={(e) => {
                const info = e.currentTarget.querySelector(
                  ".movie_details"
                ) as HTMLElement;
                if (info) info.style.bottom = "-400px";
              }}
            >
              <div className="poster">
                <Image
                  src={
                    media.item.cover_image_url.includes("http")
                      ? media.item.cover_image_url
                      : `/assets/images/neodb/cover/${media.item.cover_image_url.split("/").pop()}`
                  }
                  alt={media.item.title}
                  width={300}
                  height={150}
                />
                <div className="movie_details">
                  <h2>{media.item.title}</h2>

                  <p>评分: {media.item.rating}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>没有找到匹配的内容</p>
        )}
      </div>
    </div>
  );
}

export default MediaContents;
