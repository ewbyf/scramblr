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
	const [wordsList, setWordsList] = useState<string[]>([]);
	const [seconds, setSeconds] = useState<number>(0);
	const [validSubmissions, setValidSubmissions] = useState(0);
	const [invalidSubmissions, setInvalidSubmissions] = useState(0);

	const [wordToRemove, setWordToRemove] = useState('');
	const [hintWord, setHintWord] = useState('');
	const [hintIndex, setHintIndex] = useState(0);

	const [hintsUsed, setHintsUsed] = useState(0);
	const [shufflesUsed, setShufflesUsed] = useState(0);

	const router = useRouter();

	useEffect(() => {
		if (!router.query.theme || !router.query.words || typeof router.query.theme != 'string' || typeof router.query.words != 'string') {
			router.push('/');
			return;
		}
		const genWords = util.generateWords(router.query.theme, parseInt(router.query.words));
		setWordsList(genWords);

		const scam = util.scrambleWords(genWords);
		setLetters(scam);

		setLoading(false);
	}, []);

	const addWord = () => {
		const typedWordSplit = typedWord.toUpperCase().split('');
		const newWord = typedWordSplit.filter((t) => t != ' ');

		if (!isGuessValid(newWord, letters)) {
			setInvalidSubmissions((prev) => prev + 1);
			setError(true);
			return;
		}

		setValidSubmissions((prev) => prev + 1);
		setLetters(removeGuessFromLetters(newWord, letters));
		setGuessedWords([...guessedWords, newWord.join('')]);
		setTypedWord('');
		setError(false);
		if (validateWords()) {
			router.push({
				pathname: '/win',
				query: { theme: router.query.theme, words: router.query.words, seconds, validSubmissions: validSubmissions + 1, invalidSubmissions, hintsUsed }
			});
		}

		setHintIndex(0);
		setHintWord('');
	};

	const removeWord = (word: string, idx: number) => {
		guessedWords.splice(idx, 1);
		setLetters([...letters, ...word.split('')]);

		if (word == wordToRemove) {
			setWordToRemove('');
		}
	};

	const validateWords = () => {
		if (wordsList.length != guessedWords.length) {
			return false;
		}

		wordsList.sort((a, b) => a.localeCompare(b));
		guessedWords.sort((a, b) => a.localeCompare(b));

		if (guessedWords.every((word, i) => word == wordsList[i])) return true;
		else return false;
	};

	const getHint = () => {
        setHintsUsed((prev) => prev + 1)
		guessedWords.forEach((element) => {
			if (!wordsList.includes(element)) {
				setWordToRemove(element);
				return;
			}
		});
		if (hintWord == '') {
			let randWord = wordsList[Math.floor(Math.random() * wordsList.length)];
			while (guessedWords.includes(randWord)) {
				randWord = wordsList[Math.floor(Math.random() * wordsList.length)];
			}
			setHintWord(randWord);
            setTypedWord(randWord.slice(0, hintIndex + 1))
		}
        else if (hintIndex <= hintWord.length) {
			setHintIndex((idx) => idx + 1);
            setTypedWord(hintWord.slice(0, hintIndex + 1))
		}
	};

    const giveUp = () => {
        router.push({
            pathname: '/lose',
            query: { theme: router.query.theme, words: router.query.words, wordsList, guessedWords }
        });
    }

	if (loading || typeof router.query.theme != 'string') return null;

	return (
		<div className='flex flex-col items-center h-full bg-[url(/secondary.png)] bg-cover bg-center'>
			<Stopwatch setTime={setSeconds} />
			<div className='flex items-center absolute top-8 left-10 gap-4'>
				<div className=' bg-[#E47777] px-6 py-3 rounded-2xl cursor-pointer hover:bg-[#DF6060]' onClick={() => giveUp()}>
					<p className='text-xl text-white font-medium'>Give up</p>
				</div>
				<div className='bg-secondary px-6 py-3 rounded-2xl cursor-pointer hover:bg-[#6E8A7D]' onClick={() => getHint()}>
					<p className='text-xl text-white font-medium'>Hint</p>
				</div>
				<div className=' bg-primary px-6 py-3 rounded-2xl cursor-pointer hover:bg-[#003D48]' onClick={() => {setShufflesUsed(prev => prev + 1); util.shuffle(letters)}}>
					<p className='text-xl text-white font-medium'>Shuffle</p>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center my-15'>
				<p className='font-bold text-2xl text-secondary'>YOUR THEME</p>
				<p className='font-bold text-7xl text-primary'>{router.query.theme!.charAt(0).toUpperCase() + router.query.theme!.slice(1)}</p>
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
						{guessedWords.map((word, i) => (
							<div
								className='bg-[#FFC568] flex justify-center items-center px-6 py-2 rounded-xl cursor-pointer hover:bg-[#FFD694]'
								style={{ backgroundColor: wordToRemove == word ? '#E47777' : '' }}
								onClick={() => removeWord(word, i)}
								key={i}
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
