"use client";
import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { deleteNote, toggleFavorite } from "@/actions";

const LeftSidebarItem = ({
  userId,
  noteId,
  title,
  curFavorite,
  focus,
  setFocus,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setFavorite] = useState(curFavorite);
  const { theme } = useTheme();

  const handleDeleteNote = () => {
    // 노트 삭제
    deleteNote(noteId);

    // 현재 페이지가 삭제된 노트와 같을 경우에만 리디렉션 로직 실행
    const queryNoteId = parseInt(searchParams.get("id"), 10);
    if (queryNoteId === noteId) {
      router.push(`/home`);
    } else {
      router.refresh();
    }
  };

  const handleFocus = (e) => {
    e.preventDefault();
    setFocus(noteId);

    const newSearchParams = new URLSearchParams();
    newSearchParams.set("id", noteId);
    const newPath = `/note?${newSearchParams.toString()}`;
    router.push(newPath);
  };

  const handleFavoriteToggle = () => {
    setFavorite((prevState) => !prevState); // 상태 토글
    toggleFavorite(userId, noteId);
    router.refresh();
  };

  return (
    <div>
      <div
        className={clsx(
          "flex items-center gap-2 p-2 m-1 font-semibold rounded-md cursor-pointer group",
          theme === "dark"
            ? focus === noteId
              ? "bg-sbb-200 hover:bg-sbb-100 text-sbt-100"
              : "hover:bg-sbb-200 text-sbt-100"
            : focus === noteId
            ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
            : "hover:bg-gray-200 text-gray-500"
        )}
        onClick={handleFocus} // 클릭 시 focus 상태 업데이트
        onMouseEnter={() => setIsHovered(true)} // 마우스가 들어오면 상태 변경
        onMouseLeave={() => setIsHovered(false)} // 마우스가 나가면 상태 변경
      >
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='h-5 w-5'>
            {isHovered ? (
              // 별 모양 SVG
              <button
                onClick={(e) => {
                  e.preventDefault(); // 부모 클릭 이벤트 방지
                  e.stopPropagation(); // 이벤트 전파 중단
                  handleFavoriteToggle();
                }}
                aria-label='Toggle favorite'
              >
                {/* 속이 빈 별 (outlined star) */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 32 32'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  className='w-6 h-6'
                >
                  <path d='M12 .587l3.668 7.433 8.2 1.19-5.933 5.785 1.4 8.165L12 18.897l-7.334 3.863 1.4-8.165L.133 9.21l8.2-1.19L12 .587z' />
                </svg>
              </button>
            ) : isFavorite ? (
              // 칠해진 별 (filled star)
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path d='M12 .587l3.668 7.433 8.2 1.19-5.933 5.785 1.4 8.165L12 18.897l-7.334 3.863 1.4-8.165L.133 9.21l8.2-1.19L12 .587z' />
              </svg>
            ) : (
              // 기본 아이콘
              <svg
                role='graphics-symbol'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-5'
              >
                <path d='M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z'></path>
              </svg>
            )}
          </div>
          <span>{title}</span>
          <div
            className='absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity dropdown dropdown-end p-1 text-gray-500 hover:text-gray-700'
            onClick={(e) => {
              e.preventDefault(); // 부모 클릭 이벤트 방지
              e.stopPropagation(); // 이벤트 전파 중단
            }}
          >
            <div tabIndex={0} role='button' className='m-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5'
              >
                <path d='M5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-26 p-2 shadow'
            >
              <li>
                <a onClick={handleDeleteNote}>delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebarItem;

{
  /* <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path> */
}
