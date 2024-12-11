"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useRightSidebar } from "@/components/RightSidebarContext";
import CommentSidebar from "./CommentSidebar";
import MusicSidebar from "./MusicSidebar";
import { useSearchParams } from "next/navigation";

const RightSidebar = ({ userId, noteId, comments, musics }) => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const queryNoteId = parseInt(searchParams.get("id"), 10);
  const previousQueryNoteId = useRef(null);
  const { rightSidebarValue, setRightSidebarValue } = useRightSidebar();

  useEffect(() => {
    if (
      rightSidebarValue === "music" &&
      previousQueryNoteId.current === queryNoteId
    )
      return;

    if (comments.length > 0) {
      console.log(comments);
      setRightSidebarValue("comment");
    } else {
      setRightSidebarValue("");
    }
    previousQueryNoteId.current = queryNoteId;
  }, [comments, queryNoteId]);

  const sideStyles = {
    backgroundColor: theme === "dark" ? "#202020" : "#F7F7F5", // 다크/라이트 배경색
    color: theme === "dark" ? "#FFFFFF" : "#1A202C", // 다크/라이트 텍스트 색
    textColor: theme === "dark" ? "#BBBBBB" : "#333333", // 다크/라이트 텍스트 색 (부가적인 색상)
  };

  return (
    rightSidebarValue && (
      <aside className='flex ml-auto w-60 border-l border-gray-300 flex-shrink-0'>
        <div className='flex flex-col items-center text-sm w-full'>
          <div className='mt-16 w-full'>
            <hr className='border-[px] border-gray-300 w-full' />
          </div>

          {rightSidebarValue === "comment" ? (
            <CommentSidebar
              sideStyles={sideStyles}
              userId={userId}
              noteId={noteId}
              comments={comments}
            />
          ) : null}

          {rightSidebarValue === "music" ? (
            <MusicSidebar
              sideStyles={sideStyles}
              userId={userId}
              noteId={noteId}
              musics={musics}
            />
          ) : null}

          <div className='flex flex-grow w-full' style={sideStyles}></div>
        </div>
      </aside>
    )
  );
};

export default RightSidebar;
