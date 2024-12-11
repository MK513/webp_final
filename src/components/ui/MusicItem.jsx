"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicItem = ({ userId, noteId, music, sideStyles }) => {
  const router = useRouter();
  const audioRef = useRef(null);

  // Reset 버튼 동작 정의
  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.pause(); // 오디오 정지
      audioRef.current.audio.current.currentTime = 0; // 재생 위치 초기화
      audioRef.current.audio.current.play(); // 오디오 정지
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    // console.log("music", music);
    formData.append("music", JSON.stringify(music));
    formData.append("noteId", noteId);

    // console.log("formData", formData);

    const response = await fetch("/api/upload", {
      method: "Delete",
      body: formData,
    });

    console.log(response);

    const result = await response.json();
    if (response.ok) {
      console.log("succsess");
      router.refresh();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='rounded-md shadow-md p-4'>
      <div className='flex justify-between items-center'>
        <div className='text-md font-semibold mb-2'>{music.fileName}</div>
        <div
          className='flex dropdown dropdown-end p-1 text-gray-500 hover:text-gray-700'
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
              <a onClick={handleDelete}>delete</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='rounded-md p-2'>
        <AudioPlayer
          ref={audioRef}
          autoPlay={false}
          style={sideStyles}
          src={music.filePath}
          onPlay={(e) => console.log("Playing...")}
          showSkipControls={false}
          showJumpControls={false}
          showDownloadProgress={true}
          customProgressBarSection={[
            "CURRENT_TIME",
            <span>&nbsp;/&nbsp;</span>,
            "DURATION",
          ]}
          customAdditionalControls={[
            <button
              key='reset'
              onClick={handleReset}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
                fontSize: "14px",
                marginRight: "10px",
              }}
            >
              Reset
            </button>,
          ]}
          customVolumeControls={[]} // 볼륨 컨트롤 제거 (필요에 따라 추가 가능)
        />
      </div>
    </div>
  );
};

export default MusicItem;
