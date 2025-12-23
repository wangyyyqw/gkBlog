import clsx from "clsx";

import { CheckCircleIcon, XCircleIcon } from "@/components/Icons";

import { formatDate } from "@/helpers/post";

import type { PropsWithChildren, ReactElement, ReactNode } from "react";

export function Do({ children = null }: PropsWithChildren) {
  return (
    <div className={clsx("mdx-do", "md:min-w-0 md:flex-1")}>
      <div
        className={clsx(
          "relative flex items-start gap-2 pb-2 text-sm font-semibold text-slate-700",
          "dark:text-slate-300"
        )}
      >
        <div className={clsx("")}>
          <CheckCircleIcon
            className={clsx("h-5 w-5 text-green-600", "dark:text-green-300")}
          />
          <div
            className={clsx(
              "absolute left-2.5 h-full w-[1px] bg-green-400 opacity-50",
              "dark:bg-green-900"
            )}
          />
        </div>
        正确
      </div>
      <div className={clsx("")}>{children}</div>
    </div>
  );
}

export function Dont({ children = null }: PropsWithChildren) {
  return (
    <div className={clsx("mdx-dont", "md:min-w-0 md:flex-1")}>
      <div
        className={clsx(
          "relative flex items-start gap-2 pb-2 text-sm font-semibold text-slate-700",
          "dark:text-slate-300"
        )}
      >
        <div className={clsx("")}>
          <XCircleIcon
            className={clsx("h-5 w-5 text-red-600", "dark:text-red-300")}
          />
          <div
            className={clsx(
              "absolute left-2.5 h-full w-[1px] bg-red-400 opacity-50",
              "dark:bg-red-900"
            )}
          />
        </div>
        错误
      </div>
      <div className={clsx("")}>{children}</div>
    </div>
  );
}

export function DnD({ children = null }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "border-divider-light mdx-dnd flex flex-col gap-6 rounded-xl",
        "lg:flex-row",
        "dark:border-divider-dark"
      )}
    >
      {children}
    </div>
  );
}

export function ItemTags({ children = null }: PropsWithChildren) {
  return <div className={clsx("-mt-1 mb-4 flex gap-2")}>{children}</div>;
}

export function ItemTag({ children = null }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "bg-accent-600/[0.08] text-accent-600 inline-flex h-6 items-center gap-1 rounded-full px-2 text-[13px] font-medium",
        "dark:text-accent-400 dark:dark:bg-accent-400/10 dark:font-normal"
      )}
    >
      #{children}
    </div>
  );
}

export function Item({ children = null }: PropsWithChildren) {
  return (
    <article className={clsx("", "md:pb-16")}>
      <div className={clsx("-mt-12")}>{children}</div>
    </article>
  );
}

interface ItemsProps {
  date: string;
  children?: ReactElement<typeof Item> | ReactElement<typeof Item>[];
}

interface TimelineProps {
  children:
    | ReactElement<{ date: string; children: ReactNode }>
    | ReactElement<{ date: string; children: ReactNode }>[];
}

export function Timeline({ children }: PropsWithChildren<TimelineProps>) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={clsx("w-full max-w-6xl mx-auto py-4")}>
      {/* 移动端简单堆叠布局 */}
      <div className="md:hidden space-y-6">
        {items.map((item, globalIndex) => {
          const { date, children: itemChildren } = (
            item as ReactElement<{ date: string; children: ReactNode }>
          ).props;

          const childKey = item.key || `item-${globalIndex}`;

          return (
            <div key={childKey} className="relative py-2">
              <div className="text-center mb-3">
                <time
                  className={clsx(
                    "font-mono font-bold text-slate-700 dark:text-slate-300"
                  )}
                  dateTime={date}
                >
                  {formatDate(date)}
                </time>
              </div>
              <div>{itemChildren}</div>
            </div>
          );
        })}
      </div>

      {/* 桌面端时间轴布局 */}
      <div className="hidden md:block relative">
        {/* 中间时间轴 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform -translate-x-1/2" />

        <div className="relative">
          {/* 日期和内容交替显示 */}
          <div className="space-y-6">
            {items.map((item, globalIndex) => {
              const { date, children: itemChildren } = (
                item as ReactElement<{ date: string; children: ReactNode }>
              ).props;

              const childKey = item.key || `item-${globalIndex}`;

              return (
                <div key={childKey} className="relative md:py-2">
                  <div className="text-center mb-3">
                    <time
                      className={clsx(
                        "font-mono font-bold text-slate-700 dark:text-slate-300"
                      )}
                      dateTime={date}
                    >
                      {formatDate(date)}
                    </time>
                  </div>

                  {/* 桌面端分列布局 - 显示时间轴和左右交替的内容 */}
                  <div
                    className={clsx(
                      "flex items-start relative",
                      globalIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    )}
                  >
                    <div className="w-5/12 px-2">{itemChildren}</div>
                    {/* 时间轴点 */}
                    <div className="relative z-10 flex-shrink-0 w-2/12 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-accent-500 border-4 border-white dark:border-slate-900 z-10" />
                      <div
                        className="absolute h-full w-0.5 bg-slate-200 dark:bg-slate-700 transform -translate-x-1/2"
                        style={{ left: "50%" }}
                      />
                    </div>
                    <div className="w-5/12 px-2">{/* 空div用于占位 */}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Items({
  date,
  children = null,
}: PropsWithChildren<ItemsProps>) {
  // 这个组件现在主要作为数据容器，不直接渲染
  return <div className="hidden">{children}</div>;
}

export default {
  Items,
  Item,
  ItemTags,
  ItemTag,
  DnD,
  Do,
  Dont,
  Timeline,
};
