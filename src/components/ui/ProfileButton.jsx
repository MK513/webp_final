import clsx from "clsx";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const ProfileButton = ({ username, setFocus, profileImage }) => {
  const router = useRouter();
  const { theme } = useTheme();

  //   console.log("profileImage:", profileImage);
  //   console.log(typeof profileImage);

  const handleClick = (e) => {
    e.preventDefault();
    setFocus(0);
    router.push(`/profile`);
  };

  return (
    <button className='min-w-[80px]' onClick={handleClick}>
      <div
        className={clsx(
          "flex pages-center gap-2 rounded-md items-center",
          theme === "dark"
            ? "hover:bg-sbb-200 text-sbt-100"
            : "hover:bg-gray-300 text-gray-700"
        )}
      >
        {profileImage !== "null" ? (
          <Image
            priority={true}
            alt='Profile Pic'
            // src='/profile.jpg'
            src={`data:image/png;base64,${Buffer.from(
              JSON.parse(profileImage)
            ).toString("base64")}`}
            width={24}
            height={24}
            className='object-contain rounded-md'
            decoding='async'
            unoptimized
          />
        ) : (
          <Image
            alt='Profile Pic'
            src='/profile.jpg'
            width={24}
            height={24}
            className='object-contain rounded-md'
            loading='lazy'
            decoding='async'
          />
        )}

        <div className='font-semibold'>{username}</div>
      </div>
    </button>
  );
};

export default ProfileButton;
