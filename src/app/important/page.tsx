'use client'

import TaskItem from '@/components/Tasks/TaskItem'
import { useAllTasks } from '@/hooks/useAllTasks'
import { BeatLoader } from 'react-spinners'

const ImportantTasks = () => {
	const tasks = useAllTasks()

	const filter = tasks?.data?.filter(item => item.isImportant === true)
	// console.log(filter)

	if (tasks.isLoading) return <BeatLoader color='#36d7b7' />

	return (
		<div className='w-full h-full overflow-y-auto'>
			<h1 className='text-4xl font-semibold border-b-4 border-green-500 w-[250px]'>
				Important tasks!
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

export default ImportantTasks
