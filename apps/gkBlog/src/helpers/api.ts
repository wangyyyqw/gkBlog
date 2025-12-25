import { ContentType, ReactionType, ShareType } from "@prisma/client";
import axios from "axios";

import { TApiResponse } from "@/types";

export const postReaction = async ({
  slug,
  contentType,
  contentTitle,
  type,
  count,
  section,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  type: ReactionType;
  count: number;
  section: string;
}) => {
  // 在静态导出模式下，API 调用被禁用
  // console.log("API call disabled in static export mode:", {
  //   slug,
  //   contentType,
  //   contentTitle,
  //   type,
  //   count,
  //   section,
  // });
};

export const postShare = async ({
  slug,
  contentType,
  contentTitle,
  type,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  type: ShareType;
}) => {
  // 在静态导出模式下，API 调用被禁用
  // console.log("API call disabled in static export mode:", {
  //   slug,
  //   contentType,
  //   contentTitle,
  //   type,
  // });
};

export const postView = async ({
  slug,
  contentType,
  contentTitle,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
}) => {
  // 在静态导出模式下，API 调用被禁用
  // console.log("API call disabled in static export mode:", {
  //   slug,
  //   contentType,
  //   contentTitle,
  // });
};
