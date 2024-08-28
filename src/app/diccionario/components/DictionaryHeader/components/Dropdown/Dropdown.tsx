"use client";

import { useState } from "react";

export default function DropdownComponent() {
  const [selectValue, setSelectValue] = useState("font-serif");

  return (
    <>
      <select
        id="underline_select"
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-none appearance-none dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        value={selectValue}
        onChange={(event) => {
          const value = event?.target?.value;
          document.documentElement.classList.remove(selectValue);
          document.documentElement.classList.add(value);
          setSelectValue(value);
        }}
      >
        <option value="font-serif">Serif</option>
        <option value="font-sans">Sans serif</option>
        <option value="font-mono">Monospace</option>
      </select>
    </>
  );
}
