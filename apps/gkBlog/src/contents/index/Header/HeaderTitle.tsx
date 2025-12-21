import clsx from "clsx";
import { m, useAnimationControls } from "framer-motion";
import Image from "next/image";

const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTitle() {
  const controls = useAnimationControls();

  return (
    <div>
      <m.div
        className={clsx(
          "mb-1 flex items-center gap-1 text-2xl text-slate-600",
          "md:mb-0 md:gap-2 md:text-4xl",
          "dark:text-slate-400"
        )}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        这里是蠢卷栖萤的世界
      </m.div>
      <span className={clsx("text-slate-700", "dark:text-slate-300")}>
        <m.span
          className={clsx(
            "mb-4 block text-[2.5rem] font-[1000] leading-none",
            "md:mb-6 md:text-7xl"
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.2 }}
        >
          <strong className={clsx("text-accent-600", "dark:text-accent-500")}>
            蠢卷栖萤
          </strong>
        </m.span>
        <m.h1
          className={clsx(
            "block text-base text-slate-600",
            "md:text-xl",
            "dark:text-slate-400"
          )}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.3 }}
        >
          <span className={clsx("block")}>向内挖掘，向外建造。</span>
        </m.h1>
      </span>
    </div>
  );
}

export default HeaderTitle;
