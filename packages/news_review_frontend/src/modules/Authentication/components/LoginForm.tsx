import React from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { useBinaryMutations } from '@thelasthurrah/authentication_api'
import { Container, TextField, Button } from '@mui/material'
import { loginValidation } from '../helpers/validations'
import { useErrorAndSuccess } from '../../../utils/hooks/errorAndSuccess'
import { ErrorAlert } from '../../../partials/ErrorAlert'

interface ILoginFormValues {
	email: string
	password: string
}

export const LoginForm = () => {
	const navigate = useNavigate()
	const client = useBinaryMutations()
	const { setErrorMessage, setError, checkError, errorMessage } =
		useErrorAndSuccess()

	const {
		handleSubmit,
		handleChange,
		values,
		touched,
		errors,
		dirty,
		isSubmitting,
	} = useFormik<ILoginFormValues>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: loginValidation,
		async onSubmit({ email, password }) {
			console.log(email, password)

			try {
				const result = await client.login({ email, password })

				if (result.data.login_user.success) {
					if (result.data.login_user.two_factor_authentication) {
						navigate('/2fa', { replace: true, state: { email } })
					} else {
						localStorage.setItem(
							'binary-stash-token',
							result.data.login_user.token
						)

						navigate('/', { replace: true })
					}
				}
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
				<h2>Login Form</h2>
				<ErrorAlert
					errorMessage={errorMessage}
					checkError={checkError}
				/>
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
				<br />
				<Link to="/forgot_password">Forgot Password?</Link>
			</div>
		</Container>
	)
}
