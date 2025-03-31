import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { topics, animals, fruits, countries, states } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randTheme = () => 
{

    // chooses a random theme from the ones we have
    return topics[Math.floor(Math.random() * topics.length)];

}

export const generateWords = (theme: string, numberOfWords: number) => 
{

    // return array of words based on theme and number of words
    const themeMap: { [key: string]: string[] } = {
      animals: animals,
      fruits: fruits,
      countries: countries,
      states: states};

    const themeList = themeMap[theme];

    const themeWords: string[] = [];
    for(let i = 0; i < numberOfWords; i++)
    {

      const randWord = themeList[Math.floor(Math.random() * themeList.length)];
      themeWords.push(randWord);

    }

    return themeWords;

}

export const scrambleWords = (words: string[]) => 
  {

    // return array of letters that are scrambled based on array of words passed in
    const joined = words.join("").split("");
    const scambled = joined.sort(() => Math.random() - .5);
    return scambled;

}