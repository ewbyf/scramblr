import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Win = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const [theme, setTheme] = useState('');
	const [words, setWords] = useState('');
	const [time, setTime] = useState(0);
	const [validSubmissions, setValidSubmissions] = useState('');
	const [invalidSubmissions, setInvalidSubmissions] = useState('');

	useEffect(() => {
		if (
			!router.query.theme ||
			!router.query.words ||
			typeof router.query.theme != 'string' ||
			typeof router.query.words != 'string' ||
			!router.query.seconds ||
			typeof router.query.seconds != 'string' ||
			!router.query.validSubmissions ||
			!router.query.invalidSubmissions ||
			typeof router.query.validSubmissions != 'string' ||
			typeof router.query.invalidSubmissions != 'string'
		) {
			router.push('/');
			return;
		}

		setTheme(router.query.theme);
		setWords(router.query.words);
		setTime(parseInt(router.query.seconds));
		setValidSubmissions(router.query.validSubmissions);
		setInvalidSubmissions(router.query.invalidSubmissions);

		setLoading(false);
	}, []);

	if (loading || typeof router.query.theme != 'string') return null;

	return (
		<div className='flex h-full justify-center items-center bg-[url(/landing.png)] bg-cover bg-center'>
			<div className='flex flex-col py-16 items-center h-full w-1/3 gap-8 z-10'>
				<p className='text-8xl font-bold text-primary'>Congratulations!</p>
				<p className='font-[Merriweather] text-2xl text-[#80998D] leading-[150%] text-center font-semibold'>
					You have successfully pieced together all of the words!
				</p>

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
						<p className='text-[#80A4AB] font-semibold'>TIME</p>
						<p className='font-bold text-3xl'>
							{Math.floor((time / 3600) % 60) > 0 ? `${String(Math.floor((time / 3600) % 60)).padStart(1, '0')}:` : ''}
							{String(Math.floor((time / 60) % 60)).padStart(1, '0')}:{String(time % 60).padStart(2, '0')}
						</p>
					</div>
					<div className='flex flex-col items-center'>
						<p className='text-[#80A4AB] font-semibold'>VALID SUBMISSIONS</p>
						<p className='font-bold text-3xl'>{validSubmissions}</p>
					</div>
					<div className='flex flex-col items-center'>
						<p className='text-[#80A4AB] font-semibold'>INVALID SUBMISSIONS</p>
						<p className='font-bold text-3xl'>{invalidSubmissions}</p>
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

export default Win;
