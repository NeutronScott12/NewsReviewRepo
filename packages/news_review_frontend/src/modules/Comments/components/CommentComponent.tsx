import React, { useEffect, useState } from 'react'

import {
	useBinaryCommentQueries,
	useBinaryCommentMutations,
	useFetchComments,
} from '@thelasthurrah/common'
import { LoadingComponent } from '../../../partials/Loading'
import { CommentView } from '../views/CommentView'
import { CreateCommentComponent } from './CreateCommentComponent'
import { CommentGroup } from '../views/CommentGroup'

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
	}, [])

	console.log('DATA', data)

	return loading ? (
		<LoadingComponent />
	) : (
		<div>
			<h1>Comment Component</h1>
			<CreateCommentComponent thread_id={thread_id} />
			<CommentGroup
				comments={data.fetch_comments_by_thread_id.comments}
				thread_id={thread_id}
			/>
		</div>
	)
}
