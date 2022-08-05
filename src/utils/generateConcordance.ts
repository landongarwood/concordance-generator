export interface WordOccurrence {
    word: string,
    count: number,
    occurrences: number[],
}

const generateSentences = (text: string): string[] => {
    return text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
};

const generateWords = (sentence: string): string[] => {
    return (sentence.match(/\b(\w+)\b/g) ?? [])
        .map(word => word.toLowerCase());
}

const generateUniqueWords = (dictionary: string[][]): string[] => {
    const words:string [] = dictionary.reduce<string[]>((prev, cur) => [...prev, ...cur], []);

    const uniqueWords = Array.from(new Set(words));
    uniqueWords.sort();

    return uniqueWords;
}

export const generateConcordance = (text: string): WordOccurrence[] => {
    const dictionary = generateSentences(text).map(generateWords);
    const occurrenceMap: Record<string, WordOccurrence> = {};

    dictionary.forEach((words, sentenceIndex) => {
        words.forEach((word) => {
            const wordOccurrence: WordOccurrence | undefined = occurrenceMap[word];

            if (wordOccurrence === undefined) {
                occurrenceMap[word] = {
                    word: word,
                    count: 1,
                    occurrences: [sentenceIndex + 1],
                }
            } else {
                occurrenceMap[word] = {
                    ...wordOccurrence,
                    count: wordOccurrence.count + 1,
                    occurrences: [...wordOccurrence.occurrences, sentenceIndex + 1],
                }
            }
        })
    })

    return generateUniqueWords(dictionary)
        .map(word => occurrenceMap[word])
}