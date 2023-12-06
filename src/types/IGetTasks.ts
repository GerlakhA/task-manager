export interface IGetTasks {
	id: string
	title: string
	description: string
	date: string
	completed?: boolean
	important?: boolean
}

export interface ICerateTask extends Omit<IGetTasks, 'id'> {}
