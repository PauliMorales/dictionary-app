"use client";

import Image from "next/image";
import { useState } from "react";
import { wordsService } from "@/utils/services/dictionary.service";
import PhoneticWord from "./components/PhoneticWord/PhoneticWord";
import MeaningList from "./components/MeaningList/MeaningList";
import emptySearchIcon from "@/assets/empty_search.svg";
import initialSearchIcon from "@/assets/initial_search.png";
import { DefinitionType, MeaningType, NotFoundType } from "./types";
import SearchInput from "./components/SearchInput/SearchInput";

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

  function handlerWordSearch(value: string) {
    if (!!value) {
      getWordInformation();
      setError(false);
    } else {
      setError(true);
      setDefinition({});
      setNotFound({});
    }
  }

  return (
    <div className="w-full min-w-[200px] relative mt-4 mb-8">
      <SearchInput
        error={error}
        handlerWordSearch={handlerWordSearch}
        word={word}
        setWord={setWord}
      />

      {!error && !objectHasKeys(definition) && !objectHasKeys(notFound) && (
        <div className="mx-auto mt-12 w-full max-w-[500px]">
          <h2 className="text-center text-5xl text-violet-800 dark:text-gray-300">
            Search any word in english ☺
          </h2>
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
            <div>
              {(definition?.sourceUrls ?? []).map(
                (item: string) =>
                  item && (
                    <a
                      key={item}
                      className="flex gap-1 items-center text-sm mb-1 underline break-all transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:duration-300 dark:text-gray-200"
                      href={item}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{item}</span>
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
                    </a>
                  )
              )}
            </div>
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
