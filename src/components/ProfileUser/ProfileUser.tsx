'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import styles from './styles.module.scss'
import SettingsUser from './SettingsUser'

const ProfileUser = () => {
	const [open, setOpen] = useState(false)

	const session = useSession()

	return (
		<div className={styles.profile} onClick={() => setOpen(true)}>
			<div className={styles['profile-overlay']} />
			{/* <div
    className='absolute top-0 left-0 w-full h-full z-0 hover:bg-[#4348]
    transition ease-linar hover:border-2 border-green-400 rounded-xl '
  /> */}
			<div className={styles.image}>
				<Image
					src={'/logo.jpg'}
					alt='logo'
					width={70}
					height={70}
					priority={true}
					className='rounded-full hover:scale-110'
				/>
			</div>
			<h1 className='text-[1.2rem]'>
				<span>{session?.data && session?.data?.user?.name}</span>
			</h1>
			{open && <SettingsUser />}
		</div>
	)
}

export default ProfileUser
