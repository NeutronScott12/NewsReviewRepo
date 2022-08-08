import { useEffect, useState } from 'react'
import {
	useBinaryCommentMutations,
	useFindorCreateThread,
} from '@thelasthurrah/common'
import { CommentComponent, Sort } from './components/CommentComponent'
import { LoadingComponent } from '../../partials/Loading'

const application_id = 'd2f58a0e-8d88-4677-90f4-915a4d333401'

interface ICommentContainer {
	title: string
}

export const CommentContainer: React.FC<ICommentContainer> = ({ title }) => {
	const commentMutatationsApi = useBinaryCommentMutations()
	const { data, loading } = useFindorCreateThread({
		client: commentMutatationsApi.client,
		title,
		website_url: window.location.href,
		application_shortname: 'first-application',
		application_id: 'd2f58a0e-8d88-4677-90f4-915a4d333401',
	})
	const [thread_id, setThreadId] = useState('')
	// const [loading, setLoading] = useState(false)
	// const [thread_closed, setThreadClosed] = useState<boolean>(false)

	// useEffect(() => {
	// 	setLoading(true)
	// 	commentMutatationsApi
	// 		.findOneOrCreateOneThread({
	// 			application_id,
	// 			title,
	// 			website_url: window.location.href,
	// 		})
	// 		.then((thread) => {
	// 			console.log('THREAD', thread)
	// 			if (thread && thread.data) {
	// 				setThreadClosed(
	// 					thread.data.find_one_thread_or_create_one.thread_closed
	// 				)
	// 				setThreadId(thread.data.find_one_thread_or_create_one.id)
	// 				setLoading(false)
	// 			} else {
	// 				setLoading(false)
	// 				throw Error('Something went wrong with the thread')
	// 			}
	// 		})
	// 		.catch(console.error)
	// }, [])

	console.log('DATA', data)

	return loading ? (
		<LoadingComponent />
	) : data?.find_one_thread_or_create_one ? (
		<CommentComponent
			thread_closed={data?.find_one_thread_or_create_one.thread_closed}
			title={title}
			thread_id={data && data.find_one_thread_or_create_one.id}
		/>
	) : (
		<div>Thread was not loaded</div>
	)
}
