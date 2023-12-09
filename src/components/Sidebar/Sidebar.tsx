'use client'

import { menuList } from '@/utils/menuList'
import { useRouter } from 'next/navigation'
import Logout from '../Logout/Logout'
import ProfileUser from '../ProfileUser/ProfileUser'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
	const router = useRouter()

	return (
		<nav
			className='relative border-r border-neutral-500 rounded-2xl bg-neutral-800 w-[300px]
      flex flex-col justify-between'
		>
			<ProfileUser />
			<ul className='w-full'>
				{menuList.map(item => (
					<SidebarItem key={item.id} data={item} />
				))}
			</ul>
			<Logout />
		</nav>
	)
}

export default Sidebar
