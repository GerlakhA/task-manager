'use client'

import AuthForm from '@/components/Auth/AuthForm'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
	return (
		<div className='relative flex justify-center items-center w-full h-full'>
			<h1 className='absolute top-20 left-100 text-3xl font-extrabold text-green-600'>
				<TypeAnimation
					sequence={[
						'Welcome',
						1000,
						'Welcome for',
						1000,
						'Welcome for my Task Manager',
						1000,
						'Welcome for my Task Manager :)',
						1000,
						'',
						1000,
					]}
					wrapper='span'
					speed={50}
					style={{ fontSize: '2em', display: 'inline-block' }}
					repeat={Infinity}
				/>
			</h1>
			<AuthForm />
		</div>
	)
}
