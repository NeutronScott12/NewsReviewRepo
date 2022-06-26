import React, { useEffect } from 'react'
import {
	useBinaryCommentQueries,
	useBinaryCommentMutations,
} from '@thelasthurrah/comment_api'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'

const application_id = '6064eb0c-08c9-4dea-87e7-89574a210644'

export const CommentComponent = () => {
	const commentQueriesApi = useBinaryCommentQueries()
	// const commentMutatationsApi = useBinaryCommentMutations()

	// const { handleSubmit, handleChange, values, touched, errors } = useFormik({
	// 	initialValues: {
	// 		body: '',
	// 	},
	// 	async onSubmit(values) {
	// 		console.log('values', values)

	// 		const thread = await commentMutatationsApi.findOneOrCreateOneThread(
	// 			{
	// 				application_id,
	// 				title: 'practice title',
	// 				website_url: 'localhost:3000',
	// 			}
	// 		)

	// 		console.log('THREAD', thread)

	// 		if (!thread) {
	// 			throw new Error('Thread needed')
	// 		}

	// 		const result = await commentMutatationsApi.createComment({
	// 			json_body: {},
	// 			plain_text_body: values.body,
	// 			application_id,
	// 			thread_id: thread.data.find_one_thread_or_create_one.id,
	// 		})
	// 	},
	// })

	const get_comments = async () => {
		commentQueriesApi
			.fetch_comemnts()
			.then((response) => {
				console.log('RESPONSE', response)
			})
			.catch(console.error)
	}

	// useEffect(() => {
	// 	console.log('CLIENT', client)

	// client.fetch_comemnts().then(console.log).catch(console.error)
	// }, [])

	return (
		<div>
			<h1>Comment Component</h1>
			<Button onClick={get_comments}>Get Comments</Button>
			{/* <form onSubmit={handleSubmit}>
				<TextField
					autoComplete="off"
					fullWidth
					label="Body"
					name="body"
					value={values.body}
					onChange={handleChange}
					error={touched.body && Boolean(errors.body)}
					helperText={touched.body && errors.body}
					style={{ marginBottom: '1rem' }}
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
			</form>  */}
		</div>
	)
}
