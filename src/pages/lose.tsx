import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Lose = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const [words, setWords] = useState('');
	const [wordsList, setWordsList] = useState<string[]>([]);
	const [guessedWords, setGuessedWords] = useState<string[]>([]);

	console.log(typeof router.query.guessedWords);

	useEffect(() => {
		if (
			!router.query.theme ||
			!router.query.words ||
			typeof router.query.theme != 'string' ||
			typeof router.query.words != 'string' ||
			!router.query.wordsList
		) {
			router.push('/');
			return;
		}

		setWords(router.query.words);
		setWordsList(router.query.wordsList as string[]);
		if (router.query.guessedWords) {
			setGuessedWords(router.query.guessedWords as string[]);
		}

		setLoading(false);
	}, []);

	if (loading || typeof router.query.theme != 'string') return null;

	return (
		<div className='flex h-full justify-center items-center bg-[url(/landing.png)] bg-cover bg-center'>
			<div className='flex flex-col py-16 items-center h-full w-1/3 gap-8 z-10'>
				<p className='text-8xl font-bold text-primary'>You gave up!</p>
				<p className='font-[Merriweather] text-2xl text-[#80998D] leading-[150%] text-center font-semibold'>Nice try! u suck tho</p>

				<div className='bg-primary flex flex-col items-center rounded-xl py-8 px-8 w-full text-white gap-8'>
					<p className='font-bold text-4xl'>Game Breakdown</p>

					<div className='flex flex-col items-center'>
						<p className='text-[#80A4AB] font-semibold'>THEME</p>
						<p className='font-bold text-3xl'>{router.query.theme!.charAt(0).toUpperCase() + router.query.theme!.slice(1)}</p>
					</div>
					<div className='flex flex-col items-center'>
						<p className='text-[#80A4AB] font-semibold'>WORDS</p>
						<p className='font-bold text-3xl'>{words}</p>
					</div>
					<div className='flex flex-col items-center'>
						<p className='text-[#80A4AB] font-semibold'>CORRECT WORDS</p>
						{wordsList.map((word) => (
							<p className='font-bold text-3xl' style={{ color: guessedWords.includes(word) ? '#39DE91' : '' }}>
								{word}
							</p>
						))}
					</div>

					<Link
						href={{
							pathname: '/'
						}}
						className='bg-white px-8 py-3 rounded-lg w-full cursor-pointer hover:bg-gray-200 flex justify-center items-center'
					>
						<p className='text-primary font-semibold'>PLAY AGAIN</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Lose;
