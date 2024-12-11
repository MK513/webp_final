"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  //   console.log(session);

  const handleClick = async (e) => {
    e.preventDefault();

    const result = await signOut({
      redirect: false,
    });

    if (result.error) {
      console.error("Failed to sign out:", result.error);
    } else {
      router.push(`/`);
    }
  };

  return (
    session && (
      <div
        className='tooltip hover:tooltip-open tooltip-bottom ml-4'
        data-tip='Logout'
      >
        <button
          className='btn btn-circle btn-ghost btn-xs'
          onClick={handleClick}
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
              d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
            />
          </svg>
        </button>
      </div>
    )
  );
};

export default LogoutButton;
