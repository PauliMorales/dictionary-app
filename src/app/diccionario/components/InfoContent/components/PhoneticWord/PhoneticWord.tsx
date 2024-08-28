"use client";

import { useRef } from "react";

const PhoneticWord = (props: any) => {
  const { phonetic, phoneticAudio, title } = props;
  const audioRef = useRef<any>(null);

  function getAudio() {
    return phoneticAudio
      ? phoneticAudio.find(
          (item: any) => item.audio && item.audio.indexOf("us.mp3") > 0
        )?.audio ??
          phoneticAudio.find((item: any) => item.audio)?.audio ??
          ""
      : "";
  }

  return (
    <div className="flex justify-between items-center mt-8 flex-wrap cursor-pointer ">
      <div>
        <h1 className="text-6xl break-all dark:text-gray-300">{title}</h1>
        <p className="text-xl text-fuchsia-700 mt-2 dark:text-fuchsia-300 tracking-wide" >{phonetic}</p>
      </div>

      {!!getAudio() && (
        <>
          <audio src={getAudio()} ref={audioRef} />
          <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300"
            type="button"
            onClick={() => {
              if (audioRef) {
                audioRef.current.play();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 512 512"
            >
              <path
                fill="#e9d5ff"
                d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"
              ></path>
              <path
                fill="#a855f7"
                d="M378.7,243.2L203.8,135.7c-4.8-2.9-11.1-3.1-16-0.3c-5,2.8-8.1,8.1-8.1,13.8v214c0,5.7,3.1,11,8,13.8c2.4,1.3,5,2,7.7,2c2.9,0,5.7-0.8,8.2-2.3l174.9-106.6c4.7-2.8,7.6-8,7.6-13.4C386.3,251.2,383.4,246,378.7,243.2z"
              ></path>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneticWord;
