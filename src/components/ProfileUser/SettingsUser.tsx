'use client'

import { useRef } from 'react'

const SettingsUser = () => {
	const ref = useRef(null)

	return (
		<div
			ref={ref}
			className='absolute w-full h-full rounded-xl bg-neutral-700 bottom-[-10px]'
		>
			SettingsUser
		</div>
	)
}

export default SettingsUser
