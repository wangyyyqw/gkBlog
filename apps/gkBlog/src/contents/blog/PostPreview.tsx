import clsx from "clsx";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import CountUp from "@/components/CountUp";
import { ChevronRightIcon, InsightIcon, PinIcon } from "@/components/Icons";

import { formatDateRelative, formatLang } from "@/helpers/post";

import type { TPostFrontMatter } from "@/types";

type PostPreviewProps = TPostFrontMatter & {
  slug: string;
  views: number;
  shares: number;
  pinned?: boolean;
  cover?: string;
};

function PostPreview({
  title,
  description,
  date,
  slug,
  lang,
  views,
  shares,
  pinned = false,
  cover = "",
}: PostPreviewProps) {
  return (
    <article lang={lang}>
      <Link
        key={slug}
        href={`/blog/${slug}`}
        className={clsx(
          "group relative mb-6 block overflow-hidden bg-gradient-to-t rounded-r-2xl",
          "sm:mb-0",
          pinned
            ? [
                "border-divider-light",
                "sm:border sm:p-4 md:p-6",
                "dark:border-divider-dark",
              ]
            : ["sm:p-4 md:p-6"]
        )}
      >
        {/* shine effect */}
        {pinned && (
          <m.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0, 0] }}
            transition={{
              delay: 1.4,
              duration: 1.84,
              ease: [0.85, 0, 0.15, 1],
            }}
            className="absolute -inset-x-64 inset-y-0 z-[-1]"
          >
            <div
              className={clsx(
                "absolute inset-y-0 w-10 -rotate-45 scale-[4] bg-black opacity-[0.08]",
                "dark:bg-white dark:opacity-[0.14]"
              )}
            />
          </m.div>
        )}

        <div className="absolute inset-y-0 right-0 w-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-1/3">
          <div className="relative h-full w-full">
            <div className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-white to-transparent dark:from-slate-900 dark:to-transparent" />
            <Image
              src={cover || "/assets/images/coverImage.png"}
              alt={title}
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>

        {pinned && (
          <div
            className={clsx(
              "relative mb-4 flex items-center gap-2 font-semibold text-slate-500",
              "sm:text-slate-500",
              "dark:sm:text-accent-400 dark:text-slate-400"
            )}
          >
            <PinIcon className={clsx("h-5 w-5")} />
            置顶文章
          </div>
        )}
        <div
          className={clsx(
            "text-slate mb-2 flex flex-col gap-2 text-xs text-slate-500",
            "dark:text-slate-400 md:mb-1"
          )}
        >
          <div className={clsx("flex gap-1")}>
            <time dateTime={date} className={clsx("first-letter:uppercase")}>
              {formatDateRelative(date)}
            </time>
            <span>&middot;</span>
            <span>{formatLang(lang)}</span>
          </div>
        </div>
        <div className={clsx("mb-2")}>
          <h2
            className={clsx(
              "block leading-relaxed",
              "text-xl font-extrabold text-slate-700",
              "md:text-2xl",
              "dark:text-slate-300",
              "transition-all duration-500 ease-in-out w-full group-hover:w-2/3 group-hover:pr-4",
              "line-clamp-1"
            )}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h2>
        </div>

        <div className="mb-3 h-[calc(1.5em*2)] overflow-hidden">
          <p
            className={clsx(
              "block leading-relaxed text-slate-600",
              "dark:text-slate-400",
              "group-hover:text-slate-700 dark:group-hover:text-slate-300",
              "transition-all duration-500 ease-in-out w-full group-hover:w-2/3 group-hover:pr-4",
              "line-clamp-2"
            )}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        </div>

        <div
          className={clsx(
            "flex items-center gap-2 text-xs text-slate-600",
            "dark:text-slate-400",
            "transition-all duration-500 ease-in-out w-full group-hover:w-2/3",
            pinned ? ["mb-4", "sm:mb-1"] : "mb-4"
          )}
        >
          <InsightIcon className={clsx("-mt-0.5 h-4 w-4")} />
          <span className={clsx("flex gap-1.5")}>
            <span
              className={clsx("flex items-center gap-1.5")}
              title="Number of view(s)"
            >
              <CountUp from={0} to={views} /> 看过
            </span>
            <span>&middot;</span>
            <span
              className={clsx("flex items-center gap-1.5")}
              title="Number of share(s)"
            >
              <CountUp from={0} to={shares} /> 分享
            </span>
          </span>
        </div>
        <div
          className={clsx(
            "text-accent-600 items-center gap-1 text-sm font-semibold",
            "dark:text-accent-400",
            "transition-all duration-500 ease-in-out group-hover:w-2/3",
            pinned ? ["flex", "sm:hidden"] : "flex"
          )}
        >
          阅读更多{" "}
          <ChevronRightIcon className="group-hover:animate-bounce-x mt-1 h-3 w-3 transition" />
        </div>
      </Link>
    </article>
  );
}

export default PostPreview;
