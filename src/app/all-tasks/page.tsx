'use client'

import AddTasks from '@/components/AddTasks/AddTasks'
import TaskItem from '@/components/Tasks/TaskItem'
import { useAllTasks } from '@/hooks/useAllTasks'
import { BeatLoader } from 'react-spinners'

const page = () => {
	const tasks = useAllTasks()

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
