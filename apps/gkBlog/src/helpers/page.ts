import { getBaseUrl, getParams } from "@/helpers/url";

import type { TPageOgImage } from "@/types";

export const getPageOgImageUrl = ({
  caption,
  title,
  description,
}: TPageOgImage) => ({
  // 在静态导出模式下，返回默认图片或空字符串
  default: "/default-og-image.png", // 替换为默认的 OG 图片路径
});
