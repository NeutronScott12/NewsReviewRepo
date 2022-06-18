import { cache } from '../apollo/cache'
import { IS_LOGGED_IN } from '../apollo/typeDefs'

export const logOut = () => {
	cache.writeQuery({
		query: IS_LOGGED_IN,
		data: {
			isLoggedIn: false,
		},
	})
}
