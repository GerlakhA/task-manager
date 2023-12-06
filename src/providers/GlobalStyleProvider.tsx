'use client'

import { FC } from 'react'

interface IGlobalStyleProvider {
	children: React.ReactNode
}

const GlobalStyleProvider: FC<IGlobalStyleProvider> = ({ children }) => {
	return <div className='p-10 h-full gap-10 flex'>{children}</div>
}

export default GlobalStyleProvider
