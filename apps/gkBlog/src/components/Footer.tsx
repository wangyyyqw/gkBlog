import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import {
  ExternalLink,
  GitHubIcon,
  QQIcon,
  TelegramIcon,
} from "@/components/Icons";

import dayjs from "@/utils/dayjs";

interface FooterLinkProps {
  title: string;
  href: string;
  label?: "new" | "soon";
  isInternal?: boolean;
}

function FooterLink({
  title,
  href,
  label = undefined,
  isInternal = true,
}: FooterLinkProps) {
  if (label === "soon") {
    return (
      <span
        className={clsx(
          "footer-link footer-link--soon",
          "w-full justify-center",
          "sm:justify-start"
        )}
      >
        {title}
        <span className={clsx("footer-link__label")}>{label}</span>
      </span>
    );
  }

  if (isInternal) {
    return (
      <Link
        href={href}
        className={clsx(
          "footer-link",
          "w-full justify-center",
          "sm:justify-start"
        )}
      >
        {title}
        {label && <span className={clsx("footer-link__label")}>{label}</span>}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer nofollow"
      className={clsx(
        "footer-link",
        "w-full justify-center",
        "sm:justify-start"
      )}
    >
      {title}
      <ExternalLink className={clsx("h-3.5 w-3.5")} />
      {label && <span className={clsx("footer-link__label")}>{label}</span>}
    </a>
  );
}

interface FooterGroupProps {
  title: string;
  links: Array<FooterLinkProps>;
}

function FooterGroup({ title, links }: FooterGroupProps) {
  return (
    <div className={clsx("flex-1 w-full", "sm:w-auto")}>
      <div
        className={clsx(
          "mb-2 px-2 text-[13px] text-slate-600 text-center",
          "dark:text-slate-400",
          "sm:text-left"
        )}
      >
        {title}
      </div>
      <ul className={clsx("flex flex-col", "sm:items-start")}>
        {links.map(({ title: linkTitle, href, label, isInternal }) => (
          <li key={href} className={clsx("w-full", "sm:w-auto")}>
            <FooterLink
              title={linkTitle}
              href={href}
              label={label}
              isInternal={isInternal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterDescription() {
  return (
    <div className={clsx("max-w-[348px] w-full flex flex-col items-center")}>
      <ul
        className={clsx("-ml-2 flex gap-2 justify-center w-full", "sm:gap-1")}
      >
        <li>
          <a
            href="https://qm.qq.com/q/OVjoDKhDyI"
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx(
              "flex h-9 w-9 items-center justify-center",
              "md:h-10 md:w-10"
            )}
            aria-label="加入QQ群：照空山"
            title="加入QQ群：照空山"
          >
            <QQIcon className={clsx("h-5 w-5", "md:h-6 md:w-6")} />
          </a>
        </li>
        <li>
          <a
            href="https://t.me/chunjuanqiying"
            target="_blank"
            rel="noreferrer nofollow"
            className={clsx(
              "flex h-9 w-9 items-center justify-center",
              "md:h-10 md:w-10"
            )}
            aria-label="My Telegram group"
            title="My Telegram group"
          >
            <TelegramIcon className={clsx("h-5 w-5", "md:h-6 md:w-6")} />
          </a>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className={clsx(
        "background-grid background-grid--fade-in border-divider-light mt-2 pt-4 text-sm text-slate-900",
        "dark:border-divider-dark dark:text-slate-200"
      )}
    >
      <div className={clsx("content-wrapper")}>
        <div className={clsx("py-2 font-semibold")}>
          <div className={clsx("flex flex-col-reverse gap-2", "lg:flex-row")}>
            <div className={clsx("flex-1 flex justify-center")}>
              <FooterDescription />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "border-divider-light flex flex-col items-center justify-center border-t py-3 text-xs gap-1",
            "dark:border-divider-dark",
            "sm:flex-row sm:gap-4"
          )}
        >
          <div className={clsx("font-semibold text-center")}>
            &copy; 2025-{new Date().getFullYear()}, 蠢卷栖萤
          </div>
          <div
            className={clsx(
              "text-slate-500 text-center text-[10px] leading-relaxed",
              "dark:text-slate-400",
              "sm:text-xs"
            )}
          />
          <div
            className={clsx(
              "text-slate-500 text-center text-[10px] leading-relaxed",
              "dark:text-slate-400",
              "sm:text-xs"
            )}
          >
            向内挖掘，向外建造。
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
