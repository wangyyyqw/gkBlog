import clsx from "clsx";

import { formatDate } from "@/helpers/post";

import type { PropsWithChildren, ReactElement } from "react";

interface User {
  name: string;
  avatar?: string;
}

interface MomentHeaderProps {
  user: User;
  date: string;
}

function MomentHeader({ user, date }: MomentHeaderProps) {
  const hasAvatar = Boolean(user.avatar);

  return (
    <div className={clsx("flex items-center justify-between mb-4")}>
      <div className={clsx("flex items-center")}>
        <div
          className={clsx(
            hasAvatar
              ? "mr-3"
              : "w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden mr-3"
          )}
        >
          {hasAvatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className={clsx("w-10 h-10 rounded-full object-cover")}
            />
          ) : (
            <span
              className={clsx("text-slate-500 dark:text-slate-400 font-medium")}
            >
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <div
            className={clsx("font-medium text-slate-900 dark:text-slate-100")}
          >
            {user.name}
          </div>
        </div>
      </div>
      <div className={clsx("text-sm text-slate-500 dark:text-slate-400")}>
        <time dateTime={date}>{formatDate(date)}</time>
      </div>
    </div>
  );
}

export function MomentTags({ children = null }: PropsWithChildren) {
  return <div className={clsx("-mt-1 mb-4 flex gap-2")}>{children}</div>;
}

export function MomentTag({ children = null }: PropsWithChildren) {
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

interface MomentProps {
  user?: User;
  date?: string;
  children?: ReactElement | ReactElement[];
}

export function Moment({
  user = undefined,
  date = undefined,
  children = null,
}: MomentProps) {
  return (
    <article
      className={clsx(
        "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6",
        "border border-slate-200 dark:border-slate-700"
      )}
    >
      {user && date && <MomentHeader user={user} date={date} />}
      <div className={clsx("")}>{children}</div>
    </article>
  );
}

interface MomentsProps {
  date: string;
  children?: ReactElement<typeof Moment> | ReactElement<typeof Moment>[];
}

export function Moments({
  date,
  children = null,
}: PropsWithChildren<MomentsProps>) {
  return (
    <div className={clsx("mb-8")}>
      <div className={clsx("flex items-center mb-4")}>
        <div
          className={clsx(
            "font-mono text-sm font-bold text-slate-500 dark:text-slate-400"
          )}
        >
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <div
          className={clsx("flex-1 ml-4 h-px bg-slate-200 dark:bg-slate-700")}
        />
      </div>
      <div className={clsx("space-y-6")}>{children}</div>
    </div>
  );
}

export default {
  Moments,
  Moment,
  MomentTags,
  MomentTag,
};
