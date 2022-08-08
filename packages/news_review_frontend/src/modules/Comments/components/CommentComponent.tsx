import React from 'react'
import {
	useBinaryCommentQueries,
	useFetchComments,
} from '@thelasthurrah/common'
import { LoadingComponent } from '../../../partials/Loading'
import { CreateCommentComponent } from './CreateCommentComponent'
import { CommentGroup } from '../views/CommentGroup'

interface ICommentComponent {
	title: string
	thread_id: string
	thread_closed: boolean
}

export enum Sort {
	Asc = 'ASC',
	Desc = 'DESC',
	TopVotes = 'TOP_VOTES',
}

export const CommentComponent: React.FC<ICommentComponent> = ({
	title,
	thread_id,
}) => {
	const client = useBinaryCommentQueries()

	const { data, loading } = useFetchComments({
		client: client.client,
		thread_id,
	})

	console.log('DATA', data)

	return loading ? (
		<LoadingComponent />
	) : (
		<div>
			<h1>Comment Component</h1>
			<CreateCommentComponent thread_id={thread_id} />
			{data && data.fetch_comments_by_thread_id.comments ? (
				<CommentGroup
					comments={data && data.fetch_comments_by_thread_id.comments}
					thread_id={thread_id}
				/>
			) : null}
		</div>
	)
}
