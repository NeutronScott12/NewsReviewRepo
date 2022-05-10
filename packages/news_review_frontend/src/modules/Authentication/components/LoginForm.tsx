import React from 'react'
import { useFormik } from 'formik'

import { AuthenticationAPI } from '@thelasthurrah/authentication_api'
import { Container, TextField, Button } from '@mui/material'
import { loginValidation } from '../helpers/login_validation'

interface ILoginFormValues {
	email: string
	password: string
}

export const LoginForm = () => {
	const { handleSubmit, values, touched, errors, handleChange, dirty, isSubmitting } =
		useFormik<ILoginFormValues>({
			initialValues: {
				email: '',
				password: '',
			},
			validationSchema: loginValidation,
			async onSubmit({ email, password }) {
				console.log(email, password)
				const response = await new AuthenticationAPI(
					'http://localhost:4000/graphql',

					'first-application'
				)
			},
		})

	return (
		<Container>
			<div>
				<h2>Login Form</h2>

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
					<TextField
						fullWidth
						id="password"
						label="Password"
						value={values.password}
						onChange={handleChange}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
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
