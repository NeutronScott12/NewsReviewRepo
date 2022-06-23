import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'

import SlateEditor from '../../../common/Editor'

interface IUpdateArticleComponent {
	value_body: Node[]
	title: string
}

export const UpdateArticleComponent: React.FC<IUpdateArticleComponent> = ({
	value_body,
	title,
}) => {
	const [value, setValue] = useState(value_body as Node[])

	const { handleSubmit, handleChange, values, touched, errors } = useFormik({
		initialValues: {
			title,
		},
		async onSubmit() {},
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
