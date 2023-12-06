'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
	const [variant, setVariant] = useState<variant>('LOGIN')
	const [isLoading, setIsLoading] = useState(false)

	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/all-tasks')
		}
	}, [session?.status, router])

	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER')
		} else {
			setVariant('LOGIN')
		}
	}, [variant])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		if (variant === 'REGISTER') {
			axios
				.post('/api/register', data)
				.then(() => signIn('credentials', data))
				.catch(() => toast.error('All fields must be filled in!'))
				.finally(() => setIsLoading(false))
		}

		if (variant === 'LOGIN') {
			signIn('credentials', {
				...data,
				redirect: false,
			})
				.then(callback => {
					if (callback?.error) {
						toast.error('User does not exist!')
					}

					if (callback?.ok && !callback.error) {
						toast.success('Logged In!')
						router.push('/all-tasks')
					}
				})
				.finally(() => setIsLoading(false))
		}
	}

	const socialAction = (action: string) => {
		setIsLoading(true)
		signIn(action, { redirect: false })
			.then(callback => {
				if (callback?.error) {
					toast.error('User does not exist!')
				}

				if (callback?.ok && !callback.error) {
					toast.success('Logged In!')
				}
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<div
			className='mt-8 sm:mx-auto sm:w-full sm:max-w-md hover:shadow-2xl hover:shadow-purple-500
			transition duration-500 ease-in-out'
		>
			<div className='bg-neutral-900 px-4 py-8 shadow sm:rounded-lg sm:px-10'>
				<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					{variant === 'REGISTER' && (
						<Input
							id='name'
							label='name'
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						id='email'
						label='Email address'
						type='email'
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<Input
						id='password'
						label='Password'
						type='password'
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<div>
						<Button disabled={isLoading} type='submit' fullWidth>
							{variant === 'LOGIN' ? 'Sign in' : 'Register'}
						</Button>
					</div>
				</form>
				<div className='mt-6'>
					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-neutral-600' />
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='bg-neutral-900 text-neutral-600 px-2'>
								Or continue with
							</span>
						</div>
					</div>
					{/* <div className='mt-6 flex gap-2'>
						<AuthSocialButton
							icon={BsGithub}
							onClick={() => socialAction('github')}
						/>
						<AuthSocialButton
							icon={BsGoogle}
							onClick={() => socialAction('google')}
						/>
					</div> */}
				</div>
				<div className='flex gap-2 text-sm text-neutral-600 mt-6 px-2 justify-center'>
					<div>
						{variant === 'LOGIN'
							? 'New to Messenger?'
							: 'Already have an account?'}
					</div>
					<div onClick={toggleVariant} className='underline cursor-pointer'>
						{variant === 'LOGIN' ? 'Create an account' : 'Login'}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthForm
