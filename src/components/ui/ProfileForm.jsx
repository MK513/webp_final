"use client";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfileImage } from "@/actions";
import { usePageTheme } from "@/components/ThemeProvider";

const ProfileForm = ({ userId, username }) => {
  const router = useRouter();
  const pgTheme = usePageTheme();
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    await updateProfileImage(userId, image);
    router.refresh();
  };

  return (
    <div
      className={clsx("flex flex-col w-full p-6 gap-2 min-h-screen", pgTheme)}
    >
      <div className='self-start'>
        <span className='text-lg font-semibold pb-40'>{username}</span>
      </div>
      <div className='flex flex-grow justify-center items-center space-x-4'>
        <input
          type='file'
          className='file-input file-input-bordered w-full max-w-xs'
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} className='btn btn-active btn-neutral'>
          Change
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
