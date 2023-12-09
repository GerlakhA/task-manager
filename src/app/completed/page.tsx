'use client'

import TaskItem from '@/components/Tasks/TaskItem'
import { useAllTasks } from '@/hooks/useAllTasks'

const CompletedTasks = () => {
	const tasks = useAllTasks()

	const filter = tasks?.data?.filter(item => item.isCompleted === true)

	return (
		<div className='w-full h-full overflow-y-auto'>
			<h1 className='text-4xl font-semibold border-b-4 border-green-500 w-[250px]'>
				Completed tasks!
			</h1>
			<div className='flex flex-wrap gap-x-6 w-full h-full'>
				{filter?.map(item => (
					<div
						key={item.id}
						className='flex justify-start items-center w-[300px] h-[200px] border border-green-500
					mt-10 rounded-xl bg-neutral-600'
					>
						<TaskItem data={item} />
					</div>
				))}
			</div>
		</div>
	)
}

export default CompletedTasks
