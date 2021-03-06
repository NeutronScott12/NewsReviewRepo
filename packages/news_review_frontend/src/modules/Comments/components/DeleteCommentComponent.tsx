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
		thread_id: '7f89555c-d436-4f40-ae26-536f314ba3a0',
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
