import { useRightSidebar } from "@/components/RightSidebarContext";

const MusicButton = () => {
  const { rightSidebarValue, setRightSidebarValue } = useRightSidebar();

  const handleClick = () => {
    if (rightSidebarValue === "music") {
      setRightSidebarValue("");
    } else {
      setRightSidebarValue("music");
    }
  };
  return (
    <div
      className='tooltip hover:tooltip-open tooltip-bottom '
      data-tip='Music'
    >
      <button className='btn btn-square btn-ghost btn-xs' onClick={handleClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z'
          />
        </svg>
      </button>
    </div>
  );
};
export default MusicButton;
