import { prisma } from '@/libs/prismadb'
import bcrypt from 'bcrypt'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { email, name, password } = body

		if (!name || !email || !password) {
			return new NextResponse('All input required!!!', { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		// for postgres
		// const user = await prisma.user.create({
		// 	data: {
		// 		email,
		// 		name,
		// 		hashedPassword,
		// 		password,
		// 	},
		// })

		const user = await prisma.user.create({
			data: {
				email: email,
				name: name,
				hashedPassword: hashedPassword,
				password: password,
			},
		})

		return NextResponse.json(user)
	} catch (error: any) {
		console.log(error, 'Registration error!')
		return new NextResponse('Internal response', { status: 500 })
	}
}
