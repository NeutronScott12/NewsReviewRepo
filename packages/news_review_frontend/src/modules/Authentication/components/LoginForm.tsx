import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { AuthenticationAPI } from '@thelasthurrah/authentication_api'
import { Container, TextField, Button } from '@mui/material'
import { loginValidation } from '../helpers/login_validation'

interface ILoginFormValues {
	email: string
	password: string
}

export const LoginForm = () => {
	const navigate = useNavigate()

	const { handleSubmit, values, touched, errors, handleChange, dirty, isSubmitting } =
		useFormik<ILoginFormValues>({
			initialValues: {
				email: '',
				password: '',
			},
			validationSchema: loginValidation,
			async onSubmit({ email, password }) {
				console.log(email, password)
				const response = new AuthenticationAPI(
					'http://localhost:4000/graphql',
					'first-application'
				)

				const result = await response.mutations.login({ email, password })

				console.log(result)

				if (result.data.login_user.success) {
					console.log(result)

					localStorage.setItem('binary-stash-token', result.data.login_user.token)

					navigate('/', { replace: true })
				} else {
					console.log("Didn't work", result)
				}
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
