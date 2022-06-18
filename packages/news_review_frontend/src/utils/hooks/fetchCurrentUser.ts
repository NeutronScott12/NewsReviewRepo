// import { useBinaryQueries } from '@thelasthurrah/authentication_api'
import { cache } from '../../apollo/cache'
import { IS_LOGGED_IN } from '../../apollo/typeDefs'

export const usefetchCurrentUser = () => {
	// const client = useBinaryQueries()
	// client.currentUser().then((data) => {
	// 	console.log('RESULT', data)
	// 	if (data.current_user) {
	// 		cache.writeQuery({
	// 			query: IS_LOGGED_IN,
	// 			data: {
	// 				isLoggedIn: true,
	// 			},
	// 		})
	// 	}
	// })
	// return result

	console.log('usefetchCurrentUser')
}
