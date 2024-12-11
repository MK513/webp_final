"use client";
import clsx from "clsx";
import CommentItem from "./CommentItem";
import { createComment } from "@/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CommentSidebar = ({ sideStyles, comments, userId, noteId }) => {
  const router = useRouter();
  const [commentValue, setCommentValue] = useState("");

  const handleCommentChange = (e) => {
    e.preventDefault();
    setCommentValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment(userId, noteId, commentValue);
    setCommentValue("");
    router.refresh();
  };

  return (
    <div
      className='flex flex-col w-full items-center mb-auto'
      style={sideStyles}
    >
      <div className='font-semibold my-4'>Comments</div>
      <table className={clsx("table table-pin-rows w-[200px]")}>
        <tbody>
          {comments && comments.length > 0
            ? comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  userId={userId}
                  noteId={noteId}
                  comment={comment}
                />
              ))
            : null}
        </tbody>
      </table>
      <div className='relative w-[200px] h-20 my-5 '>
        <textarea
          placeholder='Type here'
          className='textarea textarea-bordered w-[200px]  h-20 resize-none overflow-y-auto overflow-x-hidden'
          value={commentValue}
          onChange={handleCommentChange}
          rows='3'
        />
        <button className='absolute right-1 bottom-1' onClick={handleSubmit}>
          <svg
            role='graphics-symbol'
            viewBox='0 0 20 20'
            className='sendArrow btn btn-ghost btn-xs btn-circle'
            fill='currentColor'
          >
            <path d='M9.79883 18.5894C14.6216 18.5894 18.5894 14.6216 18.5894 9.79883C18.5894 4.96777 14.6216 1 9.79053 1C4.95947 1 1 4.96777 1 9.79883C1 14.6216 4.96777 18.5894 9.79883 18.5894ZM9.79883 14.3062C9.20947 14.3062 8.76953 13.9077 8.76953 13.3433V9.69922L8.86914 8.00586L8.25488 8.84424L7.3916 9.81543C7.23389 10.0063 6.98486 10.1143 6.72754 10.1143C6.21289 10.1143 5.84766 9.75732 5.84766 9.25928C5.84766 8.99365 5.92236 8.79443 6.12158 8.58691L8.96045 5.61523C9.19287 5.35791 9.4585 5.2417 9.79883 5.2417C10.1309 5.2417 10.4048 5.36621 10.6372 5.61523L13.4761 8.58691C13.667 8.79443 13.75 8.99365 13.75 9.25928C13.75 9.75732 13.3848 10.1143 12.8618 10.1143C12.6128 10.1143 12.3638 10.0063 12.2061 9.81543L11.3428 8.86914L10.7202 7.99756L10.8281 9.69922V13.3433C10.8281 13.9077 10.3799 14.3062 9.79883 14.3062Z'></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommentSidebar;
