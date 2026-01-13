import clsx from "clsx";
import { useRouter } from "next/router";
import useSound from "use-sound";

import { SearchIcon } from "@/components/Icons";

const clickSfx = "/assets/sounds/click.mp3";

function NavIconSearch() {
  const router = useRouter();
  const [playClickSound] = useSound(clickSfx, { preload: true });

  const handleSearchClick = () => {
    // 导航到媒体页面，这里已经有搜索功能
    router.push("/media?category=book");
    playClickSound();
  };

  return (
    <button
      type="button"
      className={clsx(
        "ml-1 flex h-9 w-9 items-center justify-center gap-2 rounded-xl bg-slate-300/50 text-slate-800",
        "xl:w-auto xl:px-3",
        "hover:bg-slate-300/70 sm:ml-0",
        "dark:bg-slate-800/50 dark:text-slate-100 dark:hover:bg-slate-700/50"
      )}
      aria-label="搜索图书"
      title="搜索图书"
      onClick={handleSearchClick}
    >
      <SearchIcon className={clsx("h-5 w-5")} />
      <div
        className={clsx(
          "hidden items-center gap-2 text-xs font-bold",
          "xl:flex",
          "dark:font-normal"
        )}
      >
        搜索
      </div>
    </button>
  );
}

export default NavIconSearch;
