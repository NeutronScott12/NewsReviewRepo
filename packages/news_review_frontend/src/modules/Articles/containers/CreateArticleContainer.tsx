import React, { useState } from 'react'
import { useFormik } from 'formik'

import SlateEditor from '../../../common/Editor'
import { Button } from '@mui/material'

export const CreateArticleContainer = () => {
	const [value, setValue] = useState([
		{
			//@ts-ignore
			type: 'paragraph',
			children: [{ text: 'This is editable ' }],
		},
	] as Node[])

	const { handleSubmit } = useFormik({
		initialValues: {
			body: '',
		},
		onSubmit() {
			console.log('value', value)
		},
	})

	return (
		<div>
			CreateArticleContainer
			<form onSubmit={handleSubmit}>
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
