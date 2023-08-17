import { commonWordsSet } from './constants';

export function removeCommonWords(sentence: string) {
  const words = sentence.split(' ');

  const filteredWords = words.filter(word => !commonWordsSet.has(word.toLowerCase()));

  const filteredSentence = filteredWords.join(' ');

  return filteredSentence;
}