import clsx from "clsx";
import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

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

interface HeaderCtaProps {
  isFree?: boolean;
  isFreeAnimationDuration?: number;
}

function HeaderCta({
  isFree = true,
  isFreeAnimationDuration = 4,
}: HeaderCtaProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isAvailableVisible, setIsAvailableVisible] = useState(true);

  useEffect(() => {
    setIsAvailableVisible(true);
  }, []);

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
          {/* AvailableForHire组件已移除 */}
          {/* 关于我按钮已移至导航栏 */}
        </m.div>
      ) : (
        <div>{/* 关于我按钮已移至导航栏 */}</div>
      )}
    </m.div>
  );
}

export default HeaderCta;
