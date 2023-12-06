import clsx from 'clsx'
import { FC } from 'react'

interface IButton {
	children: React.ReactNode
	type?: 'button' | 'submit' | 'reset' | undefined
	fullWidth?: boolean
	onClick?: () => void
	secondary?: boolean
	danger?: boolean
	disabled?: boolean
}

const Button: FC<IButton> = ({
	children,
	type,
	fullWidth,
	onClick,
	secondary,
	danger,
	disabled,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				`flex rounded-md justify-center items-center px-3 py-2 text-sm font-semibold
        focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2`,
				disabled && `opacity-50 cursor-default`,
				fullWidth && `w-full`,
				secondary ? `text-gray-900` : `text-neutral-300`,
				danger &&
					`bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600`,
				!secondary &&
					!danger &&
					`bg-purple-500 hover:bg-purple-600 focus-visible:outline-purple-600`
			)}
		>
			{children}
		</button>
	)
}

export default Button
