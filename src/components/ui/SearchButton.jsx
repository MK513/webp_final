import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

const SearchButton = ({ setFocus }) => {
  const router = useRouter();
  const path = usePathname();
  const { theme } = useTheme();

  // console.log(path);

  const handleClick = (e) => {
    e.preventDefault();
    setFocus(0);

    router.push(`/search`);
  };
  return (
    <div
      className={clsx(
        theme === "dark"
          ? path === "/search"
            ? "bg-sbb-200 hover:bg-sbb-100 text-sbt-100"
            : "hover:bg-sbb-200 text-sbt-100"
          : path === "/search"
          ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
          : "hover:bg-gray-200 text-gray-500",
        "flex hover:bg-gray-200 pages-center p-1 m-1 h-8 text-sm  font-semibold rounded-md fill-current"
      )}
      onClick={handleClick}
    >
      <div className='mr-2 h-5/6'>
        <svg role='graphics-symbol' viewBox='0 0 20 20' className='h-full'>
          <path d='M4 8.75C4 6.12665 6.12665 4 8.75 4C11.3734 4 13.5 6.12665 13.5 8.75C13.5 11.3734 11.3734 13.5 8.75 13.5C6.12665 13.5 4 11.3734 4 8.75ZM8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15C10.2056 15 11.545 14.5024 12.6073 13.668L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.668 12.6073C14.5024 11.545 15 10.2056 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5Z'></path>
        </svg>
      </div>
      <span>Search</span>
    </div>
  );
};

export default SearchButton;
