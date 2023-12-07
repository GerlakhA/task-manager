import { IGetTasks } from '@/types/IGetTasks'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useAllTasks = () => {
	return useQuery<IGetTasks[]>({
		queryKey: ['get allTasks'],
		queryFn: async () => {
			const res = await axios.get('/api/tasks')
			return res.data
		},
	})
}
