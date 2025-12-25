// 在静态导出模式下禁用 API 调用
const fetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined // 返回空数据或默认值
) => ({});

export default fetcher;
