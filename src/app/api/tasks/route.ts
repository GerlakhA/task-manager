import { prisma } from '@/libs/prismadb'
import { ICerateTask } from '@/types/IGetTasks'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const session = await getServerSession()
	try {
		if (!session?.user?.email) {
			return NextResponse.json({ error: 'Unauthorized', status: 500 })
		}

		const { title, date, description, isImportant, isCompleted }: ICerateTask =
			await req.json()

		if (!title || !date || !description) {
			return NextResponse.json({
				error: 'Missing required fields',
				status: 400,
			})
		}

		if (title.length < 3) {
			return NextResponse.json({
				error: 'Title must be at least a 3 characters long',
				status: 400,
			})
		}

		const createTask = await prisma?.task?.create({
			data: {
				title,
				description,
				date,
				isImportant: isImportant,
				isCompleted: isCompleted,
				userId: session?.user?.email,
			},
		})

		// console.log('Task created: ', createTask)
		return NextResponse.json(createTask)
	} catch (error) {
		console.log('ERROR CREATING TASK: ', error)
		return NextResponse.json({ error: 'Error creating task', status: 500 })
	}
}

export async function GET(req: Request) {
	const session = await getServerSession()
	try {
		if (!session?.user?.email) {
			return NextResponse.json({ error: 'Unauthorized', status: 500 })
		}
		const task = await prisma.task.findMany({
			where: {
				userId: session?.user?.email,
			},
		})

		// console.log('GET TASKS: ', task)

		return NextResponse.json(task)
	} catch (error) {
		console.log('ERROR GETTING TASK: ', error)
		return NextResponse.json({ error: 'Error getting task', status: 500 })
	}
}

export async function PUT(req: Request) {
	const session = await getServerSession()

	try {
		if (!session?.user?.email) {
			return NextResponse.json({ error: 'Unauthorized', status: 500 })
		}
		const { id, isCompleted } = await req.json()

		const updateTask = await prisma.task.update({
			where: {
				id,
			},
			data: {
				isCompleted,
			},
		})

		console.log('UPDATE TASKS: ', updateTask)

		return NextResponse.json(updateTask)
	} catch (error) {
		console.log('ERROR UPDATING TASK: ', error)
		return NextResponse.json({ error: 'Error updat ing task', status: 500 })
	}
}

// export async function DELETE(req: Request) {
// 	const session = await getServerSession()
// 	try {
// 		if (!session?.user?.email) {
// 			return NextResponse.json({ error: 'Unauthorized', status: 500 })
// 		}

// 		const deleteTaks = await prisma.task.delete({
// 			where: {
// 				id: 'clpqsq7m40001redj384gj2x3',
// 			},
// 		})

// 		console.log('DELETE TASKS: ', deleteTaks)
// 	} catch (error) {
// 		console.log('ERROR DELETING TASK: ', error)
// 		return NextResponse.json({ error: 'Error deleting task', status: 500 })
// 	}
// }
