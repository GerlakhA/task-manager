'use client'

import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'

interface IAuthContext {
	children: React.ReactNode
}

const AuthProvider: FC<IAuthContext> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
