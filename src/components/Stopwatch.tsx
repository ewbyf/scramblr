import { useEffect, useState } from 'react';

const Stopwatch = () => {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1);
		}, 1000);

		return () => {
			clearInterval(id);
		};
	}, []);

	return (
		<div className='flex flex-col items-center bg-primary w-fit px-8 py-2 rounded-2xl absolute right-10 top-8'>
			<p className='text-2xl text-white font-semibold'>
				{Math.floor((seconds / 3600) % 60) > 0 ? `${String(Math.floor((seconds / 3600) % 60)).padStart(1, '0')}:` : ''}
				{String(Math.floor((seconds / 60) % 60)).padStart(1, '0')}:
                {String(seconds % 60).padStart(2, '0')}
			</p>
		</div>
	);
};

export default Stopwatch;
