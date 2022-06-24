import React from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { useErrorAndSuccess } from '../../../utils/hooks/errorAndSuccess'
import { ErrorAlert } from '../../../partials/ErrorAlert'
import { useBinaryMutations } from '@thelasthurrah/authentication_api'

export const ForgotPasswordForm = () => {
	const client = useBinaryMutations()
	const { setErrorMessage, setError, checkError, errorMessage } =
		useErrorAndSuccess()

	const {
		handleSubmit,
		handleChange,
		values,
		errors,
		dirty,
		isSubmitting,
		touched,
	} = useFormik({
		initialValues: {
			email: '',
		},
		async onSubmit(values) {
			try {
				console.log(values)

				await client.forgot_password({
					email: values.email,
					redirect_url: '',
				})
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message)
					setError(true)
				}
			}
		},
	})

	return (
		<div>
			<h1>Forgot Password</h1>
			<ErrorAlert errorMessage={errorMessage} checkError={checkError} />
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					id="email"
					label="Email"
					value={values.email}
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
					Submit
				</Button>
			</form>
		</div>
	)
}
