/* eslint-disable react/no-unknown-property */
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

interface Essay {
  id: string;
  username: string;
  time: string;
  content: string;
  avatar_url: string;
  images?: string[];
}

function EssayContents() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/data/essays.json");
        if (!response.ok) throw new Error("网络错误");
        const data: Essay[] = await response.json();

        const sortedEssays = [...data].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setEssays(sortedEssays);
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知错误");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>加载中...</p>;
  if (error) return <p>出错了: {error}</p>;

  return (
    <div className={clsx("content-wrapper mdx-contents")}>
      <div className="essays-container">
        {essays.map((essay) => (
          <div key={essay.id} className="essay">
            <div className="essays-header">
              <div className="avatar-wrapper">
                <Image
                  src={essay.avatar_url}
                  alt={`${essay.username} 的头像`}
                  width={50}
                  height={50}
                  className="avatar"
                />
              </div>
              <div>
                <h2 className="username">{essay.username}</h2>
                <p className="time">{essay.time}</p>
              </div>
            </div>
            <p className="content">{essay.content}</p>
            {essay.images && (
              <div className="images-container">
                {(Array.isArray(essay.images)
                  ? essay.images
                  : [essay.images]
                ).map((img, imgIndex) => (
                  <Zoom key={img}>
                    <div className="image-wrapper">
                      <Image
                        src={img}
                        alt={`图片 ${imgIndex + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="zoomable-image"
                      />
                    </div>
                  </Zoom>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .content-wrapper {
          padding: 20px;
        }

        .essays-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 20px;
        }
        .essay {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          padding: 20px;
          transition: transform 0.2s ease;
        }
        .essay:hover {
          transform: translateY(-5px);
        }
        .essays-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
        }
        .avatar-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          border: 1px solid #ddd;
        }
        .username {
          font-weight: bold;
          color: #333;
        }
        .time {
          color: #999;
          font-size: 0.9em;
        }
        .content {
          margin: 10px 0;
          line-height: 1.6;
          color: #555;
        }

        .images-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .image-wrapper {
          width: 120px;
          height: 120px;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .image-wrapper:hover {
          transform: scale(1.05);
        }

        .zoomable-image {
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}

export default EssayContents;
