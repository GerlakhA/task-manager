import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateTasks = () => {
	return useMutation({
		mutationFn: async (task: { id: string; isCompleted: boolean }) => {
			const res = axios.put('/api/tasks', task)
		},
	})
}
