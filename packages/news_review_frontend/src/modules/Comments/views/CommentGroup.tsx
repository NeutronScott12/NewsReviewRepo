import { Container } from '@mui/material'
import React from 'react'
import { IComment } from '../types'
import { CommentView } from './CommentView'

interface ICommentGroup {
	comments: IComment[]
	thread_id: string
}

export const CommentGroup: React.FC<ICommentGroup> = ({
	comments,
	thread_id,
}) => {
	return (
		<>
			{comments.map((comment) => {
				return (
					<div key={comment.id + Math.random()}>
						<CommentView
							comment={comment}
							thread_id={thread_id}
							key={comment.id}
						/>
						<Container>
							{comment.replies.map((reply) => {
								return (
									<CommentView
										//@ts-ignore
										comment={reply}
										thread_id={thread_id}
										key={reply.id}
									/>
								)
							})}
						</Container>
					</div>
				)
			})}
		</>
	)
}
