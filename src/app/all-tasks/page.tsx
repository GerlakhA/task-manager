'use client'

import AddTasks from '@/components/AddTasks/AddTasks'
import TaskItem from '@/components/Tasks/TaskItem'
import { IGetTasks } from '@/types/IGetTasks'
import { useQuery } from '@tanstack/react-query'
import { BeatLoader } from 'react-spinners'

const page = () => {
	const tasks = useQuery<IGetTasks[]>({
		queryKey: ['get allTasks'],
		queryFn: async () => {
			const res = await fetch('/api/tasks')
			return res.json()
		},
	})

	// const filter = tasks.data?.filter(item => item.completed === true)

	// console.log(filter)

	if (tasks.isLoading) return <BeatLoader color='#36d7b7' />

	return (
		<main className='w-full h-full overflow-y-auto'>
			<h1 className='text-4xl font-semibold border-b-4 border-green-500 w-40'>
				All Tasks
			</h1>
			<div className='flex flex-wrap gap-x-6 w-full h-full '>
				{tasks?.data &&
					tasks?.data?.map(item => (
						<div
							key={item.id}
							className='flex justify-start items-center w-[300px] h-[200px] border border-green-500
								mt-10 rounded-xl bg-neutral-600'
						>
							{/* {toast(`${item.isCompleted}`)} */}
							<TaskItem key={item.id} data={item} />
							{/* <Tasks /> */}
							{/* <CreateContent /> */}
						</div>
					))}
				<AddTasks />
			</div>
		</main>
	)
}

export default page
