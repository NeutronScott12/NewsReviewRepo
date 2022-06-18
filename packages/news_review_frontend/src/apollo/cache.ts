import { InMemoryCache } from '@apollo/client'
import { IS_LOGGED_IN } from './typeDefs'

const localCache: InMemoryCache = new InMemoryCache()

localCache.writeQuery({
	query: IS_LOGGED_IN,
	data: {
		isLoggedIn: false,
	},
})

export const cache = localCache
