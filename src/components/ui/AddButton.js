"use client";
import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";
import { createNote } from "@/actions";

const AddButton = ({ userId, noteCnt, setFocus, form }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const addPage = async () => {
    const newNote = await createNote(noteCnt + 1, userId);

    const newSearchParams = new URLSearchParams();
    newSearchParams.set("id", newNote.id);

    const newPath = `/note/?${newSearchParams.toString()}`;
    setFocus(newNote.id);
    router.push(newPath);
  };

  if (form === "page") {
    return (
      <div
        className={clsx(
          "flex gap-2 cursor-pointer p-2 m-1 items-center rounded-md",
          theme === "dark"
            ? "hover:bg-sbb-200 text-sbt-100"
            : "hover:bg-gray-200 text-gray-500"
        )}
        onClick={addPage}
      >
        <div className='h-5 w-5'>
          <svg
            role='graphics-symbol'
            viewBox='0 0 16 16'
            className='h-5'
            fill='currentColor'
          >
            <path d='M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z'></path>
          </svg>
        </div>
        <span>New Page</span>
      </div>
    );
  } else if (form == "button") {
    return (
      <button
        onClick={addPage}
        className={clsx(
          " rounded-md",
          theme === "dark" ? "hover:bg-sbb-200" : "hover:bg-gray-200"
        )}
      >
        <svg
          role='graphics-symbol'
          viewBox='0 0 24 24'
          className='h-6'
          fill='currentColor'
        >
          <g>
            <path d='M9.944 14.721c.104.094.216.12.336.079l1.703-.688 6.844-6.844-1.406-1.398-6.836 6.836-.711 1.68c-.052.13-.029.242.07.335zm8.102-9.484l1.414 1.406.515-.523a.917.917 0 00.282-.633.76.76 0 00-.258-.61l-.25-.25a.702.702 0 00-.578-.187.975.975 0 00-.617.297l-.508.5zm-9.453.127a3.85 3.85 0 00-3.85 3.85v6.5a3.85 3.85 0 003.85 3.85h6.5a3.85 3.85 0 003.85-3.85V12.95a.85.85 0 10-1.7 0v2.764a2.15 2.15 0 01-2.15 2.15h-6.5a2.15 2.15 0 01-2.15-2.15v-6.5a2.15 2.15 0 012.15-2.15h3.395a.85.85 0 000-1.7H8.593z'></path>
          </g>
        </svg>
      </button>
    );
  }
};

export default AddButton;
