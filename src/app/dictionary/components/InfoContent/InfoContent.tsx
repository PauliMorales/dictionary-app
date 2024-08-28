"use client";

import Image from "next/image";
import { useState } from "react";
import { wordsService } from "@/utils/services/dictionary.service";
import PhoneticWord from "./components/PhoneticWord/PhoneticWord";
import MeaningList from "./components/MeaningList/MeaningList";
import emptySearchIcon from "@/assets/empty_search.svg";
import initialSearchIcon from "@/assets/initial_search.png";
import { DefinitionType, MeaningType, NotFoundType } from "./types";

const InfoContent = () => {
  const [error, setError] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<Partial<NotFoundType>>({});
  const [word, setWord] = useState<string>("");
  const [definition, setDefinition] = useState<Partial<DefinitionType>>({});

  async function getWordInformation() {
    try {
      const response = await wordsService(word);
      if (response && response.length > 0) {
        const mapResponse = response.map((item: DefinitionType) => ({
          meanings: item.meanings,
          phonetic: item.phonetic,
          phoneticAudio: item.phonetics,
          sourceUrls: item.sourceUrls,
          word: item.word,
        }));
        setDefinition(mapResponse[0]);
        setNotFound({});
      } else {
        setNotFound(response);
        setDefinition({});
      }
    } catch (error) {
      setDefinition({});
    }
  }

  function objectHasKeys(object: Partial<{}>) {
    return Object.keys(object).length > 0;
  }

  return (
    <div className="w-full min-w-[200px] relative mt-4 mb-8">
      <div className="relative">
        <input
          className={`w-full pr-11 h-10 pl-3 py-2 bg-gray-200 placeholder:text-slate-400 text-slate-700 text-sm border rounded-xl transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md ${
            error ? "border-red-500" : ""
          }`}
          placeholder="Write the word you want to search"
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            const value = event?.currentTarget?.value ?? "";
            if (event.key === "Enter") {
              if (!!value) {
                getWordInformation();
                setError(false);
              } else {
                setError(true);
                setDefinition({});
                setNotFound({});
              }
            }
            return value;
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

      {!error && !objectHasKeys(definition) && (
        <div className="mx-auto mt-12 w-full max-w-[500px]">
          <h2 className="text-center text-5xl text-violet-800 dark:text-gray-300">Search any word</h2>
          <Image src={initialSearchIcon} alt="Search icon for app init" />
        </div>
      )}

      {objectHasKeys(definition) && (
        <>
          <PhoneticWord
            phoneticAudio={definition?.phoneticAudio ?? []}
            phonetic={definition?.phonetic ?? ""}
            title={definition?.word ?? ""}
          />
          {definition?.meanings?.map((item: MeaningType, index: number) => (
            <MeaningList
              key={`meanings-${index}`}
              partOfSpeech={item?.partOfSpeech ?? ""}
              definitions={item?.definitions ?? []}
              synonyms={item?.synonyms ?? []}
            />
          ))}
          <div className="flex gap-6 mt-12 pt-6 border-t">
            <p className="text-gray-400 text-sm">Source</p>
            {(definition?.sourceUrls ?? []).map(
              (item: string) =>
                item && (
                  <div key={item} className="flex gap-2 items-center text-sm">
                    <a
                      className="underline break-all transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:duration-300 dark:text-gray-200"
                      href={item}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item}
                    </a>
                    <svg
                      className="h-5 w-5 text-gray-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />{" "}
                      <line x1="10" y1="14" x2="20" y2="4" />{" "}
                      <polyline points="15 4 20 4 20 9" />
                    </svg>
                  </div>
                )
            )}
          </div>
        </>
      )}

      {objectHasKeys(notFound) && (
        <div className="mt-16 text-center">
          <h1 className="text-5xl text-gray-800 dark:text-gray-400">
            {notFound?.title ?? ""}
          </h1>
          <p className="text-xl mt-4 dark:text-gray-300">{`${
            notFound?.message ?? ""
          } ${notFound?.resolution}`}</p>
          <Image
            className="m-auto"
            src={emptySearchIcon}
            alt="Empty search icon"
          />
        </div>
      )}
    </div>
  );
};

export default InfoContent;
