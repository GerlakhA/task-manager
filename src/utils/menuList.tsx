import { AiOutlineHome } from 'react-icons/ai'
import { BiLoader } from 'react-icons/bi'
import { BsFillClipboard2CheckFill } from 'react-icons/bs'
import { PiSealWarningBold } from 'react-icons/pi'

export interface IMenuList {
	id: number
	title: string
	icon: JSX.Element
	link: string
}

export const menuList = [
	{
		id: 1,
		title: 'All Tasks',
		icon: <AiOutlineHome />,
		link: '/all-tasks',
	},
	{
		id: 2,
		title: 'Important!',
		icon: <PiSealWarningBold />,
		link: '/important',
	},
	{
		id: 3,
		title: 'Completed',
		icon: <BsFillClipboard2CheckFill />,
		link: '/completed',
	},
	{
		id: 4,
		title: 'Do it now',
		icon: <BiLoader />,
		link: '/incomplete',
	},
]
