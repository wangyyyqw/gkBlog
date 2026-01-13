import clsx from "clsx";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { CodeIcon, HeartIcon, SparklesIcon } from "@/components/Icons";
import Toast from "@/components/Toast";

import FeaturedCard from "@/contents/index/FeaturedCard";
import Header from "@/contents/index/Header";

const privacyToast = {
  title: "隐私协议助手",
  message: (
    <>
      查看本站为你的个人隐私做出的努力。
      <a
        href="/privacy-policy/"
        className="text-blue-500 underline"
        rel="noopener noreferrer"
      >
        查看隐私政策
      </a>
    </>
  ),
};

function FeaturedCardSection() {
  return (
    <div className={clsx("content-wrapper")}>
      <div className={clsx("flex flex-col gap-4", "lg:flex-row lg:gap-8")} />
    </div>
  );
}

function IndexContents() {
  const toastRef = useRef(null);



  return (
    <>
      <Header />
      <div className={clsx("hidden", "lg:-mt-16 lg:mb-24 lg:block")}>
        <FeaturedCardSection />
      </div>
    </>
  );
}

export default IndexContents;
