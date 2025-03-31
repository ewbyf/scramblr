import Stopwatch from '@/components/Stopwatch';
import { isGuessValid, removeGuessFromLetters } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as util from '../lib/utils';

const Game = () => {
	const [loading, setLoading] = useState(true);
	const [letters, setLetters] = useState<string[]>(['a', 'b', 'c']);

	const [guessedWords, setGuessedWords] = useState<string[]>([]);
	const [typedWord, setTypedWord] = useState('');
	const [error, setError] = useState(false);
	const [wordsList, setWordsList] = useState<string[]>([])

	const router = useRouter();

	useEffect(() => {
		if (!router.query.theme || !router.query.words || typeof router.query.theme != 'string' || typeof router.query.words != 'string') {
			router.push('/');
			return;
		}

		// use router.query.theme to access theme and router.query.words to access number of words
		// todo: generates words based on theme and number of words, stores in variable. also should scramble words into letters and store list of letters into another variable
		const genWords = util.generateWords(router.query.theme, parseInt(router.query.words));
		setWordsList(genWords);

		const scam = util.scrambleWords(genWords)
		setLetters(scam)

		setLoading(false);
	}, []);

	const addWord = () => {
		const typedWordSplit = typedWord.split('');
		const newWord = typedWordSplit.filter((t) => t != ' ');

		if (!isGuessValid(newWord, letters)) {
			setError(true);
			return;
		}

		setLetters(removeGuessFromLetters(newWord, letters));
		guessedWords.push(newWord.join(''));
		setTypedWord('');
		setError(false);
		// if (validateWords()) {
		//     router.push('/win')
		// }
	};

	const removeWord = (word: string) => {
		setGuessedWords(guessedWords.filter((wrd) => wrd != word));
		setLetters([...letters, ...word.split('')]);
	};

	const validateWords = () => {
		// todo: this function will check to see if guessedWords contains the exact same words as the winning words regardless of order
		// should return true or false
		wordsList.sort((a, b) => a.localeCompare(b))
		guessedWords.sort((a, b) => a.localeCompare(b))

		if(wordsList.every((element, index) => element === guessedWords[index]))
			return true
		else 
			return false
	};

	if (loading) return null;

	return (
		<div className='flex flex-col items-center h-full  bg-[url(/secondary.png)] bg-cover bg-center'>
			<Stopwatch />
			<div className='flex flex-col items-center justify-center my-15'>
				<p className='font-bold text-2xl text-secondary'>YOUR THEME</p>
				<p className='font-bold text-7xl text-primary'>{router.query.theme}</p>
				<div className='px-8 py-2 bg-secondary flex justify-center items-center rounded-xl mt-4'>
					<p className='text-white font-semibold text-xl'>{router.query.words} words</p>
				</div>
			</div>

			<div className='flex flex-col justify-between items-center h-full w-full'>
				<div className='flex flex-col items-center w-full gap-2'>
					<p className='text-primary font-bold text-2xl'>LETTERS LEFT</p>
					<div className='flex flex-wrap gap-2 max-w-3/4'>
						{letters.map((letter) => (
							<div className='bg-[#FFC568] flex justify-center items-center h-14 w-14 rounded-xl'>
								<p className='text-2xl font-[Merriweather]'>{letter}</p>
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col items-center w-full gap-2'>
					<p className='text-primary font-bold text-2xl'>GUESSED WORDS</p>
					{guessedWords.length == 0 && <p className='text-secondary text-xl font-bold'>No words have been guessed</p>}
					{guessedWords.length > 0 && <p className='text-secondary text-xl font-bold'>Click to remove</p>}
					<div className='flex flex-wrap gap-2 max-w-3/4'>
						{guessedWords.map((word) => (
							<div
								className='bg-[#FFC568] flex justify-center items-center px-6 py-2 rounded-xl cursor-pointer hover:bg-[#FFD694]'
								onClick={() => removeWord(word)}
							>
								<p className='text-2xl font-[Merriweather]'>{word}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					addWord();
				}}
				className='flex items-center gap-2 my-15'
			>
				<div>
					{error && <p className='text-red-400 mb-2 font-medium'>Word can't be created</p>}
					<input
						className='w-200 bg-white px-4 py-3 text-xl rounded-xl outline-none border-none'
						style={{ outline: error ? '#FF5B5B solid 3px' : 'none', backgroundColor: error ? '#FFBFBF' : '' }}
						placeholder='Type word here...'
						value={typedWord}
						onChange={(e) => setTypedWord(e.target.value)}
					></input>
				</div>
				<button
					type='submit'
					className='bg-[#004A57] rounded-xl px-8 py-3 text-xl font-semibold cursor-pointer hover:bg-[#003D48] text-white self-end'
				>
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default Game;
