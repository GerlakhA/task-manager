'use client'

import { IGetTasks } from '@/types/IGetTasks'
import axios from 'axios'
import React, { FC, createContext, useEffect, useState } from 'react'

interface IContext {
	completed: boolean
	important: boolean
	title: string
	description: string
	date: string
	setTitle: (title: string) => void
	setDescription: (description: string) => void
	setDate: (date: string) => void
	setImportant: (important: boolean) => void
	setCompleted: (completed: boolean) => void
	task: IGetTasks[]
}

interface IMyGlobalContext {
	children: React.ReactNode
}

export const globalContext = createContext({} as IContext)

const MyGlobalContext: FC<IMyGlobalContext> = ({ children }) => {
	const [task, setTask] = useState([])
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [completed, setCompleted] = useState(false)
	const [important, setImportant] = useState(false)

	const allTask = async () => {
		try {
			const res = await axios.get('/api/tasks')
			setTask(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		allTask()
	}, [])

	return (
		<globalContext.Provider
			value={{
				completed,
				important,
				title,
				date,
				description,
				setTitle,
				setDescription,
				setDate,
				setImportant,
				setCompleted,
				task,
			}}
		>
			{children}
		</globalContext.Provider>
	)
}

export default MyGlobalContext
