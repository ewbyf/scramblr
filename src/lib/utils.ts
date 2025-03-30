import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateWords = (theme: string, numberOfWords: number) => {
    // return array of words based on theme and number of words
}

export const scrambleWords = (words: string[]) => {
    // return array of letters that are scrambled based on array of words passed in
}