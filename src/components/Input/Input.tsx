'use client'

import clsx from 'clsx'
import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface IInput {
	label: string
	id: string
	type?: string
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	disabled?: boolean
}

const Input: FC<IInput> = ({
	label,
	id,
	type,
	register,
	required,
	errors,
	disabled,
}) => {
	return (
		<div>
			<label
				className='block text-sm font-medium leading-6 text-neutral-400'
				htmlFor={id}
			>
				{label}
			</label>
			<div className='mt-2'>
				<input
					type={type}
					disabled={disabled}
					id={id}
					autoComplete={id}
					{...register(id, { required })}
					className={clsx(
						`form-input text-neutral-300 block w-full bg-gray-800 ring-1
            p-1.5 shadow-sm ring-neutral-500 border-0 placeholder:text-neutral-500
            focus:ring-2 focus:ring-inset ring-inset focus:ring-sky-600 sm:text:sm
            sm:leading-6 rounded-md`,
						errors[id] && `focus:ring-500`,
						disabled && `opacity-50 cursor-default`
					)}
				/>
			</div>
		</div>
	)
}

export default Input
