import { prisma } from '@/libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_CLIENT_ID as string,
		// 	clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		// }),
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_CLIENT_ID as string,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		// }),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string
					password: string
				}

				if (!email || !password) {
					throw new Error('Invalid credentials!')
				}

				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				})

				if (!user || !user.hashedPassword) {
					throw new Error('User does not exist!')
				}

				const isCorrectPassword = await bcrypt.compare(
					password,
					user.hashedPassword
				)

				if (!isCorrectPassword) {
					throw new Error('Invalid password!')
				}

				return user
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
}
