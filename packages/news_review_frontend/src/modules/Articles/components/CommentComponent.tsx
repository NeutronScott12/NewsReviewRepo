import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { useFormik } from 'formik'
import {
	useBinaryCommentQueries,
	useBinaryCommentMutations,
} from '@thelasthurrah/common'
import Moment from 'react-moment'

const application_id = '6064eb0c-08c9-4dea-87e7-89574a210644'

interface ICommentComponent {
	title: string
}

export const CommentComponent: React.FC<ICommentComponent> = ({ title }) => {
	const client = useBinaryCommentQueries()
	const commentMutatationsApi = useBinaryCommentMutations()
	const [comments, changeComments] = useState<any>([])

	useEffect(() => {
		client.fetch_comemnts().then((response) => {
			changeComments(response.data.fetch_comments.comments)
		})
	}, [])

	const {
		handleSubmit,
		handleChange,
		values,
		touched,
		errors,
		isSubmitting,
		dirty,
	} = useFormik({
		initialValues: {
			body: '',
		},
		async onSubmit(values) {
			const thread = await commentMutatationsApi.findOneOrCreateOneThread(
				{
					application_id,
					title,
					website_url: 'localhost:3000',
				}
			)

			if (!thread) {
				throw new Error('Thread needed')
			}

			const result = await commentMutatationsApi.createComment({
				json_body: [{}],
				plain_text_body: values.body,
				application_id,
				thread_id: thread.data.find_one_thread_or_create_one.id,
			})
		},
	})

	return (
		<div>
			<h1>Comment Component</h1>
			<form onSubmit={handleSubmit}>
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
					disabled={isSubmitting || dirty === false}
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
				>
					Submit
				</Button>
			</form>
			{comments.map((comment: any) => {
				return (
					<Paper
						key={comment.id}
						style={{ padding: '2rem 1rem', marginTop: '2rem' }}
					>
						<Grid container wrap="nowrap" spacing={2}>
							<Grid justifyContent="left" item xs zeroMinWidth>
								<h4 style={{ margin: 0, textAlign: 'left' }}>
									{comment.author.username}
								</h4>
								<p style={{ textAlign: 'left' }}>
									{comment.plain_text_body}
								</p>
								<p style={{ textAlign: 'left', color: 'gray' }}>
									<Moment format="DD/MM/YYYY">
										{comment.created_at}
									</Moment>
								</p>
							</Grid>
						</Grid>
					</Paper>
				)
			})}
		</div>
	)
}
