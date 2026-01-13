import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";

import NavIcon from "@/components/navigations/NavIcon";
import NavIconSearch from "@/components/navigations/NavIconSearch";
import NavIconThemeToggle from "@/components/navigations/NavIconThemeToggle";
import NavLink from "@/components/navigations/NavLink";
import NavLinkDropdown from "@/components/navigations/NavLinkDropdown";
import NavLogo from "@/components/navigations/NavLogo";

import useOnScroll from "@/hooks/useOnScroll";

const clickSfx = "/assets/sounds/click.mp3";
const openSound = "/assets/sounds/open.mp3";
const closeSound = "/assets/sounds/close.mp3";

function Navbar() {
  const isScrolled = useOnScroll(0);

  const [playClickSound] = useSound(clickSfx, { preload: true });
  const [playOpenSound] = useSound(openSound, { preload: true });
  const [playCloseSound] = useSound(closeSound, { preload: true });

  const myLinks = useMemo(() => [], []);
  const moreLinks = useMemo(() => [], []);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const combinedMoreLinks = useMemo(
    () => (isSmallScreen ? [...myLinks, ...moreLinks] : moreLinks),
    [myLinks, moreLinks, isSmallScreen]
  );

  return (
    <header
      className={clsx("fixed top-0 right-0 left-0 z-[1000]", "fm:absolute")}
    >
      <div
        className={clsx(
          "fixed inset-0 h-16",
          [
            isScrolled === true && [
              "border-divider-light border-b bg-white/70 backdrop-blur",
              "dark:border-divider-dark dark:bg-slate-900/80",
            ],
          ],
          "fm:hidden"
        )}
      />
      <div className={clsx("h-2", [isScrolled === true && ["-mt-2"]])} />
      <div className={clsx("content-wrapper-max", "mx-auto max-w-[88rem]")}>
        <div
          className={clsx(
            "relative z-50 flex h-16 items-center justify-between px-2 text-sm",
            "md:px-4"
          )}
        >
          {/* 左侧 LOGO */}
          <nav className={clsx("flex items-center")} data-accent="violet">
            <NavLogo href="/" title="Home" />
          </nav>

          {/* 中间导航菜单 */}
          <div className={clsx("flex flex-grow justify-center")}>
            <ul className={clsx("flex items-center", "md:gap-1")}>
              <li>
                <NavLink
                  title="图书"
                  href="/media?category=book"
                  onClick={() => playClickSound()}
                />
              </li>
              <li>
                <NavLink
                  title="工具"
                  href="/tools"
                  onClick={() => playClickSound()}
                />
              </li>
              <li>
                <NavLink
                  title="推荐"
                  href="/recommend"
                  onClick={() => playClickSound()}
                />
              </li>
              <li>
                <NavLink
                  title="致谢"
                  href="/credits"
                  onClick={() => playClickSound()}
                />
              </li>
            </ul>
          </div>

          {/* 右侧图标 */}
          <ul className={clsx("flex items-center")}>
            <li className={clsx("hidden", "sm:block")}>
              <div
                className={clsx(
                  "ml-2 mr-4 h-3 w-[1px] bg-slate-200",
                  "dark:bg-slate-700"
                )}
              />
            </li>
            <li className={clsx("mr-2")}>
              <NavIconSearch />
            </li>
            <li className={clsx("mr-2")}>
              <NavIconThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
