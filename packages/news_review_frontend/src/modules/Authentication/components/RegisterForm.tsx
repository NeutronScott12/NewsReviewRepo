import React from 'react'
import { useFormik } from 'formik'
import { useBinaryMutations } from '@thelasthurrah/authentication_api'
import { Button, Container, TextField } from '@mui/material'

import { registerValidation } from '../helpers/validations'
import { useErrorAndSuccess } from '../../../utils/hooks/errorAndSuccess'
import { ErrorAlert } from '../../../partials/ErrorAlert'

export const RegisterForm = () => {
	const client = useBinaryMutations()
	const { setErrorMessage, setError, checkError, errorMessage } =
		useErrorAndSuccess()

	const {
		handleSubmit,
		handleChange,
		touched,
		values,
		errors,
		isSubmitting,
		dirty,
	} = useFormik({
		initialValues: {
			email: '',
			password: '',
			username: '',
			repeat_password: '',
		},
		validationSchema: registerValidation,
		async onSubmit(values) {
			console.log(values)

			try {
				const { email, password, username, repeat_password } = values

				console.log('REGISTER', client)

				const response = await client.register({
					email,
					password,
					username,
					repeat_password,
				})

				console.log(response)
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message)
					setError(true)
				}
			}
		},
	})

	return (
		<Container>
			<div>
				<h2>Register Form</h2>
				<ErrorAlert
					errorMessage={errorMessage}
					checkError={checkError}
				/>
				<form onSubmit={handleSubmit}>
					<TextField
						fullWidth
						id="username"
						label="Username"
						value={values.username}
						onChange={handleChange}
						error={touched.username && Boolean(errors.username)}
						helperText={touched.username && errors.username}
					/>
					<TextField
						fullWidth
						id="email"
						label="Email"
						value={values.email}
						onChange={handleChange}
						error={touched.email && Boolean(errors.email)}
						helperText={touched.email && errors.email}
					/>
					<TextField
						fullWidth
						id="password"
						label="Password"
						value={values.password}
						onChange={handleChange}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
					/>
					<TextField
						fullWidth
						id="repeat_password"
						label="Repeat Password"
						value={values.repeat_password}
						onChange={handleChange}
						error={
							touched.repeat_password &&
							Boolean(errors.repeat_password)
						}
						helperText={
							touched.repeat_password && errors.repeat_password
						}
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
		</Container>
	)
}
