export interface IGetTasks {
	id: string
	title: string
	description: string
	date: string
	isCompleted: boolean
	isImportant?: boolean
}

export interface ICerateTask extends Omit<IGetTasks, 'id'> {}
