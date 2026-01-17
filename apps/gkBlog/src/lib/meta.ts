/* eslint-disable no-template-curly-in-string */
import jsonata from "jsonata";

import dayjs from "@/utils/dayjs";

import type { TContentActivity, TContentMeta, TReaction } from "@/types";
import type { ContentType, ReactionType, ShareType } from "@prisma/client";

// For Cloudflare Pages static export, we need to replace database operations
// with build-time generated data or API calls

// Mock data for static export
const mockContentMeta = {
  views: 0,
  shares: 0,
};

const mockReactions = {
  CLAPPING: 0,
  THINKING: 0,
  AMAZED: 0,
};

export const getAllContentMeta = async (): Promise<
  Record<string, TContentMeta>
> =>
  // In static export mode, return empty object or pre-generated data
  ({});

export const getContentMeta = async (
  slug: string,
): Promise<{ shares: number; views: number }> =>
  // In static export mode, return mock data
  ({
    shares: 0,
    views: 0,
  });

export const getContentActivity = async (): Promise<TContentActivity[]> =>
  // In static export mode, return empty array
  [];

export const getNewPosts = async (): Promise<
  {
    slug: string;
    title: string;
    createdAt: Date;
  }[]
> => []; // In static export mode, return empty array

export const getReactions = async (slug: string): Promise<TReaction> =>
  mockReactions; // In static export mode, return mock reactions

export const getSectionMeta = async (
  slug: string,
): Promise<
  Record<
    string,
    {
      reactionsDetail: TReaction;
    }
  >
> => ({}); // In static export mode, return empty object

export const getReactionsBy = async (
  _slug: string,
  _sessionId: string,
): Promise<TReaction> => mockReactions; // In static export mode, return mock reactions

export const setReaction = async (_: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  count: number;
  section: string;
  sessionId: string;
  type: ReactionType;
}) =>
  // In static export mode, this would be a no-op or API call
  // console.warn("Database operations are not supported in static export mode");
  null;

export const getSharesBy = async (
  _slug: string,
  _sessionId: string,
): Promise<number> => 0; // In static export mode, return 0

export const setShare = async ({
  slug: _slug,
  contentType: _contentType,
  contentTitle: _contentTitle,
  type: _type,
  sessionId: _sessionId,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  type: ShareType;
  sessionId: string;
}) =>
  // In static export mode, this would be a no-op or API call
  // console.warn("Database operations are not supported in static export mode");
  null;

export const getViewsBy = async (
  _slug: string,
  _sessionId: string,
): Promise<number> => 0; // In static export mode, return 0

export const setView = async (_: {
  _slug: string;
  _contentType: ContentType;
  _contentTitle: string;
  _sessionId: string;
}) =>
  // In static export mode, this would be a no-op or API call
  // console.warn("Database operations are not supported in static export mode");
  null;
