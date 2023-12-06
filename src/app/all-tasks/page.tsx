'use client'

import AddTasks from '@/components/AddTasks/AddTasks'
import TaskItem from '@/components/Tasks/TaskItem'
import { IGetTasks } from '@/types/IGetTasks'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'

const page = () => {
	const tasks = useQuery({
		queryKey: ['get allTasks'],
		queryFn: async () => {
			const res = await axios.get<IGetTasks[]>('/api/tasks')
			return res.data
		},
	})

	// const filter = tasks.data?.filter(item => item.completed === true)

	// console.log(filter)

	if (tasks.isLoading) return <BeatLoader color='#36d7b7' />

	return (
		<main className='w-full h-full overflow-hidden'>
			<h1 className='text-4xl font-semibold border-b-4 border-green-500 w-40'>
				All Tasks
			</h1>
			<div className='flex flex-wrap gap-x-6 w-full h-full overflow-y-auto'>
				{tasks.isSuccess &&
					tasks?.data?.map(item => (
						<div
							key={item.id}
							className='flex justify-start items-center w-[300px] h-[200px] border border-green-500
								mt-10 rounded-xl bg-neutral-600'
						>
							<TaskItem data={item} />
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
