#!/bin/bash

# 配置参数
RSS_PATH="https://gkblog.vercel.app/rss.xml"
MAX_URLS=10 # 限制只提交最新的 10 个URL

# 检查 API 环境变量
if [ -z "$BAIDU_API_URL" ]; then
    echo "错误: 未设置 BAIDU_API_URL 环境变量"
    exit 1
fi

# 下载 RSS
echo "正在从 $RSS_PATH 下载 RSS..."
if ! curl -s "$RSS_PATH" -o rss_temp.xml; then
    echo "错误: 下载 RSS 失败"
    exit 1
fi

# 提取 URL
echo "正在提取最新的 $MAX_URLS 个URL..."
grep -oP '(?<=<link>)https://[^<]+(?=</link>)' rss_temp.xml | grep -v '^https://www.qladgk.com$' | head -n $MAX_URLS >urls.txt

# 检查提取的 URL
URL_COUNT=$(wc -l <urls.txt)
if [ $URL_COUNT -eq 0 ]; then
    echo "错误: 未能提取到 URL，检查 RSS 格式"
    cat rss_temp.xml
    exit 1
fi

echo "提取的 URL 预览:"
cat urls.txt

# 提交 URL
echo "正在提交 URL..."
response=$(curl -s -H 'Content-Type:text/plain' --data-binary @urls.txt "$BAIDU_API_URL")
echo "百度返回: $response"

# 清理临时文件
rm rss_temp.xml urls.txt

echo "提交完成!"
