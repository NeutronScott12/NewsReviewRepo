import React, { useState } from 'react'
import { useFormik } from 'formik'

import SlateEditor from '../../../common/Editor'
import { Button, TextField, Typography } from '@mui/material'
import { useCreateArticleMutation } from '../../../generated/graphql'
import { plainTextserialiser } from '../helpers/serializers'

export const CreateArticleContainer = () => {
	const [createArticle] = useCreateArticleMutation()

	const [value, setValue] = useState([
		{
			//@ts-ignore
			type: 'paragraph',
			children: [{ text: 'This is editable ' }],
		},
	] as Node[])

	const { handleSubmit, values, handleChange, touched, errors } = useFormik({
		initialValues: {
			title: '',
		},
		async onSubmit({ title }) {
			console.log('value', value)

			const result = await createArticle({
				variables: {
					createArticleInput: {
						title,
						json_body: value,
						plain_text_body: plainTextserialiser(value),
					},
				},
			})

			console.log('result', result)
		},
	})

	return (
		<div style={{ marginTop: '.5rem' }}>
			<Typography
				variant="h5"
				component="div"
				style={{ marginBottom: '1rem' }}
				gutterBottom
			>
				CreateArticleContainer
			</Typography>

			<form onSubmit={handleSubmit}>
				<TextField
					autoComplete="off"
					fullWidth
					label="Title"
					name="title"
					value={values.title}
					onChange={handleChange}
					error={touched.title && Boolean(errors.title)}
					helperText={touched.title && errors.title}
					style={{ marginBottom: '1rem' }}
				/>

				<SlateEditor
					value={value}
					setValue={setValue}
					editorTitle="Create Article"
				/>
				<Button
					// disabled={formik.isSubmitting || formik.dirty === false}
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
