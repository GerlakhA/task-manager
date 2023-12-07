import MyGlobalContext from '@/context/MyGlobalContext'
import AuthProvider from '@/providers/AuthProvider'
import QueryProvider from '@/providers/QueryProvider'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Task manager',
	description: 'The best task manager!',
	icons: '/taskade-icon.svg',
}

export const viewport: Viewport = {
	colorScheme: 'dark',
	themeColor: '#181818',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<QueryProvider>
						<MyGlobalContext>
							<Toaster />
							{children}
						</MyGlobalContext>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
