import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteTask = () => {
	return useMutation({
		mutationKey: ['delete item'],
		mutationFn: async (id: string) => {
			const res = await axios.delete(`/api/tasks/${id}`)
			return res.data
		},
	})
}
