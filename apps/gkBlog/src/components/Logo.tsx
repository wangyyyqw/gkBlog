import clsx from "clsx";

interface LogoProps {
  active?: boolean;
}

function Logo({ active = false }: LogoProps) {
  return (
    <div className={clsx("flex items-center gap-1.5 font-[1000] leading-none")}>
      <div
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          "sm:h-10 sm:w-10 sm:rounded-lg"
        )}
      >
        <img
          src="/assets/images/coverImage.jpg"
          alt="Logo"
          className={clsx(
            "h-full w-full object-cover rounded-xl",
            "sm:rounded-lg"
          )}
        />
      </div>
      <div className={clsx("-mt-1 hidden text-xl", "sm:block")}>
        <span className={clsx("text-accent-600", "dark:text-accent-500")}>
          蠢卷栖萤
        </span>
      </div>
    </div>
  );
}

export default Logo;
