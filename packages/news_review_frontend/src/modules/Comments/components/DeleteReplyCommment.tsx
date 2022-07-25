import React from 'react'
import { Button } from '@mui/material'
import {
	useDeleteReplyComment,
	useBinaryCommentMutations,
} from '@thelasthurrah/common'
import { Sort } from './CommentComponent'

interface IDeleteReplyComment {
	comment_id: string
	parent_id: string
}

export const DeleteReplyComment: React.FC<IDeleteReplyComment> = ({
	comment_id,
	parent_id,
}) => {
	const binary = useBinaryCommentMutations()
	const [deleteReplyComment] = useDeleteReplyComment({
		client: binary.client,
		comment_id,
		application_short_name: 'first-application',
		limit: 10,
		parent_id,
		skip: 0,
		sort: Sort.Desc,
		thread_id: '7f89555c-d436-4f40-ae26-536f314ba3a0',
	})

	const delete_comment = async (comment_id: string) => {
		await deleteReplyComment({
			variables: {
				commentId: comment_id,
			},
		})
	}

	return <Button onClick={() => delete_comment(comment_id)}>Delete</Button>
}
