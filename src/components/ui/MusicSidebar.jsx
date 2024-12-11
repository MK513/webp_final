"use client";
import MusicItem from "./MusicItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MusicSidebar = ({ sideStyles, userId, noteId, musics }) => {
  const router = useRouter();
  const [music, setMusic] = useState(null);

  const handleFileChange = (e) => {
    setMusic(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!music) return;

    const formData = new FormData();
    formData.append("file", music);
    formData.append("noteId", noteId);

    console.log("formData", formData);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      console.log("succsess");
      router.refresh();
    } else {
      alert(result.message);
    }
  };

  return (
    <div
      className='flex flex-col w-full items-center mb-auto'
      style={sideStyles}
    >
      <div className='font-semibold my-4'>Music</div>
      <div className='flex flex-grow justify-center items-center space-x-4 mb-4'>
        <input
          type='file'
          accept='audio/*'
          className='file-input file-input-bordered file-input-xs max-w-xs w-40'
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className='btn btn-ghost btn-square btn-xs'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
            />
          </svg>
        </button>
      </div>
      {/* <table className={clsx("table table-pin-rows w-[200px]")}>
        <tbody> */}
      {musics && musics.length > 0
        ? musics.map((music) => (
            <MusicItem
              key={music.id}
              userId={userId}
              noteId={noteId}
              music={music}
              sideStyles={sideStyles}
            />
          ))
        : null}
      {/* </tbody>
      </table> */}
    </div>
  );
};

export default MusicSidebar;
