import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { cache } from './cache'

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

export const apollo_client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
})
