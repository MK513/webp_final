import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

const HomeButton = ({ setFocus }) => {
  const router = useRouter();
  const path = usePathname();
  const { theme } = useTheme();

  const handleClick = (e) => {
    e.preventDefault();
    setFocus(0);

    router.push(`/home`);
  };
  return (
    <div
      className={clsx(
        theme === "dark"
          ? path === "/home"
            ? "bg-sbb-200 hover:bg-sbb-100 text-sbt-100"
            : "hover:bg-sbb-200 text-sbt-100"
          : path === "/home"
          ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
          : "hover:bg-gray-200 text-gray-500",
        "flex pages-center hover:bg-gray-200 p-1 m-1 h-8 text-sm font-semibold rounded-md fill-current"
      )}
      onClick={handleClick}
    >
      <div className='mr-2 h-3/4'>
        <svg role='graphics-symbol' viewBox='0 0 18 18' className='h-full pr-1'>
          <path d='M10.1416 3.77299C10.0563 3.71434 9.94368 3.71434 9.85837 3.77299L3.60837 8.06989C3.54053 8.11653 3.5 8.19357 3.5 8.2759V14.2499C3.5 14.9402 4.05964 15.4999 4.75 15.4999H7.5L7.5 10.7499C7.5 10.0595 8.05964 9.49987 8.75 9.49987H11.25C11.9404 9.49987 12.5 10.0595 12.5 10.7499L12.5 15.4999H15.25C15.9404 15.4999 16.5 14.9402 16.5 14.2499V8.2759C16.5 8.19357 16.4595 8.11653 16.3916 8.06989L10.1416 3.77299ZM9.00857 2.53693C9.60576 2.12636 10.3942 2.12636 10.9914 2.53693L17.2414 6.83383C17.7163 7.1603 18 7.69963 18 8.2759V14.2499C18 15.7687 16.7688 16.9999 15.25 16.9999H12.25C11.5596 16.9999 11 16.4402 11 15.7499L11 10.9999H9L9 15.7499C9 16.4402 8.44036 16.9999 7.75 16.9999H4.75C3.23122 16.9999 2 15.7687 2 14.2499V8.2759C2 7.69963 2.2837 7.1603 2.75857 6.83383L9.00857 2.53693Z'></path>
        </svg>
      </div>
      <span>Home</span>
    </div>
  );
};

export default HomeButton;
