import React from 'react'
import { useFormik } from 'formik'
import { useBinaryMutations } from '@thelasthurrah/authentication_api'
import { Button, TextField } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

import { useErrorAndSuccess } from '../../../utils/hooks/errorAndSuccess'
import { ErrorAlert } from '../../../partials/ErrorAlert'
import { useCreateUserMutation } from '../../../generated/graphql'

export const TwoFactorLoginForm = () => {
	const client = useBinaryMutations()
	const { setErrorMessage, setError, checkError, errorMessage } =
		useErrorAndSuccess()
	const [createUser] = useCreateUserMutation()
	const { state } = useLocation()
	const navigate = useNavigate()

	console.log('STATE', state)

	const {
		handleSubmit,
		handleChange,
		values,
		dirty,
		isSubmitting,
		touched,
		errors,
	} = useFormik({
		initialValues: {
			two_factor_id: '',
		},
		async onSubmit(values) {
			console.log(values)

			const result = await client.two_factor_login({
				//@ts-ignore
				email: state.email,
				two_factor_id: values.two_factor_id,
			})

			console.log(result)

			if (result.data.two_factor_login.success) {
				localStorage.setItem(
					'binary-stash-token',
					result.data.two_factor_login.token
				)

				await createUser({
					variables: {
						createUserInput: {
							username: result.data.two_factor_login.username,
						},
					},
				})

				navigate('/', { replace: true })
			}
			try {
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
			<h1>Two Factor Login</h1>
			<ErrorAlert errorMessage={errorMessage} checkError={checkError} />
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					id="two_factor_id"
					label="Code"
					value={values.two_factor_id}
					onChange={handleChange}
					error={
						touched.two_factor_id && Boolean(errors.two_factor_id)
					}
					helperText={touched.two_factor_id && errors.two_factor_id}
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
