"use client";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { updateContent, updateTitle } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import RightSidebar from "@/components/ui/RightSidebar";
import { useTheme, usePageTheme } from "@/components/ThemeProvider";

const NoteForm = ({ currentNote, userId, noteId, comments, musics }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightWord = searchParams.get("word");

  const [title, setTitle] = useState(currentNote.title);
  const [content, setContent] = useState(currentNote.contents[0].value);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const { theme } = useTheme();
  const pgTheme = usePageTheme();

  useEffect(() => {
    setTitle(currentNote.title);
    setContent(currentNote.contents[0].value);
  }, [currentNote]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateTitle(currentNote.id, newTitle);
    router.refresh();
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateContent(currentNote.id, newContent);
  };

  // 하이라이트 처리 로직
  const highlightedText = highlightWord
    ? content.replace(
        new RegExp(`(${highlightWord})`, "gi"),
        `<span style="
        background-color: yellow;
        color: transparent;
      ">$1</span>`
      )
    : content;

  return (
    <div className={clsx("flex justify-between min-h-screen w-full", pgTheme)}>
      <div className='flex justify-center flex-grow p-4 w-full'>
        <div className='w-full min-w-2xl max-w-6xl md:w-3/4 p-8'>
          <div>
            {/* 제목 필드 */}
            <input
              className={clsx(
                "text-2xl font-bold my-6 resize-none outline-none w-full",
                isTitleFocused ? "border-2 border-blue-300" : "",
                theme === "dark" ? "bg-sbb-400" : null
              )}
              value={title}
              onChange={handleTitleChange}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={() => setIsTitleFocused(false)}
              placeholder='Enter title'
            />
            <div className='relative'>
              {/* 하이라이트용 백그라운드 레이어 */}
              <div
                className='absolute top-0 left-0 w-full h-full pointer-events-none whitespace-pre-wrap p-4'
                dangerouslySetInnerHTML={{ __html: highlightedText }}
                style={{
                  border: "none",
                  color: "transparent",
                  overflowWrap: "break-word",
                  zIndex: 0, // 레이어를 뒤로
                }}
              ></div>

              {/* 실제 입력받는 textarea */}
              <textarea
                className={`text-base outline-none w-full h-64 p-4 ${
                  isContentFocused
                    ? "border-2 border-blue-300"
                    : "border border-gray-300"
                }`}
                style={{
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "transparent",
                }}
                value={content}
                onChange={handleContentChange}
                onFocus={() => setIsContentFocused(true)}
                onBlur={() => setIsContentFocused(false)}
                placeholder='Enter content'
              />
            </div>
          </div>
        </div>
      </div>
      <RightSidebar
        userId={userId}
        noteId={noteId}
        comments={comments}
        musics={musics}
      />
    </div>
  );
};

export default NoteForm;
