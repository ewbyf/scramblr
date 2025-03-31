import Stopwatch from '@/components/Stopwatch';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Game = () => {
	const [loading, setLoading] = useState(true);
	const [letters, setLetters] = useState<string[]>(['a', 'b', 'c']);

    const [guessedWords, setGuessedWords] = useState<string[]>([]);

	const router = useRouter();

	useEffect(() => {
        if (!router.query.theme || !router.query.words || typeof router.query.theme != 'string' || typeof router.query.words != 'string') {
            router.push('/')
            return
        }
        
		// use router.query.theme to access theme and router.query.words to access number of words
        // todo: generates words based on theme and number of words, stores in variable. also should scramble words into letters and store list of letters into another variable

		setLoading(false);
	}, []);

	const addWord = () => {};

    const validateWords = () => {
        // todo: this function will check to see if guessedWords contains the exact same words as the winning words regardless of order
        // should return true or false
    }

	if (loading) return null;

	return (
		<div className='flex flex-col items-center'>
			<Stopwatch />
			<div className='flex flex-col items-center justify-center my-15'>
				<p className='font-bold text-2xl text-secondary'>YOUR THEME</p>
				<p className='font-bold text-7xl text-primary'>{router.query.theme}</p>
				<div className='px-8 py-2 bg-secondary flex justify-center items-center rounded-xl mt-4'>
					<p className='text-white font-semibold text-xl'>{router.query.words} words</p>
				</div>
			</div>
			<div className='flex flex-wrap gap-2 max-w-3/4'>
				{letters.map((letter) => (
					<div className='bg-[#FFC568] flex justify-center items-center h-14 w-14 rounded-xl'>
						<p className='text-2xl font-[Merriweather]'>{letter}</p>
					</div>
				))}
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addWord();
				}}
                className='flex items-center gap-2 absolute bottom-[10%]'
			>
				<input className='w-200 bg-white px-4 py-3 text-xl rounded-xl' placeholder='Type word here...'></input>
                <button type='submit' className='bg-[#004A57] rounded-xl px-8 py-3 text-xl font-semibold cursor-pointer hover:bg-[#003D48] text-white'>SUBMIT</button>
			</form>
		</div>
	);
};

export default Game;
