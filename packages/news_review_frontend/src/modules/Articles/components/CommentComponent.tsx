import React, { useEffect } from 'react'
import { useBinaryCommentQueries } from '@thelasthurrah/comment_api'

export const CommentComponent = () => {
	const client = useBinaryCommentQueries()

	useEffect(() => {
		console.log('CLIENT', client)
		client.fetch_comemnts().then(console.log).catch(console.error)
	})

	return (
		<div>
			<h1>Comment Component</h1>
		</div>
	)
}
