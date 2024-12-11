"use client";
import { deleteComment } from "@/actions";
import { useRouter } from "next/navigation";

const CommentItem = ({ userId, noteId, comment }) => {
  const router = useRouter();

  const handleDeleteClick = async () => {
    await deleteComment(userId, noteId, comment.id);
    router.refresh();
  };

  const createdAt = formatCreatedAt(comment.createdAt);

  return (
    <tr>
      <td>
        <div className='flex flex-col'>
          {/* 상단: 날짜와 버튼 */}
          <div className='flex justify-between items-center'>
            <div className='text-xs text-gray-500'>{createdAt}</div>
            <div
              className='dropdown dropdown-end p-1 text-gray-500 hover:text-gray-700'
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
                  <a onClick={handleDeleteClick}>delete</a>
                </li>
              </ul>
            </div>
          </div>

          {/* 하단: 텍스트 */}
          <div className='font-semibold mt-1'>{comment.value}</div>
        </div>
      </td>
    </tr>
  );
};

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);

  // 월, 일, 시, 분 추출
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (1월은 0부터 시작하므로 +1)
  const day = String(date.getDate()).padStart(2, "0"); // 일 (1~31)
  const hour = String(date.getHours()).padStart(2, "0"); // 시 (0~23)
  const minute = String(date.getMinutes()).padStart(2, "0"); // 분 (0~59)

  return `${month}/${day} ${hour}:${minute}`;
};

export default CommentItem;
