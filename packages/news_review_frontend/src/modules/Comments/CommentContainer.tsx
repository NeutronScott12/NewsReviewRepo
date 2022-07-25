import { useEffect, useState } from 'react'
import { useBinaryCommentMutations } from '@thelasthurrah/common'
import { CommentComponent } from './components/CommentComponent'
import { LoadingComponent } from '../../partials/Loading'

const application_id = 'd2f58a0e-8d88-4677-90f4-915a4d333401'

interface ICommentContainer {
	title: string
}

export const CommentContainer: React.FC<ICommentContainer> = ({ title }) => {
	const commentMutatationsApi = useBinaryCommentMutations()
	const [thread_id, setThreadId] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		commentMutatationsApi
			.findOneOrCreateOneThread({
				application_id,
				title,
				website_url: window.location.href,
			})
			.then((thread) => {
				console.log('THREAD', thread)
				if (thread && thread.data) {
					setThreadId(thread.data.find_one_thread_or_create_one.id)
					setLoading(false)
				} else {
					setLoading(false)
					throw Error('Something went wrong with the thread')
				}
			})
			.catch(console.error)
	}, [])

	return loading ? (
		<LoadingComponent />
	) : thread_id ? (
		<CommentComponent title={title} thread_id={thread_id} />
	) : (
		<div>Thread was not loaded</div>
	)
}
