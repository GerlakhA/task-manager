'use client'

import styles from '@/components/Sidebar/style.module.scss'
import { menuList } from '@/utils/menuList'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logout from '../Logout/Logout'

const Sidebar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const session = useSession()

	const handleClick = (link: string) => {
		router.push(link)
	}
	return (
		<nav
			className='relative border-r border-neutral-500 rounded-2xl bg-neutral-800 w-[300px]
      flex flex-col justify-between'
		>
			<div className={styles.profile}>
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
			</div>
			<ul className='w-full'>
				{menuList.map(item => (
					<li
						key={item.id}
						className={clsx(
							`flex items-center gap-x-4 gap-y-20 h-10
							text-neutral-400 mb-4 pl-[70px] hover:bg-gray-500
							hover:text-white transition-colors duration-[330ms]
							cursor-pointer`,
							pathname === item.link ? 'text-white transition-colors' : ''
						)}
						onClick={() => handleClick(item.link)}
					>
						{item.icon}
						<Link href={item.link}>{item.title}</Link>
					</li>
				))}
			</ul>
			<Logout />
		</nav>
	)
}

export default Sidebar
