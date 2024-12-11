"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import CommentButton from "./CommentButton";
import MusicButton from "./MusicButton";
import ConfigButton from "./ConfigButton";
import { usePageTheme } from "@/components/ThemeProvider";
import LogoutButton from "./LogoutButton";

const Menubar = () => {
  const path = usePathname();
  const pgTheme = usePageTheme();

  return (
    <div className={clsx("absolute top-5 right-6", pgTheme)}>
      {path === "/note" ? <MusicButton /> : null}
      {path === "/note" ? <CommentButton /> : null}
      <LogoutButton />
      <ConfigButton />
    </div>
  );
};

export default Menubar;
