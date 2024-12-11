"use client";
import clsx from "clsx";
import { usePageTheme } from "@/components/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import FontSelector from "./FontSelector";
import { useSession } from "next-auth/react";
import BackButton from "./BackButton";

const ConfigForm = ({}) => {
  const pgTheme = usePageTheme();
  const { data: session } = useSession();

  return (
    <div
      className={clsx(
        "flex flex-col w-full items-center justify-center min-h-screen",
        pgTheme
      )}
    >
      {!session ? <BackButton /> : null}
      <ThemeToggleButton />
      <FontSelector />
    </div>
  );
};

export default ConfigForm;
