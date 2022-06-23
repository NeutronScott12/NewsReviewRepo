import * as yup from 'yup'

export const updateUserSchema = yup.object().shape({
	email: yup.string().email().required(),
	username: yup.string().required(),
	first_name: yup.string().required(),
	last_name: yup.string().required(),
})
