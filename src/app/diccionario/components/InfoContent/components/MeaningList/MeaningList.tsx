import { DefinitionType, MeaningType } from "../../types";

const MeaningList = (props: MeaningType) => {
  const { partOfSpeech, definitions, synonyms } = props;
  return (
    <div className="mt-8 ">
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold dark:text-gray-200">
          {partOfSpeech}
        </span>
        <hr className="w-full bg-slate-100" />
      </div>
      <div className="mt-6">
        <p className="mb-3 text-gray-400">Meaning</p>
        <ul className="list-disc px-10 marker:text-fuchsia-600 dark:text-gray-100">
          {definitions.map((item: DefinitionType, index: number) => (
            <li key={`meaning-list-${index}`} className="px-2">
              <span>{item?.definition ?? ""}</span>
              {item?.example && (
                <p className="text-gray-400">&quot;{item.example}&quot;</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      {synonyms.length > 0 && (
        <div className="flex gap-6 mt-8">
          <span className="text-gray-400">Synonimus</span>
          <p className="text-fuchsia-600 font-extrabold dark:text-fuchsia-300">
            {synonyms.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default MeaningList;
