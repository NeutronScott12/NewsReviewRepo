import React from 'react'
import { Button } from '@mui/material'
import { useCommentVote, useBinaryCommentQueries } from '@thelasthurrah/common'
import { Sort } from './CommentComponent'

export const CommentVoteComponent = () => {
	const binary = useBinaryCommentQueries()
	const { upvote } = useCommentVote({
		thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
		client: binary.client,
	})
	// const [] = upvote()

	const upVote = async () => {
		// const result = await upvote()
		// console.log(result)
	}

	const downVote = () => {}

	return (
		<>
			<Button onClick={upVote}>+</Button>
			<Button onClick={downVote}>-</Button>
		</>
	)
}
