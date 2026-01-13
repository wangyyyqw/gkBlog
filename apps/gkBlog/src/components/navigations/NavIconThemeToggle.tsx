import clsx from "clsx";
import { DarkIcon, LightIcon } from "@/components/Icons";
import useTheme from "@/hooks/useTheme";

import useSound from "use-sound";

const lightoff = "/assets/sounds/lightoff.mp3";
const lighton = "/assets/sounds/lighton.mp3";

function NavIconThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [playLightOff] = useSound(lightoff, { preload: true });
  const [playLightOn] = useSound(lighton, { preload: true });

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // 播放声音
    if (newTheme === "dark") {
      playLightOff();
    } else {
      playLightOn();
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        "ml-1 flex h-9 w-9 items-center justify-center gap-2 rounded-xl bg-slate-300/50 text-slate-800",
        "xl:w-auto xl:px-3",
        "hover:bg-slate-300/70 sm:ml-0",
        "dark:bg-slate-800/50 dark:text-slate-100 dark:hover:bg-slate-700/50",
      )}
      aria-label={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
      title={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
      onClick={handleThemeChange}
    >
      {theme === "dark" ? (
        <LightIcon className={clsx("h-5 w-5")} />
      ) : (
        <DarkIcon className={clsx("h-5 w-5")} />
      )}
      <div
        className={clsx(
          "hidden items-center gap-2 text-xs font-bold",
          "xl:flex",
          "dark:font-normal",
        )}
      >
        {theme === "dark" ? "亮色" : "暗色"}
      </div>
    </button>
  );
}

export default NavIconThemeToggle;
