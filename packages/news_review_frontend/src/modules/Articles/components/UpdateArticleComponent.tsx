import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { plainTextserialiser } from '../helpers/serializers'
import SlateEditor from '../../../common/Editor'
import { useUpdateArticleMutation } from '../../../generated/graphql'

interface IUpdateArticleComponent {
	value_body: Node[]
	title: string
	id: string
}

export const UpdateArticleComponent: React.FC<IUpdateArticleComponent> = ({
	value_body,
	title,
	id,
}) => {
	const [value, setValue] = useState(value_body as Node[])
	const [updateArticle] = useUpdateArticleMutation()
	const navigate = useNavigate()

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: {
			title,
		},
		async onSubmit(values) {
			console.log('value', value)
			console.log('values', values)

			const result = await updateArticle({
				variables: {
					updateArticleInput: {
						id,
						title: values.title,
						json_body: value,
						plain_text_body: plainTextserialiser(value),
					},
				},
			})

			if (
				result !== undefined &&
				result.data !== null &&
				result.data !== undefined
			) {
				navigate(`/article/${result.data.update_article.slug}`)
			}
		},
	})

	return (
		<div>
			Update Article
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
