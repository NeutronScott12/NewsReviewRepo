import { object, string } from 'yup'

export const loginValidation = object().shape({
	email: string().email().required('Email is required'),
	password: string().min(3).required('Password is required'),
})
