"use client";

interface SearchInputType {
  error: boolean;
  handlerWordSearch: Function;
  word: string;
  setWord: Function;
}

const SearchInput = (props: SearchInputType) => {
  const { error, handlerWordSearch, word, setWord } = props;
  return (
    <div className="relative">
      <input
        className={`w-full pr-11 h-10 pl-3 py-2 bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border rounded-xl transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md ${
          error ? "border-red-500" : ""
        }`}
        placeholder="Write the word you want to search"
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const value = event?.currentTarget?.value ?? "";
          if (event.key === "Enter") {
            handlerWordSearch(value);
          }
        }}
        onChange={(event) => {
          setWord(event.target.value);
        }}
        value={word}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center mt-2">
          <svg
            className="h-4 w-4 text-red-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          This field can´t be empty
        </p>
      )}

      <button
        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center rounded"
        type="button"
        onClick={() => {
          handlerWordSearch(word);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#9061f9"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;
