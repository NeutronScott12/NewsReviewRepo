import React from 'react'
import { useFormik, Formik, Form, Field } from 'formik'

import { BinaryStashAuthenticator } from '@thelasthurrah/binary-stash-authentication'
import { Container, TextField } from '@mui/material'

interface ILoginFormValues {
	email: string
	password: string
}

export const LoginForm = () => {
	// const formik = useFormik<ILoginFormValues>({
	// 	initialValues: {
	// 		email: '',
	// 		password: '',
	// 	},
	// 	async onSubmit({ email, password }) {
	// 		console.log(email, password)
	// 	},
	// })

	return (
		// <Container>
		<div>
			<h2>Login Form</h2>
			{/* <Formik
				initialValues={{
					email: '',
					password: '',
				}}
				onSubmit={async ({ email, password }: ILoginFormValues) => {
					console.log(email, password)
				}}
			>
				{({ values, handleChange, touched, errors }) => (
					<Form>
						<TextField
							fullWidth
							id="email"
							label="Email"
							value={values.email}
							onChange={handleChange}
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
						/>
					</Form>
				)}
			</Formik> */}
			{/* <form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="email"
					label="Email"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					fullWidth
					id="password"
					label="Password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>
				<button type="submit">Submit</button>
			</form> */}
		</div>

		// </Container>
	)
}
