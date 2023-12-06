import Sidebar from '@/components/Sidebar/Sidebar'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Incompleted Tasks',
	description: 'Here are only incompleted tasks',
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
				<main className='p-10 h-full w-full gap-10 flex'>
					<Sidebar />
					<div
						className='w-full h-full bg-neutral-800 rounded-2xl border border-neutral-500
						p-8'
					>
						{children}
					</div>
				</main>
			</body>
		</html>
	)
}
