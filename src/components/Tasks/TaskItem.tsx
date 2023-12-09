'use client'

import { useDeleteTask } from '@/hooks/useDeleteTask'
import { useUpdateTasks } from '@/hooks/useUpdateTasks'
import { IGetTasks } from '@/types/IGetTasks'
import { useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa6'
import { LuFileEdit } from 'react-icons/lu'

interface ITaskItem {
	data: IGetTasks
}

const TaskItem: FC<ITaskItem> = ({ data }) => {
	const client = useQueryClient()
	const deleteTasks = useDeleteTask()

	const deleteTaskById = (id: string) => {
		toast.success(`Task delete ${data.title} successfully!`)
		deleteTasks.mutate(id)
	}

	const updateTask = useUpdateTasks()

	client.invalidateQueries({ queryKey: ['get allTasks'] })

	const handleUpdateTask = () => {
		try {
			const obj = {
				id: data.id,
				isCompleted: !data.isCompleted,
			}

			updateTask.mutate(obj)
			toast.success(`Task ${data.title} update successfully!`)
		} catch (error) {
			toast.error(`${error}`)
		}
	}

	return (
		<div className='relative flex flex-col w-full h-full gap-4 p-2'>
			<div className='flex justify-start w-full border-b-2 border-b-green-500 gap-x-4'>
				<h2 className='text-xl text-neutral-400'>Title:</h2>
				<p className='text-lg font-bold text-neutral-400 overflow-x-auto w-full'>
					{data.title}
				</p>
			</div>
			<div>
				<p className='w-full h-[90px] overflow-y-auto'>{data.description}</p>
				<span>{data.date}</span>
				<div>
					{data.isCompleted ? (
						<button
							onClick={handleUpdateTask}
							className='w-[110px] rounded-lg bg-green-500'
						>
							Completed
						</button>
					) : (
						<button
							onClick={handleUpdateTask}
							className='w-[110px] rounded-lg bg-green-500'
						>
							InCompleted
						</button>
					)}
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
