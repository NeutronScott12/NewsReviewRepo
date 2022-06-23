import React from 'react'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'

import { useUpdateUserMutation } from '../../../../generated/graphql'
import { updateUserSchema } from '../../validation/updateUserSchema'
import { IFormValues, IUpdateProfileFormProps } from './types'
import { useErrorAndSuccess } from '../../../../utils/hooks/errorAndSuccess'
import { SucessAlert } from '../../../../partials/SuccessAlert'

export const UpdateProfileForm: React.FC<IUpdateProfileFormProps> = ({
	email,
	first_name,
	last_name,
	username,
}) => {
	const [updateUser] = useUpdateUserMutation()
	const { setSuccess, setSuccessMessage, checkSuccess, successMessage } =
		useErrorAndSuccess()

	const {
		handleSubmit,
		handleChange,
		errors,
		touched,
		values,
		isSubmitting,
		dirty,
	} = useFormik<IFormValues>({
		initialValues: {
			username: username || '',
			first_name: first_name || '',
			last_name: last_name || '',
			email: email || '',
		},
		validationSchema: updateUserSchema,
		async onSubmit(values, { setSubmitting }) {
			console.log('values', values)

			const result = await updateUser({
				variables: {
					updateUserInput: {
						...values,
					},
				},
			})

			if (result.data?.update_user.success) {
				setSuccess(true)
				setSuccessMessage(result.data.update_user.message)
				setSubmitting(false)
			}

			console.log('result', result)
		},
	})

	return (
		<>
			<br />
			<SucessAlert
				checkSucess={checkSuccess}
				sucessMessage={successMessage}
			/>
			<h1>Update Profile</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					name="first_name"
					label="First Name"
					fullWidth
					value={values.first_name || ''}
					onChange={handleChange}
					error={touched.first_name && Boolean(errors.first_name)}
					helperText={touched.first_name && errors.first_name}
				/>

				<TextField
					name="last_name"
					label="Last Name"
					fullWidth
					value={values.last_name || ''}
					onChange={handleChange}
					error={touched.last_name && Boolean(errors.last_name)}
					helperText={touched.last_name && errors.last_name}
				/>

				<TextField
					name="username"
					label="Username"
					fullWidth
					value={values.username || ''}
					onChange={handleChange}
					error={touched.username && Boolean(errors.username)}
					helperText={touched.username && errors.username}
				/>

				<TextField
					name="email"
					label="Email"
					fullWidth
					value={values.email || ''}
					onChange={handleChange}
					error={touched.email && Boolean(errors.email)}
					helperText={touched.email && errors.email}
				/>

				<Button
					disabled={isSubmitting || dirty === false}
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
				>
					Update
				</Button>
			</form>
		</>
	)
}
