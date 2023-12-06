'use client'

import { useState } from 'react'
import ModalAddTasks from '../Modals/ModalAddTasks'

// interface IAddTasks {
// 	data: IGetTasks[]
// }

const AddTasks = () => {
	const [open, setOpen] = useState(false)
	return (
		<div
			onClick={() => setOpen(true)}
			className='flex justify-start items-center w-[300px] h-[200px] border-dashed
      mt-10 rounded-xl border border-neutral-400 cursor-pointer'
		>
			<div className='flex gap-x-2 justify-center items-center w-full h-full'>
				<span className='text-neutral-400'>+</span>
				<span className='text-neutral-400'>Add new task</span>
			</div>
			{open && <ModalAddTasks open={open} setOpen={setOpen} />}
		</div>
	)
}

export default AddTasks
