import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { animals, countries, fruits, states, topics } from './data';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const randTheme = () => {
	return topics[Math.floor(Math.random() * topics.length)];
};

export const generateWords = (theme: string, numberOfWords: number) => {
	const themeMap: { [key: string]: string[] } = {
		animals: animals,
		fruits: fruits,
		countries: countries,
		states: states
	};

	const themeList = themeMap[theme.toLowerCase()];

	const themeWords: string[] = [];
	for (let i = 0; i < numberOfWords; i++) {
		let randWord = themeList[Math.floor(Math.random() * themeList.length)];
        while (themeWords.findIndex((word) => word == randWord) > -1) {
            randWord = themeList[Math.floor(Math.random() * themeList.length)];
        }
		themeWords.push(randWord.toUpperCase());
	}

	return themeWords;
};

export const scrambleWords = (words: string[]) => {
	const joined = words.join('').split('');
	const scrambled = joined.filter((j) => j != ' ').sort(() => Math.random() - 0.5);
	return scrambled;
};

export const isGuessValid = (guess: string[], letters: string[]): boolean => {
	const countOccurrences = (arr: string[]) => {
		return arr.reduce<Record<string, number>>((acc, letter) => {
			acc[letter] = (acc[letter] || 0) + 1;
			return acc;
		}, {});
	};

	const guessCount = countOccurrences(guess);
	const lettersCount = countOccurrences(letters);

	return Object.keys(guessCount).every((letter) => guessCount[letter] <= (lettersCount[letter] || 0));
};

export const removeGuessFromLetters = (guess: string[], letters: string[]): string[] => {
	const lettersCopy = [...letters];

	for (const letter of guess) {
		const index = lettersCopy.indexOf(letter);
		if (index !== -1) {
			lettersCopy.splice(index, 1);
		}
	}

	return lettersCopy;
};
