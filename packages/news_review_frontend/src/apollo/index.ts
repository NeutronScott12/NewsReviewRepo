import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
	uri: 'http://localhost:4800/graphql',
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('binary-stash-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
})
