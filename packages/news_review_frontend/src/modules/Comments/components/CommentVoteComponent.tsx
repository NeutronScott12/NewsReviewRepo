import React from 'react'
import { Button } from '@mui/material'
import {
	useUpVoteComment,
	useDownVoteComment,
	useBinaryCommentQueries,
} from '@thelasthurrah/common'
import { Sort } from './CommentComponent'

interface ICommentVoteComponent {
	comment_id: string
}

export const CommentVoteComponent: React.FC<ICommentVoteComponent> = ({
	comment_id,
}) => {
	const binary = useBinaryCommentQueries()
	const [upvote] = useUpVoteComment({
		thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
		client: binary.client,
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
	})
	const [downvote] = useDownVoteComment({
		thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
		client: binary.client,
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
	})

	// const [] = upvote()

	const upVote = async () => {
		const result = await upvote({
			variables: {
				comment_id,
			},
		})
		console.log(result)
	}

	const downVote = async () => {
		const result = await downvote({
			variables: { comment_id },
		})

		console.log(result)
	}

	return (
		<>
			<Button onClick={upVote}>+</Button>
			<Button onClick={downVote}>-</Button>
		</>
	)
}
