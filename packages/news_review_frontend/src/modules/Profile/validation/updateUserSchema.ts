import * as yup from 'yup'

export const updateUserSchema = yup.object().shape({
	email: yup.string().email().optional(),
	username: yup.string().optional(),
	first_name: yup.string().optional(),
	last_name: yup.string().optional(),
})
