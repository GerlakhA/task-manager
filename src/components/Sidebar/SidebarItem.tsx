'use client'

import { IMenuList } from '@/utils/menuList'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

interface ISidebarItem {
	data: IMenuList
}

const SidebarItem: FC<ISidebarItem> = ({ data }) => {
	const pathname = usePathname()
	const router = useRouter()

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<li
			key={data.id}
			className={clsx(
				`flex items-center gap-x-4 gap-y-20 h-10
							text-neutral-400 mb-4 pl-[70px] hover:bg-gray-500
							hover:text-white transition-colors duration-[330ms]
							cursor-pointer`,
				pathname === data.link ? 'text-white transition-colors' : ''
			)}
			onClick={() => handleClick(data.link)}
		>
			{data.icon}
			<Link href={data.link}>{data.title}</Link>
		</li>
	)
}

export default SidebarItem
