/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useMemo } from "react";

import { BarChart } from "@/components/stats/BarChart";
import Heatmap from "@/components/stats/Heatmap";
import PieChart from "@/components/stats/PieChart";
import TagCloud from "@/components/stats/TagCloud";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}m`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

export interface Stats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  totalWordCount: number;
  posts: Array<{
    date: string;
    title: string;
    wordCount: number;
  }>;
  categories: string[];
  tags: string[];
  postsByCategory: Array<{ category: string; count: number }>;
  postsByYear: Array<{ year: string; count: number }>;
}

interface StatsContentsProps {
  initialStats: Stats;
}

function StatsContents({ initialStats }: StatsContentsProps) {
  const yearProgress = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    return (
      ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
      100
    ).toFixed(2);
  }, []);

  const runningTime = useMemo(() => {
    const startDate = new Date("2020-09-27");
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }, []);

  return (
    <div className={clsx("content-wrapper mdx-contents")}>
      {/* 发文统计 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">发文统计</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6">
          {/* 左侧热力图 */}
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
            <div className="w-fit">
              <Heatmap data={initialStats.posts} />
            </div>
          </div>

          {/* 右侧基础统计数据 */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">文章数</h3>
                  <p className="text-xl font-bold ml-8">
                    {formatNumber(initialStats.totalPosts)}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">分类数</h3>
                  <p className="text-xl font-bold ml-8">
                    {formatNumber(initialStats.totalCategories)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">标签数</h3>
                  <p className="text-xl font-bold ml-8">
                    {formatNumber(initialStats.totalTags)}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">总字数</h3>
                  <p className="text-xl font-bold ml-8">
                    {formatNumber(initialStats.totalWordCount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 状态和分类统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 博客状态 */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">博客状态</h2>
          <div className="blog_status space-y-2">
            <ul>
              <li>年度进度 {yearProgress}%</li>
              <li>
                博客已运行 {runningTime.years} 年 {runningTime.months} 个月
                {runningTime.days} 天
              </li>
              <li>文章总数：{initialStats.totalPosts} 篇</li>
              <li>分类总数：{initialStats.totalCategories} 个</li>
              <li>标签总数：{initialStats.totalTags} 个</li>
              <li>总字数：{initialStats.totalWordCount} 字</li>
            </ul>

            {/* 状态徽章 */}
            <div className="badge status flex flex-wrap gap-2 mt-4">
              <img
                alt="License"
                src="https://img.shields.io/badge/License-MIT-green"
                className="h-5"
              />
              <img
                alt="WebSite"
                src="https://img.shields.io/website?style=flat-square&url=https%3A%2F%2Fwww.qladgk.com"
                className="h-5"
              />
              <img
                alt="Production"
                src="https://img.shields.io/github/deployments/qlAD/gkBlog/production?label=production&style=flat-square"
                className="h-5"
              />
              <img
                alt="commit"
                src="https://img.shields.io/github/commit-activity/m/qlAD/gkBlog?style=flat-square"
                className="h-5"
              />
              <img
                alt="lase-commit"
                className="h-5"
                src="https://img.shields.io/github/last-commit/qlAD/gkBlog?style=flat-square"
              />

              <img
                alt="tag"
                src="https://img.shields.io/github/v/tag/qlad/gkBlog?style=flat-square"
                className="h-5"
              />
              <img
                alt="repo-size"
                src="https://img.shields.io/github/repo-size/qlad/gkBlog?style=flat-square"
                className="h-5"
              />
            </div>
          </div>
        </div>

        {/* 分类统计 */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">分类统计</h2>
          <PieChart data={initialStats.postsByCategory} />
        </div>
      </div>

      {/* 年份统计 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">年份统计</h2>
        <BarChart data={initialStats.postsByYear} />
      </div>

      {/* 标签云 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">标签云</h2>
        <TagCloud tags={initialStats.tags} />
      </div>
    </div>
  );
}

export default StatsContents;
