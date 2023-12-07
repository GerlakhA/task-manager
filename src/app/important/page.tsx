'use client'

import TaskItem from '@/components/Tasks/TaskItem'
import { IGetTasks } from '@/types/IGetTasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'

const page = () => {
	const client = useQueryClient()

	const tasks = useQuery({
		queryKey: ['get allTasks'],
		queryFn: async () => {
			const res = await axios.get<IGetTasks[]>(`/api/tasks`)
			return res.data
		},
	})

	const filter = tasks?.data?.filter(item => item.isImportant === true)

	// console.log(filter)

	const deleteTasks = useMutation({
		mutationKey: ['delete item'],
		mutationFn: async (id: string) => {
			await axios.delete(`/api/tasks/${id}`)
		},
	})
	// client.invalidateQueries({ queryKey: ['get important'] })

	if (tasks.isLoading) return <BeatLoader color='#36d7b7' />

	return (
		<div className='w-full h-full overflow-y-auto'>
			<h1 className='text-4xl font-semibold border-b-4 border-green-500 w-[250px]'>
				Important tasks!
			</h1>
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
	)
}

export default page
