import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useState } from 'react';

const Home = () => {
	const [theme, setTheme] = useState('Random');
	const [words, setWords] = useState('7');

	return (
		<div className='flex h-full justify-center items-center bg-[url(/landing.png)] bg-cover bg-center'>
			<div className='flex flex-col py-[7%] items-center h-full w-1/3 gap-8 z-10'>
				<p className='text-8xl font-bold text-primary'>Scramblr</p>
				<p className='font-[Merriweather] text-2xl text-[#80998D] leading-[150%] text-center'>
					In this word puzzle game, you'll receive a theme and a set of scrambled letters. Your goal is to form words related to the theme using the
					given letters.
				</p>
				<div className='w-1/2 gap-8 flex flex-col'>
					<div className='flex flex-col gap-2'>
						<p className='text-primary font-semibold text-sm'>THEME</p>
						<Select value={theme} onValueChange={(e) => setTheme(e)}>
							<SelectTrigger className='w-full font-[Merriweather]'>
								<SelectValue className='font-[Merriweather]' placeholder='Select a theme' />
							</SelectTrigger>
							<SelectContent className='font-[Merriweather]'>
								<SelectGroup>
									<SelectLabel>Themes</SelectLabel>
									<SelectItem value='Random'>Random</SelectItem>
									<SelectItem value='apple'>Apple</SelectItem>
									<SelectItem value='banana'>Banana</SelectItem>
									<SelectItem value='blueberry'>Blueberry</SelectItem>
									<SelectItem value='grapes'>Grapes</SelectItem>
									<SelectItem value='pineapple'>Pineapple</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='text-primary font-semibold text-sm'>NUMBER OF WORDS</p>
						<Select value={words} onValueChange={(e) => setWords(e)}>
							<SelectTrigger className='w-full font-[Merriweather]'>
								<SelectValue className='font-[Merriweather]' placeholder='Select number of words' />
							</SelectTrigger>
							<SelectContent className='font-[Merriweather]'>
								<SelectGroup>
									<SelectLabel>Number of Words</SelectLabel>
									<SelectItem value='5'>5</SelectItem>
									<SelectItem value='6'>6</SelectItem>
									<SelectItem value='7'>7</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<Link
						href={{
							pathname: '/game',
							query: { theme, words }
						}}
						className='bg-[#004A57] px-8 py-3 rounded-lg w-full cursor-pointer hover:bg-[#003D48] flex justify-center items-center'
					>
						<p className='text-white font-semibold'>PLAY</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;

