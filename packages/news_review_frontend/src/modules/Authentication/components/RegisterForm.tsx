import React from 'react'
import { useFormik } from 'formik'
import { registerValidation } from '../helpers/validations'
import { Button, Container, TextField } from '@mui/material'
import { AuthenticationAPI } from '@thelasthurrah/authentication_api'

export const RegisterForm = () => {
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

			const registerAPI = new AuthenticationAPI(
				'http://localhost:4000/graphql',
				'first-application'
			)

			const { email, password, username, repeat_password } = values

			const response = await registerAPI.mutations.register({
				email,
				password,
				username,
				repeat_password,
			})

			console.log(response)
		},
	})

	return (
		<Container>
			<div>
				<h2>Register Form</h2>

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
