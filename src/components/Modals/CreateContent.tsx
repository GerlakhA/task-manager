'use client'

import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CreateContent = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [completed, setCompleted] = useState(false)
	const [important, setImportant] = useState(false)

	const client = useQueryClient()

	const handleChange = (name: string) => (e: any) => {
		switch (name) {
			case 'title':
				setTitle(e.target.value)
				break
			case 'description':
				setDescription(e.target.value)
				break
			case 'date':
				setDate(e.target.value)
				break
			case 'completed':
				setCompleted(e.target.checked)
				break
			case 'important':
				setImportant(e.target.checked)
				break
			default:
				break
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const task = {
			title,
			description,
			date,
			important,
			completed,
		}

		try {
			const res = await axios.post('/api/tasks', task)
			if (res.data.error) {
				toast.error(res.data.error)
			}
			toast.success('Task created successfully.')
			console.log('Task created: ', res.data)
			client.invalidateQueries({ queryKey: ['get allTasks'] })
		} catch (error) {
			toast.error('Something went wrong!')
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
			<h1>Create tasks</h1>
			<div className='flex justify-start items-center gap-x-4'>
				<label htmlFor='title'>Title: </label>
				<input
					value={title}
					type='text'
					id='title'
					name='title'
					onChange={handleChange('title')}
					placeholder='Create task'
					className='focus:outline-none'
				/>
			</div>
			<div>
				<label htmlFor='description'>Description</label>
				<textarea
					value={description}
					id='description'
					name='description'
					rows={4}
					onChange={handleChange('description')}
					placeholder='Create task'
					className='focus:outline-none'
				/>
			</div>
			<div>
				<label htmlFor='date'>Date</label>
				<input
					value={date}
					type='date'
					id='date'
					name='date'
					onChange={handleChange('date')}
					className='focus:outline-none'
				/>
			</div>
			<div>
				<label htmlFor='completed'>Toggle completed</label>
				<input
					value={completed.toString()}
					type='checkbox'
					id='completed'
					name='completed'
					onChange={handleChange('completed')}
				/>
			</div>
			<div>
				<label htmlFor='important'>Toggle important</label>
				<input
					value={important.toString()}
					type='checkbox'
					id='important'
					name='important'
					onChange={handleChange('important')}
				/>
			</div>
			<div>
				<button type='submit'>Submit</button>
			</div>
		</form>
	)
}

export default CreateContent
