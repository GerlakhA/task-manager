'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC } from 'react'
import CreateContent from './CreateContent'

interface IModalAddTasks {
	open: boolean
	setOpen: (open: boolean) => void
}

const ModalAddTasks: FC<IModalAddTasks> = ({ open, setOpen }) => {
	return (
		<Dialog.Root open={open} defaultOpen={open} onOpenChange={setOpen}>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-600 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<CreateContent />
					<Dialog.Close asChild>
						<button
							className='text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none'
							aria-label='Close'
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default ModalAddTasks
