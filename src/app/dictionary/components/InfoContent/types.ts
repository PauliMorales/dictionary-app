interface NotFoundType {
  title: string;
  message: string;
  resolution: string;
}

interface PhoneticAudioType {
  audio: string;
}

interface DefinitionType {
  definition: string;
  example: string;
}

interface MeaningType {
  partOfSpeech: string;
  definitions: DefinitionType[];
  synonyms: string[];
}

interface DefinitionAdditionalField {
  phonetics: PhoneticAudioType[];
}

interface DefinitionType extends DefinitionAdditionalField {
  meanings: MeaningType[];
  phonetic: string;
  phoneticAudio: PhoneticAudioType[];
  sourceUrls: string[];
  word: string;
}

export type { NotFoundType, DefinitionType, MeaningType, PhoneticAudioType };
