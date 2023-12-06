'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Logout = () => {
	const session = useSession()
	return (
		<div
			className='flex justify-center items-center p-2
      rounded-2xl bg-green-500 m-[50px] hover:opacity-70 transition
      cursor-pointer'
		>
			{session.status === 'authenticated' ? (
				<button
					onClick={() =>
						signOut({
							callbackUrl: '/',
						})
					}
					className=''
				>
					Log out
				</button>
			) : (
				<Link href={'/'}>Sign in</Link>
			)}
		</div>
	)
}

export default Logout
