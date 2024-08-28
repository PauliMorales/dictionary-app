async function wordsService(word: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_DICTIONARY_API ?? "";
    const petition = await fetch(`${apiUrl}/${word}`);
    return petition.json();
  } catch (error) {
    throw error;
  }
}

export { wordsService };
