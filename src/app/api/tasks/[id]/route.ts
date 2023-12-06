import { prisma } from '@/libs/prismadb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession()
	const { id } = params
	try {
		if (!session?.user?.email) {
			return NextResponse.json({ error: 'Unauthorized', status: 500 })
		}

		const deleteTaks = await prisma.task.delete({
			where: {
				id,
			},
		})

		// console.log('DELETE TASKS: ', deleteTaks)
	} catch (error) {
		console.log('ERROR DELETING TASK: ', error)
		return NextResponse.json({ error: 'Error deleting task', status: 500 })
	}
}
