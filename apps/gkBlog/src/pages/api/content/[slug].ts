import { z } from "zod";

import { getSessionId } from "@/helpers/server";
import {
  getContentMeta,
  getReactions,
  getReactionsBy,
  getSectionMeta,
} from "@/lib/meta";

import type { TApiResponse, TContentMetaDetail } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TContentMetaDetail | TApiResponse>,
) {
  const slug = z.string().parse(req.query.slug);
  const sessionId = getSessionId(req);

  try {
    if (req.method === "GET") {
      const meta = await getContentMeta(slug);
      const metaSection = await getSectionMeta(slug);
      const reactionsDetail = await getReactions(slug);
      const reactionsDetailUser = await getReactionsBy(slug, sessionId);

      const reactionsSum =
        reactionsDetail.AMAZED +
        reactionsDetail.CLAPPING +
        reactionsDetail.THINKING;

      res.status(200).json({
        meta: {
          shares: meta.shares,
          views: meta.views,
          reactions: reactionsSum,
          reactionsDetail,
        },
        metaUser: {
          reactionsDetail: reactionsDetailUser,
        },
        metaSection,
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[API /api/content/[slug]] Error:", err);
    // 返回默认值作为降级方案
    res.status(200).json({
      meta: {
        shares: 0,
        views: 0,
        reactions: 0,
        reactionsDetail: { AMAZED: 0, CLAPPING: 0, THINKING: 0 },
      },
      metaUser: {
        reactionsDetail: { AMAZED: 0, CLAPPING: 0, THINKING: 0 },
      },
      metaSection: {},
    });
  }
}
