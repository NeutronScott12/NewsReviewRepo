import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { useFormik } from 'formik'
import {
	useBinaryCommentQueries,
	useBinaryCommentMutations,
	useCreateComment,
	useFetchComments,
} from '@thelasthurrah/common'
import Moment from 'react-moment'
import { EditCommmentComponent } from './EditCommentComponent'
import { LoadingComponent } from '../../../partials/Loading'

const application_id = '6064eb0c-08c9-4dea-87e7-89574a210644'

interface ICommentComponent {
	title: string
}

export enum Sort {
	Asc = 'ASC',
	Desc = 'DESC',
	TopVotes = 'TOP_VOTES',
}

export const CommentComponent: React.FC<ICommentComponent> = ({ title }) => {
	const client = useBinaryCommentQueries()
	const { data, loading } = useFetchComments({
		client: client.client,
		thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
	})
	const [flipper, changeFlipper] = useState(false)
	const [createComment] = useCreateComment(
		{
			thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
		},
		{
			application_short_name: 'first-application',
			limit: 10,
			skip: 0,
			sort: Sort.Desc,
			client: client.client,
		}
	)
	const commentMutatationsApi = useBinaryCommentMutations()
	const [thread_id, setThreadId] = useState('')

	useEffect(() => {
		commentMutatationsApi
			.findOneOrCreateOneThread({
				application_id,
				title,
				website_url: window.location.href,
			})
			.then((thread) => {
				if (thread && thread.data) {
					setThreadId(thread.data.find_one_thread_or_create_one.id)
				} else {
					throw Error('Something went wrong with the thread')
				}
			})
			.catch(console.error)

		console.log('flipper', flipper)
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
			const result = await createComment({
				variables: {
					createCommentInput: {
						json_body: [{}],
						plain_text_body: values.body,
						application_id,
						thread_id,
					},
				},
			})

			// {
			//     json_body: [{}],
			//     plain_text_body: values.body,
			//     application_id,
			//     thread_id,
			// }

			changeFlipper(true)

			console.log('RESULT', result)
		},
	})

	const delete_comment = async (comment_id: string) => {
		const thread = await commentMutatationsApi.findOneOrCreateOneThread({
			application_id,
			title,
			website_url: 'localhost:3000',
		})

		if (thread === undefined || !thread.data) {
			console.log('No Thread')
			return
		}

		const result = await commentMutatationsApi.deleteComment({
			comment_id,
			thread_id: thread.data.id,
		})

		console.log('RESULT', result)
	}

	console.log('DATA', data)

	return loading ? (
		<LoadingComponent />
	) : (
		<div>
			<p>flipper {flipper}</p>
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
			{data?.fetch_comments_by_thread_id.comments.map((comment: any) => {
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
								<section>
									<Button
										onClick={() =>
											delete_comment(comment.id)
										}
									>
										Delete
									</Button>
									<Button>Edit</Button>
									<EditCommmentComponent
										thread_id={thread_id}
										comment_id={comment.id}
										comment_body={comment.plain_text_body}
									/>
								</section>
							</Grid>
						</Grid>
					</Paper>
				)
			})}
		</div>
	)
}
