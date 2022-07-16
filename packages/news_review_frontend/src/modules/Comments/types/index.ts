export interface IComment {
	__typename?: 'CommentModel'
	application_id: string
	plain_text_body: string
	json_body: Array<any>
	id: string
	thread_id: string
	created_at: any
	updated_at: any
	user_id: string
	parent_id?: string | null
	pending: boolean
	edited: boolean
	approved: boolean
	reply_notification: boolean
	replies: Array<{
		__typename?: 'CommentModel'
		parent_id?: string | null
		application_id: string
		plain_text_body: string
		json_body: Array<any>
		id: string
		thread_id: string
		created_at: any
		updated_at: any
		user_id: string
		pending: boolean
		edited: boolean
		approved: boolean
		reply_notification: boolean
		replies: Array<{
			__typename?: 'CommentModel'
			application_id: string
			plain_text_body: string
			json_body: Array<any>
			id: string
			thread_id: string
			created_at: any
			updated_at: any
			user_id: string
			parent_id?: string | null
			pending: boolean
			edited: boolean
			approved: boolean
			reply_notification: boolean
			author: {
				__typename?: 'UserModel'
				username: string
				id: string
			}
			up_vote: Array<{ __typename?: 'RatingModel'; id: string }>
			down_vote: Array<{ __typename?: 'RatingModel'; id: string }>
			_count: {
				__typename?: 'CountModel'
				down_vote: number
				replies: number
				up_vote: number
			}
			replied_to_user?: {
				__typename?: 'UserModel'
				username: string
			} | null
		}>
		author: {
			__typename?: 'UserModel'
			username: string
			id: string
		}
		up_vote: Array<{ __typename?: 'RatingModel'; id: string }>
		down_vote: Array<{ __typename?: 'RatingModel'; id: string }>
		_count: {
			__typename?: 'CountModel'
			down_vote: number
			replies: number
			up_vote: number
		}
		replied_to_user?: {
			__typename?: 'UserModel'
			username: string
		} | null
	}>
	author: { __typename?: 'UserModel'; username: string; id: string }
	up_vote: Array<{ __typename?: 'RatingModel'; id: string }>
	down_vote: Array<{ __typename?: 'RatingModel'; id: string }>
	_count: {
		__typename?: 'CountModel'
		down_vote: number
		replies: number
		up_vote: number
	}
	replied_to_user?: {
		__typename?: 'UserModel'
		username: string
	} | null
}
