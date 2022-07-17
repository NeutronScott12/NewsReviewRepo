import { Grid, Paper } from '@mui/material'
import Moment from 'moment'
import React from 'react'
import dayJs from 'dayjs'
import { CreateReplyComponent } from '../components/CreateReplyComponent'
import { DeleteCommentComponent } from '../components/DeleteCommentComponent'
import { EditCommmentComponent } from '../components/EditCommentComponent'
import { IComment } from '../types'
import { ReportCommentComponent } from '../components/ReportCommentComponent'

interface ICommentView {
	comment: IComment
	thread_id: string
}

export const CommentView: React.FC<ICommentView> = ({ comment, thread_id }) => {
	const displayDate = (date: string) => {
		const result = String(dayJs(date))

		return <span>{result}</span>
	}

	return (
		<Paper
			key={comment.id}
			style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}
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
						{displayDate(comment.created_at)}
					</p>
					<section>
						<DeleteCommentComponent comment_id={comment.id} />
						<EditCommmentComponent
							thread_id={thread_id}
							comment_id={comment.id}
							comment_body={comment.plain_text_body}
						/>
						<CreateReplyComponent
							thread_id={thread_id}
							parent_id={
								comment.parent_id
									? comment.parent_id
									: comment.id
							}
							replied_to_id={comment.author.id}
						/>
						<ReportCommentComponent comment_id={comment.id} />
					</section>
				</Grid>
			</Grid>
		</Paper>
	)
}
