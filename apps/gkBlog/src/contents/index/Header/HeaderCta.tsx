import clsx from "clsx";
import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DocumentIcon } from "@/components/Icons";

const animation = {
  hide: {
    x: -16,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

// ButtonResume 已移除，关于我链接已移到导航栏中

function AvailableForHire() {
  return (
    <div
      className={clsx(
        "button button--ghost text-accent-500 pointer-events-none gap-2.5 px-2.5",
        "md:button--big md:px-2.5",
        "dark:text-accent-400"
      )}
    >
      <span className={clsx("relative flex h-2 w-2")}>
        <span
          className={clsx(
            "bg-accent-600 absolute -top-1 -left-1 inline-flex h-4 w-4 animate-ping rounded-full opacity-75",
            "dark:bg-accent-300"
          )}
        />
        <span
          className={clsx(
            "bg-accent-500 relative inline-flex h-2 w-2 rounded-full",
            "dark:bg-accent-400"
          )}
        />
      </span>
      当前在线
    </div>
  );
}

interface HeaderCtaProps {
  isFree?: boolean;
  isFreeAnimationDuration?: number;
}

function HeaderCta({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFree = true,
  isFreeAnimationDuration = 4,
}: HeaderCtaProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [isAvailableVisible, setIsAvailableVisible] = useState(true);

  useEffect(() => {
    setIsAvailableVisible(hovered);
  }, [hovered]);

  let isFreeVariants = {
    hide: {
      x: 0,
      opacity: 1,
    },
    show: {
      x: -48,
      opacity: 0,
    },
  };

  if (shouldReduceMotion) {
    isFreeVariants = {
      hide: {
        x: 0,
        opacity: 1,
      },
      show: {
        x: 0,
        opacity: 0,
      },
    };
  }

  return (
    <m.div className={clsx("flex gap-2")} initial="hide" animate="show">
      {isAvailableVisible ? (
        <m.div
          variants={animation}
          transition={{ delay: 2.8 }}
          className={clsx("relative z-10")}
        >
          <m.div
            variants={isFreeVariants}
            transition={{
              delay: isFreeAnimationDuration + 1.5,
              duration: 0.4,
            }}
          >
            <AvailableForHire />
          </m.div>
          {/* 关于我按钮已移至导航栏 */}
        </m.div>
      ) : (
        <>{/* 关于我按钮已移至导航栏 */}</>
      )}
    </m.div>
  );
}

export default HeaderCta;
