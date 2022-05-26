import { object, ref, string } from 'yup'

const baseSchema = object({
	email: string().email().required('Email is required'),
	password: string().min(3).required('Password is required'),
})

export const loginValidation = baseSchema

export const registerValidation = object().shape({
	username: string().required(),
	email: string().email().required('Email is required'),
	password: string().min(3).required('Password is required'),
	repeat_password: string().test(
		'passwords-match',
		'Passwords must match',
		function (value) {
			return this.parent.password === value
		}
	),
})
