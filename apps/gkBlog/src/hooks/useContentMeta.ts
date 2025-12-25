// import useSWR from "swr";
// import fetcher from "@/utils/fetcher";

import type { TContentMeta } from "@/types";

export default function useContentMeta() {
  // 在静态导出模式下，API 调用被禁用，直接返回静态数据
  const data: Record<string, TContentMeta> = {};
  const isError = null;
  const isLoading = false;

  return {
    isLoading,
    isError,
    data,
  };
}
