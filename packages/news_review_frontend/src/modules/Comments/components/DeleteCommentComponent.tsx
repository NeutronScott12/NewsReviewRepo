import { Button } from '@mui/material'
import {
	useBinaryCommentQueries,
	useDeleteComment,
} from '@thelasthurrah/common'
import { Sort } from './CommentComponent'

interface IDeleteCommentComponent {
	comment_id: string
}

export const DeleteCommentComponent = ({
	comment_id,
}: IDeleteCommentComponent) => {
	const client = useBinaryCommentQueries()

	const [deleteComment] = useDeleteComment({
		client: client.client,
		comment_id,
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
		thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
		cache: client.client.cache,
	})

	const delete_comment = async (comment_id: string) => {
		const result = await deleteComment({
			variables: { commentId: comment_id },
		})
		// const thread = await commentMutatationsApi.findOneOrCreateOneThread({
		// 	application_id,
		// 	title,
		// 	website_url: 'localhost:3000',
		// })

		// if (thread === undefined || !thread.data) {
		// 	console.log('No Thread')
		// 	return
		// }

		// const result = await commentMutatationsApi.deleteComment({
		// 	comment_id,
		// 	thread_id: thread.data.id,
		// })

		console.log('RESULT', result)
	}

	return <Button onClick={() => delete_comment(comment_id)}>Delete</Button>
}
