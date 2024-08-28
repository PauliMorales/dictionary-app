import Dropdown from "./components/Dropdown/Dropdown";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

const DictionaryHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <svg
        className="h-8 w-8 text-gray-500 dark:text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      <div className="flex items-center gap-2">
        <Dropdown />
        <DarkModeToggle />
        <svg
          className="h-8 w-8 text-gray-500  dark:text-gray-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </div>
  );
};

export default DictionaryHeader;
