"use client";
import clsx from "clsx";
import { usePageTheme } from "@/components/ThemeProvider";

const HomeForm = ({ username }) => {
  const pgTheme = usePageTheme();

  return (
    <div className={clsx("flex w-full justify-center", pgTheme)}>
      <div className='flex mt-16 font-semibold text-3xl'>
        Hello, {username}!
      </div>
    </div>
  );
};

export default HomeForm;
