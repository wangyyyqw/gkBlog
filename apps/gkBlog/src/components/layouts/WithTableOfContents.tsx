import clsx from "clsx";

import Sidebar from "@/components/sidebar/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import TwikooComments from "@/components/TwikooComments";

import type { TTableOfContents } from "@/types";
import type { PropsWithChildren } from "react";

interface PageWithMDXProps {
  tableOfContents: TTableOfContents;
}

function PageWithMDX({
  tableOfContents,
  children = null,
}: PropsWithChildren<PageWithMDXProps>) {
  return (
    <div
      className={clsx(
        "content-wrapper flex-shrink-0 overflow-hidden",
        "lg:overflow-visible",
      )}
    >
      <div className={clsx("flex flex-row gap-6")}>
        {/* 左侧 */}
        <div className={clsx("flex min-w-0 flex-col flex-1")}>
          {/* 上 */}
          <div className={clsx("flex flex-row")}>
            <div
              className={clsx(
                "border-divider-light hidden border-l",
                "dark:border-divider-dark lg:block",
              )}
            />

            <div
              className={clsx("mdx-contents min-w-0 flex-1 scroll-mt-[86px]")}
              id="main-contents"
              data-ss-wrapper
            >
              {children}
            </div>
          </div>
          {/* 下 */}
          <div className={clsx("mt-4")}>
            <TwikooComments />
          </div>
        </div>

      </div>
    </div>
  );
}

export default PageWithMDX;
