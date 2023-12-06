'use client'

import { IGetTasks } from '@/types/IGetTasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa6'
import { LuFileEdit } from 'react-icons/lu'

interface ITaskItem {
	data: IGetTasks
}

const TaskItem: FC<ITaskItem> = ({ data }) => {
	const client = useQueryClient()

	const deleteTasks = useMutation({
		mutationKey: ['delete item'],
		mutationFn: async (id: string) => {
			const res = await axios.delete(`/api/tasks/${id}`)
			return res.data
		},
	})
	client.invalidateQueries({ queryKey: ['get allTasks'] })

	console.log(data.completed)

	const deleteTaskById = (id: string) => {
		deleteTasks.mutate(id)
		if (deleteTasks.isSuccess)
			return toast.success('Товар успешно удален из корзины!')
	}
	return (
		<div
			key={data.id}
			className='relative flex flex-col w-full h-full gap-4 p-2'
		>
			<div className='flex justify-start w-full border-b-2 border-b-green-500 gap-x-4'>
				<h2 className='text-xl text-neutral-400'>Title:</h2>
				<p className='text-lg font-bold text-neutral-400 overflow-hidden'>
					{data.title}
				</p>
			</div>
			<div>
				<p className='w-full h-[90px] overflow-y-auto'>{data.description}</p>
				<span>{data.date}</span>
				<div>
					{data?.completed ? <h3>Completed</h3> : <h3>Incompleted</h3>}
					<LuFileEdit
						onClick={() => {}}
						className='absolute right-[40px] bottom-[10px] text-neutral-400
						hover:text-white cursor-pointer text-[20px]'
					/>
					<FaTrash
						onClick={() => deleteTaskById(data.id)}
						className='absolute right-[10px] bottom-[10px] text-neutral-400
							hover:text-white cursor-pointer text-[20px]'
					/>
				</div>
			</div>
		</div>
	)
}

export default TaskItem
